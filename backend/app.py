import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import nn
from pydantic import BaseModel
from BERT_model import Classifier, tokenizer
from rake_nltk import Rake, Metric
from transformers import pipeline
import re

MODEL_PATH = 'BERT_emotions_classifier.pth'
NEUTRAL_THRESHOLD = 0.50
MAX_PHRASE_LEN = 2
MAX_CHUNK = 500

# Preparing the BERT model for inference
model = Classifier()
model.load_state_dict(torch.load(MODEL_PATH))
model.eval()
use_cuda = torch.cuda.is_available()
device = torch.device("cuda" if use_cuda else "cpu")
if use_cuda:
  model = model.cuda()

r = Rake(max_length=MAX_PHRASE_LEN, ranking_metric=Metric.WORD_FREQUENCY)

# This is an alternative summarizer to the OpenAI API, but its results are not as accurate
summarizer = pipeline("summarization", model='google/pegasus-xsum', tokenizer='google/pegasus-xsum')

# The format of the json POST request body (emotions)
class Input(BaseModel):
  texts: list
  
# The format of the json POST request body (text to summarize)
class InputText(BaseModel):
  text: str

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''
Processes output from the emotion classification `model`. Also predicts records to be of the 'neutral' category if the 
confidence is below `NEUTRAL_THRESHOLD`. Returns a list of numerical values corresponding to each emotion.
'''
def processs_output(output):
  output = nn.Softmax(dim=1)(output).tolist()
  for inner_list in output:
    if max(inner_list) < NEUTRAL_THRESHOLD:
      inner_list.append(1.0)
    else:
      inner_list.append(0.0)
  output = torch.Tensor(output).float()
  return output.argmax(dim=1).tolist()

'''
Used by the `extract` function to break `lines` into chunks smaller than `MAX_CHUNK`.
'''
def chunk_input(lines):
	current_chunk = 0 
	chunks = []
	for line in lines:
			if len(chunks) == current_chunk + 1: 
					if len(chunks[current_chunk]) + len(line.split(' ')) <= MAX_CHUNK:
							chunks[current_chunk].extend(line.split(' '))
					else:
							current_chunk += 1
							chunks.append(line.split(' '))
			else:
					print(current_chunk)
					chunks.append(line.split(' '))

	for chunk_id in range(len(chunks)):
			chunks[chunk_id] = ' '.join(chunks[chunk_id])
  
	return chunks

'''
Uses a fine-tuned HuggingFace model to make predictions about the emotion of a given customer feedback record.
Performs basic preprocessing, and returns `results`, a list of the predicted emotions (raw numerical values).
'''          
@app.post('/predict')
async def predict(input: Input):
  predictions = {}
  texts = input.texts
  input.texts = [text for text in input.texts if text is not None]
  input.texts = [str(text).strip() for text in input.texts if len(str(text)) > 0]
  
  input = tokenizer(input.texts, add_special_tokens=True, padding='max_length', max_length = 128, truncation=True, return_attention_mask=True, return_tensors="pt")
  mask = input['attention_mask'].to(device)
  input_id = input['input_ids'].squeeze(1).to(device)
  output = model(input_id, mask)
  results = processs_output(output)
  for i, text in enumerate(texts):
    predictions[text] = results[i]
  print(predictions.items())
  
  return {"result": results}

'''
Extracts keywords from each emotion category by applying the RAKE algorithm. Returns `results`, a list of extracted
keywords and their respective scores, with the highest scores first.
'''
@app.post('/extract')
async def extract(input: Input):
  results = []
  for text_list in input.texts:
    if len(text_list):
      r.extract_keywords_from_sentences(text_list)
      keywords = sorted(list(set(r.get_ranked_phrases_with_scores())), key=lambda x: x[0], reverse=True)
      results.append(keywords[:(min(5, len(keywords)))])
    else:
      results.append(text_list)
  print(results)
  return {'result': results}

'''
Alternative summarizer path, produces a summary of call center transcripts. Splits text into smaller 
chunks to avoid the max token limit.
'''
@app.post('/summarize')
async def summarize(input: InputText):
  print('input: ', input.text)
  result = ''
  input_text = input.text.replace('\n', '\n<eol>')
  lines = input_text.split('<eol>')
  chunks = chunk_input(lines)
  res = summarizer(chunks, max_length=120, min_length=30, do_sample=False)
  result = ' '.join([summ['summary_text'] for summ in res])
  print(result)
  return {'result': result}

if __name__ == '__main__':
  uvicorn.run(app, host="127.0.0.1", port=8000)
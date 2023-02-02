import uvicorn
from fastapi import FastAPI
import torch
from torch import nn
from pydantic import BaseModel
from BERT_model import Classifier, tokenizer

MODEL_PATH = 'BERT_emotions_classifier.pth'

# Preparing the BERT model for inference
model = Classifier()
model.load_state_dict(torch.load(MODEL_PATH))
model.eval()
use_cuda = torch.cuda.is_available()
device = torch.device("cuda" if use_cuda else "cpu")
if use_cuda:
  model = model.cuda()

# The format of the json POST request body
class Input(BaseModel):
  texts: str

app = FastAPI()

@app.post('/predict')
async def index(input: Input):
  input = tokenizer(input.texts, add_special_tokens=True, padding='max_length', max_length = 128, truncation=True, return_attention_mask=True, return_tensors="pt")
  mask = input['attention_mask'].to(device)
  input_id = input['input_ids'].squeeze(1).to(device)
  output = model(input_id, mask)
  m = nn.Softmax(dim=1)
  results = m(output).argmax(dim=1).tolist()
  
  return {"result": results}

if __name__ == '__main__':
  uvicorn.run(app, host="127.0.0.1", port=8000)
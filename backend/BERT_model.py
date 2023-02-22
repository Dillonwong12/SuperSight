from torch import nn
from transformers import AutoModel, AutoTokenizer

MODEL_NAME = 'microsoft/xtremedistil-l6-h384-uncased'
LABEL_N = 7

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

'''
The architecture of the fine-tuned HuggingFace model which is used to perform inferences on emotion. 
'''
class Classifier(nn.Module):

    def __init__(self, dropout=0.3):

        super(Classifier, self).__init__()
        self.bert = AutoModel.from_pretrained(MODEL_NAME)
        self.dropout = nn.Dropout(dropout)
        self.hidden = nn.Linear(self.bert.config.hidden_size, self.bert.config.hidden_size)
        self.classifier = nn.Linear(self.bert.config.hidden_size, LABEL_N)
        self.relu = nn.ReLU()


    def forward(self, input_ids, mask):

        _, pooled_output = self.bert(input_ids = input_ids, attention_mask=mask, return_dict=False)
        dropout_output = self.dropout(pooled_output)
        linear_output = self.hidden(dropout_output)
        linear_output = self.classifier(linear_output)
        final_layer = self.relu(linear_output)

        return final_layer
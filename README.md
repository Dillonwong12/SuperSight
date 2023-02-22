# SuperSight
An AI/ML-powered web app that can be used to automatically analyse Excel/CSV files of customer feedback and produce insights based on emotion.
Can also be used to produce summaries of call center transcripts.

- Utilises a fine-tuned Hugging Face BERT model ('microsoft/xtremedistil-l6-h384-uncased') to make predictions about each row 
- Applies the RAKE algorithm for keyword extraction from each emotion category
- Calls the OpenAI API to generate summaries of call center transcripts

## Usage
1. Install the required dependencies
```bash
cd backend
npm install 
```

then, create and activate a virtual environment, and run
```bash
pip install -r requirements.txt
```

Finally, for the frontend dependencies
```bash
cd ../frontend
npm install
```

2. Back in the backend folder, create a new .env file. This file must contain two variables, MONGO_URI and OPENAI_API_KEY. 

[How to get a MONGO_URI](https://www.mongodb.com/docs/guides/atlas/connection-string/)

[How to get an OPENAI_API_KEY](https://www.educative.io/answers/how-to-get-api-key-of-gpt-3)

*Remember to change the password in the MONGO_URI string to your own MongoDB account password, and provide a new database name!*

3. Now, open up 3 separate terminals from the base folder (one for frontend, two for backend)
in the first terminal, execute
```bash
cd frontend/src
npm start
```
in the second,
```bash
cd backend
```
then activate your virtual environment if it isn't already running, and execute
```bash
uvicorn --reload app:app
```
and in the last terminal, execute 
```bash
node server.js
```

The web app should now be running on http://localhost:3000/ !!

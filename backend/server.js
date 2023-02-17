const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const emotionsRouter = require('./routes/emotions');
const summaryRouter = require('./routes/summarize');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/emotions', emotionsRouter);
app.use('/api', summaryRouter);

const start = async () => {
    try {
			await mongoose.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			});
      app.listen(PORT, console.log(`server is listening on port ${PORT}...`));
    }
    catch(err) {
        console.log(err);
    }
}

start()
const Emotion = require('../models/emotion');

/*
Returns all stored emotions in the database to be displayed on the 'Saved' page
*/
const getEmotions = async (req, res) => {
	try {
		const emotions = await Emotion.find()
		res.status(200).json(emotions);
	} catch (error) {
		res.status(500).json({msg: error});
	}
}

/*
Saves a new emotion analysis to the database.
*/
const saveEmotion = async (req, res) => {
	try {
		const file = req.body.file;
		const emotion = req.body.emotion;
		const percentage = Number(req.body.percentage);
		const keywords = req.body.keywords;
		const date = Date.parse(req.body.date);
		const newEmotion = new Emotion({file, emotion, percentage, keywords, date});
		await newEmotion.save();
		res.status(200).json('Emotion saved!')
	} catch (error) {
		res.status(500).json({msg: error});
	}
}

module.exports = {getEmotions, saveEmotion}
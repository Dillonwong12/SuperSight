const mongoose = require('mongoose');

// Mongoose schema for the emotions
const EmotionSchema = new mongoose.Schema({
	file: {
		type: String,
		required: true
	},
	emotion: {
		type: String,
		required: true
	},
	percentage: {
		type: Number,
		required: true
	},
	keywords: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
}, {timestamps: true});

const Emotion = mongoose.model('Emotion', EmotionSchema);

module.exports = Emotion;
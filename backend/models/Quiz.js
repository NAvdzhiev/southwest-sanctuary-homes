const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema(
	{
		selectedImages: [{ type: String, required: true }],
		spaces: [
			{
				name: { type: String, required: true },
				count: { type: Number, required: true },
			},
		],
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		state: { type: String, required: true },
		zipCode: { type: String, required: true },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Quiz', quizSchema);

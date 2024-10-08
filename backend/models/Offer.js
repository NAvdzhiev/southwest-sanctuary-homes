const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema(
	{
		property: { type: Schema.Types.ObjectId, ref: 'Property' },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		offerAmount: { type: Number, required: true },
		message: String,
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Offer', offerSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
	{
		property: { type: Schema.Types.ObjectId, ref: 'Property' },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		date: { type: Date, required: true },
		timeSlot: { type: String, required: true },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Booking', bookingSchema);

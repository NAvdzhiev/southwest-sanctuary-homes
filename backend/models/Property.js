const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		state: { type: String, required: true },
		footage: { type: Number, required: true },
		bedrooms: { type: Number, required: true },
		bathrooms: { type: Number, required: true },
		price: { type: Number, required: true },
		state: { type: String, required: true },
		city: { type: String, required: true },
		address: { type: String, required: true },
		geolocagtion: {
			type: { type: String, enum: ['Point'], required: true },
			coordinates: { type: [Number], required: true },
		},
		status: { type: String, required: true, default: 'New' },
		agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
		bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
		offers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
	},
	{ timestamps: true },
);

propertySchema.index({ geolocagtion: '2dsphere' });

module.exports = mongoose.model('Property', propertySchema);

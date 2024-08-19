const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema(
	{
		title: { type: String, required: true },
		images: [{ type: String, required: true }],
		description: { type: String, required: true },
		footage: { type: Number, required: true },
		bedrooms: { type: Number, required: true },
		bathrooms: { type: Number, required: true },
		price: { type: String, required: true },
		state: { type: String, enum: ['NV', 'CA', 'AZ', 'NM'], required: true },
		city: { type: String, required: true },
		address: { type: String, required: true },
		geolocation: {
			type: String,
			required: true,
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

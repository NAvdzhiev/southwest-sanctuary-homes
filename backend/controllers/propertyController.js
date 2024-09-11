const Property = require('../models/Property');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Offer = require('../models/Offer');

// Add new property
exports.createProperty = async (req, res) => {
	try {
		const propertyData = {
			title: req.body.title,
			description: req.body.description,
			state: req.body.state,
			footage: req.body.footage,
			bedrooms: req.body.bedrooms,
			bathrooms: req.body.bathrooms,
			price: req.body.price,
			city: req.body.city,
			address: req.body.address,
			geolocation: req.body.geolocation,
			status: req.body.status,
			agent: req.body.agent,
			images: [],
		};

		if (req.files && req.files.length > 0) {
			propertyData.images = req.files.map(
				(file) => `/uploads/${file.filename}`,
			);
		} else {
			propertyData.images = [];
		}

		const property = new Property(propertyData);
		await property.save();

		const user = await User.findById(propertyData.agent);
		if (!user) {
			return res.status(404).json({ message: 'Agent not found!' });
		}

		user.properties.push(property._id);
		await user.save();
		res.status(201).json({
			message: 'Property Created Successfully!',
			property: property,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

//Get list of properties
exports.getProperties = async (req, res) => {
	try {
		const {
			sortBy,
			order = 'asc',
			state,
			status,
			page = 1,
			limit = 16,
		} = req.query;

		const sortOptions = {};
		const filterOptions = {};

		if (sortBy) {
			sortOptions[sortBy] = order === 'asc' ? 1 : -1;
		}

		if (state) {
			filterOptions.state = state;
		}

		if (status) {
			filterOptions.status = status;
		}

		const skip = (page - 1) * limit;

		const properties = await Property.find(filterOptions)
			.populate('agent', 'firstName lastName phone')
			.sort(sortOptions)
			.skip(skip)
			.limit(parseInt(limit, 10));

		const totalProperties = await Property.countDocuments(filterOptions);
		res.status(200).json({
			properties,
			totalProperties,
			totalPages: Math.ceil(totalProperties / limit),
			currentPage: parseInt(page, 10),
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get single property
exports.getSingleProperty = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id);

		if (!property) {
			return res.status(404).json({ message: 'Property not found' });
		}
		console.log(property);

		res.status(200).json(property);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update property
exports.updateProperty = async (req, res) => {
	try {
		const {
			title,
			description,
			state,
			footage,
			bedrooms,
			bathrooms,
			price,
			city,
			address,
			geolocation,
			status,
			agent,
		} = req.body;

		const property = await Property.findById(req.params.id);

		if (!property) {
			return res.status(404).json({ message: 'Property not found!' });
		}

		if (title) property.title = title;
		if (description) property.description = description;
		if (state) property.state = state;
		if (footage) property.footage = footage;
		if (bedrooms) property.bedrooms = bedrooms;
		if (bathrooms) property.bathrooms = bathrooms;
		if (price) property.price = price;
		if (city) property.city = city;
		if (address) property.address = address;
		if (geolocation) property.geolocation = geolocation;
		if (status) property.status = status;

		if (agent && agent !== String(property.agent)) {
			await User.findByIdAndUpdate(property.agent, {
				$pull: { properties: propertyId },
			});

			await User.findByIdAndUpdate(agent, {
				$push: { properties: propertyId },
			});

			property.agent = agent;
		}

		await property.save();

		res.status(200).json({
			message: 'Property updated successfully!',
			property: property,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete property
exports.deleteProperty = async (req, res) => {
	try {
		await Property.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Property deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Book property tour
exports.createBooking = async (req, res) => {
	try {
		const propertyId = req.params;
		const { firstName, lastName, phone, email, date, timeSlot } = req.body;

		const property = await Property.findById(propertyId);

		if (!property) {
			return res.status(404).json({ error: 'Property Not Found!' });
		}

		const existingBooking = await Booking.findOne({
			propertyId,
			date,
			timeSlot,
		});
		if (existingBooking) {
			return res
				.status(400)
				.json({ error: 'The selected time slot is already occupied!' });
		}

		const booking = new Booking({
			firstName,
			lastName,
			phone,
			email,
			date,
			timeSlot,
		});
		await booking.save();
		res.status(201).json(booking);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

//Create offer
exports.createOffer = async (req, res) => {
	try {
		const { propertyId } = req.params;
		const { firstName, lastName, email, phone, offerAmount, message } =
			req.body;

		const property = Property.findById(propertyId);
		if (!property) {
			return res.status(404).json({ error: 'Property not found!' });
		}

		const offer = new Offer({
			firstName,
			lastName,
			email,
			phone,
			offerAmount,
			message,
		});
		await offer.save();
		res.status(201).json(offer);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

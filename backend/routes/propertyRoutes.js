const express = require('express');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();
const {
	createProperty,
	getProperties,
	getSingleProperty,
	createBooking,
	createOffer,
} = require('../controllers/propertyController');

// Property Actions
router.get('/', getProperties);
router.get('/:propertyId', getSingleProperty);
router.post('/', protect, admin, createProperty);

// Booking Routes
router.post('/:propertyId/bookings', createBooking);

// Offer Routes
router.post('/:propertyId/offers', createOffer);

module.exports = router;

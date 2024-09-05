const express = require('express');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/multer');
const router = express.Router();
const {
	createProperty,
	getProperties,
	getSingleProperty,
	createBooking,
	createOffer,
	deleteProperty,
} = require('../controllers/propertyController');

// Property Actions
router.get('/', getProperties);
router.get('/:id', getSingleProperty);
router.post('/', upload.array('images', 10), protect, admin, createProperty);
router.delete('/:id', protect, admin, deleteProperty);

// Booking Routes
router.post('/:id/bookings', createBooking);

// Offer Routes
router.post('/:id/offers', createOffer);

module.exports = router;

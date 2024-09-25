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
	updateProperty,
	availableSlots,
} = require('../controllers/propertyController');

// Property Actions
router.get('/', getProperties);
router.get('/:id', getSingleProperty);
router.post('/', upload.array('images', 10), protect, admin, createProperty);
router.put('/:id', protect, admin, updateProperty);
router.delete('/:id', protect, admin, deleteProperty);

// Booking Routes
router.get('/:id/booking/available', availableSlots);
router.post('/:id/booking', createBooking);

// Offer Routes
router.post('/:id/offers', createOffer);

module.exports = router;

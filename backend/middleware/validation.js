const { body, validationResult } = require('express-validator');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

exports.trimBody = (req, res, next) => {
	for (const key in req.body) {
		if (typeof req.body[key] === 'string') {
			req.body[key] = req.body[key].trim();
		}
	}
	next();
};

const phoneValidation = (phone) => {
	const phoneNumber = parsePhoneNumberFromString(phone);
	return phoneNumber && phoneNumber.isValid();
};

exports.registerValidation = [
	body('firstName').not().isEmpty().withMessage('First name is required'),
	body('lastName').not().isEmpty().withMessage('Last name is required'),
	body('email').isEmail().withMessage('Please enter a valid email'),
	body('phone').custom((phone) => {
		if (!phoneValidation(phone)) {
			throw new Error('Invalid phone number');
		}
		return true;
	}),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),
];

exports.validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

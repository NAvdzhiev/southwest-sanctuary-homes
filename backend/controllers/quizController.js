const Quiz = require('../models/Quiz');
const { body, validationResult } = require('express-validator');

exports.submitQuiz = [
	body('selectedImages')
		.isArray()
		.withMessage('Selected images must be an array'),

	body('spaces')
		.isArray()
		.withMessage('Spaces must be an array')
		.custom((spaces) => {
			if (!spaces.length) {
				throw new Error('Spaces array cannot be empty');
			}
			spaces.forEach((space) => {
				if (!space.name || typeof space.name !== 'string') {
					throw new Error('Each space must have a valid name');
				}
				if (space.count === undefined || typeof space.count !== 'number') {
					throw new Error('Each space must have a valid count');
				}
			});
			return true;
		}),

	body('firstName').notEmpty().withMessage('First name is required'),
	body('lastName').notEmpty().withMessage('Last name is required'),
	body('phone').isMobilePhone().withMessage('Invalid phone number'),
	body('email').isEmail().withMessage('Invalid email address'),
	body('state').notEmpty().withMessage('State is required'),
	body('zipCode').notEmpty().withMessage('Zip code is required'),

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const newQuiz = new Quiz(req.body);
			const savedQuiz = await newQuiz.save();
			res.status(201).json({
				message: 'Quiz submitted successfully',
				quizId: savedQuiz._id,
			});
		} catch (error) {
			console.error('Error submitting quiz:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	},
];

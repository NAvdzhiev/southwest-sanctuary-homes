const Quiz = require('../models/Quiz');

exports.submitQuiz = async (req, res) => {
	try {
		const {
			selectedImages,
			spaces,
			numberOfSpaces,
			firstName,
			lastName,
			phone,
			email,
			state,
			zipCode,
		} = req.body;

		const newQuiz = new Quiz({
			selectedImages,
			spaces,
			numberOfSpaces,
			firstName,
			lastName,
			phone,
			email,
			state,
			zipCode,
		});

		await newQuiz.save();
		res.status(201).json({ message: 'Quiz submitted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

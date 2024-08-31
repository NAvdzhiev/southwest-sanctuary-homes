const User = require('../models/User');
const generateToken = require('../config/generateToken');

exports.registerUser = async (req, res) => {
	const { firstName, lastName, email, phone, password, role } = req.body;

	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.satatus(400).json({ message: 'User already exists!' });
		}

		const user = await User.create({
			firstName,
			lastName,
			email,
			phone,
			password,
			role,
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phone: user.phone,
				role: user.role,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json({ message: 'Invalid user data!' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phone: user.phone,
				role: user.role,
				token: generateToken(user._id),
			});
		} else {
			res.status(401).json({ message: 'Invalid login data!' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.User._id).select('-password');
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

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
				message: 'User registered successfully!',
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

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		if (users) {
			res.json(users);
		} else {
			res.status(404).json({ message: 'No users found!' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: 'No users found!' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const { firstName, lastName, email, phone, role, properties } = req.body;

		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ message: 'User not found!' });
		}

		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;
		if (email) user.email = email;
		if (phone) user.phone = phone;
		if (role) user.role = role;

		await user.save();

		res.status(200).json({
			message: 'User updated successfully',
			user,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'User deleted successfully!' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

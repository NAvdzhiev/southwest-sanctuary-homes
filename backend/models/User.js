const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Field is required!'],
			minlength: [2, 'First name can be at least 2 characters!'],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, 'Field is required!'],
			minlength: [2, 'Last name can be at least 2 characters!'],
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: [true, 'Field is required!'],
			match: [/.+@.+\..+/, 'Please enter a valid email'],
			trim: true,
		},
		phone: {
			type: String,
			required: [true, 'Field is required!'],
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required!'],
			minlength: [8, 'Password must be at least 8 characters'],
		},
		role: {
			type: String,
			enum: ['admin', 'agent', 'designer'],
			default: 'agent',
		},
		properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
	},
	{
		timestamps: true,
	},
);

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Pre-save hook to validate and format phone number
userSchema.pre('save', function (next) {
	const phoneNumber = parsePhoneNumberFromString(this.phone);
	if (phoneNumber && phoneNumber.isValid()) {
		this.phone = phoneNumber.formatInternational();
		next();
	} else {
		next(new Error('Invalid phone number!'));
	}
});

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

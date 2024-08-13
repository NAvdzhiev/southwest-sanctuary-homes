const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const uniqeSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + '-' + uniqeSuffix + path.extname(file.originalname),
		);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const allowedTypes = /jpeg|jpg|png|webp/;
		const extname = allowedTypes.test(
			path.extname(file.originalname).toLowerCase(),
		);
		const mimetype = allowedTypes.test(file.mimetype);
		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb(
				new Error(
					'Invalid file type. Only JPEG, JPG, PNG and WEBP files are allowed.',
				),
			);
		}
	},
});

module.exports = upload;

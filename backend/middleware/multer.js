const multer = require('multer');
const path = require('path');

// Define storage options
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	},
});

// File filter to allow specific file types
const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png|webp/;
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase(),
	);
	const mimetype = allowedTypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb(new Error('Only images are allowed (jpeg, jpg, png, webp)'));
	}
};

// Multer setup
const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB per file
	fileFilter: fileFilter,
});

module.exports = upload;
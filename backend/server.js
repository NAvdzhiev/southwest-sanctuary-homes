const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { doubleCsrf } = require('csrf-csrf');
const morgan = require('morgan');

dotenv.config();

const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

connectDB();

app.use(helmet());
app.use(mongoSanitize());

app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'your-default-secret',
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 3600000,
		},
	}),
);

const doubleCsrfOptions = {
	getSecret: () => process.env.CSRF_SECRET || 'your-csrf-secret',
	cookieName: '__Host-csrf-token',
	cookieOptions: {
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
	},
};

const { doubleCsrfProtection, generateToken } = doubleCsrf(doubleCsrfOptions);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(morgan('combined'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
	cors({
		origin: 'http://localhost:8080',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CSRF Token Generation Route
app.get('/csrf-token', (req, res) => {
	const csrfToken = generateToken(req, res);
	res.json({ csrfToken });
});

// CSRF Protection Middleware
app.use(doubleCsrfProtection);

app.get('/', (req, res) => {
	res.send('API is running...');
});

//Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/admin', userRoutes);
app.use('/api/quiz', quizRoutes);

app.use(
	helmet.hsts({
		maxAge: 31536000, // 1 year
		includeSubDomains: true,
		preload: true,
	}),
);

const PORT = process.env.PORT || 5400;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

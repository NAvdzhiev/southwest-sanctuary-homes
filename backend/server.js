const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

dotenv.config();

const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(helmet());

app.use(
	cors({
		origin: 'http://localhost:8080',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', apiLimiter);

app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('API is running...');
});

//Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/admin', userRoutes);
app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT || 5400;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

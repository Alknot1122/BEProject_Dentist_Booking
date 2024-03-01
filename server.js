// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Import routes
const dentists = require('./routes/dentists');
const auth = require('./routes/auth');
const appointment = require('./routes/appointment');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
const connectDB = require('./config/db');
connectDB();

// Create Express app
const app = express();
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openai: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'Dentist_Appointment API'
        }
    },
    apis: ['./route/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Middleware
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(rateLimit({
    windowsMs: 10 * 60 * 1000, // 10 minutes
    max: 100
}));
app.use(hpp());
app.use(cors());

// Routes
app.use('/api/v1/dentist', dentists);
app.use('/api/v1/auth', auth);
app.use('/api/v1/appointment', appointment);

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log("Server started"));

// Error handling
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
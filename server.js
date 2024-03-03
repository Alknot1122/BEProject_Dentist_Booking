// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config({ path: './config/config.env' });

const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
//xss
const {xss} = require('express-xss-sanitizer');
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

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition : {
        openapi : '3.0.0',
        info : {
            title : 'Library API',
            version : '1.0.0',
            description : 'Dentist_Appointment API'
        },
        servers:[
            {
                url: 'http://localhost:5000/api/v1'
            }
        ],
    },
    apis : ['./routes/*.js'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve,  swaggerUI.setup(swaggerDocs));

app.use(express.json());

// Middleware
app.use(cookieParser());

//sanitize
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
    windowsMs : 10 * 60 * 1000, //10 mins
    max  : 100
})
app.use(limiter);
app.use(hpp());
app.use(cors());

app.use(cookieParser());

// Routes
app.use('/api/v1/dentists',dentists);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments', appointment);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log("Server started"));

// Error handling
process.on('unhandledRejection',(err, promise) =>{
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
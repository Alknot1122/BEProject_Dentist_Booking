const express = require('express');
const dotenv = require('dotenv');
const dentists = require('./routes/dentists');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
dotenv.config({ path: './config/config.env' });
//TODO
//mongoSanitize
const mongoSanitize = require('express-mongo-sanitize');
//helmet
const helmet = require('helmet');
//xss
const {xss} = require('express-xss-sanitizer');
//rateLimit
const rateLimit = require('express-rate-limit');
//hpp
const hpp = require('hpp');
//cors
const cors = require('cors');
//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition : {
        openai : '3.0.0',
        info : {
            title : 'Library API',
            version : '1.0.0',
            description : 'Dentist_Appointment API'
        }
    },
    apis : ['./route/*.js'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve,  swaggerUI.setup(swaggerDocs))  
//sanitize
app.use(mongoSanitize());
//helmet
app.use(helmet());
//
app.use(xss());
//
const limiter = rateLimit({
    windowsMs : 10*60*1000, //10 นาที
    max  : 100
})
app.use(limiter);
//
app.use(hpp());
//
app.use(cors());

app.use(cookieParser());

app.use('/api/v1/dentist',dentists);
app.use('/api/v1/auth',auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log("connecting"));

process.on('unhandledRejection',(err,promise) =>{
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1))
});
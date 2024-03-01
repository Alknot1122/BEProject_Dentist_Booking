const express = require('express');
const dotenv = require('dotenv');
const dentists = require('./routes/dentists');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
dotenv.config({ path: './config/config.env' });
//TODO
//mongoSanitize
//helmet
//xss
//rateLimit
//hpp
//Swagger

const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/dentist',dentists);
app.use('/api/v1/auth',auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log("connecting"));

process.on('unhandledRejection',(err,promise) =>{
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1))
});
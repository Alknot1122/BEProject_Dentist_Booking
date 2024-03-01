const express = require('express');
const dentists = require('./routes/dentists')

const app = express();

app.use(express.json());

app.use('/api/v1/dentist',dentists);

const PORT = 5000;
const server = app.listen(PORT,console.log("connecting"));

process.on('unhandledRejection',(err,promise) =>{
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1))
});
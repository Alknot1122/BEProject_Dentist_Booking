const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    // TO DO : Add more fields
    
    // Example
    // appointment_date : 2021-03-01
    // user : 65e1a04b5e1f0b4a98e2f752
    // dentist : 65e1a04b5e1f0b4a98e2f752
    // hospital : 65e1a04b5e1f0b4a98e2f752
});

module.exports = mongoose.model('Appointment', appointmentSchema);
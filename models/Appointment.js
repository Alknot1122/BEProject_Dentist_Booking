const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    bookingDate: {
      type: Date,
      required: [true, 'Please provide a booking date'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, 'Please provide a user'],
    },
    dentist: {
      type: mongoose.Schema.ObjectId,
      ref: "Dentist",
      required: [true, 'Please provide a dentist'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model('Appointment', appointmentSchema);
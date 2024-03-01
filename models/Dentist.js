const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    specialty: {
        type: String,
        required: [true, 'Please add specialty']
    },
    available_days: {
        type: String,
        required: [true, 'Please add available days'],
    },
    start_time: {
        type: String,
        required: [true, 'Please add start time'],
    },
    end_time: {
        type: String,
        required: [true, 'Please add end time'],
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

DentistSchema.pre('deleteOne', {document: true, query: false}, async function (next) {
    console.log(`Appointments being removed from hospital ${this._id}`);
    await this.model(`Appointment`).deleteMany({hospital: this._id});
    next();
});

DentistSchema.virtual(`appointments`, {
    ref: `Appointment`,
    localField: '_id',
    foreignField: `hospital`,
    justOne: false
});


module.exports = mongoose.model("Dentist", DentistSchema);
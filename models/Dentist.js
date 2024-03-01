const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Please add years of experience']
    },
    areaofExpertise: {
        type: [String],
        required: true,
        enum: [
            'Orthodontics',
            'Endodontics',
            'Prosthodontics',
            'Periodontics',
            'Pediatric Dentistry',
            'Oral Surgery',
            'Oral Pathology',
            'Oral Radiology'
        ]
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
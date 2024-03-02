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
    areaOfExpertise: {
        type: [String],
        required: true,
        enum: [
            'จัดฟัน',
            'รักษารากฟัน',
            'ทำฟันปลอม',
            'รักษาโรคเหงือก',
            'ทำฟันเด็ก',
            'ศัลยกรรมช่องปาก',
            'ทันตรังสีวิทยา'
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
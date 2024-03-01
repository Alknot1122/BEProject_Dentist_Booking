const Appointment = require('../models/Appointment');
const Dentist = require('../models/Dentist');

// @desc GET all appointments
// @route GET /api/v1/appointments
// @access Private
exports.getAppointments = async (req, res, next) => {
    try {
        let query;
        if (req.user.role === "admin" && req.params.dentistId) {
            query = Appointment.find({ dentist: req.params.dentistId });
        } else if (req.user.role === "admin") {
            query = Appointment.find();
        } else {
            query = Appointment.find({ user: req.user.id });
        }
        
        const Appointments = await query.populate({
            path: "dentist",
            select: "name specialty",
        });
        
        res.status(200).json({
            success: true,
            count: Appointments.length,
            data: Appointments,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Cannot find Appointments" });
    }
};


// @desc GET single appointment
// @route GET /api/v1/appointments/:id
// @access Public
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate({
      path: "dentist",
      select: "name specialty",
    });
    if (!appointment) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No appointment with the id of ${req.params.id}`,
        });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find appointment" });
  }
};


// @desc Add appointment
// @route POST /api/v1/Dentist/:dentistID/appointments
// @access Private
exports.addAppointment = async (req, res, next) => {
    try {
        req.body.dentist = req.params.dentistId;
        const dentist = await Dentist.findById(req.params.dentistId);
        //console.log(req.params.dentistId)
        if (!dentist) {
            return res.status(404).json({
                success: false,
                message: `No dentist with the id of ${req.params.dentistId}`,
            });
        }
        req.body.user = req.user.id;

        const existedAppointments = await Appointment.find({ user: req.user.id });

        if (existedAppointments.length >= 1 && req.user.role !== "admin") {
            return res.status(400).json({
                success: false,
                message: `The user with Id ${req.user.id} is allowed to book only ONE appointment`,
            });
        }

        const existedAppointmentDate = await Appointment.find({ appointmentDate: req.body.appointmentDate, dentist: req.params.dentistId });

        if (existedAppointmentDate.length >= 1 && req.user.role !== "admin") {
            return res.status(400).json({
                success: false,
                message: `The appointment Date ${req.body.appointmentDate} with dentist ${req.params.dentistId} is already booked by someone else`,
            });
        }
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ success: true, data: appointment });
    } catch (err) {
        console.log(err.stack);
        return res.status(500).json({ success: false, message: "Cannot create Appointment" });
    }
};


// @desc Update appointment
// @route PUT /api/v1/appointments/:id
// @access Private
exports.updateAppointment = async (req, res, next) => {
    try {
        let appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: `No appointment with the id of ${req.params.id}`,
            });
        }
        if (appointment.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this`,
            });
        }

        appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            data: appointment,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot update Appointment",
        });
    }
};


// @desc Delete appointment
// @route DELETE /api/v1/appointments/:id
// @access Private
exports.deleteAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: `No appointment with the id of ${req.params.id}`,
            });
        }
        if (appointment.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this`,
            });
        }
        await appointment.remove();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Can't delete Appointment",
        });
    }
};

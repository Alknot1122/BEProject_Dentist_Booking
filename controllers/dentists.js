const Dentist = require('../models/Dentist');

exports.getDentists = async (req, res, next) => {
  try {
    const dentists = await Dentist.getAll();
    res.status(200).json({success: true, data: dentists});
  } catch(err) {
    res.status(400).json({success: false});
  }
};
  
exports.getDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.findById(req.params.id);

    if(!dentist) {
      return res.status(400).json({success: false});
    }
    res.status(200).json({success: true, data: dentist});
  } catch(err) {
    res.status(400).json({success: false});
  }
};
  
exports.addDentist = async (req, res, next) => {
  const dentist = await Dentist.create(req.body);
  res.status(201).json({success: true, data: dentist});
};
  
exports.updateDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!hospital) {
      return res.status(400).json({success: false});
    }

    res.status(200).json({success: true, data: dentist});
  } catch(err) {
    res.status(400).json({success: false});
  }
};
  
exports.deleteDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.findById(req.params.id);

    if(!dentist) {
      return res.status(400).json({success: false});
    }

    await dentist.deleteOne();
    res.status(200).json({success: true, data: {}});
  } catch(err) {
    res.status(400).json({success: false});
  }
};

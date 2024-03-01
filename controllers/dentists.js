const Dentist = require('../models/Dentist');

exports.getDentists = async (req, res, next) => {
  let query;
  const reqQuery = {...req.query};
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);
  console.log(reqQuery);
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = Dentist.find(JSON.parse(queryStr)).populate(`appointments`);

  if(req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort("name");
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = await Dentist.countDocuments();
    query = query.skip(startIndex).limit(limit);
    //Execute query
    const Dentists = await query;

    //Pagination result
    const pagination = {};
    
    if(endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      }
    }

    if(startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      }
    }

    res.status(200).json({success: true, count: Dentists.length, pagination, data: Dentists});
  } catch(err) {
    res.status(400).json({success: false});
  }
};
  
exports.getDentist = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const dentist = await Dentist.findById(req.params.id);
    if(!dentist) {
      return res.status(400).json({success: false});
    }

    res.status(200).json({success: true, data: dentist});
  } catch(err) {
    console.log(err)
    res.status(400).json({success: false});
  }
};
  
exports.createDentist = async (req, res, next) => {
  console.log(req.body);
  try {
    const dentist = await Dentist.create(req.body);
    res.status(201).json({ success: true, data: dentist });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};
  
exports.updateDentist = async (req, res, next) => {
  try {
    const Dentist = await Dentist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!Dentist) {
      return res.status(400).json({success: false});
    }

    res.status(200).json({success: true, data: Dentist});
  } catch(err) {
    res.status(400).json({success: false});
  }
};
  
exports.deleteDentist = async (req, res, next) => {
  try {
    const Dentist = await Dentist.findById(req.params.id);

    if(!Dentist) {
      return res.status(400).json({success: false});
    }

    await Dentist.deleteOne();
    res.status(200).json({success: true, data: {}});
  } catch(err) {
    res.status(400).json({success: false});
  }
};
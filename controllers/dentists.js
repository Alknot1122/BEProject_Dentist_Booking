const dentist = require('../models/Dentist');

//@desc     Get all dentists
//@route    GET /api/v1/dentists
//@access   Public
exports.getDentists = (req,res,next) =>{
    dentist.getAll((err,data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "some error occured"
            });
        }
        else{
            res.status(201).send(data);
        }
        
    })

}
//@desc     Get single dentist
//@route    GET /api/v1/dentists/:id
//@access   Public

//@desc     Create dentist
//@route    POST /api/v1/dentists
//@access   Private

//@desc     Update dentist
//@route    PUT /api/v1/dentists/:id
//@access   Private

//@desc     Delete single dentist
//@route    DELETE /api/v1/dentists/:id
//@access   Private
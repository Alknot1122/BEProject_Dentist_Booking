const dentist = require('../models/Dentist');


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
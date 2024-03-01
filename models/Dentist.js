const sql = require('../config/dentistDB')


const Dentist = function(dentist){
    this.id = dentist.dentist_id;
    this.name = dentist.name;
    this.specialty = dentist.specialty;
    this.avariable_days = dentist.avariable_days;
    this.start_time = dentist.start_time;
    this.end_time = dentist.end_tiem;
};

Dentist.getAll = result =>{
    sql.query("SELECT * FROM dentist;",(err,res) =>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log("Success",res);
        result(null,res);
    });
};


module.exports = Dentist;
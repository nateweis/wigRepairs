const db = require('../db/db_connection');

/* *****************************************
           Functions for Routes 
********************************************/

/* *****************************************
                 Get Data
********************************************/

const getAllJobs = (req, res) => {
    db.any('SELECT * FROM jobs order by id')
    .then(data => res.json({data, msg: "success getting all jobs"}))
    .catch(err => res.json({err, msg:"error getting jobs"}))
}

module.exports = {
    getAllJobs
}
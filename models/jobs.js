const db = require('../db/db_connection');


const testMode = true;
const testTable = testMode? '_test' : '';

/* *****************************************
           Functions for Routes 
********************************************/

/* *****************************************
                 Get Data
********************************************/

const getAllJobs = (req, res) => {
    db.any('SELECT * FROM jobs'+testTable+' order by id desc')
    .then(data => res.json({data, msg: "success getting all jobs"}))
    .catch(err => res.json({err, msg:"error getting jobs"}))
}

 /* *****************************************
                Post Data 
********************************************/

const addJobs = (req, res) => { 
    const dbResolve = req.body.map((nj) => {
        return db.one('Insert INTO jobs'+testTable+' (name,price,description,status) VALUES (${name}, ${price}, ${description}, ${status}) Returning *', nj)
    });
    Promise.all(dbResolve)
    .then(data => res.json({data, msg: "success adding all new jobs", status: 200}))
    .catch(err => res.json({err, msg:"error adding one or more new jobs", status: 500}))

  }

 /* *****************************************
                Put Data 
********************************************/

const updateJob = (req, res) => { 
    db.one('Update jobs'+testTable+' set name=${name},description=${description},time_spent=${time_spent},status=${status},priorty_level=${priorty_level},due_date=${due_date},received_payment=${received_payment},completion_date=${completion_date} where id = ${id} Returning * ', req.body)
    .then(data => res.json({data, msg: "success updating job", status: 200}))
    .catch(err => res.json({err, msg:"error updating jobs", status: 500}))
 }

module.exports = {
    getAllJobs
    ,addJobs
    ,updateJob
}

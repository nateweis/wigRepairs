const db = require('../db/db_connection');

/* *****************************************
             SQL File Retrive 
********************************************/
const path = require('path');
const QueryFile = require('pg-promise').QueryFile;

function sql(file) {
    const fullPath = path.join(__dirname, file); 
    return new QueryFile(fullPath, {minify: true});
}
const sqlNewTask = sql('../db/newTask.sql');
const sqlUpdateTask = sql('../db/updateTask.sql');


/* *****************************************
           Functions for Routes 
********************************************/

/* *****************************************
                 Get Data
********************************************/

const getUserTasksAndTotals = (req, res) => {
    db.any('SELECT * FROM tasks WHERE user_id = $1', req.params.id)
    .then(data => {returnToals(req.params.id, data, res)})
    .catch(err => res.json({err, msg:"get req didnt pan out for the tasks"}))
}

const returnToals = (id, tasks, res) => { 
    db.any('SELECT * FROM totals WHERE user_id = $1', id)
    .then(data => {res.json({tasks: tasks, totals: data, msg: "we got the tasks and totals"})})
    .catch(err => res.json({err, msg:"get req didnt pan out for the totals"}))
 }

 /* *****************************************
                Post Data 
********************************************/

 const addTask = (req, res) => { 
    db.one(sqlNewTask, req.body)
    .then(data => {res.json({data, msg: "success adding task"})})
    .catch(err => {res.json({err, msg: "there was a error adding the new task"})})
  }

/* *****************************************
                Update Data 
********************************************/

  const updateTasks = (req, res) => { 
    db.none(sqlUpdateTask, req.body)
    .then(data => {res.json({data, msg: "success updating task " + req.body.title})})
    .catch(err => {res.json({err, msg: "there was a error updateing the task " + req.body.title})})
   }

   const updateTotal = (req, res) => { 
    const total = req.body.total;
    const task = req.body.task;
    db.none('UPDATE totals SET total = ${total}, date_updated = now() WHERE id = ${id}', total)
    .then(() => {updateTaskCount(task, res)})
    .catch(err => {res.json({err, msg: "there was a error updateing the total " + total.title})})  
  }

  const updateTaskCount = (task, res) => { 
    db.none('UPDATE tasks SET count = ${count}, date_updated = now() WHERE id = ${id}', task)
    .then(data => {res.json({data, msg: "the count and total for task " + task.title + "have been updated"})})
    .catch(err => {res.json({err, msg: "there was a error updateing the count for the task " + task.title})})
   }

/* *****************************************
               Delet Data
********************************************/
const deleteTask = (req, res) => { 
    db.none('DELETE from tasks WHERE id = $1', req.params.id)
    .then(data => {res.json({data, msg: "task has successfully deleted"})})
    .catch(err => {res.json({err, msg: "there was an error deleteing the task"})})
 }


module.exports = {
    getUserTasksAndTotals,
    addTask,
    updateTasks,
    updateTotal,
    deleteTask
}
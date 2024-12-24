const db = require('../db/db_connection');

 /* *****************************************
                Post Data 
********************************************/
const testData = [{name: "Tim", person_type : "Customer"}, {name: "Bob", person_type : "Staff"}]
const addPeople = async (req, res) => { 
    // const result1 = await new Promise((resolve) => setTimeout(() => resolve("First"), 1000));
    // console.log(result1);

    // const result2 = await new Promise((resolve) => setTimeout(() => resolve("Second"), 1000));
    // console.log(result2);

    const dbResolve = testData.map((np) => {
        return db.one('Insert INTO people (name,person_type) VALUES (${name}, ${person_type}) Returning *', np) 
    });
    Promise.all(dbResolve)
    .then(data => {
        // console.log(data)
        addStaff(data, res)
    })
    .catch(err => res.json({err, msg:"error adding one or more new jobs", status: 500}))
}

const addStaff = (data, res) =>{
    const staffOnly = data.filter(i => i.person_type != 'Customer')
    const dbResolve = staffOnly.map((d) => {
        return db.one('Insert INTO staff (person_id) VALUES (${id}) Returning *', d);
    });

    Promise.all(dbResolve)
    .then(newData => {
        console.log({msg: "all people", data})
        console.log({msg: "staff enhancments", newData})
    })
}


// addPeople();


module.exports = {

}
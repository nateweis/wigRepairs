const db = require('../db/db_connection');

/* *****************************************
                 Get Data
********************************************/

const getPeople = (req, res) => {
    db.any('select * from people left outer join staff on people.id = staff.person_id order by name')
    .then(data => res.json({data, msg: "success getting all people", status: 200}))
    .catch(err => res.json({err, msg:"error getting people", status:500}))
}

/* *****************************************
                Post Data 
********************************************/

const addPeople =  (req, res) => { 
    const bodyData = req.body;
    const dbResolve = bodyData.map((np) => {
        return db.one('Insert INTO people (name,person_type,email,phone_number,street,city,state,zip) VALUES (${name}, ${person_type}, ${email}, ${phone_number}, ${street},${city},${state},${zip}) Returning *', np) 
    });
    Promise.all(dbResolve)
    .then(data => {
        const staffList = [];
        const customerList = [];

        data.forEach(d => {
            bodyData.forEach( bd => {
                if(bd.name == d.name && bd.phone_number == d.phone_number && bd.email == d.email){
                    bd.id = d.id;
                    if(bd.person_type == 'Customer') customerList.push(bd);
                    else {
                        bd.person_id = d.id;
                        staffList.push(bd);
                    }
                }
            })
        });
        addStaff(staffList, customerList, res)
    })
    .catch(err => res.json({err, msg:"error when trying to add one or more person", status: 500}))
}

const addStaff = (sl, cl, res) =>{

    const dbResolve = sl.map((s) => {
        return db.none('Insert INTO staff (person_id,title,pay_amount,pay_rate,admin) VALUES (${id},${title},${pay_amount},${pay_rate},${admin})', s);
    });

    Promise.all(dbResolve)
    .then(data => res.json({staffList: sl, customerList: cl, msg: "success adding all new people", status: 200}))
    .catch(err => res.json({err, msg:"error when trying to add one or more person to the staff enhancment", status: 500}))
}





module.exports = {
    getPeople,
    addPeople
}
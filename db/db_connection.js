const promise = require('bluebird');
const options = {
    promiseLib : promise
}
const pgp = require('pg-promise')( options);

const testMode = true;
const testTable = testMode? '_test' : '';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:weissdb@localhost:5432/wig_repairs'+testTable;
// const connectionString = process.env.DATABASE_URL || 'postgres://postgres:uspumpdatabase@localhost:5432/card_app';
const db = pgp(connectionString);
db.connect();

module.exports = db


/* 
    Next tasks: 
    . check why adding a new person dosnt give an id
    . have the upload image api upload a specific folder path per customer and job
    . check why adding a new person dosnt give an id
    . deploy app online
    . catch up on all the current data devorah has
    . have the work logs show up on the jobs



    Things devorah wants in the app:
    .expenses 
    .calander
    .paylogs
*/
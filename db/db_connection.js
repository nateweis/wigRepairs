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
    . add back button to all pages and refamilierize myself with whats going on with this app
    . catch up on all the current data devorah has
    . have images store in db and display on screen
    . create a way to save images in db (includes paths and drag and drop elements)
    . have the work logs show up on the jobs
*/
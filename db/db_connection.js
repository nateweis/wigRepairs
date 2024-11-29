const promise = require('bluebird');
const options = {
    promiseLib : promise
}
const pgp = require('pg-promise')( options);
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:weissdb@localhost:5432/ma_app';
// const connectionString = process.env.DATABASE_URL || 'postgres://postgres:uspumpdatabase@localhost:5432/card_app';
const db = pgp(connectionString);
db.connect();

module.exports = db
const { createPool } = require("mysql");

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"Tech@901",
    database:"test"
});
module.exports = pool;
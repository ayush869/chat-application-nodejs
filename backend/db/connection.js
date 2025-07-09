const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // Your password here
    database: "chat_app",
});

module.exports = pool;



const mysql = require('mysql2');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config/config.json'));
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: '39.107.127.240',
  user: 'root',
  database: 'school',
  password: config.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports=pool;
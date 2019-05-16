const mysql = require('mysql2');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config/config.json'));
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: config.host,
  user: 'root',
  database: 'school',
  password: config.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if(err) {
        console.log(err, 'err')
        reject(err);
      } else {
        conn.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
        pool.releaseConnection(conn);
      }
    });
  });
}

module.exports=query;
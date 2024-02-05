const mysql = require("mysql2/promise");

const db_info = {
  host: "localhost",
  user: "root",
  password: "1234mysql",
  database: "nodejs_mysql",
  //   connectTimeout: 5000,
  // connectionLimit: 30 // default 10
};
const pool = mysql.createPool(db_info);

module.exports = pool;

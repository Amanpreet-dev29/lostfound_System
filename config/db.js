const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: " ", //username
  password: " ", // password
  database: "lostfound"
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

module.exports = db;

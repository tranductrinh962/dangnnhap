const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

//CONNECT TO DATABASE MYSQL

const mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "my-secret-pw",
  database: "mydb",
});

connection.connect(function (err) {
  if (err) throw err;
  let sql =
    "CREATE TABLE IF NOT EXISTS users (id int NOT NULL UNIQUE AUTO_INCREMENT, fullname VARCHAR(255), user_name VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  console.log("Connected!");
});

//Login
app.post("/login", (req, res) => {
  if (req.body.username && req.body.password) {
    let sqlUserSelect =
      "SELECT * FROM users WHERE user_name = ? AND password = ?";
    connection.query(
      sqlUserSelect,
      [req.body.username, req.body.password],
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "Lỗi trong quá trình xử lý đăng nhập" });
          return;
        }
        if (result && result.length < 1) {
          res.status(400).json({ msg: "Đăng nhập không thành công" });
          return;
        }
        res.status(200).json(result);
      }
    );
  }
});

//Dang ky
// Đăng ký tài khoản
app.post("/register", (req, res) => {
  if (req.body.username && req.body.password && req.body.email && req.body.fullname) {
    // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
    let sqlUserSelect = "SELECT * FROM users WHERE user_name = ?";
    connection.query(
      sqlUserSelect,
      [req.body.username],
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "Lỗi trong quá trình xử lý đăng ký" });
          return;
        }
        if (result && result.length > 0) {
          res.status(400).json({ msg: "Tài khoản đã tồn tại" });
          return;
        } else {
          // Thêm tài khoản mới vào cơ sở dữ liệu
          let sqlUserInsert =
            "INSERT INTO users (fullname, user_name, password, email) VALUES (?, ?, ?, ?)";
          connection.query(
            sqlUserInsert,
            [req.body.fullname, req.body.username, req.body.password, req.body.email],
            function (err, result) {
              if (err) {
                console.log(err);
                res.status(500).json({ msg: "Lỗi trong quá trình đăng ký" });
                return;
              }
              res.status(200).json({ msg: "Đăng ký thành công" });
            }
          );
        }
      }
    );
  } else {
    res.status(400).json({ msg: "Vui lòng điền đầy đủ thông tin đăng ký" });
  }
});

// Đăng xuất
app.post("/logout", (req, res) => {
  req.session.destroy(); // Xóa phiên
  res.status(200).json({ msg: "Đăng xuất thành công" });
});

app.listen(3000);

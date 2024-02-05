const router = require("express").Router();
const mysql = require("../../mysql");

/**
 * 회원가입
 * Request Body : { ID, Password, Nickname, Gender }
 * Response Body : { ID, Password, Nickname, Gender, UserID, Status }
 */
router.post("/signup", async (req, res) => {
  try {
    const user = req.body;

    const db = await mysql.getConnection();
    const sql =
      "INSERT INTO user (user_id, password, nickname, gender) VALUES(?,?,?,?)";
    const params = [user.ID, user.Password, user.Nickname, user.Gender];
    const [rows, fields] = await db.query(sql, params);

    const responseBody = user;
    responseBody.Status = true;
    responseBody.UserID = rows.insertId;

    res.send(responseBody);
  } catch (error) {
    console.error("signup", error);
    res.status(503);
    res.send(error);
  }
});

/**
 * 로그인
 * Request Body : { ID, Password }
 * Response Body : { UserID, Nickname, Gender, Status }
 */
router.post("/signin", async (req, res) => {
  try {
    const { ID, Password } = req.body;

    const db = await mysql.getConnection();
    const sql = "SELECT * FROM user WHERE user_id = ? AND password = ?";
    const params = [ID, Password];
    const [rows, fields] = await db.query(sql, params);

    const responseBody = {};

    if (rows.length) {
      responseBody.Status = true;
      responseBody.UserID = rows[0].id;
      responseBody.Nickname = rows[0].nickname;
      responseBody.Gender = rows[0].gender;
    } else {
      responseBody.Status = false;
    }

    res.send(responseBody);
  } catch (error) {
    console.error("signin", error);
    res.status(503);
    res.send(error);
  }
});

/**
 * ID 중복확인
 * Request Body : { ID }
 * Response Body : { Status }
 */
router.post("/checkDuplicateID", async (req, res) => {
  try {
    const ID = req.body.ID;

    const db = await mysql.getConnection();
    const sql = "SELECT * FROM user WHERE user_id = ?";
    const params = [ID];
    const [rows, fields] = await db.query(sql, params);

    const responseBody = {};
    responseBody.Status = rows.length === 0;

    res.send(responseBody);
  } catch (error) {
    console.error("checkDuplicateID", error);
    res.send(error);
  }
});

/**
 * 닉네임 중복확인
 * Request Body : { Nickname }
 * Response Body : { Status }
 */
router.post("/checkDuplicateName", async (req, res) => {
  try {
    const nickname = req.body.Nickname;

    const db = await mysql.getConnection();
    const sql = "SELECT * FROM user WHERE nickname = ?";
    const params = [nickname];
    const [rows, fields] = await db.query(sql, params);

    const responseBody = {};
    responseBody.Status = rows.length === 0;

    res.send(responseBody);
  } catch (error) {
    console.error("checkDuplicateName", error);
    res.send(error);
  }
});

module.exports = router;

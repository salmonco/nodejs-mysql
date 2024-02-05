const router = require("express").Router();
const mysql = require("../../mysql");

/**
 * 글 목록
 * Request Body : { }
 * Response Body : { Articles: [{ ArticleID, Title, Date, Writer, UserID }], Status }
 */
router.get("/", async (req, res) => {
  try {
    const db = await mysql.getConnection();
    const sql = "SELECT * FROM board";
    const [rows, fields] = await db.query(sql);

    const articles = [];
    rows.forEach((row) => {
      const article = {
        ArticleID: row.id,
        Title: row.title,
        Date: row.date,
        Writer: row.writer,
        UserID: row.user_id,
      };

      articles.push(article);
    });

    const responseBody = {};
    responseBody.Articles = articles;
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

/**
 * 글 생성
 * Request Body : { UserID, Title, Contents }
 * Response Body : { Status }
 */
router.post("/new", async (req, res) => {
  try {
    const article = req.body;
    article.Date = new Date();

    const db = await mysql.getConnection();
    const sql = "SELECT * FROM user where id = ?";
    const params = [article.UserID];
    const [rows, fields] = await db.query(sql, params);

    article.Writer = rows[0].nickname;

    const sql2 =
      "INSERT INTO board (user_id, title, contents, date, writer) VALUES(?,?,?,?,?)";
    const params2 = [
      article.UserID,
      article.Title,
      article.Contents,
      article.Date,
      article.Writer,
    ];
    await db.query(sql2, params2);

    const responseBody = {};
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

/**
 * 글 읽기
 * Request Body : { }
 * Response Body : { Title, Contents, Date, Writer, UserID, Status }
 */
router.get("/article/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const db = await mysql.getConnection();
    const sql = "SELECT * FROM board where id = ?";
    const params = [id];
    const [rows, fields] = await db.query(sql, params);

    const responseBody = rows[0];
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

/**
 * 글 편집
 * Request Body : { Title, Contents }
 * Response Body : { Status }
 */
router.put("/article/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Contents } = req.body;

    const db = await mysql.getConnection();
    const sql = "UPDATE board SET title=?, contents=? WHERE id=?";
    const params = [Title, Contents, id];
    await db.query(sql, params);

    const responseBody = {};
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

/**
 * 글 삭제
 * Request Body : { }
 * Response Body : { Status }
 */
router.delete("/article/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const db = await mysql.getConnection();
    const sql = "DELETE FROM board where id = ?";
    const params = [id];
    await db.query(sql, params);

    const responseBody = {};
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

module.exports = router;

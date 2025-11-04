// app.js
const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "publick"))); // /public 폴더 서빙

// GET 예제 (부분 갱신)
app.get(('/fragment', (req,res) => {
  res.send(`<div>서버에서 새 데이터: ${new Date().toLocaleTimeString()}</div>`);
}))

// POST 예제 (폼 전송)
app.post('/save', (req, res) => {
  const title = req.body.title || 'Result: null';
  res.send(`<div>saved true: ${title}</div>`);
});


// 서버 실행
app.listen(3000, () => console.log('서버 실행 중: http://localhost:3000'));
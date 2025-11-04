# htmx-demo

htmx + Node.js(Express) 기본 예제  
HTML 속성 기반으로 서버와 비동기 통신을 구현하는 최소 구성 가이드

---

## 1. 프로젝트 구조
```
htmx-demo/
 ├── app.js
 ├── package.json
 └── public/
      ├── index.html
      └── (선택) favicon.ico
```

---

## 2. 설치 및 실행

### 1️⃣ 의존성 설치
```bash
npm init -y
npm install express
```

### 2️⃣ 서버 실행
```bash
node app.js
```
브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 3. app.js
```js
const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공

// GET 예제 (부분 갱신)
app.get("/fragment", (req, res) => {
  res.send(`<div>서버에서 새 데이터: ${new Date().toLocaleTimeString()}</div>`);
});

// POST 예제 (폼 전송)
app.post("/save", (req, res) => {
  const title = req.body.title || "Result: null";
  res.send(`<div>saved true: ${title}</div>`);
});

// 서버 실행
app.listen(3000, () => console.log("서버 실행 중: http://localhost:3000"));
```

---

## 4. public/index.html
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>htmx 기본 예제</title>
  <script src="https://unpkg.com/htmx.org@1.9.12"></script>
</head>
<body>
  <h1>htmx 테스트</h1>

  <h2>1) GET 요청으로 부분 갱신</h2>
  <button hx-get="/fragment" hx-target="#panel" hx-swap="innerHTML">
    데이터 새로고침
  </button>
  <div id="panel">여기에 서버 응답이 들어옵니다</div>

  <hr>

  <h2>2) POST 요청으로 폼 제출</h2>
  <form hx-post="/save" hx-target="#result">
    <input name="title" placeholder="제목 입력">
    <button type="submit">저장</button>
  </form>
  <div id="result">결과 영역</div>
</body>
</html>
```

---

## 5. 실행 확인
1. 서버 실행 후 `http://localhost:3000` 접속  
2. “데이터 새로고침” 클릭 → `/fragment` 호출  
3. 폼 입력 후 “저장” 클릭 → `/save` 호출  
4. 각 영역에 서버 응답 표시

---

## 6. 자주 발생하는 오류

| 오류 | 원인 | 해결 |
|------|------|------|
| `GET / 404` | index.html 경로 문제 | `/public/index.html` 존재 확인 |
| `GET /fragment 404` | 라우트 누락 or 잘못된 경로 | `app.get('/fragment', …)` 확인 및 서버 재시작 |
| `GET /favicon.ico 404` | 브라우저 자동 요청 | 무시하거나 favicon 추가 |
| CSP 경고 | Chrome 내부 요청 | 무시 가능 |

---

## 7. 다음 단계
- `hx-trigger="every 5s"` 로 자동 갱신 구현  
- `hx-boost="true"` 로 전체 페이지 htmx화  
- 실제 로그인 세션 환경 시 CSRF 헤더 추가

---

## 참고
- 공식 문서: [https://htmx.org/docs/](https://htmx.org/docs/)

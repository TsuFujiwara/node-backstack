const express = require("express");
const next = require("next");
const readProperty = require("./components/readProperty");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// nextからnext-serverへの切替え
// Switching from "next" to "next-server".The "dev" server uses it.
app.prepare().then(() => {
  const server = express();

  // server内でreadProperty
  readProperty();

  // ルート（http://localhost:3000/a）にアクセスしてきたときに
  // プロミスapp.render(req, res, "/a", req.query)を返す
  // .get():ミドルウェア関数が適用されるHTTPメソッド
  // "/a": ミドルウェア関数が適用されるパス（ルート）
  // (res, req) => {}: ミドルウェア関数
  // req: ミドルウェア関数へのHTTPリクエスト引数
  // res: ミドルウェア関数へのHTTPレスポンス引数
  server.get("/a", (req, res) => {
    // app.renderの引数意味、第1引数: request, 第2引数: response，
    // 第3引数: actualPage, 第4引数: queryParams
    console.log(req.body);
    return app.render(req, res, "/a", req.query);
  });

  server.get("/b", (req, res) => {
    return app.render(req, res, "/b", req.query);
  });

  server.get("/posts/:id", (req, res) => {
    return app.render(req, res, "/posts", { id: req.params.id });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // ポート3000でサーバを立てる
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

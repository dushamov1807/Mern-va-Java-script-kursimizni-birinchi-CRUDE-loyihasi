console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const http = require("http");

//1: KIRISH CODES

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2. Session CODES

//3: VIEWS CODES
app.set("views", "views");
app.set("view engine", "ejs");

//4: ROUTING CODES
app.get("/hello", function (req, res) {
  res.end(`Hello World`);
});

app.get("/gift", function (req, res) {
  res.end(`Siz sovgalar bolimidasiz`);
});

const server = http.createServer(app);
let PORT = 4000;
server.listen(PORT, function () {
  console.log(`The server is running successfully on this port: ${PORT}`);
});

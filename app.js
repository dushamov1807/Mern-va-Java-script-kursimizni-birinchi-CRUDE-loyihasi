console.log("Web serverni boshlash");
const { render } = require("ejs");
const express = require("express");
const app = express();

//MongoDB caqirish
const db = require("./server").db();

const fs = require("fs");
const { error } = require("console");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    user = JSON.parse(data);
  }
});

//MongoDB connect

//1: KIRISH CODES

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2. Session CODES

//3: VIEWS CODE
app.set("views", "views");
app.set("view engine", "ejs");

//4: ROUTING CODES
//app.get("/hello", function (req, res) {
//res.end(`Hello World`);
//});

//app.get("/gift", function (req, res) {
//res.end(`Siz sovgalar bolimidasiz`);
//});

app.get("/author", (req, res) => {
  res.render("author", { user: user });
});

app.get("/", function (req, res) {
  res.render("reja");
});

app.post("/create-item", (req, res) => {
  console.log(req.body);
  res.json({ test: "success" });
});

module.exports = app;

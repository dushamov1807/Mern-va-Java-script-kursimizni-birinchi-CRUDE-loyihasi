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
  console.log("user entered /");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong");
      } else {
        console.log(data);
        res.render("reja", { items: data });
      }
    });
});

app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  console.log(req.body);
  //res.end("success");
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    if (err) {
      console.log(err);
      res.end("Something went wrong");
    } else {
      res.end("successfully added");
    }
  });
});

module.exports = app;

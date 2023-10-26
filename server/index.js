require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const prodarray = [
  { name: "Антон", born: "10.10.1998", age: 25 },
  { name: "Сергей", born: "11.11.2000", age: 22 },
  { name: "Павел", born: "06.05.1997", age: 26 },
];
let devarray = [
  { id: 1, name: "Юлия", born: "09.08.2001", age: 22 },
  { id: 2, name: "Анна", born: "10.17.2001", age: 22 },
  { id: 3, name: "Диана", born: "07.19.1999", age: 24 },
];
PORT = 3002;
app.use(cors());
app.listen(PORT, () => console.log(process.env.PUBLIC_URL));
app.get("/dev/get", (req, res) => {
  res.send(devarray);
});
app.post("/dev/edit", (req, res) => {
  let data = req.body;
  devarray = data.slice();
  res.send("success req post");
});
app.get("/prod/get", (req, res) => {
  res.send(prodarray);
});
app.post("/prod/edit", (req, res) => {
  let data = req.body;
  prodarray = data.slice();
  res.send("success req post");
});

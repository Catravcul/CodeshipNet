const express = require("express");
require("dotenv").config();
const route = express();
route.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://codeship-game.herokuapp.com"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token");
  next();
});
route.use(express.static(__dirname + "/build"));
route.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
route.listen(3000, () => {
  console.log("http://localhost:3000/");
});

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("in the middleware!"); //middleware runs by default
  next(); //this allows to go to the next middleware
});

app.use((req, res, next) => {
  console.log("in another middleware");
  res.send("<h1>Hello From expressJS!</h1>");
  //   res.send({ key1: "value" });
});

app.listen(3000);

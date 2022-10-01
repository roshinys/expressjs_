const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/add-product", (req, res, next) => {
  res.send(
    `<form action="/product" method="POST">
    <label>product</label>
    <input type="text" name="title" />
    <label>Size</label>
    <input type="number" name="size" />
    <button type="submit">AddProduct</button></form>`
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from express js</h1>");
});

app.listen(3000);

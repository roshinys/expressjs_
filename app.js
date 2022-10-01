const express = require("express");
const bodyParser = require("body-parser");

//local routes
const adminRouter = require("./routes/admin");
const shopRoute = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// console.log(adminRouter);
app.use("/admin", adminRouter);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).send(`<h1>Page Not Found Err</h1>`);
});

app.listen(3000);

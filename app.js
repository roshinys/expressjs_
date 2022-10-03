const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const rootDir = require("./util/path");

//local routes
const adminRouter = require("./routes/admin");
const shopRoute = require("./routes/shop");
const contactRoute = require("./routes/contact");
const successRoute = require("./routes/success");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// console.log(adminRouter);
app.use("/admin", adminRouter);
app.use(shopRoute);
app.use("/contact-us", contactRoute);
app.use("/success", successRoute);



app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);

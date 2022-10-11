const dotenv = require("dotenv");
dotenv.config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

//database using sequalize now
const sequalize = require("./util/database");

//models
const Product = require("./models/product");
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

//setting user dummy which can be done in authcontrollers in future
app.use(async (req, res, next) => {
  try {
    req.user = await User.findByPk(1);
    if (!req.user) {
      throw new Error("no user exists");
    }
    // console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
  }
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
  foreignKey: "userId",
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);

sequalize
  // .sync({ force: true })
  .sync()
  .then(async (result) => {
    // console.log(result);
    return await User.findByPk(1);
  })
  .then(async (user) => {
    // console.log(user);
    if (!user) {
      return await User.create({
        name: process.env.NAME,
        email: process.env.email,
      });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

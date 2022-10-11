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
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

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

//user has one to many with product
Product.belongsTo(User, {
  foreignKey: "userId",
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
//user has one to one relationship with cart
User.hasOne(Cart);
Cart.belongsTo(User);
//product and cart have many to many relationships so created a new model CartItem
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

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
  .then(async (user) => {
    // console.log(user);
    let cart = await user.getCart();
    if (cart) {
      return cart;
    }
    return await user.createCart();
  })
  .then((cart) => {
    // console.log(cart);
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  //can use findall with WHERE condition too
  Product.findByPk(prodId)
    .then((product) => {
      // console.log(product);
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    // console.log(products);
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.params.productId;
  // console.log(prodId);
  const cart = await req.user.getCart();
  const products = await cart.getProducts({ where: { id: prodId } });
  // console.log(products);
  let product;
  if (products.length > 0) {
    product = products[0];
  }
  let newQty = 1;
  if (product) {
    const oldQty = product.cartItem.quantity;
    // console.log(oldQty);
    newQty = oldQty + 1;
    await cart.addProduct(product, { through: { quantity: newQty } });
  } else {
    const newCart = await Product.findByPk(prodId).then((product) => {
      return cart.addProduct(product, { through: { quantity: newQty } });
    });
  }

  res.redirect("/cart");
};

exports.deleteCart = async (req, res, next) => {
  const prodId = req.params.productId;
  // console.log(prodId);
  const cart = await req.user.getCart();
  const products = await cart.getProducts({ where: { id: prodId } });
  // console.log(products);
  const product = products[0];
  await product.cartItem.destroy();
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

//mastering sql here
//q1
exports.mastersql1 = async (req, res, next) => {
  const users = await User.findAll({ where: { id: 1 } });
  const user = users[0];
  // console.log(user);
  const cart = await user.getCart();
  const products = await cart.getProducts();
  const product = products[0];
  // console.log(product.cartItem);
  res.send(product.cartItem);
};
//q2
exports.mastersql2 = async (req, res, next) => {
  const products = await Product.findAll({ where: { id: 1 } });
  const product = products[0];
  const carts = await product.getCarts();
  const user = await carts[0].getUser();
  // console.log(user);
  res.send(user);
};

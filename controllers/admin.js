const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //use sequalize instance
  req.user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      description: description,
      price: price,
    })
    .then((result) => {
      // console.log(result);
      console.log("succesfully added product to database");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  //  Product.create() can also be used just set userId as req.user.id
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  //can use findByPk method too  => Product.findByPk(prodId)
  req.user
    .getProducts({ Where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      // console.log(product[0]);
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.update(
    {
      title: updatedTitle,
      imageUrl: updatedImageUrl,
      description: updatedDesc,
      price: updatedPrice,
    },
    { where: { id: prodId } }
  )
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then(() => {
      console.log("succesfullllly deleted the product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.success = (req, res, next) => {
  res.render("success", {
    pageTitle: "Success",
    path: "/success",
    formValid: false,
  });
};

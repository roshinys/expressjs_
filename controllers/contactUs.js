exports.getContact = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "contact.html"));
  res.render("contact", {
    pageTitle: "Contact Us",
    path: "/contactus",
  });
};

exports.postContact = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  console.log(req.path);
  //both exists as both are required in html page
  if (name && email) {
    //best way to do it is not to create a url and just sending html file as per me
    // res.sendFile(path.join(rootDir, "views", "success.html"));
    //using url
    // console.log(name, email);
    res.render("success", {
      pageTitle: "Success",
      path: "/success",
      formValid: true,
    });
    return;
  }
  res.render("success", {
    pageTitle: "Success",
    path: "/success",
    formValid: false,
  });
};

const express = require("express");

const path = require("path");
const rootDir = require("./../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact.html"));
});

router.post("/", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  //both exists as both are required in html page
  if (name && email) {
    //best way to do it is not to create a url and just sending html file as per me
    // res.sendFile(path.join(rootDir, "views", "success.html"));

    //using url
    res.redirect("/success");
  }
});

module.exports = router;

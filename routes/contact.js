const express = require("express");

// const path = require("path");
// const rootDir = require("./../util/path");

const router = express.Router();

//controller
const contactController = require("../controllers/contactUs");

router.get("/", contactController.getContact);

router.post("/", contactController.postContact);

module.exports = router;

const express = require("express");

// const path = require("path");
// const rootDir = require("./../util/path");

const router = express.Router();

const successController = require("../controllers/sucessController");

router.get("/", successController.success);

module.exports = router;

const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController.js");
const permissionVerify = require("../middleware/permissionVerify.js");

router.post("/", loginController.authenticate);
router.get("/", permissionVerify, loginController.checkLogin);

module.exports = router;
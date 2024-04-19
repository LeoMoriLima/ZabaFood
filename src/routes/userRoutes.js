const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");
const permissionVerify = require('../middleware/permissionVerify.js');

router.get("/", permissionVerify, userController.getAllUsers);
router.get("/:id", permissionVerify, userController.getUser);
router.post("/", userController.createUser);
router.put("/", permissionVerify, userController.updateUser);
router.delete("/", permissionVerify, userController.deleteUser);

module.exports = router;
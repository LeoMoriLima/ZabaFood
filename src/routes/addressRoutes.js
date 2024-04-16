const express = require("express");
const router = express.Router();
const addressController = require("../controller/addressController.js");
const permissionVerify = require('../middleware/permissionVerify.js');

router.use(permissionVerify);

router.get("/:id", addressController.getAddress);
router.get("/user/:userId", addressController.getAddressByUserID);
router.get("/", addressController.getAllAddresses);
router.post("/", addressController.createNewAddress);
router.put("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
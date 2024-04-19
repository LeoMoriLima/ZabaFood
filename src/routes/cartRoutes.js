const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController.js");
const permissionVerify = require("../middleware/permissionVerify.js");

router.use(permissionVerify);

router.get("/all", cartController.getAllCartByUserID);
router.get("/:id", cartController.getCart);
router.get("/user/:userId", cartController.getCartByUserID);
router.get("/", cartController.getAllCarts);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCartStatus);

module.exports = router;
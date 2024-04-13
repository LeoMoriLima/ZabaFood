const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController.js");

router.get("/:id", cartController.getCart);
router.get("/", cartController.getAllCarts);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCartStatus);

module.exports = router;
const express = require("express");
const router = express.Router();
const cartProductController = require("../controller/cartProductController.js");

router.get("/:id", cartProductController.getCartProduct);
router.get("/", cartProductController.getAllCartProduct);
router.post("/test", cartProductController.testCartProductTransaction);
router.post("/", cartProductController.createCartProduct);
router.put("/:id", cartProductController.updateCartProduct);
router.delete("/:id", cartProductController.deleteCartProduct);

module.exports = router;
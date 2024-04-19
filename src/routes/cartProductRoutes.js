const express = require("express");
const router = express.Router();
const cartProductController = require("../controller/cartProductController.js");
const permissionVerify = require("../middleware/permissionVerify.js");
const { route } = require("./cartRoutes.js");

router.use(permissionVerify);

router.get("/:id", cartProductController.getCartProduct);
router.get("/cart/:userId", cartProductController.getCartProductsByUserId);
router.get("/order/:cartId", cartProductController.getCartByCartId);
router.get("/", cartProductController.getAllCartProduct);
router.post("/test", cartProductController.testCartProductTransaction);
router.post("/", cartProductController.createCartProduct);
router.put("/:id", cartProductController.updateCartProduct);
router.delete("/:id", cartProductController.deleteCartProduct);

module.exports = router;
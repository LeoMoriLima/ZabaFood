const express = require("express");
const router = express.Router();
const productController = require("../controller/productController.js");

router.get("/", productController.getAllproduct);
router.get("/:id", productController.getProduct);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
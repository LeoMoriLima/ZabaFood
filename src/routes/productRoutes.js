const express = require("express");
const router = express.Router();
const productController = require("../controller/productController.js");


router.get("/interval", productController.getProductByInterval);
router.get("/search/:name", productController.getProductByName)
router.get("/search/:name", productController.getProductByName);
router.get("/:id", productController.getProduct);
router.get("/", productController.getAllproduct);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
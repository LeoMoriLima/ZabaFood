const express = require("express");
const router = express.Router();
const productController = require("../controller/productController.js");
const permissionVerify = require("../middleware/permissionVerify.js");

router.get("/interval", productController.getProductByInterval);
router.get("/search/:name", productController.getProductByName)
router.get("/search/:name", productController.getProductByName);
router.get("/:id", productController.getProduct);
router.get("/", productController.getAllproduct);
router.post("/", permissionVerify, productController.createProduct);
router.put("/status/:id", permissionVerify, productController.updateDeletedStatus);
router.put("/:id", permissionVerify, productController.updateProduct);
router.delete("/:id", permissionVerify, productController.deleteProduct);

module.exports = router;
const express = require("express");
const router = express.Router();
const productTypeController = require("../controller/productTypeController.js");
const permissionVerify = require("../middleware/permissionVerify.js");

router.get("/type/:type", productTypeController.getProductTypeByType)
router.get("/:id", productTypeController.getProductType);
router.get("/", productTypeController.getAllProductTypes);
router.post("/",permissionVerify, productTypeController.createProductType);
router.put("/:id",permissionVerify, productTypeController.updateProductType);
router.delete("/:id",permissionVerify, productTypeController.deleteProductType);

module.exports = router;
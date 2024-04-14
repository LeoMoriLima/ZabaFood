const express = require("express");
const router = express.Router();
const productTypeController = require("../controller/productTypeController.js");

router.get("/:id", productTypeController.getProductType);
router.get("/", productTypeController.getAllProductTypes);
router.post("/", productTypeController.createProductType);
router.put("/:id", productTypeController.updateProductType);
router.delete("/:id", productTypeController.deleteProductType);

module.exports = router;
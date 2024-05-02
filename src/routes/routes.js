const { Router } = require("express");;
const userRoutes = require("./userRoutes.js");
const loginRoutes = require("./loginRoutes.js");
const productRoutes = require("./productRoutes.js");
const cartRoutes = require("./cartRoutes.js");
const cartProductRoutes = require("./cartProductRoutes.js");
const productTypeRoutes = require("./productTypeRoutes.js");
const addressRoutes = require("./addressRoutes.js");
const creditTransactionRoutes = require("./creditTransactionRoutes.js");
const router = Router();
const requestLogger = require('../middleware/requestLogger.js');

router.use(requestLogger);
router.use("/users", userRoutes);
router.use("/login", loginRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/cart_product", cartProductRoutes);
router.use("/product_type", productTypeRoutes);
router.use("/address", addressRoutes);
router.use("/credit_transaction", creditTransactionRoutes)

module.exports = router;
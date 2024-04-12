const { Router } = require("express");;
const userRoutes = require("./userRoutes.js");
const loginRoutes = require("./loginRoutes.js");
const productRoutes = require("./productRoutes.js");

const router = Router();

router.use("/users", userRoutes);
router.use("/login", loginRoutes);
router.use("/product", productRoutes)

module.exports = router;
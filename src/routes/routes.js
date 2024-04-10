const { Router } = require("express");;
const userRoutes = require("./userRoutes.js");
const loginRoutes = require("./loginRoutes.js");

const router = Router();

router.use("/users", userRoutes);
router.use("/login", loginRoutes);

module.exports = router;
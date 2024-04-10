const { Router } = require("express");;
const userRoutes = require("./userRoutes.js");

const router = Router();

router.use("/users", userRoutes);


module.exports = router;
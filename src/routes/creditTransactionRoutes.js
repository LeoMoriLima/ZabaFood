const express = require("express");
const router = express.Router();
const creditTransactionController = require("../controller/creditTransactionController.js");
const permissionVerify = require("../middleware/permissionVerify.js");

router.use(permissionVerify);

router.get("/:id", creditTransactionController.getCreditTransactionById);
router.get("/", creditTransactionController.getAllCreditTransactions);
router.post("/", creditTransactionController.createCreditTransaction);

module.exports = router;
const express = require("express");
const router = express.Router();
const creditTransactionController = require("../controller/creditTransactionController.js");

router.get("/:id", creditTransactionController.getCreditTransactionById);
router.get("/", creditTransactionController.getAllCreditTransactions);
router.post("/", creditTransactionController.createCreditTransaction);

module.exports = router;
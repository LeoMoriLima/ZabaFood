const creditTransactionService = require("../services/creditTransactionServices.js");
const { isUUID, isInt, isEmpty } = require('validator');

const getCreditTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (!isUUID(id)) {
            return res.status(400).json({ error: "ID inválido!" });
        };

        const creditTransaction = await creditTransactionService.getCreditTransactionById(id);
        return res.status(200).json(creditTransaction);
    } catch {
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const getAllCreditTransactions = async (req, res) => {
    try {
        const admin = req.user.user_type.includes("admin");
        if (!admin) {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        const creditTransactions = await creditTransactionService.getAllCreditTransactions();
        return res.status(200).json(creditTransactions);
    } catch {
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const createCreditTransaction = async (req, res) => {
    const { transaction_type, transaction_value } = req.body;
    try {
        const userType = req.user.user_type;
        const user_id = req.user.id;

        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (!isUUID(user_id)) {
            return res.status(400).json({ error: "UserID inválido!" });
        };

        if (isEmpty(transaction_type)) {
            return res.status(400).json({ error: "O tipo de transação é obrigatório!" });
        };

        await creditTransactionService.createCreditTransaction(user_id, transaction_type, transaction_value);
        return res.status(201).json({ message: 'Nova transação adicionada com sucesso' });
    } catch {
        return res.status(500).json({ error: "Erro ao inserir dados" });
    }
}

module.exports = {
    getCreditTransactionById,
    getAllCreditTransactions,
    createCreditTransaction,
}
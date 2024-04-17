const creditTransactionService = require("../services/creditTransactionService.js");

const getCreditTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const creditTransaction = await creditTransactionService.getCreditTransactionById(id);
        return res.status(200).json(creditTransaction);
    } catch {
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const getAllCreditTransactions = async (req, res) => {
    try {
        const creditTransactions = await creditTransactionService.getAllCreditTransactions();
        return res.status(200).json(creditTransactions);
    } catch {
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const createCreditTransaction = async (req, res) => {
    const { user_id, transaction_type, transaction_value } = req.body;
	try {
        await creditTransactionService.createCreditTransaction(user_id, transaction_type, transaction_value);
        return res.status(200).json({ message: 'Nova transação adicionada com sucesso' });
    } catch {
        return res.status(500).json({ error: "Erro ao inserir dados" });
    }
}

module.exports = {
    getCreditTransactionById,
    getAllCreditTransactions,
    createCreditTransaction,
}
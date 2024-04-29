const creditTransactionRepository = require("../repository/creditTransactionRepository.js");

const getCreditTransactionById = async (id) => {
    try {
        const creditTransaction = await creditTransactionRepository.getCreditTransactionById(id);
		if (!creditTransaction) {
            throw new Error("Transação não encontrada")
        }
        return creditTransaction;
    } catch (error) {
        throw error;
    }
}

const getAllCreditTransactions = async () => {
    try {
        const creditTransactions = await creditTransactionRepository.getAllCreditTransactions();
        return creditTransactions;
    } catch (error) {
        throw error;
    }
}

const createCreditTransaction = async (user_id, transaction_type, transaction_value) => {
    try {
        if (!user_id) {
            throw { error: "O id é obrigatório" };
        }

        const newCreditTransaction = await creditTransactionRepository.createCreditTransaction(user_id, transaction_type, transaction_value);
        return newCreditTransaction;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCreditTransactionById,
    getAllCreditTransactions,
    createCreditTransaction,
}
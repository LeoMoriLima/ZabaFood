const { pool } = require("../db/postgresql");

const getCreditTransactionById = async (id) => {
    let client;
    const query = "SELECT * FROM credit_transaction WHERE id = $1";
    try {
        client = await pool.connect();
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log("Erro ao encontrar a transação:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getAllCreditTransactions = async () => {
    let client;
    const query = "SELECT * FROM credit_transaction";
    try {
        client = await pool.connect();
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log("Erro ao encontrar as transações", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const createCreditTransaction = async (user_id, transaction_type, transaction_value) => {
    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Cria a transação de crédito
        await client.query('INSERT INTO credit_transaction (user_id, transaction_type, transaction_value) VALUES ($1, $2, $3)', [user_id, transaction_type, transaction_value]);

        // Adiciona o valor da transação à carteira de crédito do usuário
        await client.query('UPDATE users SET credit_balance = credit_balance + $1 WHERE id = $2', [transaction_value, user_id]);

        await client.query('COMMIT');

        console.log("Dados inseridos com sucesso");
    } catch (error) {
        await client.query('ROLLBACK');
        console.log("Erro ao inserir dados:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = {
    getCreditTransactionById,
    getAllCreditTransactions,
    createCreditTransaction,
}
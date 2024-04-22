const { connectToDatabase } = require('../db/postgresql.js');

const insertNewUser = async (username, user_type, name, email, password, cpf, phone) => {
    const userQuery = 'INSERT INTO users (username, user_type, name, email, password, cpf, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const cartQuery = 'INSERT INTO cart (user_id, total) VALUES ($1, 0)';
    const client = await connectToDatabase();
    try {
        await client.query('BEGIN');

        const userResult = await client.query(userQuery, [username, user_type, name, email, password, cpf, phone]);
        const userId = userResult.rows[0].id;

        await client.query(cartQuery, [userId]);

        await client.query('COMMIT');

        console.log('Dados inseridos com sucesso');

        return userResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.log('Erro ao inserir dados:', error);
        throw error;
    } finally {
        client.end();
    }
}


const getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    const client = await connectToDatabase();
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (err) {
        console.log('Erro ao selecionar dados:', err);
        throw err;
    } finally {
        client.end()
    }
}

const getUser = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const client = await connectToDatabase();
    try {
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Erro ao buscar usuário.', error)
        throw { error: "Erro ao buscar usuário." }
    } finally {
        client.end()
    }
}

const updateUser = async (id, username, name, email, password, cpf, phone) => {
    const query = 'UPDATE users SET username = $1, name = $2, email = $3, password = $4, cpf = $5, phone = $6 WHERE id = $7'
    const client = await connectToDatabase();
    try {
        await client.query(query, [username, name, email, password, cpf, phone, id]);
        console.log('Dados atualizados com sucesso');
    } catch (error) {
        console.log('Erro ao atualizar dados:', error);
        throw error;
    } finally {
        client.end()
    }
}

const updateUserCreditBalance = async (id, credit_balance) => {
    const query = 'UPDATE users SET credit_balance = $1 WHERE id = $2';
    const client = await connectToDatabase();
    try {
        await client.query(query, [credit_balance, id]);
        console.log('Dados atualizados com sucesso');
    } catch (error) {
        console.log('Erro ao atualizar dados:', error);
        throw error;
    } finally {
        client.end()
    }
}

const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id = $1';
    const client = await connectToDatabase();
    try {
        await client.query(query, [id]);
        console.log('Dados deletados com sucesso');
    } catch (error) {
        console.log('Erro ao deletar dados:', error);
        throw error;
    } finally {
        client.end()
    }
}

module.exports = {
    getAllUsers,
    insertNewUser,
    getUser,
    updateUser,
    updateUserCreditBalance,
    deleteUser,
}
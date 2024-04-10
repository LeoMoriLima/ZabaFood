const { connectToDatabase } = require('../db/postgresql.js');

async function insertNewUser(username, user_type, name, email, password, cpf_cnpj, phone) {
    const client = await connectToDatabase();
    const query = 'INSERT INTO users (username, user_type, name, email, password, cpf_cnpj, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    try {
        await client.query(query, [username, user_type, name, email, password, cpf_cnpj, phone]);
        console.log('Dados inseridos com sucesso');
        return { username, user_type, name, email, password, cpf_cnpj, phone };
    } catch (error) {
        console.log('Erro ao inserir dados:', error);
        throw error;
    } finally {
        client.end()
    }
}

async function getAllUsers() {
    const client = await connectToDatabase();
    const query = 'SELECT * FROM users';
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

async function getUser(id) {
    const client = await connectToDatabase();
    const query = 'SELECT * FROM users WHERE id = $1';
    try {
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Erro ao selecionar dados: Usuário não existente')
        throw {error: "Usuário não existente" }
    } finally {
        client.end()
    }
}

async function updateUser(id, username, name, email, password, cpf_cnpj, phone) {
    const client = await connectToDatabase();
    const query = 'UPDATE users SET username = $1, name = $2, email = $3, password = $4, cpf_cnpj = $5, phone = $6 WHERE id = $7'
    try {
        await client.query(query, [username, name, email, password, cpf_cnpj, phone, id]);
        console.log('Dados atualizados com sucesso');
    } catch (error) {
        console.log('Erro ao atualizar dados:', error);
        throw error;
    } finally {
        client.end()
    }
}

async function deleteUser(id) {
    const client = await connectToDatabase();
    const query = 'DELETE FROM users WHERE id = $1';
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
    deleteUser,
}
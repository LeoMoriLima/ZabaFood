const { pool } = require('../db/postgresql');

const getUserByUsername = async (username) => {
    let client;
    try {
        client = await pool.connect();
        const { rows: [user] } = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao buscar usuário');
    } finally {
        if (client) {
            client.release();
        }
    }
};

const getUserByEmail = async (email) => {
    let client;
    try{
        client = await pool.connect();
        const { rows: [user] } = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        return user;
        } catch (error){
            console.log(error);
            throw new Error('Erro ao buscar usuário');
        } finally {
            if (client){
                client.release();
            }
        }
}

module.exports = {
    getUserByUsername,
    getUserByEmail,
}
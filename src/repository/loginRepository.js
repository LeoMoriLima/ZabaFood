const { connectToDatabase } = require('../db/postgresql');

const getUserByUsername = async (username) => {
    const client = await connectToDatabase();
    try {
        const { rows: [user] } = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        return user
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao buscar usuário');
    } finally {
        client.end();
    }
};

module.exports = {
    getUserByUsername,
}
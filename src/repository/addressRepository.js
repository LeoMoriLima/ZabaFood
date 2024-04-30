const { pool } = require("../db/postgresql.js");

const getAddress = async (id) => {
    let client
    const query = "SELECT * FROM address WHERE id = $1";
    try {
        client = await pool.connect()
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getAddressByUserID = async (userId, index) => {
    let client;
    const query = "SELECT * FROM address WHERE user_id = $1 ORDER BY created_at ASC LIMIT 1 OFFSET $2;";
    try {
        client = await pool.connect()
        const result = await client.query(query, [userId, index]);
        return result.rows[0];
    } catch (error) {
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getAllUserAddress = async (userId) => {
    let client;
    const query = "SELECT * FROM address WHERE user_id = $1 ORDER BY created_at ASC"
    try {
        client = await pool.connect()
        const result = await client.query(query, [userId]);
        return result.rows;
    } catch (error) {
        throw new Error("Erro ao selecionar os dados");
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getAllAddresses = async () => {
    let client;
    const query = "SELECT * FROM address";
    try {
        client = await pool.connect()
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const createNewAddress = async (user_id, postal_code, state, city, street, number, complement) => {
    let client;
    const query = "INSERT INTO address (user_id, postal_code, state, city, street, number, complement) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    try {
        client = await pool.connect()
        await client.query(query, [user_id, postal_code, state, city, street, number, complement]);
        console.log("Dados inseridos com sucesso");
    } catch (error) {
        console.log("Erro ao inserir dados:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const updateAddress = async (id, postal_code, state, city, street, number, complement) => {
    let client;
    const query = "UPDATE address SET postal_code = $1, state = $2, city = $3, street = $4, number = $5, complement = $6, updated_at = NOW()  WHERE id = $7";
    try {
        client = await pool.connect()
        await client.query(query, [postal_code, state, city, street, number, complement, id]);
        console.log("Dados atualizados com sucesso");
    } catch (error) {
        console.log("Erro ao atualizar dados:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const deleteAddress = async (id) => {
    let client;
    const query = "DELETE FROM address WHERE id = $1";
    try {
        client = await pool.connect()
        await client.query(query, [id]);
        console.log("Dados deletados com sucesso");
    } catch (error) {
        console.log("Erro ao deletar dados:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = {
    getAddress,
    getAddressByUserID,
    getAllUserAddress,
    getAllAddresses,
    createNewAddress,
    updateAddress,
    deleteAddress,
};
const { connectToDatabase } = require("../db/postgresql.js");

const getAddress = async (id) => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM address WHERE id = $1";
    try {
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const getAddressByUserID = async (userId, index) => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM address WHERE user_id = $1 ORDER BY created_at ASC LIMIT 1 OFFSET $2;";
    try {
        const result = await client.query(query, [userId, index]);
        return result.rows[0];
    } catch (error) {
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const getAllUserAddress = async (userId) => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM address WHERE user_id = $1 ORDER BY created_at ASC"
    try {
        const result = await client.query(query, [userId]);
        return result.rows;
    } catch (error) {
        throw new Error("Erro ao selecionar os dados");
    } finally {
        client.end();
    }
}

const getAllAddresses = async () => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM address";
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const createNewAddress = async (user_id, postal_code, state, city, street, number, complement) => {
    const client = await connectToDatabase();
    const query = "INSERT INTO address (user_id, postal_code, state, city, street, number, complement) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    try {
        await client.query(query, [user_id, postal_code, state, city, street, number, complement]);
        console.log("Dados inseridos com sucesso");
    } catch (error) {
        console.log("Erro ao inserir dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const updateAddress = async (id, postal_code, state, city, street, number, complement) => {
    const client = await connectToDatabase();
    const query = "UPDATE address SET postal_code = $1, state = $2, city = $3, street = $4, number = $5, complement = $6, updated_at = NOW()  WHERE id = $7";
    try {
        await client.query(query, [postal_code, state, city, street, number, complement, id]);
        console.log("Dados atualizados com sucesso");
    } catch (error) {
        console.log("Erro ao atualizar dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const deleteAddress = async (id) => {
    const client = await connectToDatabase();
    const query = "DELETE FROM address WHERE id = $1";
    try {
        await client.query(query, [id]);
        console.log("Dados deletados com sucesso");
    } catch (error) {
        console.log("Erro ao deletar dados:", error);
        throw error;
    } finally {
        client.end();
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
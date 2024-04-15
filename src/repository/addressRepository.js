const { connectToDatabase } = require("../db/postgresql.js");

async function getAddress(id) {
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

async function getAllAddresses() {
    const client = await connectToDatabase();
    const query = "SELECT * FROM address";
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (error){
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

async function createNewAddress(user_id, postal_code, state, city, street, number, complement) {
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

async function updateAddress(id, postal_code, state, city, street, number, complement) {
    const client = await connectToDatabase();
    const query = "UPDATE address SET postal_code = $1, state = $2, city = $3, street = $4, number = $5, complement = $6  WHERE id = $7";
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

async function deleteAddress(id) {
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
    getAllAddresses,
    createNewAddress,
    updateAddress,
    deleteAddress,
};
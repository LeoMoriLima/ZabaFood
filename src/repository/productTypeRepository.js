const { connectToDatabase } = require("../db/postgresql");

const getAllProductType = async () => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM product_type";
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log("Erro ao encontrar os tipos de produtos", error);
        throw error;
    } finally {
        client.end();
    }
}

const getProductType = async (id) => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM product_type WHERE id = $1";
    try {
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log("Erro ao encontrar o tipo de produto:", error);
        throw error;
    } finally {
        client.end();
    }
}

const getProductTypeByType = async (type) => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM product_type WHERE type = $1";
    try {
        const result = await client.query(query, [type]);
        return result.rows[0];
    } catch (error) {
        console.log("Erro ao encontrar o tipo de produto:", error);
        throw error;
    } finally {
        client.end();
    }
}

const createProductType = async (type) => {
    const client = await connectToDatabase();
    const query = "INSERT INTO product_type (type) VALUES ($1)";

    try {
        await client.query(query, [type]);
        console.log("Dados inseridos com sucesso");
    } catch (error) {
        console.log("Erro ao inserir dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const updateProductType = async (id, type) => {
    const client = await connectToDatabase();
    const query = "UPDATE product_type SET type = $1 WHERE id = $2";
    try {
        await client.query(query, [type, id]);
        console.log("Dados atualizados com sucesso");
    } catch (error) {
        console.log("Erro ao atualizar dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const deleteProductType = async (id) => {
    const client = await connectToDatabase();
    const query = "DELETE FROM product_type WHERE id = $1";
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
    createProductType,
    getAllProductType,
    getProductType,
    getProductTypeByType,
    updateProductType,
    deleteProductType,
}
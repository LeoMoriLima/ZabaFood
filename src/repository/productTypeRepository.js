const { pool } = require("../db/postgresql");

const getAllProductType = async () => {
    let client;
    const query = "SELECT * FROM product_type";
    try {
        client = await pool.connect();
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log("Erro ao encontrar os tipos de produtos", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getProductType = async (id) => {
    let client;
    const query = "SELECT * FROM product_type WHERE id = $1";
    try {
        client = await pool.connect();
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log("Erro ao encontrar o tipo de produto:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getProductTypeByType = async (type) => {
    let client;
    const query = "SELECT * FROM product_type WHERE LOWER(type) = LOWER($1)";
    try {
        client = await pool.connect();
        const result = await client.query(query, [type]);

        return result.rows[0];
    } catch (error) {
        console.log("Erro ao encontrar o tipo de produto:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const createProductType = async (type, url_img) => {
    let client;
    const query = "INSERT INTO product_type (type, url_img) VALUES ($1, $2)";

    try {
        client = await pool.connect();
        await client.query(query, [type, url_img]);
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

const updateProductType = async (id, type, url_img) => {
    let client;
    const query = "UPDATE product_type SET type = $1, url_img = $2 WHERE id = $3";
    try {
        client = await pool.connect();
        await client.query(query, [type, url_img, id]);
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

const deleteProductType = async (id) => {
    let client;
    const query = "DELETE FROM product_type WHERE id = $1";
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
    createProductType,
    getAllProductType,
    getProductType,
    getProductTypeByType,
    updateProductType,
    deleteProductType,
}
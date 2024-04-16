const { connectToDatabase } = require('../db/postgresql');

const insertNewProduct = async (producer_id, name, value, url_img, stock, type_id, description) => {
    const query = 'INSERT INTO product (producer_id, name, value, url_img, stock, type_id, description) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const client = await connectToDatabase();
    try {
        await client.query(query, [producer_id, name, value, url_img, stock, type_id, description]);
        console.log('Dados inseridos com sucesso');
    } catch (error) {
        console.log('Erro ao inserir dados:', error);
        throw new Error('Erro ao inserir o produto');
    } finally {
        client.end()
    }
}

const getProduct = async (id) => {
    const query = 'SELECT * FROM product WHERE id = $1';
    const client = await connectToDatabase();
    try {
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Erro ao encontrar o produto:', error);
        throw new Error('Erro ao encontrar o produto.');
    } finally {
        client.end();
    }
}

const getAllProduct = async () => {
    const query = 'SELECT * FROM product';
    const client = await connectToDatabase();
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar os produtos:', error);
        throw new Error('Erro ao encontrar os produtos');
    } finally {
        client.end();
    }
}

const getProductByName = async (name) => {
    const client = await connectToDatabase();
    const query = 'SELECT * FROM product WHERE LOWER(name) LIKE LOWER($1)';
    try {
        const result = await client.query(query, [`%${name.toLowerCase()}%`]);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar o produto:', error);
        throw new Error('Erro ao encontrar o produto.');
    } finally {
        client.end();
    }
}

const updateProduct = async (id, name, value, url_img, stock, type_id, description) => {
    const client = await connectToDatabase();
    const query = 'UPDATE product SET name = $1, value = $2, url_img = $3, stock = $4, type_id = $5, description = $6 WHERE id = $7';
    try {
        await client.query(query, [name, value, url_img, stock, type_id, description, id]);
        console.log('Dados atualizados com sucesso');
    } catch (error) {
        console.log('Erro ao atualizar dados:', error);
        throw new Error('Erro ao atualizar o produto');
    } finally {
        client.end();
    }
}

const deleteProduct = async (id) => {
    const client = await connectToDatabase();
    const query = 'DELETE FROM product WHERE id = $1';
    try {
        await client.query(query, [id]);
        console.log('Dados deletados com sucesso');
    } catch (error) {
        console.log('Erro ao deletar dados:', error);
        throw new Error('Erro ao deletar o produto');
    } finally {
        client.end();
    }
}


const getProductByInterval = async (min, max) => {
    const query = 'SELECT * FROM product ORDER BY created_at ASC LIMIT $1 OFFSET $2';
    const client = await connectToDatabase();
    try {
        const result = await client.query(query, [max - min + 1, min - 1]);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar os produtos por intervalo:', error);
        throw new Error('Erro ao encontrar os produtos por intervalo');
    } finally {
        client.end();
    }
}


module.exports = {
    insertNewProduct,
    getAllProduct,
    getProduct,
    getProductByName,
    updateProduct,
    deleteProduct,
    getProductByInterval,
};

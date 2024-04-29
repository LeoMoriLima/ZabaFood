const { pool } = require('../db/postgresql');

const insertNewProduct = async (name, value, url_img, stock, type_id, description) => {
    const query = 'INSERT INTO product (name, value, url_img, stock, type_id, description) VALUES ($1, $2, $3, $4, $5, $6)';
    let client;
    try {
        client = await pool.connect();
        await client.query(query, [name, value, url_img, stock, type_id, description]);
        console.log('Dados inseridos com sucesso');
    } catch (error) {
        console.log('Erro ao inserir dados:', error);
        throw new Error('Erro ao inserir o produto');
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getProduct = async (id) => {
    const query = 'SELECT * FROM product WHERE id = $1';
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Erro ao encontrar o produto:', error);
        throw new Error('Erro ao encontrar o produto.');
    } finally {
        if (client) {
            client.release();
        };
    }
}

const getAllProduct = async () => {
    const query = 'SELECT * FROM product ORDER BY created_at ASC';
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar os produtos:', error);
        throw new Error('Erro ao encontrar os produtos');
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getProductByName = async (name) => {
    let client;
    const query = 'SELECT * FROM product WHERE LOWER(name) LIKE LOWER($1)';
    try {
        client = await pool.connect();
        const result = await client.query(query, [`%${name.toLowerCase()}%`]);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar o produto:', error);
        throw new Error('Erro ao encontrar o produto.');
    } finally {
        if (client) {
            client.release();
        }
    }
}

const updateProduct = async (id, name, value, url_img, stock, type_id, description) => {
    let client;
    const query = 'UPDATE product SET name = $1, value = $2, url_img = $3, stock = $4, type_id = $5, description = $6 WHERE id = $7';
    try {
        client = await pool.connect();
        await client.query(query, [name, value, url_img, stock, type_id, description, id]);
        console.log('Dados atualizados com sucesso');
    } catch (error) {
        console.log('Erro ao atualizar dados:', error);
        throw new Error('Erro ao atualizar o produto');
    } finally {
        if (client) {
            client.release();
        }
    }
}

const updateDeletedStatus = async (id) => {
    let client;
    const query = 'UPDATE product SET deleted = true WHERE id = $1';
    try{
        await client.query(query, [id]);
        console.log('Produto deletado com sucesso');
    } catch (error){
        console.log('Erro ao deletar dados:', error);
        throw new Error ('Erro ao deletar o produto');
    } finally {
        if (client) {
            client.release();
        }
    }
}

const deleteProduct = async (id) => {
    let client;
    const query = 'DELETE FROM product WHERE id = $1';
    try {
        client = await pool.connect();
        await client.query(query, [id]);
        console.log('Dados deletados com sucesso');
    } catch (error) {
        console.log('Erro ao deletar dados:', error);
        throw new Error('Erro ao deletar o produto');
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getProductByInterval = async (min, max) => {
    const query = 'SELECT * FROM product WHERE deleted <> true ORDER BY created_at ASC LIMIT $1 OFFSET $2';
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, [max - min + 1, min - 1]);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar os produtos por intervalo:', error);
        throw new Error('Erro ao encontrar os produtos por intervalo');
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getProductByIntervalAndType = async (min, max, type) => {
    const query = 'SELECT * FROM product WHERE type_id = $1 and deleted <> true ORDER BY created_at ASC LIMIT $2 OFFSET $3';
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, [type, max - min + 1, min - 1]);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar os produtos por intervalo e tipo:', error);
        throw new Error('Erro ao encontrar os produtos por intervalo e tipo');
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getProductByIntervalAndSearch = async (min, max, search) => {
    const query = 'SELECT * FROM product WHERE LOWER(name) LIKE LOWER($1) and deleted <> true ORDER BY created_at ASC LIMIT $2 OFFSET $3';
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, [`%${search.toLowerCase()}%`, max - min + 1, min - 1]);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar os produtos por intervalo e termo de pesquisa:', error);
        throw new Error('Erro ao encontrar os produtos por intervalo e termo de pesquisa');
    } finally {
        if (client) {
            client.release();
        }
    }
}



module.exports = {
    insertNewProduct,
    getAllProduct,
    getProduct,
    getProductByName,
    updateProduct,
    deleteProduct,
    updateDeletedStatus,
    getProductByInterval,
    getProductByIntervalAndType,
    getProductByIntervalAndSearch
};

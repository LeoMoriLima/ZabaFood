const { connectToDatabase } = require('../db/postgresql');

const getCartProductByID = async (id) => {
    const client = await connectToDatabase();
    const query = 'SELECT * FROM cart_product WHERE id = $1';
    try {
        const result = await client.query(query, [id]);
        return result.rows;
    } catch (error) {
        console.log('Erro ao buscar itens:', error);
        throw error;
    } finally {
        client.end();
    }
}

const getCartProductsByCartId = async (cartId) => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM cart_product WHERE cart_id = $1;";
    try {
        const result = await client.query(query, [cartId]);
        return result.rows;
    } catch (error) {
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const getAllCartProduct = async () => {
    const client = await connectToDatabase();
    const query = 'SELECT * FROM cart_product';
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar os itens:', error);
        throw error;
    } finally {
        client.end();
    }
}

const deleteCartProduct = async (id) => {
    const client = await connectToDatabase();
    const query = 'DELETE FROM cart_product WHERE id = $1';
    try {
        await client.query(query, [id]);
        console.log('Item deletado com sucesso');
    } catch (error) {
        console.log('Erro ao deletar item:', error);
        throw error;
    } finally {
        client.end();
    }
}

const updateCartProduct = async (id, quantity) => {
    const client = await connectToDatabase();
    const query = 'UPDATE cart_product SET quantity = $1, total_item = $2 WHERE id = $3';
    try {
        const cartProduct = await client.query('SELECT * FROM cart_product WHERE id = $1', [id]);
        const total_item = cartProduct.rows[0].price_unity * quantity;
        client.query(query, [quantity, total_item, id]);
        console.log('Dados atualizados com sucesso');
    } catch (error) {
        console.log('Erro ao atualizar dados:', error);
        throw error;
    } finally {
        await client.end();
    }
}

const createNewCartProduct = async (cart_id, product_id, quantity) => {
    const client = await connectToDatabase();
    try {
        await client.query('BEGIN');

        // Busca o valor do produto de acordo com o product_id
        const product = await client.query('SELECT * FROM product WHERE id = $1', [product_id]);
        const productValue = product.rows[0].value;

        // Cria o registro na tabela cart_product
        await client.query(
            'INSERT INTO cart_product (cart_id, product_id, quantity, price_unity, total_item) VALUES ($1, $2, $3, $4, $5)',
            [cart_id, product_id, quantity, productValue, quantity * productValue]
        );

        // Adiciona o valor total do produto ao carrinho do usuário
        await client.query(
            'UPDATE cart SET total = total + $1 WHERE id = $2',
            [quantity * productValue, cart_id]);

        await client.query('COMMIT');

        console.log("Dados inseridos com sucesso");
    } catch (error) {
        await client.query('ROLLBACK');
        console.log('Erro ao inserir dados:', error);
        throw error;
    } finally {
        await client.end();
    }
}

const cartProductTransaction = async (cart_id, product_id, quantity) => {
    const client = await connectToDatabase();
    try {
        await client.query('BEGIN');

        // Verificar se há estoque suficiente
        const product = await client.query('SELECT * FROM product WHERE id = $1', [product_id]);
        const stock = product.rows[0].stock;
        if (stock < quantity) {
            throw new Error('Estoque insuficiente');
        }

        // Atualizar o estoque
        await client.query('UPDATE product SET stock = stock - $1 WHERE id = $2', [quantity, product_id]);

        const price_unity = product.rows[0].value;

        // Adicionar item ao carrinho
        await client.query(
            'INSERT INTO cart_product (cart_id, product_id, quantity, price_unity, total_item) VALUES ($1, $2, $3, $4, $5)',
            [cart_id, product_id, quantity, price_unity, quantity * price_unity]
        );
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = {
    createNewCartProduct,
    getCartProductByID,
    getCartProductsByCartId,
    getAllCartProduct,
    updateCartProduct,
    deleteCartProduct,
    cartProductTransaction
}
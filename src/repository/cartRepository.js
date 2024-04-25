const { connectToDatabase } = require('../db/postgresql');

const getCartById = async (id) => {
    const client = await connectToDatabase();
    const query = 'SELECT * FROM cart WHERE id = $1';
    try {
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Erro ao encontrar o carrinho:', error);
        throw error;
    } finally {
        client.end();
    }
}

const getAllCartByUserID = async (userId) => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM cart WHERE user_id = $1 AND cart.status <> 'pending' ORDER BY created_at DESC;";
    try {
        const result = await client.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const getCartByUserID = async (userId) => {
    const client = await connectToDatabase();
    const query = "SELECT * FROM cart WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1;";
    try {
        const result = await client.query(query, [userId]);
        return result.rows[0];
    } catch (error) {
        console.log("Erro ao selecionar dados:", error);
        throw error;
    } finally {
        client.end();
    }
}

const getAllCarts = async () => {
    const client = await connectToDatabase();
    const query = 'SELECT * FROM cart';
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar os carrinhos', error);
        throw error;
    } finally {
        client.end();
    }
}

const getAllCartsByInterval = async (min, max) => {
    const query = `SELECT cart.*, "users".name FROM cart JOIN "users" ON cart.user_id = "users".id WHERE cart.status <> 'pending' ORDER BY cart.created_at DESC LIMIT $1 OFFSET $2;
    `;
    const client = await connectToDatabase();
    try {
        const result = await client.query(query, [max - min + 1, min - 1]);
        return result.rows;
    } catch (error) {
        console.log('Erro ao encontrar os carrinhos por intervalo:', error);
        throw new Error('Erro ao encontrar os carrinhos por intervalo');
    } finally {
        client.end();
    }
}

const createNewCart = async (user_id) => {
    const client = await connectToDatabase();
    const query = 'INSERT INTO cart (user_id, total) VALUES ($1, 0)';
    try {
        await client.query(query, [user_id]);
        console.log('Carrinho criado com sucesso');
    } catch (error) {
        console.log('Erro ao criar carrinho:', error);
        throw error;
    } finally {
        client.end();
    }
}

const updateCartStatus = async (status, id) => {
    const client = await connectToDatabase();
    const query = 'UPDATE cart SET status = $1 WHERE id = $2';
    try {
        await client.query(query, [status, id]);
        console.log('Status do carrinho atualizado com sucesso!');
    } catch (error) {
        console.log('Erro ao atualizar status do carrinho:', error);
        throw error;
    } finally {
        client.end();
    }
}

const updateCartApproved = async (id) => {
    const client = await connectToDatabase();
    try {
        await client.query('BEGIN');

        const updatedCart = await client.query("UPDATE cart SET approved_at = NOW(), updated_at = NOW() WHERE id = $1 RETURNING *", [id])

        const cartProducts = await client.query('SELECT * FROM cart_product WHERE cart_id = $1', [id]);

        for (const cartProduct of cartProducts.rows) {

            const productId = cartProduct.product_id;
            const quantity = cartProduct.quantity;

            const product = await client.query('SELECT * FROM product WHERE id = $1', [productId]);
            const stock = product.rows[0].stock;
            if (stock < quantity) {
                throw new Error(`Estoque de ${product.name} insuficiente`);
            }


            const updatedProduct = await client.query('UPDATE product SET stock = stock - $1 WHERE id = $2 RETURNING *', [quantity, productId]);

        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.end();
    }
}

const updateCartSended = async (id) => {
    const client = await connectToDatabase();
    const query = 'UPDATE cart SET sended_at = NOW(), updated_at = NOW() WHERE id = $1';
    try {
        await client.query(query, [id]);
        console.log('Status do pedido atualizado com sucesso!');
    } catch (error) {
        console.log('Erro ao atualizar status do carrinho:', error);
        throw error;
    } finally {
        client.end();
    }
}

const updateCartDelivered = async (id) => {
    const client = await connectToDatabase();
    const query = 'UPDATE cart SET delivered_at = NOW(), updated_at = NOW() WHERE id = $1';
    try {
        await client.query(query, [id]);
        console.log('Status do pedido atualizado com sucesso!');
    } catch (error) {
        console.log('Erro ao atualizar status do carrinho:', error);
        throw error;
    } finally {
        client.end();
    }
}


module.exports = {
    getCartById,
    getAllCartByUserID,
    getCartByUserID,
    getAllCarts,
    getAllCartsByInterval,
    createNewCart,
    updateCartStatus,
    updateCartApproved,
    updateCartSended,
    updateCartDelivered,
}
const { connectToDatabase } = require('../db/postgresql');

const discount = 0.92;

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

const deleteCartProduct = async (id, cartId, totalProductValue) => {
    const client = await connectToDatabase();

    try {
        await client.query('BEGIN');

        // Remove o cart_product da tabela de produtos do carrinho
        await client.query('DELETE FROM cart_product WHERE id = $1', [id]);
        console.log('Item deletado com sucesso');

        // Atualiza o valor total do carrinho de compras
        await client.query('UPDATE cart SET total = total - $1 WHERE id = $2', [totalProductValue, cartId]);

        await client.query('COMMIT');
        console.log("Carrinho atualizado com sucesso");
    } catch (error) {
        await client.query('ROLLBACK');
        console.log('Erro ao deletar item:', error);
        throw error;
    } finally {
        client.end();
    }
}

const updateCartProduct = async (id, cartId, quantity) => {
    const client = await connectToDatabase();

    try {
        await client.query('BEGIN');

        // Seleciona o produto do carrinho de acordo com o id de cart_product
        const cartProduct = await client.query('SELECT * FROM cart_product WHERE id = $1', [id]);

        const oldTotalItem = cartProduct.rows[0].total_item;

        // Retira o valor total do produto do carrinho
        await client.query('UPDATE cart SET total = total - $1 WHERE id = $2', [oldTotalItem, cartId]);

        // Calcula o novo valor total do produto de acordo com a quantidade do mesmo
        const productTotalValue = quantity >= 3 ? cartProduct.rows[0].price_unity * quantity * discount : cartProduct.rows[0].price_unity * quantity;

        // Atualiza o valor total do produto na tabela de cart_product
        await client.query('UPDATE cart_product SET quantity = $1, total_item = $2 WHERE id = $3', [quantity, productTotalValue, id]);

        // Atualiza o carrinho com o novo total do produto
        await client.query('UPDATE cart SET total = total + $1 WHERE id = $2', [productTotalValue, cartId]);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
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

        const totalItem = quantity > 2 ? product.rows[0].value * quantity * discount : product.rows[0].value * quantity;

        // Cria o registro na tabela cart_product
        await client.query(
            'INSERT INTO cart_product (cart_id, product_id, quantity, price_unity, total_item) VALUES ($1, $2, $3, $4, $5)',
            [cart_id, product_id, quantity, productValue, totalItem]
        );

        // Adiciona o valor total do produto ao carrinho do usuário
        await client.query(
            'UPDATE cart SET total = total + $1 WHERE id = $2',
            [totalItem, cart_id]);

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

module.exports = {
    createNewCartProduct,
    getCartProductByID,
    getCartProductsByCartId,
    getAllCartProduct,
    updateCartProduct,
    deleteCartProduct
}
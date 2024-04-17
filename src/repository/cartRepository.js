const { connectToDatabase } = require('../db/postgresql');

async function getCartById(id){
    const client = await connectToDatabase();
    const query = 'SELECT * FROM cart WHERE id = $1';
    try{
        const result = await client.query(query, [id]);
        return result.rows[0];
    } catch(error){
        console.log('Erro ao encontrar o carrinho:', error);
        throw error;
    } finally{
        client.end();
    }
}

async function getCartByUserID(userId) {
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

async function getAllCarts(){
    const client = await connectToDatabase();
    const query = 'SELECT * FROM cart';
    try{
        const result = await client.query(query);
        return result.rows;
    } catch (error){
        console.log('Erro ao encontrar os carrinhos', error);
        throw error;
    } finally {
        client.end();
    }
}

async function createNewCart(user_id){
    const client = await connectToDatabase();
    const query = 'INSERT INTO cart (user_id, total) VALUES ($1, 0)';
    try{
        await client.query(query,[user_id]);
        console.log('Carrinho criado com sucesso');
    } catch(error){
        console.log('Erro ao criar carrinho:', error);
        throw error;
    } finally{
        client.end();
    }
}

async function updateCartStatus(status, id){
    const client = await connectToDatabase();
    const query = 'UPDATE cart SET status = $1 WHERE id = $2';
    try{
        await client.query(query, [status, id]);
        console.log('Status do carrinho atualizado com sucesso!');
    } catch(error){
        console.log('Erro ao atualizar status do carrinho:', error);
        throw error;
    } finally{
        client.end();
    }
}

async function updateCartApproved(id){
    const client = await connectToDatabase();
    const query = 'UPDATE cart SET approved_at = NOW(), updated_at = NOW() WHERE id = $1';
    try{
        await client.query(query, [id]);
        console.log('Status do pedido atualizado com sucesso!');
    } catch(error){
        console.log('Erro ao atualizar status do carrinho:', error);
        throw error;
    } finally{
        client.end();
    }
}

async function updateCartSended(id){
    const client = await connectToDatabase();
    const query = 'UPDATE cart SET sended_at = NOW(), updated_at = NOW() WHERE id = $1';
    try{
        await client.query(query, [id]);
        console.log('Status do pedido atualizado com sucesso!');
    } catch(error){
        console.log('Erro ao atualizar status do carrinho:', error);
        throw error;
    } finally{
        client.end();
    }
}

async function updateCartDelivered(id){
    const client = await connectToDatabase();
    const query = 'UPDATE cart SET delivered_at = NOW(), updated_at = NOW() WHERE id = $1';
    try{
        await client.query(query, [id]);
        console.log('Status do pedido atualizado com sucesso!');
    } catch(error){
        console.log('Erro ao atualizar status do carrinho:', error);
        throw error;
    } finally{
        client.end();
    }
}


module.exports = {
    getCartById,
    getCartByUserID,
    getAllCarts,
    createNewCart,
    updateCartStatus,
    updateCartApproved,
    updateCartSended,
    updateCartDelivered,
}
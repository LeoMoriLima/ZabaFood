const cartServices = require('../services/cartServices');

const getCart = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const cart = await cartServices.getCart(id);
        return res.status(200).json(cart);
    } catch {
        return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

const getCartByUserID = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await cartServices.getCartByUserID(userId);
        return res.status(200).json(cart);
    } catch (error){
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const getAllCarts = async (req, res) => {
    try {
        const carts = await cartServices.getAllCarts();
        return res.status(200).json(carts);
    } catch {
        return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

const createCart = async (req, res) => {
    try {
        const { user_id } = req.body;
        const cart = await cartServices.createCart(user_id);
        return res.status(200).json({ success: true, message: 'Carrinho criado com sucesso!'});
    } catch {
        return res.status(500).json({ error: 'Erro ao inserir dados' });
    }
}

const updateCartStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (status === "approved") {
            cartServices.updateCartApproved(id);
        }else if (status === "sended") {
            cartServices.updateCartSended(id)
        } else if (status === "delivered") {
            cartServices.updateCartDelivered(id);
        } else{
            throw new Error("Status invalido");
        }
        const cart = await cartServices.updateCartStatus(status, id);
        return res.status(200).json({ success: true, message: 'Status do carrinho atualizado com sucesso!'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCart,
    getCartByUserID,
    getAllCarts,
    createCart,
    updateCartStatus,
}
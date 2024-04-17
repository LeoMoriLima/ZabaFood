const cartProductServices = require("../services/cartProductServices.js");

const getCartProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const cartProduct = await cartProductServices.getCartProduct(id);
        return res.status(200).json(cartProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getCartProductsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartProducts = await cartProductServices.getCartProductsByUserId(userId);
        return res.status(200).json(cartProducts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllCartProduct = async (req, res) => {
    try {
        const cartProduct = await cartProductServices.getAllCartProduct();
        return res.status(200).json(cartProduct);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const createCartProduct = async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    try {
        await cartProductServices.createCartProduct(cart_id, product_id, quantity);
        return res.status(200).json({ message: "Novo produto adicionado" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar produto" });
    }
}

const updateCartProduct = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        await cartProductServices.updateCartProduct(id, quantity);
        return res.status(200).json({ message: "Item atualizado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteCartProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const cartProduct = await cartProductServices.deleteCartProduct(id);
        return res.status(200).json(cartProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const testCartProductTransaction = async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    try {
        await cartProductServices.testCartProductTransaction(cart_id, product_id, quantity);
        return res.status(200).json({ message: "Transação feita com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCartProduct,
    getCartProductsByUserId,
    getAllCartProduct,
    createCartProduct,
    updateCartProduct,
    deleteCartProduct,
    testCartProductTransaction
}
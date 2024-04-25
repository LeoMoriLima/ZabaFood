const cartProductServices = require("../services/cartProductServices.js");
const { isUUID, isInt } = require('validator');

const getCartProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" });
        };

        const cartProduct = await cartProductServices.getCartProduct(id);
        return res.status(200).json(cartProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getCartByCartId = async (req, res) =>{
    const { cartId } = req.params;

    try{
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if(!isUUID(cartId)){
            return res.status(400).json({ error: "UserID inválido!" });
        };

        const cartProducts = await cartProductServices.getCartByCartId(cartId);
        return res.status(200).json(cartProducts);
    } catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const getCartProductsByUserId = async (req, res) => {
    const userId = req.user.id;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if(!isUUID(userId)){
            return res.status(400).json({ error: "UserID inválido!" });
        };

        const cartProducts = await cartProductServices.getCartProductsByUserId(userId);
        return res.status(200).json(cartProducts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllCartProduct = async (req, res) => {
    try {
        const admin = req.user.user_type.includes("admin");
		if(!admin) {
			return res.status(403).json({error: "Usuário sem permissão"});
		};

        const cartProduct = await cartProductServices.getAllCartProduct();
        return res.status(200).json(cartProduct);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const createCartProduct = async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if(!isUUID(cart_id)){
            return res.status(400).json({ error: "CartID inválido!" });
        };

        if(!isUUID(product_id)){
            return res.status(400).json({ error: "ProductID inválido!" });
        };

        if(!isInt(String(quantity))){
            return res.status(400).json({ error: "O quantidade deve ser um número!" });
        };

        await cartProductServices.createCartProduct(cart_id, product_id, quantity);
        return res.status(201).json({ message: "Novo produto adicionado" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar produto" });
    }
}

const updateCartProduct = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" });
        };

        if(!isInt(String(quantity))){
            return res.status(400).json({ error: "O quantidade deve ser um número!" });
        };

        await cartProductServices.updateCartProduct(id, quantity);
        return res.status(200).json({ message: "Item atualizado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteCartProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" });
        };

        const cartProduct = await cartProductServices.deleteCartProduct(id);
        return res.status(200).json(cartProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const testCartProductTransaction = async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if(!isUUID(cart_id)){
            return res.status(400).json({ error: "CartID inválido!" });
        };

        if(!isUUID(product_id)){
            return res.status(400).json({ error: "ProductID inválido!" });
        };

        if(!isInt(String(quantity))){
            return res.status(400).json({ error: "O quantidade deve ser um número!" });
        };

        await cartProductServices.testCartProductTransaction(cart_id, product_id, quantity);
        return res.status(200).json({ message: "Transação feita com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCartProduct,
    getCartProductsByUserId,
    getCartByCartId,
    getAllCartProduct,
    createCartProduct,
    updateCartProduct,
    deleteCartProduct,
    testCartProductTransaction
}
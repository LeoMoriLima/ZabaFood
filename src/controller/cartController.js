const cartServices = require('../services/cartServices');
const { isUUID } = require('validator');

const getCart = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = req.user.user_type.includes("admin");
		if(!admin) {
			return res.status(403).json({error: "Usuário sem permissão"});
		};

        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" });
        };

        const cart = await cartServices.getCart(id);
        return res.status(200).json(cart);
    } catch {
        return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

const getAllCartByUserID = async (req, res) =>{
    const userId = req.user.id
    try{        
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if(!isUUID(userId)){
            return res.status(400).json({ error: "ID inválido!" });
        };

        const cart = await cartServices.getAllCartByUserID(userId);
        return res.status(200).json(cart);
    } catch (error){
        return res.status(500).json({ error: "Erro ao buscar os dados" });
    };
}

const getCartByUserID = async (req, res) => {
    const { userId } = req.params;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        }

        if(!isUUID(userId)){
            return res.status(400).json({ error: "ID inválido!" });
        };

        const cart = await cartServices.getCartByUserID(userId);
        return res.status(200).json(cart);
    } catch (error){
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const getAllCarts = async (req, res) => {
    try {
        const admin = req.user.user_type.includes("admin");
		if(!admin) {
			return res.status(403).json({error: "Usuário sem permissão"});
		}
        const carts = await cartServices.getAllCarts();
        return res.status(200).json(carts);
    } catch {
        return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

const createCart = async (req, res) => {
    const { user_id } = req.body;

    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        }

        if(!isUUID(user_id)){
            return res.status(400).json({ error: "UserID inválido!" })
        }

        const cart = await cartServices.createCart(user_id);
        return res.status(201).json({ success: true, message: 'Carrinho criado com sucesso!'});
    } catch {
        return res.status(500).json({ error: 'Erro ao inserir dados' });
    }
}

const updateCartStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" })
        }

        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        }

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
    getAllCartByUserID,
    getCartByUserID,
    getAllCarts,
    createCart,
    updateCartStatus,
}
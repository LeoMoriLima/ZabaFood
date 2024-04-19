const cartRepository = require('../repository/cartRepository');

const getCart = async (id) => {
    try {
        const cart = await cartRepository.getCartById(id);
        if(!cart){
            throw new Error("Carrinho não encontrado");
        }
        return cart;
    } catch (error) {
        throw error;
    }
}

const getAllCartByUserID = async (userId) => {
    try{
        const cart = await cartRepository.getAllCartByUserID(userId);
        if(!cart){
            throw new Error("Carrinho não encontrado");
        }
        return cart;
    } catch (error){
        throw error;
    }
}

const getCartByUserID = async (userId) => {
	try {
        const cart = await cartRepository.getCartByUserID(userId);
        if(!cart){
            throw new Error("Carrinho não encontrado");
        }
        return cart;
	} catch (error) {
        throw error;
	}
}

const getAllCarts = async () => {
    try {
        const carts = await cartRepository.getAllCarts();
        return carts;
    } catch (error) {
        throw error;
    }
}

const createCart = async (user_id) => {
    try {
        const cart = await cartRepository.createNewCart(user_id);
        return cart;
    } catch (error) {
        throw error;
    }
}

const updateCartStatus = async (status, id) => {
    try {
        const cart = await cartRepository.getCartById(id);
        if(!cart){
            throw new Error("Carrinho não encontrado.");
        }
        await cartRepository.updateCartStatus(status, id);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateCartApproved = async (id) => {
    try {
        const cart = await cartRepository.updateCartApproved(id);
        return cart;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateCartSended = async (id) => {
    try {
        const cart = await cartRepository.updateCartSended(id);
        return cart;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateCartDelivered = async (id) => {
    try {
        const cart = await cartRepository.updateCartDelivered(id);
        return cart;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


module.exports = {
    getCart,
    getAllCartByUserID,
    getCartByUserID,
    getAllCarts,
    createCart,
    updateCartStatus,
    updateCartApproved,
    updateCartDelivered,
    updateCartSended,
}
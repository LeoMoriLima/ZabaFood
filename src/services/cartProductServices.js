const cartProductRepository = require('../repository/cartProductRepository');

const getAllCartProduct = async () => {
    try {
        const cartProducts = await cartProductRepository.getAllCartProduct();
        return cartProducts;
    } catch (error) {
        throw error;
    }
}

const getCartProduct = async (id) => {
    try {
        const cartProduct = await cartProductRepository.getCartProductByID(id);
        if (!cartProduct.length) {
            throw new Error("Item não encontrado");
        }
        return cartProduct;
    } catch (error) {
        throw error;
    }
}

const createCartProduct = async (cart_id, product_id, quantity) => {
    try {
        const result = await cartProductRepository.createNewCartProduct(cart_id, product_id, quantity);
        return result;
    } catch (error) {
        throw error;
    }
}

const updateCartProduct = async (id, quantity) => {
    try {
        const cartProduct = await cartProductRepository.getCartProductByID(id);
        if (!cartProduct) {
            throw new Error("Item não encontrado");
        }
        await cartProductRepository.updateCartProduct(id, quantity);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteCartProduct = async (id) => {
    try {
        const cartProduct = await cartProductRepository.getCartProductByID(id);
        if (!cartProduct) {
            throw new Error("Item não encontrado");
        }
        await cartProductRepository.deleteCartProduct(id);
        return { success: true };
    } catch (error) {
        throw error;
    }
}

const testCartProductTransaction = async (cart_id, product_id, quantity) => {
    try {
        await cartProductRepository.cartProductTransaction(cart_id, product_id, quantity);
        return { success: true };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCartProduct,
    getCartProduct,
    createCartProduct,
    updateCartProduct,
    deleteCartProduct,
    testCartProductTransaction
}
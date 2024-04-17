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

const getCartProductsByUserId = async (userId) => {
    try {
        const cart = await cartRepository.getCartByUserID(userId);
        const cartId = cart.id;
        if (!cartId) {
            throw new Error("Carrinho não encontrado");
        }
        const cartProducts = await cartProductRepository.getCartProductsByCartId(cartId);
        const cartProductInfos = await Promise.all(cartProducts.map(async (cartProduct) =>{
            const productInfo = await productRepository.getProduct(cartProduct.product_id);
            return {product: productInfo, quantity: cartProduct.quantity };
        }));
        return cartProductInfos;
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
    getCartProductsByUserId,
    createCartProduct,
    updateCartProduct,
    deleteCartProduct,
    testCartProductTransaction
}
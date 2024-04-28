const cartProductRepository = require("../repository/cartProductRepository");
const cartRepository = require("../repository/cartRepository");
const productRepository = require("../repository/productRepository");

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
        const cartProductInfos = await Promise.all(cartProducts.map(async (cartProduct) => {
            const productInfo = await productRepository.getProduct(cartProduct.product_id);
            return { cartProductId: cartProduct.id, product: productInfo, quantity: cartProduct.quantity };
        }));
        return cartProductInfos;
    } catch (error) {
        throw error;
    }
}

const getAllCartProduct = async () => {
    try {
        const cartProducts = await cartProductRepository.getAllCartProduct();
        return cartProducts;
    } catch (error) {
        throw error;
    }
}

const getCartByCartId = async (cartId) => {
    try {
        const cart = await cartProductRepository.getCartProductsByCartId(cartId);
        return cart;
    } catch (error) {
        throw error;
    }
}

const createCartProduct = async (cart_id, product_id, quantity) => {
    try {
        const cartProducts = await cartProductRepository.getCartProductsByCartId(cart_id);
        const foundProduct = cartProducts.find(product => product.product_id === product_id);

        if (foundProduct) {
            const cartProductId = foundProduct.id;
            const newQuantity = quantity + foundProduct.quantity;
            const result = await cartProductRepository.updateCartProduct(cartProductId, cart_id, newQuantity, quantity, "add");

            return result;
        } else {
            const result = await cartProductRepository.createNewCartProduct(cart_id, product_id, quantity);
            return result;
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateCartProduct = async (id, quantity) => {
    try {
        const cartProduct = await cartProductRepository.getCartProductByID(id);
        if (!cartProduct) {
            throw new Error("Item não encontrado");
        }
        const cartId = cartProduct[0].cart_id;

        await cartProductRepository.updateCartProduct(id, cartId, quantity);

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
        const cartId = cartProduct[0].cart_id;
        const totalProductValue = parseFloat(cartProduct[0].total_item);

        if (!cartProduct) {
            throw new Error("Item não encontrado");
        }
        await cartProductRepository.deleteCartProduct(id, cartId, totalProductValue);
        return { success: true };
    } catch (error) {
        throw error;
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
}
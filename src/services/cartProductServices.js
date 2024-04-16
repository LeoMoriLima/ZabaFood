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
        if(!cartId){
            throw new Error("Carrinho não encontrado");
        }

        const cartProducts = await cartProductRepository.getCartProductsByCartId(cartId);
        const cartProductsId = cartProducts.map(product => product.product_id);

        const productsInfo = await Promise.all(cartProductsId.map(async (productId) => {
            const infos = await productRepository.getProduct(productId);
            return infos;
        }));

        return productsInfo;
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
    getCartProduct,
    getCartProductsByUserId,
    getAllCartProduct,
    createCartProduct,
    updateCartProduct,
    deleteCartProduct,
    testCartProductTransaction
}
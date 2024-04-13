const productRepository = require('../repository/productRepository');

const getAllProduct = async () => {
    try {
        const products = await productRepository.getAllProduct();
        return products;
    } catch (error) {
        throw error;
    }
}

const getProduct = async (id) => {
    try {
        const product = await productRepository.getProduct(id);
        if (!product) {
            throw new Error("Produto não encontrado")
        }
        return product;
    } catch (error) {
        throw error;
    }
}

const getProductByName = async (name) =>{
    try {
        const products = await productRepository.getProductByName(name); 
        if (!products.length) {
            throw new Error("Produto não encontrado")
        }
        return products;
    } catch (error) {
        throw error;
    }
}

const createProduct = async (producer_id, name, value, url_img, stock, type_id, description) => {
    try {
        const result = await productRepository.insertNewProduct(producer_id, name, value, url_img, stock, type_id, description);
        return result;
    } catch (error) {
        console.log("Deu erro no service");
        throw error;
    }
}

const updateProduct = async (id, name, value, url_img, stock, type_id, description) => {
    try {
        const product = await productRepository.getProduct(id);
        if (!product) {
            throw new Error("Produto não encontrado")
        }
        await productRepository.updateProduct(id, name, value, url_img, stock, type_id, description);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const product = await productRepository.getProduct(id);
        if (!product) {
            throw new Error("Produto não encontrado")
        }
        await productRepository.deleteProduct(id);
        return { success: true };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProduct,
    getProduct,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct,
}
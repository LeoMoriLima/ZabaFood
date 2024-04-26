// productTypeServices.js
const productTypeRepository = require("../repository/productTypeRepository.js");

const getAllProductType = async () => {
    try {
        const productTypes = await productTypeRepository.getAllProductType();
        return productTypes;
    } catch (error) {
        throw error;
    }
}

const getProductType = async (id) => {
    try {
        const productType = await productTypeRepository.getProductType(id);
        if (!productType) {
            throw new Error("Tipo de produto não encontrado")
        }
        return productType;
    } catch (error) {
        throw error;
    }
}

const getProductTypeByType = async (type) => {
    try {
        const productType = await productTypeRepository.getProductTypeByType(type);
        if (!productType) {
            throw new Error("Tipo de produto não encontrado")
        }
        return productType;
    } catch (error) {
        throw error;
    }
}

const createProductType = async (type, url_img) => {
    try {
        const productTypeExists = await productTypeRepository.getProductTypeByType(type);
        if (productTypeExists) {
            throw new Error("Esse tipo de produto já existe.");
        }
        const productType = await productTypeRepository.createProductType(type, url_img);
        return productType;
    } catch (error) {
        throw error;
    }
}

const updateProductType = async (id, type, url_img) => {
    try {
        const productType = await productTypeRepository.getProductType(id);
        if (!productType) {
            throw new Error("Tipo de produto não encontrado");
        }
        const productTypeExists = await productTypeRepository.getProductTypeByType(type);
        if (productTypeExists && productTypeExists.id !== id) {
            throw new Error("Esse tipo de produto já existe.");
        }
        await productTypeRepository.updateProductType(id, type, url_img);
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const deleteProductType = async (id) => {
    try {
        const productType = await productTypeRepository.getProductType(id);
        if (!productType) {
            throw new Error("Tipo de produto não encontrado");
        }
        await productTypeRepository.deleteProductType(id);
        return { success: true };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProductType,
    getProductType,
    getProductTypeByType,
    createProductType,
    updateProductType,
    deleteProductType,
}
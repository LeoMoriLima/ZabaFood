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

const createProductType = async (type) => {
    try {
        const productType = await productTypeRepository.createProductType(type);
        return productType;
    } catch (error) {
        throw error;
    }
}

const updateProductType = async (id, type) => {
    try {
        const productType = await productTypeRepository.getProductType(id);
		if (!productType) {
			throw new Error("Tipo de produto não encontrado");
		}
		await productTypeRepository.updateProductType(id, type);
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
    createProductType,
    updateProductType,
    deleteProductType,
}
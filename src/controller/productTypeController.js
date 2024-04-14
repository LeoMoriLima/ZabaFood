//productTypeController.js
const productTypeService = require("../services/productTypeService.js");

const getAllProductTypes = async (req, res) => {
    try {
        const productTypes = await productTypeService.getAllProductType();
        return res.status(200).json(productTypes);
    } catch {
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const getProductType = async (req, res) => {
    const { id } = req.params;
    try {
        const productType = await productTypeService.getProductType(id);
        return res.status(200).json(productType);
    } catch {
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const createProductType = async (req, res) => {
	try {
		const { type } = req.body;
        const newProductType = await productTypeService.createProductType(type);
        return res.status(200).json({ message: 'Novo tipo de produto adicionado com sucesso', product: newProductType });
    } catch {
        return res.status(500).json({ error: "Erro ao inserir dados" });
    }
}

const updateProductType = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    try {
        const updatedProductType = await productTypeService.updateProductType(id , type);
        return res.status(200).json({ message: 'Tipo de roduto atualizado com sucesso', product: updatedProductType });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao atualizar dados" });
    }
};


const deleteProductType = async (req, res) => {
    const { id } = req.params;
    try {
        await productTypeService.deleteProductType(id);
        return res.status(200).json({ success: true });
    } catch {
        return res.status(500).json({ error: "Erro ao deletar dados" });
    }
}

module.exports = {
    getAllProductTypes,
    getProductType,
    createProductType,
	updateProductType,
	deleteProductType,
}
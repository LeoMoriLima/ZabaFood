//productTypeController.js
const productTypeService = require("../services/productTypeService.js");
const { isUUID, isEmpty } = require('validator');

const getAllProductTypes = async (req, res) => {
    try {
        const productTypes = await productTypeService.getAllProductType();
        return res.status(200).json(productTypes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const getProductType = async (req, res) => {
    const { id } = req.params;
    try {
        if (!isUUID(id)) {
            return res.status(400).json({ error: "ID inválido!" });
        };

        const productType = await productTypeService.getProductType(id);
        return res.status(200).json(productType);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const createProductType = async (req, res) => {
    const { type } = req.body;
    try {
        const admin = req.user.user_type.includes("admin");
        if (!admin) {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (isEmpty(type)) {
            return res.status(400).json({ error: "O tipo de produto é obrigatório!" });
        };

        const newProductType = await productTypeService.createProductType(type);
        return res.status(201).json({ message: 'Novo tipo de produto adicionado com sucesso', product: newProductType });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: `Erro ao inserir dados: ${error.message}` });
    }
}

const updateProductType = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    try {
        const admin = req.user.user_type.includes("admin");
        if (!admin) {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (!isUUID(id)) {
            return res.status(400).json({ error: "ID inválido!" });
        };

        if (isEmpty(type)) {
            return res.status(400).json({ error: "O tipo de produto é obrigatório" });
        };

        const updatedProductType = await productTypeService.updateProductType(id, type);
        return res.status(200).json({ message: 'Tipo de roduto atualizado com sucesso', product: updatedProductType });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: `Erro ao atualizar dados: ${error.message}` });
    }
};


const deleteProductType = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = req.user.user_type.includes("admin");
        if (!admin) {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (!isUUID(id)) {
            return res.status(400).json({ error: "ID inválido!" });
        };

        await productTypeService.deleteProductType(id);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
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
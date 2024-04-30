const productServices = require('../services/productServices');
const { isUUID, isInt, isEmpty } = require('validator');

const getAllproduct = async (req, res) => {
    try {
        const product = await productServices.getAllProduct();
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if (!isUUID(id)) {
            return res.status(400).json({ error: 'ID inválido!' });
        };

        const product = await productServices.getProduct(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getProductByName = async (req, res) => {
    const { name } = req.params
    try {
        if (typeof name !== 'string') {
            return res.status(400).json({ error: "O nome do produto deve ser uma string!" });
        };

        const products = await productServices.getProductByName(name);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createProduct = async (req, res) => {
    const { name, value, url_img, stock, type_id, description } = req.body;
    try {
        const admin = req.user.user_type.includes("admin");
        if (!admin) {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (typeof name !== 'string') {
            return res.status(400).json({ error: "O nome do produto deve ser uma string!" });
        };

        if (isNaN(value)) {
            return res.status(400).json({ error: "Valor inválido!" })
        };

        if (isEmpty(url_img)) {
            return res.status(400).json({ error: "O URL da imagem é obrigatório!" })
        }

        if (isNaN(stock)) {
            return res.status(400).json({ error: "Estoque inválido!" })
        };

        if (!isUUID(type_id)) {
            return res.status(400).json({ error: "TypeID inválido!" })
        };

        if (isEmpty(description)) {
            return res.status(400).json({ error: "A descrição é obrigatória" })
        }

        const newProduct = await productServices.createProduct(name, value, url_img, stock, type_id, description);
        return res.status(201).json({ message: 'Novo produto adicionado', product: newProduct });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar produto' });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, value, url_img, stock, type_id, description } = req.body;
    try {
        const admin = req.user.user_type.includes("admin");
        if (!admin) {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (!isUUID(id)) {
            return res.status(400).json({ error: "ID inválido!" })
        }

        if (typeof name !== 'string') {
            return res.status(400).json({ error: "O nome do produto deve ser uma string!" });
        };

        if (isNaN(value)) {
            return res.status(400).json({ error: "Valor inválido!" })
        };

        if (isEmpty(url_img)) {
            return res.status(400).json({ error: "O URL da imagem é obrigatório!" })
        }


        if (isNaN(stock)) {
            return res.status(400).json({ error: "Estoque inválido!" })
        };

        if (!isUUID(type_id)) {
            return res.status(400).json({ error: "TypeID inválido!" })
        };

        if (isEmpty(description)) {
            return res.status(400).json({ error: "A descrição é obrigatória" })
        }

        const updatedProduct = await productServices.updateProduct(id, name, value, url_img, stock, type_id, description);
        return res.status(200).json({ message: 'Produto atualizado com sucesso', product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateDeletedStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = req.user.user_type.includes("admin");
        if (!admin) {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (!isUUID(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const product = await productServices.updateDeletedStatus(id);
        return res.status(200).json({ message: "Produto excluído com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = req.user.user_type.includes("admin");
        if (!admin) {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (!isUUID(id)) {
            return res.status(400).json({ error: "ID inválido!" })
        }

        const product = await productServices.deleteProduct(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getProductByInterval = async (req, res) => {
    const { min, max, type, search } = req.query;
    try {
        if (!isInt(String(min))) {
            return res.status(400).json({ error: "O mínimo deve ser um número!" })
        }

        if (!isInt(String(max))) {
            return res.status(400).json({ error: "O máximo deve ser um número!" })
        }

        if (type) {
            const products = await productServices.getProductByIntervalAndType(min, max, type);
            return res.status(200).json(products);
        }
        if (search) {
            const products = await productServices.getProductByIntervalAndSearch(min, max, search);
            return res.status(200).json(products);
        }

        const products = await productServices.getProductByInterval(min, max);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProduct,
    getAllproduct,
    getProductByName,
    createProduct,
    updateProduct,
    updateDeletedStatus,
    deleteProduct,
    getProductByInterval
}
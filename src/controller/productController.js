const productServices = require('../services/productServices');

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
        const product = await productServices.getProduct(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getProductByName = async (req, res) => {
    const { name } = req.params
    try {
        const products = await productServices.getProductByName(name);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createProduct = async (req, res) => {
    const { producer_id, name, value, url_img, stock, type_id, description } = req.body;
    try {
        const newProduct = await productServices.createProduct(producer_id, name, value, url_img, stock, type_id, description);
        return res.status(200).json({ message: 'Novo produto adicionado', product: newProduct });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar produto' });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, value, url_img, stock, type_id, description } = req.body;
    try {
        const updatedProduct = await productServices.updateProduct(id, name, value, url_img, stock, type_id, description);
        return res.status(200).json({ message: 'Produto atualizado com sucesso', product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productServices.deleteProduct(id);
        return res.status(200).json(product);
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
    deleteProduct
}
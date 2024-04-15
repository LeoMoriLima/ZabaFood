const addressService = require("../services/addressService.js");

const getAllAddresses = async (req, res) => {
	try {
		const admin = req.user.user_type.includes("admin");
		if(!admin) {
			return res.status(403).json({error: "Usuário sem permissão"});
		}

        const address = await addressService.getAllAddresses();
        return res.status(200).json(address);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const getAddress = async (req, res) => {
    const { id } = req.params;
    try {
		const admin = req.user.user_type.includes("admin");
		if(!admin) {
			return res.status(403).json({error: "Usuário sem permissão"});
		}

        const address = await addressService.getAddress(id);
        return res.status(200).json(address);
    } catch (error){
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const createNewAddress = async (req, res) => {
    const { user_id, postal_code, state, city, street, number, complement } = req.body;
    try {
        const newAddress = await addressService.createNewAddress(user_id, postal_code, state, city, street, number, complement);
        return res.status(200).json({message:"Novo endereço adicionado com sucesso", address: newAddress});
    } catch (error){
        return res.status(500).json({ error: "Erro ao criar endereço" });
    }
}

const updateAddress = async (req, res) => {
    const { postal_code, state, city, street, number, complement } = req.body;
    const { id } = req.params;
    try {
        const updatedAddress = await addressService.updateAddress(id ,postal_code, state, city, street, number, complement);
        return res.status(200).json({message:"Endereço atualizado com sucesso", address: updatedAddress});
    } catch (error){
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const address = await addressService.deleteAddress(id);
        return res.status(200).json(address);
    } catch (error){
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

module.exports = {
	getAddress,
	getAllAddresses,
	createNewAddress,
	updateAddress,
	deleteAddress
}
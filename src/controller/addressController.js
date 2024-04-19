const addressService = require("../services/addressService.js");
const { isUUID, isPostalCode, isInt, isEmpty, isLength } = require('validator');

const getAddress = async (req, res) => {
    const { id } = req.params;

    try {
        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" })
        }

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

const getAddressByUserID = async (req, res) => {
    const { userId } = req.params;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        }

        if(!isUUID(userId)){
            return res.status(400).json({ error: "ID Inválido!" })
        }

        const address = await addressService.getAddressByUserID(userId);
        return res.status(200).json(address);
    } catch (error){
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

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

const createNewAddress = async (req, res) => {
    const user_id = req.user.id
    const {  postal_code, state, city, street, number, complement } = req.body;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        }

        if (!isUUID(user_id)) {
            return res.status(400).json({ error: "O UserID inválido!" });
        }
        
        if (!isPostalCode(postal_code, 'BR')) {
            return res.status(400).json({ error: "O Código postal é inválido!" });
        }
        
        if (!isLength(postal_code, { min: 9, max: 9 })) {
            return res.status(400).json({ error: "O Código postal deve ter 9 caracteres!" });
        }
        
        if (isEmpty(state)) {
            return res.status(400).json({ error: "O estado é obrigatório!" });
        }

        if (!isLength(state, { min:2 , max: 50 })){
            return res.status(400).json({ error: "O estado deve ter entre 2 e 50 caracteres" })
        }
        
        if (isEmpty(city)) {
            return res.status(400).json({ error: "A cidade é obrigatória!" });
        }

        if (!isLength(city, { min:2 , max: 50 })){
            return res.status(400).json({ error: "A cidade deve ter entre 2 e 50 caracteres" })
        }
        
        if (isEmpty(street)) {
            return res.status(400).json({ error: "A rua é obrigatória!" });
        }

        if (!isLength(street, { min:2 , max: 50 })){
            return res.status(400).json({ error: "A rua deve ter entre 2 e 50 caracteres" })
        }
        
        if (!isInt(number)) {
            return res.status(400).json({ error: "O número deve ser inteiro!" });
        }
        
        if (isEmpty(complement)) {
            return res.status(400).json({ error: "O complemento é obrigatório!" });
        }
        const newAddress = await addressService.createNewAddress(user_id, postal_code, state, city, street, number, complement);
        return res.status(201).json({message:"Novo endereço adicionado com sucesso", address: newAddress});
    } catch (error){
        return res.status(500).json({ error: "Erro ao criar endereço" });
    }
}

const updateAddress = async (req, res) => {
    const { postal_code, state, city, street, number, complement } = req.body;
    const id = req.user.id;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        }

        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" })
        }

        if (!isPostalCode(postal_code, 'BR')) {
            return res.status(400).json({ error: "O Código postal inválido!" });
        }
        
        if (!isLength(postal_code, { min: 9, max: 9 })) {
            return res.status(400).json({ error: "O Código postal deve ter 9 caracteres!" });
        }
        
        if (isEmpty(state)) {
            return res.status(400).json({ error: "O estado é obrigatório!" });
        }

        if (!isLength(state, { min:2 , max: 50 })){
            return res.status(400).json({ error: "O estado deve ter entre 2 e 50 caracteres" })
        }
        
        if (isEmpty(city)) {
            return res.status(400).json({ error: "A cidade é obrigatória!" });
        }

        if (!isLength(city, { min:2 , max: 50 })){
            return res.status(400).json({ error: "A cidade deve ter entre 2 e 50 caracteres" })
        }
        
        if (isEmpty(street)) {
            return res.status(400).json({ error: "A rua é obrigatória!" });
        }

        if (!isLength(street, { min:2 , max: 50 })){
            return res.status(400).json({ error: "A rua deve ter entre 2 e 50 caracteres" })
        }
        
        if (!isInt(number)) {
            return res.status(400).json({ error: "O número deve ser inteiro!" });
        }
        
        if (isEmpty(complement)) {
            return res.status(400).json({ error: "O complemento é obrigatório!" });
        }
        const updatedAddress = await addressService.updateAddress(id ,postal_code, state, city, street, number, complement);
        return res.status(200).json({message:"Endereço atualizado com sucesso", address: updatedAddress});
    } catch (error){
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

const deleteAddress = async (req, res) => {
    const id = req.user.id;
    try {
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        }

        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" })
        }
        const address = await addressService.deleteAddress(id);
        return res.status(200).json(address);
    } catch (error){
        return res.status(500).json({ error: "Erro ao buscar dados" });
    }
}

module.exports = {
	getAddress,
    getAddressByUserID,
	getAllAddresses,
	createNewAddress,
	updateAddress,
	deleteAddress
}
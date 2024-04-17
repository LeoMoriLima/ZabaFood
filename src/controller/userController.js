const { isUUID } = require('validator');
const userServices = require('../services/userServices');

const getAllUsers = async (req, res) =>{
    try{
        const admin = req.user.user_type.includes("admin");
		if(!admin) {
			return res.status(403).json({error: "Usuário sem permissão"});
		};

        const users = await userServices.getAllUsers();
        return res.status(200).json(users);
    } catch {
        return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

const getUser = async (req, res) =>{
    const { id } = req.params;
    try{
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        const user = await userServices.getUser(id);
        return res.status(200).json(user);
    } catch{
        return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

const createUser = async (req, res) => {
    try{
        const { username, user_type, name, email, password, cpf_cnpj, phone } = req.body;

        if (!username) {
            throw new Error ( "O username é obrigatório" );
        };

        if (!user_type){
            throw new Error ("O tipo de usuário é obrigatório");
        };

        if (!name) {
            throw new Error ( "O nome é obrigatório" );
        };

        if (!email) {
            throw new Error ( "O e-mail é obrigatório" );
        };

        if (!password) {
            throw new Error ( "A senha é obrigatória" );
        };

        if (!cpf_cnpj) {
            throw new Error ( "O cpf/cnpj é obrigatório" );
        };

        if (!phone) {
            throw new Error ( "O telefone é obrigatório" );
        };

        const user = await userServices.createUser(username, user_type, name, email, password, cpf_cnpj, phone);
        return res.status(200).json({ success: true, message: 'Usuário criado com sucesso', data: user });
    } catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, name, email, password, cpf_cnpj, phone } = req.body;

    try {
        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" })
        }

        if (!username) {
            throw new Error ( "O username é obrigatório" );
        }

        if (!name) {
            throw new Error ( "O nome é obrigatório" );
        }

        if (!email) {
            throw new Error ( "O e-mail é obrigatório" );
        }

        if (!password) {
            throw new Error ( "A senha é obrigatória" );
        }

        if (!cpf_cnpj) {
            throw new Error ( "O cpf/cnpj é obrigatório" );
        }

        if (!phone) {
            throw new Error ( "O telefone é obrigatório" );
        }

        const result = await userServices.updateUser( id, username, name, email, password, cpf_cnpj, phone);
        return res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso!'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const deleteUser = async (req, res) =>{
    const { id } = req.params;
    try{
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (!isUUID(id)){
            return res.status(400).json({ error: "ID inválido" })
        }

        await userServices.deleteUser(id);
        return res.status(200).json({ success: true, message: 'Usuário deletado com sucesso!'});
    } catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
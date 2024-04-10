const userServices = require('../services/userServices');

const getAllUsers = async (req, res) =>{
    try{
        const users = await userServices.getAllUsers();
        return res.status(200).json(users);
    } catch {
        return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

const getUser = async (req, res) =>{
    const { id } = req.params;
    try{
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
            throw { error: 'O username é obrigatório' };
        }

        if (!name) {
            throw { error: 'O nome é obrigatório' };
        }

        if (!email) {
            throw { error: 'O e-mail é obrigatório' };
        }

        if (!password) {
            throw { error: 'A senha é obrigatória' };
        }

        if (!cpf_cnpj) {
            throw { error: 'O cpf é obrigatório' };
        }

        if (!phone) {
            throw { error: 'O telefone é obrigatório' };
        }

        const user = await userServices.createUser(username, user_type, name, email, password, cpf_cnpj, phone);
        return res.status(200).json({ success: true, message: 'Usuário criado com sucesso', data: user });
    } catch{
        return res.status(500).json({ error: 'Erro ao inserir dados' });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, name, email, password, cpf_cnpj, phone } = req.body;

    try {
        if (!username) {
            throw { error: 'O username é obrigatório' };
        }

        if (!name) {
            throw { error: 'O nome é obrigatório' };
        }

        if (!email) {
            throw { error: 'O e-mail é obrigatório' };
        }

        if (!password) {
            throw { error: 'A senha é obrigatória' };
        }

        if (!cpf_cnpj) {
            throw { error: 'O cpf é obrigatório' };
        }

        if (!phone) {
            throw { error: 'O telefone é obrigatorio' };
        }

        const user = await userServices.getUser(id);
        if(!user){
            throw new Error("Usuário não existente");
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
        const user = await userServices.getUser(id);
        if(!user){
            throw new Error("Usuário não existente");
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
const { isUUID, isLength } = require('validator');
const userServices = require('../services/userServices');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        const { username, user_type, name, email, password, cpf, phone } = req.body;

        if (!username) {
            throw new Error ( "O username é obrigatório" );
        };

        if (!isLength(username, { min:4 , max: 30 })){
            return res.status(400).json({ error: "O nome do usuário deve conter entre 4 a 30 caracteres!" })
        }

        if (!user_type){
            throw new Error ("O tipo de usuário é obrigatório");
        };

        if (!name) {
            throw new Error ( "O nome é obrigatório" );
        };

        if (!isLength(name, { min:4 , max: 50 })){
            return res.status(400).json({ error: "O nome deve conter entre 4 a 50 caracteres!" })
        }

        if (!email) {
            throw new Error ( "O e-mail é obrigatório" );
        };

        if (!emailRegex.test(email)){
            return res.status(400).json({ error: "Email inválido!" })
        }

        if (!password) {
            throw new Error ( "A senha é obrigatória" );
        };

        if (!isLength(password, { min:4 , max: 30 })){
            return res.status(400).json({ error: "A senha deve conter entre 4 a 30 caracteres!" })
        }

        if (!cpf) {
            throw new Error ( "O cpf é obrigatório" );
        };

        if (!isLength(cpf, { min:11 , max: 14 })){
            return res.status(400).json({ error: "O cpf deve conter entre 11 a 14 caracteres!" })
        }

        if (!phone) {
            throw new Error ( "O telefone é obrigatório" );
        };

        if (!isLength(phone, { min:11 , max: 17 })){
            return res.status(400).json({ error: "O número de telefone deve conter entre 11 a 17 números!" })
        }

        const user = await userServices.createUser(username, user_type, name, email, password, cpf, phone);
        return res.status(201).json({ success: true, message: 'Usuário criado com sucesso', data: user });
    } catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    const id = req.user.id;
    const { username, name, email, password, cpf, phone } = req.body;

    try {
        if(!isUUID(id)){
            return res.status(400).json({ error: "ID inválido!" })
        }

        if (!username) {
            throw new Error ( "O username é obrigatório" );
        }

        if (!isLength(username, { min:4 , max: 30 })){
            return res.status(400).json({ error: "O nome do usuário deve ser conter 4 a 30 caracteres!" })
        }

        if (!name) {
            throw new Error ( "O nome é obrigatório" );
        }

        if (!isLength(name, { min:4 , max: 50 })){
            return res.status(400).json({ error: "O nome deve conter entre 4 a 50 caracteres!" })
        }


        if (!email) {
            throw new Error ( "O e-mail é obrigatório" );
        }

        if (!emailRegex.test(email)){
            return res.status(400).json({ error: "Email inválido!" })
        }

        if (!cpf) {
            throw new Error ( "O cpf é obrigatório" );
        }

        if (!isLength(cpf, { min:11 , max: 14 })){
            return res.status(400).json({ error: "O cpf deve conter entre 11 a 14 caracteres!" })
        }

        if (!phone) {
            throw new Error ( "O telefone é obrigatório" );
        }

        if (!isLength(phone, { min:11 , max: 17 })){
            return res.status(400).json({ error: "O número de telefone deve conter entre 11 a 17 números!" })
        }

        const result = await userServices.updateUser( id, username, name, email, password, cpf, phone);
        return res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso!'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateUserStatus = async (req, res) =>{
    const id = req.user.id
    const { status } = req.body;
    try{
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        const result = await userServices.updateUserStatus(id, status);
        return res.status(200).json({ success: true, message: 'Usuário excluído com sucesso!' });

    } catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const updateUserCreditBalance = async (req, res) => {
    const id = req.user.id;
    const { credit_balance } = req.body;
    try {
        
        const userType = req.user.user_type;
        if (userType !== "user" && userType !== "admin") {
            return res.status(403).json({ error: "Usuário sem permissão" });
        };

        if (!credit_balance) {
            throw new Error ( "O saldo de créditos é obrigatório" );
        }

        const result = await userServices.updateUserCreditBalance(id, credit_balance);
        return res.status(200).json({ success: true, message: "Usuário atualizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) =>{
    const id = req.user.id;
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
    updateUserStatus,
    updateUserCreditBalance,
    deleteUser,
}

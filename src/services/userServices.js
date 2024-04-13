const userRepository = require('../repository/userRepository');
const { hashPassword } = require('../utils/hashPassword');

const getAllUsers = async () => {
    try {
        const users = await userRepository.getAllUsers();
        return users;
    } catch (error) {
        throw error;
    }
}

const getUser = async (id) => {
    try {
        const user = await userRepository.getUser(id);
        if(!user){
            throw new Error("Usuário não existente");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const createUser = async (username, user_type, name, email, password, cpf_cnpj, phone) => {
    try {
        const hashedPassword = await hashPassword(password);
        const result = await userRepository.insertNewUser(username, user_type, name, email, hashedPassword, cpf_cnpj, phone);
        return result;
    } catch (error) {
        throw error
    }
}

const updateUser = async (id, username, name, email, password, cpf_cnpj, phone) => {
    try {
        const user = await userRepository.getUser(id);
        if(!user){
            throw new Error("Usuário não existente");
        }
        const hashedPassword = await hashPassword(password);
        await userRepository.updateUser(id, username, name, email, hashedPassword, cpf_cnpj, phone);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const user = await userRepository.getUser(id);
        if(!user){
            throw new Error("Usuário não existente");
        }
        await userRepository.deleteUser(id);
        return { success: true };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
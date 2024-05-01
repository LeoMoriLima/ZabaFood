const jwt = require('jsonwebtoken');
const { comparePassword } = require('../utils/comparePassword');
const { SECRET_KEY } = require("../config");
const loginRepository = require('../repository/loginRepository')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getUser = async (username) => {
    try {
        let user;
        if(emailRegex.test(username)){
            user = await loginRepository.getUserByEmail(username)
        } else {
            user = await loginRepository.getUserByUsername(username)
        }        
        return user
    } catch (error) {
        throw error
    }
}

const authenticateUser = async (username, password) => {    
    try {
        let user;
        if(emailRegex.test(username)){
            user = await loginRepository.getUserByEmail(username)
        } else {
            user = await loginRepository.getUserByUsername(username)
        }        
        if (user && (await comparePassword(password, user.password))) {
            const token = jwt.sign({ id: user.id, user_type: user.user_type, user_status: user.deleted }, SECRET_KEY, { expiresIn: 864000 });
            if (user.deleted) {
                return { auth: false, error: "Usuário inexistente!" };
            }
            return { auth: true, token };
        }
        return { auth: false, error: "Usuário e/ou senha inválidos" };
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao autenticar usuário.");
    }
};

module.exports = {
    getUser,
    authenticateUser,
}
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../utils/comparePassword');
const { SECRET_KEY } = require("../config");
const loginRepository = require('../repository/loginRepository')

const getUser = async (username) =>{
    try {
        const user = await loginRepository.getUserByUsername(username);
        return user
    } catch (error) {
        throw error
    }
}

const authenticateUser = async(username, password) =>{
    try{
        const user = await loginRepository.getUserByUsername(username)
        if(user && (await comparePassword(password, user.password))){
            const token = jwt.sign({ id: user.id , user_type: user.user_type}, SECRET_KEY, { expiresIn: 864000 });
            return{ auth: true, token };
        }
        return { auth: false, error: "Usuário e/ou senha inválidos" };
    } catch (error){
        console.log(error);
        throw new Error("Erro ao autenticar usuário.");
    } 
};

module.exports = {
    getUser,
    authenticateUser,
}
const bcrypt = require('bcrypt');

async function comparePassword(password, hashedPassword){
    try{
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch(error){
        console.error('Erro ao comparar a senha:', error);
        return false
    }
}

module.exports = {
    comparePassword
};const bcrypt = require('bcrypt');

async function comparePassword(password, hashedPassword){
    try{
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch(error){
        console.error('Erro ao comparar a senha:', error);
        return false
    }
}

module.exports = {
    comparePassword
};
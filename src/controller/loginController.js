const loginServices = require('../services/loginServices');
const { isUUID, isInt, isEmpty } = require('validator');

const authenticate = async (req, res) => {
    const { username, password } = req.body;
    try {
        if(isEmpty(username)){
            return res.status(400).json({ error: "O usuário é obrigatório!" })
        }

        if(isEmpty(password)){
            return res.status(400).json({ error: "A senha é obrigatória!" })
        }

        const user = await loginServices.getUser(username);
        if (!user) {
            return res.status(400).json({ error: 'Usuário e/ou senha inválidos!' });
        }
        const { auth, token } = await loginServices.authenticateUser(username, password);

        if (auth) {
            res.cookie('session_id', token, { httpOnly: true, expires: new Date(Date.now() + 864000000) });
            return res.status(200).json({ auth });
        }
        return res.status(400).json({ error: "Usuário e/ou senha inválidos!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

const checkLogin = async (req, res) => {
    try {
        return res.status(200).json({ message: "Usuário autenticado", user: req.user});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Erro no servidor"});
    }
}

module.exports = {
    authenticate,
    checkLogin
}
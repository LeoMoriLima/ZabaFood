const { Client } = require('pg');
const config = require('../config');

async function connectToDatabase(){
    const cliente = new Client({
        user: config.DB_USER,
        host: config.DB_HOST,
        database: config.DB_NAME,
        password: config.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    try{
        await cliente.connect();
        console.log('Conectado com sucesso!');
        return cliente;
    } catch(error) {
        console.log(error);
        return null;
    }
}


module.exports = {
    connectToDatabase
};
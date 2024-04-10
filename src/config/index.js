require('dotenv').config({ path: "./.env" });

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "umasenhaqualquer",
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT
}


module.exports = config;

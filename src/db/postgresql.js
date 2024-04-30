const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 20
});

module.exports = {
    pool
};
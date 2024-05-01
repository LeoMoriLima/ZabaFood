const fs = require('fs');
const path = require('path');

function requestLogger(req, res, next) {
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const requestData = {
        timestamp: new Date().toISOString(),
        ip: clientIP,
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        headers: req.headers
    };
    const logPath = path.join(__dirname, '../../logs', 'request.log');
    const logData = JSON.stringify(requestData, null, 4) + '\n';

    fs.appendFile(logPath, logData, (err) => {
        if(err){
            console.error('Erro ao salvar log da requisição:', err);
        }
    });

    next();
}

module.exports = requestLogger;
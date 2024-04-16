const cookieParser = require('cookie-parser');
const express = require('express');
const config = require('./config');
const app = express();
const port = config.PORT;
const hostname = config.HOSTNAME
const cors = require("cors");
const path = require('path');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const routes = require('./routes/routes.js');
app.use('/api', routes);

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});


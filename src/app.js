const cookieParser = require('cookie-parser');
const express = require('express');
const config = require('./config');
const app = express();
const port = config.PORT;
const cors = require("cors");
const path = require('path');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const routes = require('./routes/routes.js');
app.use('/api', routes);

app.use('/', (req, res) => {
  res.send('Olá mundo');
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
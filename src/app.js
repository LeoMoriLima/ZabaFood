const cookieParser = require('cookie-parser');
const express = require('express');
const config = require('./config');
const app = express();
const port = config.PORT;
const hostname = config.HOSTNAME
const cors = require("cors");
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: './public/assets/uploads',
  filename: (req, file, cb) =>{
    cb(null, file.originalname);
}
});

const upload = multer({ storage: storage});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const routes = require('./routes/routes.js');
app.use('/api', routes);

app.get('/logout', (req, res) => {
	res.clearCookie('session_id', { path: '/' });
	res.end();
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.post("/upload_file", upload.single("file"), uploadFile);

function uploadFile (req, res) {
	console.log(req.body);
  console.log(req.file);
  res.json( req.file );
}

app.listen(port, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});


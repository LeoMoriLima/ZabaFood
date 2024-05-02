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
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const corsOptions = {
  origin: 'https://108.61.49.221'
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const routes = require('./routes/routes.js');
app.use('/api', routes);

app.get('/api/logout', (req, res) => {
  res.clearCookie('session_id', { path: '/' });
  return res.status(200).json({ success: true });
});

app.post("/api/upload_file", upload.single("file"), uploadFile);

function uploadFile(req, res) {
  console.log(req.body);
  console.log(req.file);
  res.json(req.file);
}

app.listen(port, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});


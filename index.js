var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Create an instance of multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    // Use the original filename, you can customize if you prefer
    cb(null, file.originalname);
  }
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
 
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});

// Specify a folder where the uploaded files will be stored
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

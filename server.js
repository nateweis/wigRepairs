const express = require('express');
const cors = require('cors');
const app = express();


const port = process.env.PORT || 3004

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const jobsController = require('./controllers/jobsRouts');
app.use('/jobs', jobsController)

const peopleController = require('./controllers/peopleRouts');
app.use('/people', peopleController)

//================== Testing Muler

const multer = require('multer');
const fs = require('fs');

// Set up storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const userDir = './public/imgs/uploads'; // Example: user-specific directory
      fs.mkdirSync(userDir, { recursive: true });
      cb(null, userDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

  // Route to handle file uploads
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    
    res.send("uploaded a file");
  });

  //========================================================

app.listen(port, () => console.log(`Hidee Hoe im on port ${port}`))


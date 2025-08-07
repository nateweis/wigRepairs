const multer = require('multer');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const Jobs = require('../models/jobs')


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

router.get('/', Jobs.getAllJobs)
router.post('/', Jobs.addJobs)
router.post('/imgUpload', upload.single('jobImg'), Jobs.uploadImage);
router.put('/', Jobs.updateJob)


module.exports = router
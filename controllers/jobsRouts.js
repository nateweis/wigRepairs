const express = require('express');
const router = express.Router();
const Jobs = require('../models/jobs')

router.get('/', Jobs.getAllJobs)

module.exports = router
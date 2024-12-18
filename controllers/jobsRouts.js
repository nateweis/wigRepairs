const express = require('express');
const router = express.Router();
const Jobs = require('../models/jobs')

router.get('/', Jobs.getAllJobs)
router.post('/', Jobs.addJobs)
router.put('/', Jobs.updateJob)

module.exports = router
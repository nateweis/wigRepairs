const express = require('express');
const router = express.Router();
const People = require('../models/people')

router.post('/', People.addPeople)

module.exports = router
const express = require('express');
const router = express.Router();
const People = require('../models/people')

router.get('/', People.getPeople)
router.post('/', People.addPeople)

module.exports = router
// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// Start folder specific routes

// current sprint, remember to add older sprint when adding a new folder!
router.use('/current', require('./views/current/_routes'));


module.exports = router;

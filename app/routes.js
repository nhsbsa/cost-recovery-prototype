// External dependencies
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // to support JSON bodies
router.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Add your routes here - above the module.exports line
router.get('/', function(req , res){ 
    res.render('index');
   });

// Start folder specific routes

// current sprint, remember to add older sprint when adding a new folder!
router.use('/current', require('./views/current/_routes'));


module.exports = router;

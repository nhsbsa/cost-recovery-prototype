const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // to support JSON bodies
router.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Add your routes here - above the module.exports line
router.get('/', function(req , res){ 
  res.render('index');
 });

router.post('/test', function (req, res) {

    const selectedRadio = req.body.age;
  
    if (selectedRadio === "yes"){
      res.redirect('2')
    }
    if (selectedRadio === "no"){
      res.redirect('1')
    }
    else {
      res.redirect('page')
    }
  
  })

  module.exports = router

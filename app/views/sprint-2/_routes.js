const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // to support JSON bodies
router.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Add your routes here - above the module.exports line
router.get('/', function(req , res){ 
  res.render('index');
 });

 router.post('/role', function (req, res) {

  const selectedRadio = req.body.age;

  if (selectedRadio === "overseas visitor manager"){
    res.redirect('ovm-sign-in')
  }
  if (selectedRadio === "NHSBSA cost recovery team"){
    res.redirect('admin-sign-in')
  }
  else {
    res.redirect('select-role')
  }

})



  module.exports = router

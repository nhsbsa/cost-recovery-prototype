const express = require('express')
const router = express.Router()

router.get('/', function(req , res){ 
  res.render('index');
 });

// Add your routes here - above the module.exports line

  router.post('/test', function (req, res) {

    var example = req.session.data['example']
  
    if (example == "yes"){
      res.redirect('layout')
    }
    if (example == "no"){
      res.redirect('index')
    }
    else {
      res.redirect('page')
    }
  
  })

  module.exports = router

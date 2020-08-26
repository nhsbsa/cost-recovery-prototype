const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // to support JSON bodies
router.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Add your routes here - above the module.exports line
router.get('/', function(req , res){ 
  res.render('index');
 });

//add-treatment.html
 router.post('/select-entitlement', function (req, res) {

  const selectedRadio = req.body.entitlement;

  if (selectedRadio === "ehic"){
    res.redirect('country-ehic')
  }
  if (selectedRadio === "prc"){
    res.redirect('country-prc')
  }
  else {
    res.redirect('add-treatment')
  }

})

//confirm-cost-ehic.html
router.post('/confirm-cost', function (req, res) {

  const selectedRadio = req.body.cost;

  if (selectedRadio === "yes"){
    res.redirect('check-your-answers-ehic')
  }
  if (selectedRadio === "no"){
    res.redirect('treatment-cost-ehic')
  }
  else {
    res.redirect('confirm-cost-ehic')
  }

})

//add-another-treatment-ehic.html
router.post('/another-treatment', function (req, res) {

  const selectedRadio = req.body.another;

  if (selectedRadio === "maria rodríguez"){
    res.redirect('treatment-dates-ehic-aat')
  }
  if (selectedRadio === "different person"){
    res.redirect('add-treatment')
  }
  else {
    res.redirect('add-another-treatment-ehic')
  }

})

//found-two-ehic.html
router.post('/two-ehic-found', function (req, res) {

  const selectedRadio = req.body.ehicTreatments;

  if (selectedRadio === "ehic valid until 04/08/2021"){
    res.redirect('details-ehic')
  }
  if (selectedRadio === "ehic expired on 16/06/2017"){
    res.redirect('found-two-ehic')
  }
  if (selectedRadio === "none"){
    res.redirect('found-two-ehic')
  }
  else {
    res.redirect('found-two-ehic')
  }

})

//found-one-prc.html
router.post('/one-prc-found', function (req, res) {

  const selectedRadio = req.body.prcTreatments;

  if (selectedRadio === "prc valid from 03/07/2020 to 05/08/2020"){
    res.redirect('details-prc')
  }
  if (selectedRadio === "none"){
    res.redirect('found-one-prc')
  }
  else {
    res.redirect('found-one-prc')
  }

})

//two-records-found-prc.html
router.post('/two-records-found-prc', function (req, res) {

  const selectedRadio = req.body.pin;

  if (selectedRadio === "pin1"){
    res.redirect('found-one-prc')
  }
  if (selectedRadio === "pin2"){
    res.redirect('two-records-found-prc')
  }
  else {
    res.redirect('two-records-found-prc')
  }

})


  module.exports = router

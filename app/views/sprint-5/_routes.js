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
    res.redirect('treatment-start-date-ehic')
  }
  if (selectedRadio === "prc"){
    res.redirect('treatment-start-date-prc')
  }
  else {
    res.redirect('add-treatment')
  }

})

//confirm-cost-ehic.html
router.post('/confirm-cost', function (req, res) {

  const selectedRadio = req.body.cost;

  if (selectedRadio === "yes"){
    res.redirect('check-your-answers-ehic-sec1')
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

  if (selectedRadio === "same person"){
    res.redirect('entitlements-aat')  
  }
  if (selectedRadio === "different person"){
    res.redirect('add-treatment')
  }
  else {
    res.redirect('confirmation-ehic')
  }

})


//two-patients-found-prc.html
router.post('/two-patients-found-prc', function (req, res) {

  const selectedRadio = req.body.pin;

  if (selectedRadio === "pin1"){
    res.redirect('details-prc')
  }
  if (selectedRadio === "pin2"){
    res.redirect('two-patients-found-prc')
  }
  else {
    res.redirect('two-patients-found-prc')
  }

})


//have-address-ehic.html
router.post('/have-address-ehic', function (req, res) {

  const selectedRadio = req.body.address;

  if (selectedRadio === "yes"){
    res.redirect('address-ehic')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-ehic-sec2')
  }
  else {
    res.redirect('have-address-ehic')
  }

})


//entitlements-aat.html
router.post('/entitlements-aat', function (req, res) {

  const selectedRadio = req.body.entitlement;

  if (selectedRadio === "ehic"){
    res.redirect('treatment-start-date-ehic-aat')
  }
  if (selectedRadio === "prc"){
    res.redirect('treatment-start-date-prc-aat')
  }
  else {
    res.redirect('entitlements-aat')
  }

})

//ehic-related-prc.html
router.post('/ehic-related', function (req, res) {

  const selectedRadio = req.body.ehicrelated;

  if (selectedRadio === "yes"){
    res.redirect('ehic-details-prc')
  }
  if (selectedRadio === "no"){
    res.redirect('have-address-prc')
  }
  else {
    res.redirect('ehic-related-prc')
  }

})

//have-address-prc.html
router.post('/have-address-prc', function (req, res) {

  const selectedRadio = req.body.address;

  if (selectedRadio === "yes"){
    res.redirect('address-prc')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-prc-sec2')
  }
  else {
    res.redirect('have-address-prc')
  }

})

//ehic-related-prc-aat.html
router.post('/ehic-related-aat', function (req, res) {

  const selectedRadio = req.body.ehicrelated;

  if (selectedRadio === "yes"){
    res.redirect('ehic-details-prc-aat')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-prc-aat')
  }
  else {
    res.redirect('ehic-related-prc-aat')
  }

})


  module.exports = router

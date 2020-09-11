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
    res.redirect('check-your-answers-ehic-sec2')
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
    res.redirect('entitlements-aat')
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

//ehics-aat.html
router.post('/ehics-aat', function (req, res) {

  const selectedRadio = req.body.ehicTreatments;

  if (selectedRadio === "ehic valid until 04/08/2021"){
    res.redirect('treatment-start-date-ehic-aat')
  }
  if (selectedRadio === "ehic expired on 16/06/2017"){
    res.redirect('details-ehic-aat')
  }
  if (selectedRadio === "none"){
    res.redirect('enter-details-ehic-aat')
  }
  else {
    res.redirect('ehics-aat')
  }

})

//have-address-ehic.html
router.post('/have-address-ehic', function (req, res) {

  const selectedRadio = req.body.address;

  if (selectedRadio === "yes"){
    res.redirect('address-ehic')
  }
  if (selectedRadio === "no"){
    res.redirect('treatment-start-date-ehic')
  }
  else {
    res.redirect('have-address-ehic')
  }

})


//entitlements-aat.html
router.post('/entitlements-aat', function (req, res) {

  const selectedRadio = req.body.entitlement;

  if (selectedRadio === "ehic"){
    res.redirect('ehics-aat')
  }
  if (selectedRadio === "prc"){
    res.redirect('enter-details-prc-aat')
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
    res.redirect('check-your-answers-prc-sec1')
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
    res.redirect('treatment-start-date-prc-aat')
  }
  else {
    res.redirect('ehic-related-prc-aat')
  }

})


  module.exports = router

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
  if (selectedRadio === "s2"){
    res.redirect('treatment-start-date-s2')
  }
  if (selectedRadio === "malta"){
    res.redirect('treatment-start-date-malta')
  }
  else {
    res.redirect('add-treatment')
  }

})

//confirm-cost-ehic.html
router.post('/confirm-cost', function (req, res) {

  const selectedRadio = req.body.cost;

  if (selectedRadio === "yes"){
    res.redirect('reason-cost')
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


//have-address-ehic.html
router.post('/have-address-ehic', function (req, res) {

  const selectedRadio = req.body.address;

  if (selectedRadio === "yes"){
    res.redirect('address-ehic')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-ehic-sec2-na')
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

//have-address-prc.html
router.post('/have-address-prc', function (req, res) {

  const selectedRadio = req.body.address;

  if (selectedRadio === "yes"){
    res.redirect('address-prc')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-prc-sec2-na')
  }
  else {
    res.redirect('have-address-prc')
  }

})

//have-address-ehic-draft.html
router.post('/have-address-ehic-draft', function (req, res) {

  const selectedRadio = req.body.address;

  if (selectedRadio === "yes"){
    res.redirect('address-ehic-draft')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-ehic-sec2-na-draft')
  }
  else {
    res.redirect('have-address-ehic-draft')
  }

})

//confirm-cost-s2.html
router.post('/confirm-cost-s2', function (req, res) {

  const selectedRadio = req.body.cost;

  if (selectedRadio === "yes"){
    res.redirect('check-your-answers-s2-sec1')
  }
  if (selectedRadio === "no"){
    res.redirect('treatment-cost-s2')
  }
  else {
    res.redirect('confirm-cost-s2')
  }

})

//cancel-confirmation.html
router.post('/cancel-confirm', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('treatment-start-date-ehic')
  }
  else {
    res.redirect('cancel-confirmation')
  }

})

//delete-file-confirmation.html
router.post('/delete-confirm', function (req, res) {

  const selectedRadio = req.body.delete;

  if (selectedRadio === "yes"){
    res.redirect('view-treatment-details-delete-conf')
  }
  if (selectedRadio === "no"){
    res.redirect('view-treatment-details')
  }
  else {
    res.redirect('delete-file-confirmation')
  }

})

//have-s2.html
router.post('/have-s2', function (req, res) {

  const selectedRadio = req.body.s2;

  if (selectedRadio === "yes"){
    res.redirect('enter-details-s2')
  }
  if (selectedRadio === "no"){
    res.redirect('contact-ops-team')
  }
  else {
    res.redirect('have-s2')
  }

})

//additional-cost.html
router.post('/additional-cost', function (req, res) {

  const selectedRadio = req.body.additional;

  if (selectedRadio === "add cost"){
    res.redirect('confirmation-ehic-ac')
  }
  if (selectedRadio === "total cost"){
    res.redirect('total-cost')
  }
  if (selectedRadio === "none of the above"){
    res.redirect('edit-treatment-details')
  }
  else {
    res.redirect('additional-cost')
  }

})

//Verify-cost.html
router.post('/cost', function (req, res) {

  const selectedRadio = req.body.cost;

  if (selectedRadio === "yes"){
    res.redirect('confirmation-ehic-ac')
  }
  if (selectedRadio === "no"){
    res.redirect('verify-additional-costs')
  }
  else {
    res.redirect('verify-cost')
  }

})

//Verify-additional-costs.html
router.post('/add-cost', function (req, res) {

  const selectedRadio = req.body.add;

  if (selectedRadio === "yes"){
    res.redirect('summary-cost')
  }
  if (selectedRadio === "no"){
    res.redirect('edit-treatment-details')
  }
  else {
    res.redirect('verify-additional-costs')
  }

})

//Verify-cost-2.html
router.post('/current-total', function (req, res) {

  const selectedRadio = req.body.cost;

  if (selectedRadio === "yes"){
    res.redirect('confirmation-ehic-ac')
  }
  if (selectedRadio === "no"){
    res.redirect('new-total-cost')
  }
  else {
    res.redirect('verify-cost')
  }

})

//type-of-upload.html
router.post('/type-upload', function (req, res) {

  const selectedRadio = req.body.type;

  if (selectedRadio === "single file"){
    res.redirect('upload-s2')
  }
  if (selectedRadio === "page wise"){
    res.redirect('upload-s2-page1')
  }
  else {
    res.redirect('type-of-upload')
  }

})

//upload-another-page-s2.html
router.post('/have-page3', function (req, res) {

  const selectedRadio = req.body.page3;

  if (selectedRadio === "yes"){
    res.redirect('upload-s2-page3')
  }
  if (selectedRadio === "no"){
    res.redirect('address-s2-2')
  }
  else {
    res.redirect('upload-another-page-s2')
  }

})


//upload-another-s2.html
router.post('/upload-file', function (req, res) {

  const selectedRadio = req.body.file;

  if (selectedRadio === "yes"){
    res.redirect('enter-details-s2-2')
  }
  if (selectedRadio === "no"){
    res.redirect('address-s2-4')
  }
  else {
    res.redirect('upload-another-s2')
  }

})

//type-of-upload-2.html
router.post('/type-upload-2', function (req, res) {

  const selectedRadio = req.body.type2;

  if (selectedRadio === "single file"){
    res.redirect('upload-s2-2')
  }
  if (selectedRadio === "page wise"){
    res.redirect('upload-s2-page1-2')
  }
  else {
    res.redirect('type-of-upload-2')
  }

})

//upload-another-s2.html
router.post('/upload-another', function (req, res) {

  const selectedRadio = req.body.another;

  if (selectedRadio === "yes"){
    res.redirect('enter-details-s2-3')
  }
  if (selectedRadio === "no"){
    res.redirect('address-s2-7')
  }
  else {
    res.redirect('upload-another-s2-2')
  }

})



  module.exports = router

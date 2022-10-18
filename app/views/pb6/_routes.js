const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // to support JSON bodies
router.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Add your routes here - above the module.exports line
router.get('/', function(req , res){ 
  res.render('index');
 });



 //pb6/search/treatment-end-date-malta.html
 router.post('/check-treatment-dates', function (req, res) {

  const treatmentStartDate = req.body.treatmentStartMM;

  if (treatmentStartDate ==="03"){
    res.redirect('treatment-length-confirmation-malta')
  }
  else {
    res.redirect('treatment-cost-malta')
  }

})


 //pb6/search/malta-quota-number.html
 router.post('/quota-number-check', function (req, res) {

  const selectedRadio = req.body.quotaNumber;

  if (selectedRadio === "22/23-100"){
    res.redirect('malta-quota-number-confirmation')
  }
  else {
    res.redirect('patient-details-malta')
  }

})

 //pb6/search/malta-quota-number-additional-2.html
 router.post('/quota-number-check-2', function (req, res) {

  const selectedRadio = req.body.quotaNumber;

  if (selectedRadio === "22/23-100"){
    res.redirect('malta-quota-number-confirmation')
  }
  else {
    res.redirect('check-your-answers-malta-sec-2d')
  }

})

 //confirmation-malta.html
 router.post('/malta-additional', function (req, res) {

  const selectedRadio = req.body.addTreatment;

  if (selectedRadio === "1"){
    res.redirect('treatment-start-date-malta-additional-1')
  }
  if (selectedRadio === "2"){
    res.redirect('treatment-start-date-malta-additional-2')
  }
  if (selectedRadio === "3"){
    req.session.data = {}
    res.redirect('../search/add-treatment')
  }
  if (selectedRadio === "4"){
    req.session.data = {}
    res.redirect('../search/home')
  }
  else {
    res.redirect('confirmation-malta')
  }

})

 //malta-cancel-confirmation-start-date.html
router.post('/malta-cancel-confirmation-start-date', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('treatment-start-date-malta')
  }
  else {
    res.redirect('malta-cancel-confirmation-start-date')
  }

})

 //malta-cancel-confirmation-end-date.html
 router.post('/malta-cancel-confirmation-end-date', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('treatment-end-date-malta')
  }
  else {
    res.redirect('malta-cancel-confirmation-end-date')
  }

})

 //malta-cancel-confirmation-cost.html
 router.post('/malta-cancel-confirmation-cost', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('treatment-cost-malta')
  }
  else {
    res.redirect('malta-cancel-confirmation-cost')
  }

})

 //malta-cancel-confirmation-check-details-1.html
 router.post('/malta-cancel-confirmation-check-details-1', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-malta-sec-1')
  }
  else {
    res.redirect('malta-cancel-confirmation-check-details-1')
  }

})

 //malta-cancel-confirmation-quota-number.html
 router.post('/malta-cancel-confirmation-quota-number', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('malta-quota-number')
  }
  else {
    res.redirect('malta-cancel-confirmation-quota-number')
  }

})

 //malta-cancel-confirmation-patient-details.html
 router.post('/malta-cancel-confirmation-patient-details', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('patient-details-malta')
  }
  else {
    res.redirect('malta-cancel-confirmation-patient-details')
  }

})

 //malta-cancel-confirmation-address-check.html
 router.post('/malta-cancel-confirmation-address-check', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('address-check-malta')
  }
  else {
    res.redirect('malta-cancel-confirmation-address-check')
  }

})

 //malta-cancel-confirmation-address.html
 router.post('/malta-cancel-confirmation-address', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('address-malta')
  }
  else {
    res.redirect('malta-cancel-confirmation-address')
  }

})

 //malta-cancel-confirmation-check-details-2.html
 router.post('/malta-cancel-confirmation-check-details-2', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-malta-sec-2')
  }
  else {
    res.redirect('malta-cancel-confirmation-check-details-2')
  }

})

 //malta-cancel-confirmation-check-details-2b.html
 router.post('/malta-cancel-confirmation-check-details-2b', function (req, res) {

  const selectedRadio = req.body.cancel;

  if (selectedRadio === "yes"){
    res.redirect('home')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-malta-sec-2b')
  }
  else {
    res.redirect('malta-cancel-confirmation-check-details-2b')
  }

})




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
  if (selectedRadio === "maltaQuota"){
    res.redirect('treatment-start-date-malta')
  }
  else {
    res.redirect('add-treatment')
  }

})

//treatment-length-confirmation.html
router.post('/treatment-duration', function (req, res) {

  const selectedRadio = req.body.continuousPatient;

  if (selectedRadio === "yes"){
    res.redirect('treatment-cost-malta')
  }
  if (selectedRadio === "no"){
    res.redirect('treatment-end-date-malta')
  }
  else {
    res.redirect('treatment-length-confirmation-malta')
  }

})

//address-check-malta.html
router.post('/address-check-malta', function (req, res) {

  const selectedRadio = req.body.addressCheck;

  if (selectedRadio === "yes"){
    res.redirect('address-malta')
  }
  if (selectedRadio === "no"){
    res.redirect('check-your-answers-malta-sec-2b')
  }
  else {
    res.redirect('address-check-malta')
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

//confirmation-malta.html
router.post('/another-treatment-malta', function (req, res) {

  const selectedRadio = req.body.another;

  if (selectedRadio === "same person"){
    res.redirect('treatment-start-date-malta-aat')  
  }
  if (selectedRadio === "different person"){
    res.redirect('add-treatment')
  }
  else {
    res.redirect('confirmation-malta')
  }

})

//confirmation-malta-2.html
router.post('/another-treatment-malta-2', function (req, res) {

  const selectedRadio = req.body.another;

  if (selectedRadio === "same person"){
    res.redirect('treatment-start-date-malta-aat-2')  
  }
  if (selectedRadio === "different person"){
    res.redirect('add-treatment')
  }
  else {
    res.redirect('confirmation-malta')
  }

})



  module.exports = router

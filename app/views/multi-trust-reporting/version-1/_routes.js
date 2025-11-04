const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // to support JSON bodies
router.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Request a new ROVT account //

// Enter account details
router.post('/request-new-account', function (req, res) {

  // Extract First names from the form
  const newAccFirstName = req.body['new-account-first-name'];
  // Store First names in the session data
  req.session.data['new-account-first-name'] = newAccFirstName;

  // Extract Last name from the form
  const newAccLastName = req.body['new-account-last-name'];
  // Store Last name in the session data
  req.session.data['new-account-last-name'] = newAccLastName;

  // Extract Email address from the form
  const newAccEmailAddress = req.body['new-account-email-address'];
  // Store Email address in the session data
  req.session.data['new-account-email-address'] = newAccEmailAddress;

  // Extract Phone number from the form
  const newAccPhoneNumber = req.body['new-account-phone-number'];
  // Store Phone number in the session data
  req.session.data['new-account-phone-number'] = newAccPhoneNumber;

  // Extract Region from the form
  const newAccRegion = req.body['new-account-region'];
  // Store Region in the session data
  req.session.data['new-account-region'] = newAccRegion;

  // Redirect to search for institution results page
  res.redirect('/multi-trust-reporting/version-1/new-account-select-trust');
});

// Check your answers before submitting an account request
router.post('/new-account-cya', function (req, res) {

  // Redirect to Confirmation account request received screen
  res.redirect('/multi-trust-reporting/version-1/confirmation-account-request-received');
});

// Confirmation account request received
router.post('/confirmation-account-request-received', function (req, res) {

  // Redirect to Sign-in screen
  res.redirect('/multi-trust-reporting/version-1/sign-in');
});

// Confirm you wish to cancel your request for a new account
router.post('/new-account-cancel-confirmation', function (req, res) {

  var newAccConfirmCancellation = req.session.data['new-account-confirm-cancellation'];
  
  if (newAccConfirmCancellation === 'Yes') {
    res.redirect('/multi-trust-reporting/version-1/sign-in');
  } else {
    res.redirect('/multi-trust-reporting/version-1/new-account-cancel-confirmation');
  }
});


// Add a new treatment //

// Confirm you wish to cancel adding a new treatment
router.post('/cancel-confirmation', function (req, res) {

  var confirmCancellation = req.session.data['confirm-cancellation'];
  
  if (confirmCancellation === 'Yes') {
    res.redirect('/multi-trust-reporting/version-1/home');
  } else {
    res.redirect('/multi-trust-reporting/version-1/cancel-confirmation');
  }
});

// Step 1: Select the entitlement type
router.post('/add-treatment', function (req, res) {
  // Extract the entitlement type from the form
  const entitlementType = req.body['entitlement-type'];

  // Store it in the session data
  req.session.data['entitlement-type'] = entitlementType;

  // Redirect to treatment start date
  res.redirect('/multi-trust-reporting/version-1/treatment-start-date');
});


// Step 2: Enter the start date of the treatment
router.post('/treatment-start-date', (req, res) => {
  
  // Extract day, month, and year from the request body
  const treatmentStartDateDay = req.body['treatment-start-date-day'];
  const treatmentStartDateMonth = req.body['treatment-start-date-month'];
  const treatmentStartDateYear = req.body['treatment-start-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const treatmentStartDate = treatmentStartDateDay && treatmentStartDateMonth && treatmentStartDateYear 
  ? `${treatmentStartDateDay}/${treatmentStartDateMonth}/${treatmentStartDateYear}` 
  : '01/01/2025';

  // Save the formatted date in session data
  req.session.data['treatment-start-date'] = treatmentStartDate;

  // Redirect to the next page
  res.redirect('/multi-trust-reporting/version-1/treatment-end-date');
});


// Step 3: Enter the end date of the treatment
router.post('/treatment-end-date', (req, res) => {
  
  // Extract day, month, and year from the request body
  const treatmentEndDateDay = req.body['treatment-end-date-day'];
  const treatmentEndDateMonth = req.body['treatment-end-date-month'];
  const treatmentEndDateYear = req.body['treatment-end-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const treatmentEndDate = treatmentEndDateDay && treatmentEndDateMonth && treatmentEndDateYear 
  ? `${treatmentEndDateDay}/${treatmentEndDateMonth}/${treatmentEndDateYear}` 
  : '01/02/2025';

  // Save the formatted date in session data
  req.session.data['treatment-end-date'] = treatmentEndDate;

  // Redirect to the next page
  res.redirect('/multi-trust-reporting/version-1/treatment-cost');
});


// Step 4: Enter the total treatment cost
router.post('/treatment-cost', function (req, res) {
  // Extract the total treatment cost from the form
  const treatmentCost = req.body['treatment-cost'];

  // Store it in the session data
  req.session.data['treatment-cost'] = treatmentCost;

  // Redirect to check your answers
  res.redirect('/multi-trust-reporting/version-1/add-treatment-mini-cya');
});


// Step 5: Mini check your answers before continuing
router.post('/add-treatment-mini-cya', function (req, res) {

  // Get the entitlement type from session data
  const entitlementType = req.session.data['entitlement-type'];

  // Define the list of entitlement types that go to the registration country page
  const registrationTypes = ['EHIC', 'PRC', 'S2/E112', 'Non-EU Reciprocal Healthcare'];

  // Redirect based on entitlement type
  if (registrationTypes.includes(entitlementType)) {
    res.redirect('/multi-trust-reporting/version-1/entitlement-registration-country');
  } else if (entitlementType === 'Malta Quota') {
    res.redirect('/multi-trust-reporting/version-1/malta-quota-number');
  }

});


// Step 6: Select the entitlement registration country (for EHIC, PRC, S2/E112 or Non-EU Reciprocal Healthcare entitlements)
router.post('/entitlement-registration-country', function (req, res) {

  // Extract the entitlement registration country from the form
  const entitlementRegistrationCountry = req.body['entitlement-registration-country'];

  // Store it in the session data
  req.session.data['entitlement-registration-country'] = entitlementRegistrationCountry;

  // Get the entitlement type from session data
  const entitlementType = req.session.data['entitlement-type'];

  // Redirect based on entitlement type
  if (entitlementType === 'EHIC') {
    res.redirect('/multi-trust-reporting/version-1/ehic-search-for-person');
  } else if (entitlementType === 'PRC') {
    res.redirect('/multi-trust-reporting/version-1/prc-search-for-person');
  } else if (entitlementType === 'S2/E112') {
    res.redirect('/multi-trust-reporting/version-1/s2-search-for-person');
  } else if (entitlementType === 'Non-EU Reciprocal Healthcare') {
    res.redirect('/multi-trust-reporting/version-1/non-eu-enter-patient-details');
  };
});

// Step 6: Enter the Malta Quota number (for Malta Quota entitlements only)
router.post('/enter-malta-quota-number', function (req, res) {

  // Extract the Malta Quota number from the form
  const maltaQuotaNumber = req.body['malta-quota-number'];

  // Store it in the session data
  req.session.data['malta-quota-number'] = maltaQuotaNumber;

  // Redirect to check your answers
  res.redirect('/multi-trust-reporting/version-1/search-for-person');
});


// EHIC Journey //

// Search for the person (EHIC)
router.post('/ehic-search-for-person', function (req, res) {
  // Extract the person's first names from the form
  const ehicFirstNames = req.body['ehic-first-names'];

  // Store the first names in the session data
  req.session.data['ehic-first-names'] = ehicFirstNames;

  // Extract the person's last name from the form
  const ehicLastName = req.body['ehic-last-name'];

  // Store the first names in the session data
  req.session.data['ehic-last-name'] = ehicLastName;

  // Extract the date of birth from the request body
  const ehicDateOfBirthDay = req.body['ehic-date-of-birth-day'];
  const ehicDateOfBirthMonth = req.body['ehic-date-of-birth-month'];
  const ehicDateOfBirthYear = req.body['ehic-date-of-birth-year'];

  // Combine to form the full date (or use a default if not provided)
  const ehicDateOfBirth = ehicDateOfBirthDay && ehicDateOfBirthMonth && ehicDateOfBirthYear
  ? `${ehicDateOfBirthDay}/${ehicDateOfBirthMonth}/${ehicDateOfBirthYear}` 
  : '13/12/1994';
  // Store the person's date of birth in the session data
  req.session.data['ehic-date-of-birth'] = ehicDateOfBirth;

  // Redirect to check your answers
  res.redirect('/multi-trust-reporting/version-1/ehic-search-for-person-results');
});


// Add a new person (EHIC)
router.post('/add-person-ehic', function (req, res) {

  // Extract the EHIC issuing Member State from the form
  const newEHICIssuingMS = req.body['new-ehic-issuing-ms'];
  // Store the EHIC issuing Member State in the session data
  req.session.data['new-ehic-issuing-ms'] = newEHICIssuingMS;

  // Extract the EHIC Last name from the form
  const newEHICLastName = req.body['new-ehic-last-name'];
  // Store the EHIC Last name in the session data
  req.session.data['new-ehic-last-name'] = newEHICLastName;

  // Extract the EHIC First names from the form
  const newEHICFirstNames = req.body['new-ehic-first-names'];
  // Store the EHIC First names in the session data
  req.session.data['new-ehic-first-names'] = newEHICFirstNames;

  // Extract the EHIC date of birth from the request body
  const newEHICDateOfBirthDay = req.body['new-ehic-date-of-birth-day'];
  const newEHICDateOfBirthMonth = req.body['new-ehic-date-of-birth-month'];
  const newEHICDateOfBirthYear = req.body['new-ehic-date-of-birth-year'];

  // Combine to form the full date (or use a default if not provided)
  const newEHICDateOfBirth = newEHICDateOfBirthDay && newEHICDateOfBirthMonth && newEHICDateOfBirthYear
  ? `${newEHICDateOfBirthDay}/${newEHICDateOfBirthMonth}/${newEHICDateOfBirthYear}` 
  : '13/12/1994';
  // Store the person's date of birth in the session data
  req.session.data['new-ehic-date-of-birth'] = newEHICDateOfBirth;

  // Extract the EHIC Personal Identification Number (PIN) from the form
  const newEHICPIN = req.body['new-ehic-pin'];
  // Store the EHIC Personal Identification Number (PIN) in the session data
  req.session.data['new-ehic-pin'] = newEHICPIN;

  // Extract the EHIC Card Number from the form
  const newEHICCardNumber = req.body['new-ehic-card-number'];
  // Store the EHIC Card Number in the session data
  req.session.data['new-ehic-card-number'] = newEHICCardNumber;

  // Extract the EHIC date of birth from the request body
  const newEHICExpiryDateDay = req.body['new-ehic-expiry-date-day'];
  const newEHICExpiryDateMonth = req.body['new-ehic-expiry-date-month'];
  const newEHICExpiryDateYear = req.body['new-ehic-expiry-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const newEHICExpiryDate = newEHICExpiryDateDay && newEHICExpiryDateMonth && newEHICExpiryDateYear
  ? `${newEHICExpiryDateDay}/${newEHICExpiryDateMonth}/${newEHICExpiryDateYear}` 
  : '31/12/2025';
  // Store the EHIC expiry date in the session data
  req.session.data['new-ehic-expiry-date'] = newEHICExpiryDate;

  // Check if Student checkbox was ticked
  const isStudentEHIC = req.body['new-ehic-student'] === 'yes';
  // Store result in the session
  req.session.data['new-ehic-student'] = isStudentEHIC;

  // Redirect to search for the institution that issued the EHIC
  res.redirect('/multi-trust-reporting/version-1/ehic-search-for-institution');
});

// Search for the institution that issued the entitlement (EHIC)
router.post('/ehic-search-for-institution', function (req, res) {

  // Extract the institution ID from the form
  const ehicInstitutionID = req.body['ehic-institution-id'];

  // Store the institution ID in the session data
  req.session.data['ehic-institution-id'] = ehicInstitutionID;

  // Redirect to search for institution results page
  res.redirect('/multi-trust-reporting/version-1/ehic-search-for-institution-results#result');
});

// Upload a copy of the entitlement (EHIC)
router.post('/upload-ehic', function (req, res) {

  // Redirect to review the uploaded copy of the EHIC
  res.redirect('/multi-trust-reporting/version-1/review-uploaded-ehic');
});

// Review the upload file (EHIC)
router.post('/review-uploaded-ehic', function (req, res) {

  // Redirect to review the uploaded copy of the EHIC
  res.redirect('/multi-trust-reporting/version-1/ehic-known-address');
});

// Do you know the patient's address?
router.post('/ehic-known-address', function (req, res) {

  var ehicKnowAddress = req.session.data['ehic-know-address'];
  
  if (ehicKnowAddress === 'Yes') {
    res.redirect('/multi-trust-reporting/version-1/ehic-enter-address');
  } else {
    res.redirect('/multi-trust-reporting/version-1/ehic-details-cya');
  }
});

// Enter the person's address
router.post('/ehic-enter-address', function (req, res) {

  // Extract Address Line 1 from the form
  const newEHICAddressLine1 = req.body['new-ehic-address-line-1'];
  // Store Address Line 1 in the session data
  req.session.data['new-ehic-address-line-1'] = newEHICAddressLine1;

  // Extract Address Line 2 from the form
  const newEHICAddressLine2 = req.body['new-ehic-address-line-2'];
  // Store Address Line 2 in the session data
  req.session.data['new-ehic-address-line-2'] = newEHICAddressLine2;

  // Extract Address Line 3 from the form
  const newEHICAddressLine3 = req.body['new-ehic-address-line-3'];
  // Store Address Line 3 in the session data
  req.session.data['new-ehic-address-line-3'] = newEHICAddressLine3;

  // Extract Country from the form
  const newEHICAddressCountry = req.body['new-ehic-address-country'];
  // Store Address Line 1 in the session data
  req.session.data['new-ehic-address-country'] = newEHICAddressCountry;

  // Redirect to search for institution results page
  res.redirect('/multi-trust-reporting/version-1/new-ehic-details-cya');
});

// Check treatment, ehic and person details
router.post('/new-ehic-details-cya', function (req, res) {

  // Redirect to confirmation treatment form processed screen
  res.redirect('/multi-trust-reporting/version-1/confirmation-ehic-treatment-processed');
});

// Add another treatment (EHIC)
router.post('/confirmation-ehic-treatment-processed', function (req, res) {

  var ehicAddAnotherTreatmentSamePerson = req.session.data['ehic-add-another-treatment-for-same-person'];
  
  if (ehicAddAnotherTreatmentSamePerson === 'For John Doe') {
    res.redirect('/multi-trust-reporting/version-1/add-treatment-johndoe');
  } else {
    res.redirect('/multi-trust-reporting/version-1/add-treatment');
  }
});


// PRC Journey //

// Search for the person (PRC)
router.post('/prc-search-for-person', function (req, res) {
  // Extract the person's first names from the form
  const prcFirstNames = req.body['prc-first-names'];

  // Store the first names in the session data
  req.session.data['prc-first-names'] = prcFirstNames;

  // Extract the person's last name from the form
  const prcLastName = req.body['prc-last-name'];

  // Store the first names in the session data
  req.session.data['prc-last-name'] = prcLastName;

  // Extract the date of birth from the request body
  const prcDateOfBirthDay = req.body['prc-date-of-birth-day'];
  const prcDateOfBirthMonth = req.body['prc-date-of-birth-month'];
  const prcDateOfBirthYear = req.body['prc-date-of-birth-year'];

  // Combine to form the full date (or use a default if not provided)
  const prcDateOfBirth = prcDateOfBirthDay && prcDateOfBirthMonth && prcDateOfBirthYear
  ? `${prcDateOfBirthDay}/${prcDateOfBirthMonth}/${prcDateOfBirthYear}` 
  : '13/12/1994';
  // Store the person's date of birth in the session data
  req.session.data['prc-date-of-birth'] = prcDateOfBirth;

  // Redirect to check your answers
  res.redirect('/multi-trust-reporting/version-1/prc-search-for-person-results');
});


// Review existing PRC details which cover the treatment dates
router.post('/prc-search-for-person', function (req, res) {
  // Redirect to upload a copy of the existing PRC
  res.redirect('/multi-trust-reporting/version-1/existing-prc-upload');
});

// Upload a copy of the existing PRC
router.post('/existing-prc-upload', function (req, res) {
  // Redirect to review the uploaded file
  res.redirect('/multi-trust-reporting/version-1/review-uploaded-existing-prc');
});

// Review the uploaded file of the copy of the existing PRC (PRC)
router.post('/review-uploaded-existing-prc', function (req, res) {

  // Redirect to review the uploaded copy of the PRC
  res.redirect('/multi-trust-reporting/version-1/existing-prc-known-address');
});

// Do you know the patient's address?
router.post('/existing-prc-known-address', function (req, res) {

  var existingPRCKnowAddress = req.session.data['existing-prc-know-address'];
  
  if (existingPRCKnowAddress === 'Yes') {
    res.redirect('/multi-trust-reporting/version-1/existing-prc-enter-address');
  } else {
    res.redirect('/multi-trust-reporting/version-1/existing-prc-details-cya');
  }
});

// Enter the person's address
router.post('/existing-prc-enter-address', function (req, res) {

  // Extract Address Line 1 from the form
  const existingPRCAddressLine1 = req.body['existing-prc-address-line-1'];
  // Store Address Line 1 in the session data
  req.session.data['existing-prc-address-line-1'] = existingPRCAddressLine1;

  // Extract Address Line 2 from the form
  const existingPRCAddressLine2 = req.body['existing-prc-address-line-2'];
  // Store Address Line 2 in the session data
  req.session.data['existing-prc-address-line-2'] = existingPRCAddressLine2;

  // Extract Address Line 3 from the form
  const existingPRCAddressLine3 = req.body['existing-prc-address-line-3'];
  // Store Address Line 3 in the session data
  req.session.data['existing-prc-address-line-3'] = existingPRCAddressLine3;

  // Extract Country from the form
  const existingPRCAddressCountry = req.body['existing-prc-address-country'];
  // Store Address Line 1 in the session data
  req.session.data['existing-prc-address-country'] = existingPRCAddressCountry;

  // Redirect to search for institution results page
  res.redirect('/multi-trust-reporting/version-1/existing-prc-details-cya');
});

// Check treatment, PRC and person details
router.post('/existing-prc-details-cya', function (req, res) {

  // Redirect to confirmation treatment form processed screen
  res.redirect('/multi-trust-reporting/version-1/existing-confirmation-prc-treatment-processed');
});

// Add another treatment (PRC)
router.post('/confirmation-prc-treatment-processed', function (req, res) {

  var prcAddAnotherTreatmentSamePerson = req.session.data['prc-add-another-treatment-for-same-person'];
  
  if (prcAddAnotherTreatmentSamePerson === 'For John Doe') {
    res.redirect('/multi-trust-reporting/version-1/add-treatment-johndoe');
  } else {
    res.redirect('/multi-trust-reporting/version-1/add-treatment');
  }
});



// Add a new person (PRC)
router.post('/add-person-prc', function (req, res) {

  // Extract the PRC issuing Member State from the form
  const newPRCIssuingMS = req.body['new-prc-issuing-ms'];
  // Store the PRC issuing Member State in the session data
  req.session.data['new-prc-issuing-ms'] = newPRCIssuingMS;

  // Extract the PRC Last name from the form
  const newPRCLastName = req.body['new-prc-last-name'];
  // Store the PRC Last name in the session data
  req.session.data['new-prc-last-name'] = newPRCLastName;

  // Extract the PRC First names from the form
  const newPRCFirstNames = req.body['new-prc-first-names'];
  // Store the PRC First names in the session data
  req.session.data['new-prc-first-names'] = newPRCFirstNames;

  // Extract the PRC date of birth from the request body
  const newPRCDateOfBirthDay = req.body['new-prc-date-of-birth-day'];
  const newPRCDateOfBirthMonth = req.body['new-prc-date-of-birth-month'];
  const newPRCDateOfBirthYear = req.body['new-prc-date-of-birth-year'];

  // Combine to form the full date (or use a default if not provided)
  const newPRCDateOfBirth = newPRCDateOfBirthDay && newPRCDateOfBirthMonth && newPRCDateOfBirthYear
  ? `${newPRCDateOfBirthDay}/${newPRCDateOfBirthMonth}/${newPRCDateOfBirthYear}` 
  : '13/12/1994';
  // Store the person's date of birth in the session data
  req.session.data['new-prc-date-of-birth'] = newPRCDateOfBirth;

  // Extract the PRC Personal Identification Number (PIN) from the form
  const newPRCPIN = req.body['new-prc-pin'];
  // Store the PRC Personal Identification Number (PIN) in the session data
  req.session.data['new-prc-pin'] = newPRCPIN;

  // EHIC information if provided on PRC
  // Extract the EHIC Card Number from the form
  const newPRCEHICCardNumber = req.body['new-prc-ehic-card-number'];
  // Store the EHIC Card Number in the session data
  req.session.data['new-prc-ehic-card-number'] = newPRCEHICCardNumber;

  // Extract the PRC date of birth from the request body
  const newPRCEHICExpiryDateDay = req.body['new-prc-ehic-expiry-date-day'];
  const newPRCEHICExpiryDateMonth = req.body['new-prc-ehic-expiry-date-month'];
  const newPRCEHICExpiryDateYear = req.body['new-prc-ehic-expiry-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const newPRCEHICExpiryDate = newPRCEHICExpiryDateDay && newPRCEHICExpiryDateMonth && newPRCEHICExpiryDateYear
  ? `${newPRCEHICExpiryDateDay}/${newPRCEHICExpiryDateMonth}/${newPRCEHICExpiryDateYear}` 
  : '31/12/2025';
  // Store the PRC EHIC expiry date in the session data
  req.session.data['new-prc-ehic-expiry-date'] = newPRCEHICExpiryDate;

  // PRC Dates
  // Extract the PRC Start date from the form
  const newPRCStartDateDay = req.body['new-prc-start-date-day'];
  const newPRCStartDateMonth = req.body['new-prc-start-date-month'];
  const newPRCStartDateYear = req.body['new-prc-start-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const newPRCStartDate = newPRCStartDateDay && newPRCStartDateMonth && newPRCStartDateYear
  ? `${newPRCStartDateDay}/${newPRCStartDateMonth}/${newPRCStartDateYear}` 
  : '31/12/2025';
  // Store the PRC start date in the session data
  req.session.data['new-prc-start-date'] = newPRCStartDate;

  // Extract the PRC End date from the form
  const newPRCEndDateDay = req.body['new-prc-end-date-day'];
  const newPRCEndDateMonth = req.body['new-prc-end-date-month'];
  const newPRCEndDateYear = req.body['new-prc-end-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const newPRCEndDate = newPRCEndDateDay && newPRCEndDateMonth && newPRCEndDateYear
  ? `${newPRCEndDateDay}/${newPRCEndDateMonth}/${newPRCEndDateYear}` 
  : '31/12/2025';
  // Store the PRC end date in the session data
  req.session.data['new-prc-end-date'] = newPRCEndDate;

  // Extract the PRC Issue date from the form
  const newPRCIssueDateDay = req.body['new-prc-issue-date-day'];
  const newPRCIssueDateMonth = req.body['new-prc-issue-date-month'];
  const newPRCIssueDateYear = req.body['new-prc-issue-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const newPRCIssueDate = newPRCIssueDateDay && newPRCIssueDateMonth && newPRCIssueDateYear
  ? `${newPRCIssueDateDay}/${newPRCIssueDateMonth}/${newPRCIssueDateYear}` 
  : '31/12/2025';
  // Store the PRC issue date in the session data
  req.session.data['new-prc-issue-date'] = newPRCIssueDate;

  // Check if Student checkbox was ticked
  const isStudentPRC = req.body['new-prc-student'] === 'yes';
  // Store result in the session
  req.session.data['new-prc-student'] = isStudentPRC;

  // Redirect to search for the institution that issued the PRC
  res.redirect('/multi-trust-reporting/version-1/prc-search-for-institution-id');
});

// Search for the institution that issued the entitlement (PRC)
router.post('/prc-search-for-institution-id', function (req, res) {

  // Extract the institution ID from the form
  const prcInstitutionID = req.body['prc-institution-id'];

  // Store the institution ID in the session data
  req.session.data['prc-institution-id'] = prcInstitutionID;

  // Redirect to search for institution results page
  res.redirect('/multi-trust-reporting/version-1/prc-search-for-institution-id-results#result');
});

// Upload a copy of the entitlement (PRC)
router.post('/upload-prc', function (req, res) {

  // Redirect to review the uploaded copy of the PRC
  res.redirect('/multi-trust-reporting/version-1/review-uploaded-prc');
});

// Review the upload file (PRC)
router.post('/review-uploaded-prc', function (req, res) {

  // Redirect to review the uploaded copy of the PRC
  res.redirect('/multi-trust-reporting/version-1/prc-known-address');
});

// Do you know the patient's address?
router.post('/prc-known-address', function (req, res) {

  var prcKnowAddress = req.session.data['prc-know-address'];
  
  if (prcKnowAddress === 'Yes') {
    res.redirect('/multi-trust-reporting/version-1/prc-enter-address');
  } else {
    res.redirect('/multi-trust-reporting/version-1/prc-details-cya');
  }
});

// Enter the person's address
router.post('/prc-enter-address', function (req, res) {

  // Extract Address Line 1 from the form
  const newPRCAddressLine1 = req.body['new-prc-address-line-1'];
  // Store Address Line 1 in the session data
  req.session.data['new-prc-address-line-1'] = newPRCAddressLine1;

  // Extract Address Line 2 from the form
  const newPRCAddressLine2 = req.body['new-prc-address-line-2'];
  // Store Address Line 2 in the session data
  req.session.data['new-prc-address-line-2'] = newPRCAddressLine2;

  // Extract Address Line 3 from the form
  const newPRCAddressLine3 = req.body['new-prc-address-line-3'];
  // Store Address Line 3 in the session data
  req.session.data['new-prc-address-line-3'] = newPRCAddressLine3;

  // Extract Country from the form
  const newPRCAddressCountry = req.body['new-prc-address-country'];
  // Store Address Line 1 in the session data
  req.session.data['new-prc-address-country'] = newPRCAddressCountry;

  // Redirect to search for institution results page
  res.redirect('/multi-trust-reporting/version-1/new-prc-details-cya');
});

// Check treatment, PRC and person details
router.post('/new-prc-details-cya', function (req, res) {

  // Redirect to confirmation treatment form processed screen
  res.redirect('/multi-trust-reporting/version-1/confirmation-prc-treatment-processed');
});

// Add another treatment (PRC)
router.post('/confirmation-prc-treatment-processed', function (req, res) {

  var prcAddAnotherTreatmentSamePerson = req.session.data['prc-add-another-treatment-for-same-person'];
  
  if (prcAddAnotherTreatmentSamePerson === 'For John Doe') {
    res.redirect('/multi-trust-reporting/version-1/add-treatment-johndoe');
  } else {
    res.redirect('/multi-trust-reporting/version-1/add-treatment');
  }
});

module.exports = router

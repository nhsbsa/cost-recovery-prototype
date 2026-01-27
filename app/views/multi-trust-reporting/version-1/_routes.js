const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const trustsByRegion = require('../../../data/trusts-by-region');

router.use(bodyParser.json()); // to support JSON bodies
router.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Request a new ROVT account //

//
// DEMO - POST ACTION
// Used to add the items
// 
router.post(['/demo/','/demo/index'], function( req, res ){

  const toAdd = req.session.data.trustName;

  if( toAdd ){

    // Here we're basically creating a pipe separated list of everything that's been selected...
    const selectedTrusts = req.session.data.selectedTrusts;

    if( !selectedTrusts ){
      // The variable is blank
      req.session.data.selectedTrusts = toAdd;
    } else {
      // The variable is already populated, so add to it if the trust doesn't already exist in the list...
      if( selectedTrusts.indexOf( toAdd ) === -1 ){
        req.session.data.selectedTrusts += '|'+toAdd;
      }
    }
    
  }

  res.redirect('/multi-trust-reporting/version-1/demo/');

});

//
// DEMO - GET ACTION
// Used to remove the items
//
router.get(['/demo/','/demo/index'], function( req, res ){

  if( req.originalUrl.indexOf('?removeItem=') > -1 ){

    // There's an item to remove...
    const urlSplit = req.originalUrl.split('?');
    const searchParams = new URLSearchParams( urlSplit[urlSplit.length-1] );
    const toRemove = parseInt( searchParams.get('removeItem') );

    // Get the selected trusts and turn them into an array
    const selectedTrusts = ( req.session.data.selectedTrusts ) ? req.session.data.selectedTrusts.split('|') : [];

    if( !Number.isNaN( toRemove ) && toRemove < selectedTrusts.length  ){

      // Remove the item, and turn back into pipe list and put back into the variable
      selectedTrusts.splice( toRemove, 1 );
      req.session.data.selectedTrusts = selectedTrusts.join('|');
    }

    res.redirect('/multi-trust-reporting/version-1/demo/');

  } else {

    // Render as usual
    res.render( 'multi-trust-reporting/version-1/demo/index' );
  }

});




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

// POST: Add selected trust to session
router.post('/new-account-select-trust', function(req, res) {

  const toAdd = req.body['newAccountTrustName']; // matches select name

  if (toAdd) {
    const current = req.session.data.selectedTrustsNewAccount;

    if (!current) {
      req.session.data.selectedTrustsNewAccount = toAdd;
    } else if (!current.split('|').includes(toAdd)) {
      req.session.data.selectedTrustsNewAccount += '|' + toAdd;
    }
  }

  res.redirect('/multi-trust-reporting/version-1/new-account-select-trust');
});

router.get('/new-account-select-trust', function(req, res) {

  // Handle removal logic (unchanged)
  if (req.originalUrl.includes('?removeItem=')) {
    const urlSplit = req.originalUrl.split('?');
    const searchParams = new URLSearchParams(urlSplit[urlSplit.length - 1]);
    const toRemove = parseInt(searchParams.get('removeItem'));

    const selected = req.session.data.selectedTrustsNewAccount
      ? req.session.data.selectedTrustsNewAccount.split('|')
      : [];

    if (!Number.isNaN(toRemove) && toRemove < selected.length) {
      selected.splice(toRemove, 1);
      req.session.data.selectedTrustsNewAccount = selected.join('|');
    }

    res.redirect('/multi-trust-reporting/version-1/new-account-select-trust');
    return;
  }

  const region = req.session.data['new-account-region'];
  const trusts = trustsByRegion[region] || [];

  const selectedTrusts = req.session.data.selectedTrustsNewAccount
    ? req.session.data.selectedTrustsNewAccount.split('|')
    : [];

  const allTrusts = [...trusts, ...selectedTrusts.map(val => ({ value: val, text: val }))];

  res.render('multi-trust-reporting/version-1/new-account-select-trust', {
    data: {
      ...req.session.data,
      selectedTrustsNewAccount: req.session.data.selectedTrustsNewAccount || ''
    },
    trusts: allTrusts
  });

});


// GET: CYA (Check Your Answers) for new account
router.get('/new-account-cya', function(req, res) {

  const selected = req.session.data.selectedTrustsNewAccount || '';
  const selectedTrustsArray = selected ? selected.split('|') : [];

  res.render('multi-trust-reporting/version-1/new-account-cya', {
    data: {
      ...req.session.data,
      selectedTrustsArray: selectedTrustsArray
    }
  });
});

// POST: Submit new account request
router.post('/new-account-cya', function(req, res) {
  // Set flag that a new account request was submitted
  req.session.data['new-account-request-submitted'] = 'yes';
  // Redirect to confirmation new account request received screen
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


// Sign into ROVT //
// Select which trust you'd like to sign into
router.post('/sign-in-select-trust', function (req, res) {
  const signIntoTrustName = req.session.data['sign-into-trust-name'];
  
  // Save the trust in the session data
  req.session.data['sign-into-trust-name'] = signIntoTrustName;

  // Redirect to the Home screen
  res.redirect('/multi-trust-reporting/version-1/home');
});


// Manage trust access //
// Switch trust view
router.post('/manage-trust-access', function (req, res) {
  const trustName = req.session.data['trust-name'];
  
  // Save the trust in the session data
  req.session.data['trust-name'] = trustName;

  // Set flag that the user switched their view to a different trust
  req.session.data['change-trust-view'] = 'yes'

  // Redirect to the Home screen
  res.redirect('/multi-trust-reporting/version-1/home');
});


// POST: Select trusts you require access to - Used to add the items
router.post(['/request-access-to-other-trusts','/request-access-to-other-trusts'], function( req, res ){

  const toAdd = req.session.data.trustName;

  // Initialize selectedTrusts as an array
  let selectedTrusts = req.session.data.selectedTrusts
    ? req.session.data.selectedTrusts.split('|')
    : [];

  // Add the trust if not already in the list
  if (toAdd && !selectedTrusts.includes(toAdd)) {
    selectedTrusts.push(toAdd);
    req.session.data.selectedTrusts = selectedTrusts.join('|');
  }

  // Set error flag if Gateshead
  if (toAdd === 'Gateshead Health NHS Foundation Trust') {
    req.session.data.errorTrust = true;  // store flag in session
  } else {
    req.session.data.errorTrust = false; // clear previous error
  }

  // Save the trust the user just added, for pre-selection
  req.session.data.selectedTrust = toAdd;

  // Always redirect
  res.redirect('/multi-trust-reporting/version-1/request-access-to-other-trusts');
});


// GET: Select trusts you require access to - Used to remove the items
router.get('/request-access-to-other-trusts', function(req, res) {

  // Check if there is an item to remove
  if (req.originalUrl.includes('?removeItem=')) {
    const urlSplit = req.originalUrl.split('?');
    const searchParams = new URLSearchParams(urlSplit[urlSplit.length - 1]);
    const toRemove = parseInt(searchParams.get('removeItem'));

    // Get the selected trusts as array
    const selectedTrusts = req.session.data.selectedTrusts
      ? req.session.data.selectedTrusts.split('|')
      : [];

    if (!Number.isNaN(toRemove) && toRemove < selectedTrusts.length) {
      selectedTrusts.splice(toRemove, 1);
      req.session.data.selectedTrusts = selectedTrusts.join('|');
    }

    // Redirect back to the same page
    res.redirect('/multi-trust-reporting/version-1/request-access-to-other-trusts');
    return;
  }

  // Normal render if no removeItem query
  res.render('multi-trust-reporting/version-1/request-access-to-other-trusts', {
    data: {
      ...req.session.data,
      selectedTrusts: req.session.data.selectedTrusts || ''
    }
  });
});


router.get('/cya-request-access-to-other-trusts', function(req, res) {

  // Get selected trusts as pipe-separated string from session
  const selectedTrusts = req.session.data.selectedTrusts || '';

  // Split into an array for the template
  const selectedTrustsArray = selectedTrusts ? selectedTrusts.split('|') : [];

  // Render template and pass array
  res.render('multi-trust-reporting/version-1/cya-request-access-to-other-trusts', {
    data: {
      ...req.session.data,
      selectedTrustsArray: selectedTrustsArray
    }
  });
});

// Check before submitting trust access request
router.post('/cya-request-access-to-other-trusts', function (req, res) {

  // Set flag that the user submitted the request
  req.session.data['trust-access-request-submitted'] = 'yes';

  // Redirect to the confirmation screen
  res.redirect('/multi-trust-reporting/version-1/confirmation-trust-access-request-submitted');
});


// Confirmation trust access request submitted
router.post('/confirmation-trust-access-request-submitted', function (req, res) {
  // Redirect to the Home screen
  res.redirect('/multi-trust-reporting/version-1/home');
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

  // Set flag that a new EHIC treatment was added
  req.session.data['new-ehic-treatment'] = 'yes'

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

  // Set flag that a new treatment was added to an existing PRC
  req.session.data['add-new-treatment-to-existing-prc'] = 'yes'

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

  // Set flag that a new PRC treatment was uploaded
  req.session.data['new-prc-treatment'] = 'yes'

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


// S2/E112 Journey //

// Search for the person (S2/E112)
router.post('/s2-search-for-person', function (req, res) {
  // Extract the person's first names from the form
  const s2FirstNames = req.body['s2-first-names'];

  // Store the first names in the session data
  req.session.data['s2-first-names'] = s2FirstNames;

  // Extract the person's last name from the form
  const s2LastName = req.body['s2-last-name'];

  // Store the first names in the session data
  req.session.data['s2-last-name'] = s2LastName;

  // Extract the date of birth from the request body
  const s2DateOfBirthDay = req.body['s2-date-of-birth-day'];
  const s2DateOfBirthMonth = req.body['s2-date-of-birth-month'];
  const s2DateOfBirthYear = req.body['s2-date-of-birth-year'];

  // Combine to form the full date (or use a default if not provided)
  const s2DateOfBirth = s2DateOfBirthDay && s2DateOfBirthMonth && s2DateOfBirthYear
  ? `${s2DateOfBirthDay}/${s2DateOfBirthMonth}/${s2DateOfBirthYear}` 
  : '13/12/1994';
  // Store the person's date of birth in the session data
  req.session.data['s2-date-of-birth'] = s2DateOfBirth;

  // Redirect to check your answers
  res.redirect('/multi-trust-reporting/version-1/s2-search-for-person-results');
});

// Do you have a copy of the S2/E112?
router.post('/copy-of-s2', function (req, res) {

  var s2HaveCopy = req.session.data['s2-have-copy'];
  
  if (s2HaveCopy === 'Yes') {
    res.redirect('/multi-trust-reporting/version-1/add-person-s2');
  } else {
    res.redirect('/multi-trust-reporting/version-1/s2-contact-cr');
  }
});

// Add a new person (S2/E112)
router.post('/add-person-s2', function (req, res) {

  // Extract the S2/E112 issuing Member State from the form
  const newS2IssuingMS = req.body['new-s2-issuing-ms'];
  // Store the S2/E112 issuing Member State in the session data
  req.session.data['new-s2-issuing-ms'] = newS2IssuingMS;

  // Extract the S2/E112 Last name from the form
  const newS2LastName = req.body['new-s2-last-name'];
  // Store the S2/E112 Last name in the session data
  req.session.data['new-s2-last-name'] = newS2LastName;

  // Extract the S2/E112 First names from the form
  const newS2FirstNames = req.body['new-s2-first-names'];
  // Store the S2/E112 First names in the session data
  req.session.data['new-s2-first-names'] = newS2FirstNames;

  // Extract the S2/E112 date of birth from the request body
  const newS2DateOfBirthDay = req.body['new-s2-date-of-birth-day'];
  const newS2DateOfBirthMonth = req.body['new-s2-date-of-birth-month'];
  const newS2DateOfBirthYear = req.body['new-s2-date-of-birth-year'];

  // Combine to form the full date (or use a default if not provided)
  const newS2DateOfBirth = newS2DateOfBirthDay && newS2DateOfBirthMonth && newS2DateOfBirthYear
  ? `${newS2DateOfBirthDay}/${newS2DateOfBirthMonth}/${newS2DateOfBirthYear}` 
  : '13/12/1994';
  // Store the person's date of birth in the session data
  req.session.data['new-s2-date-of-birth'] = newS2DateOfBirth;

  // Extract the S2/E112 Personal Identification Number (PIN) from the form
  const newS2PIN = req.body['new-s2-pin'];
  // Store the S2/E112 Personal Identification Number (PIN) in the session data
  req.session.data['new-s2-pin'] = newS2PIN;

  // S2/E112 Dates
  // Extract the S2/E112 Issue date from the form
  const newS2IssueDateDay = req.body['new-s2-issue-date-day'];
  const newS2IssueDateMonth = req.body['new-s2-issue-date-month'];
  const newS2IssueDateYear = req.body['new-s2-issue-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const newS2IssueDate = newS2IssueDateDay && newS2IssueDateMonth && newS2IssueDateYear
  ? `${newS2IssueDateDay}/${newS2IssueDateMonth}/${newS2IssueDateYear}` 
  : '31/12/2025';
  // Store the S2/E112 issue date in the session data
  req.session.data['new-s2-issue-date'] = newS2IssueDate;

  // Extract the S2/E112 Start date from the form
  const newS2StartDateDay = req.body['new-s2-start-date-day'];
  const newS2StartDateMonth = req.body['new-s2-start-date-month'];
  const newS2StartDateYear = req.body['new-s2-start-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const newS2StartDate = newS2StartDateDay && newS2StartDateMonth && newS2StartDateYear
  ? `${newS2StartDateDay}/${newS2StartDateMonth}/${newS2StartDateYear}` 
  : '31/12/2025';
  // Store the S2/E112 start date in the session data
  req.session.data['new-s2-start-date'] = newS2StartDate;

  // Extract the S2/E112 End date from the form
  const newS2EndDateDay = req.body['new-s2-end-date-day'];
  const newS2EndDateMonth = req.body['new-s2-end-date-month'];
  const newS2EndDateYear = req.body['new-s2-end-date-year'];

  // Combine to form the full date (or use a default if not provided)
  const newS2EndDate = newS2EndDateDay && newS2EndDateMonth && newS2EndDateYear
  ? `${newS2EndDateDay}/${newS2EndDateMonth}/${newS2EndDateYear}` 
  : '31/12/2025';
  // Store the S2/E112 end date in the session data
  req.session.data['new-s2-end-date'] = newS2EndDate;

  // Redirect to search for the institution that issued the S2/E112
  res.redirect('/multi-trust-reporting/version-1/s2-search-for-institution-id');
});

// Search for the institution that issued the entitlement (S2/E112)
router.post('/s2-search-for-institution-id', function (req, res) {

  // Extract the institution ID from the form
  const s2InstitutionID = req.body['s2-institution-id'];

  // Store the institution ID in the session data
  req.session.data['s2-institution-id'] = s2InstitutionID;

  // Redirect to search for institution results page
  res.redirect('/multi-trust-reporting/version-1/s2-search-for-institution-id-results#result');
});

// Enter the person's address
router.post('/s2-enter-address', function (req, res) {

  // Extract Address Line 1 from the form
  const newS2AddressLine1 = req.body['new-s2-address-line-1'];
  // Store Address Line 1 in the session data
  req.session.data['new-s2-address-line-1'] = newS2AddressLine1;

  // Extract Address Line 2 from the form
  const newS2AddressLine2 = req.body['new-s2-address-line-2'];
  // Store Address Line 2 in the session data
  req.session.data['new-s2-address-line-2'] = newS2AddressLine2;

  // Extract Address Line 3 from the form
  const newS2AddressLine3 = req.body['new-s2-address-line-3'];
  // Store Address Line 3 in the session data
  req.session.data['new-s2-address-line-3'] = newS2AddressLine3;

  // Extract Country from the form
  const newS2AddressCountry = req.body['new-s2-address-country'];
  // Store Address Line 1 in the session data
  req.session.data['new-s2-address-country'] = newS2AddressCountry;

  // Redirect to search for institution results page
  res.redirect('/multi-trust-reporting/version-1/new-s2-details-cya');
});

// Check treatment, S2/E112 and person details
router.post('/new-s2-details-cya', function (req, res) {

  // Set flag that a new S2/E112 treatment was added
  req.session.data['new-s2-treatment'] = 'yes'

  // Redirect to confirmation treatment form processed screen
  res.redirect('/multi-trust-reporting/version-1/confirmation-s2-treatment-processed');
});

// Confirmation S2/E112 treatment processed
router.post('/confirmation-s2-treatment-processed', function (req, res) {
 // Redirect to Home screen
 res.redirect('/multi-trust-reporting/version-1/home');
});


// Malta Quota journey //

// Enter the Malta Quota number for the patient
router.post('/ehic-search-for-person', function (req, res) {
  // Extract the person's Malta Quota number
  const maltaQuotaNumber = req.body['malta-quota-number'];

  // Store the Malta Quota number in the session data
  req.session.data['malta-quota-number'] = maltaQuotaNumber;

  // Redirect to check your answers
  res.redirect('/multi-trust-reporting/version-1/ehic-search-for-person-results');
});


// Non-EU Reciprocal Healthcare journey //

// Add a new person (Non-EU Reciprocal Healthcare)
router.post('/non-eu-enter-patient-details', function (req, res) {

  // Extract the Non-EU Reciprocal Healthcare issuing country from the form
  const newNonEUIssuingCountry = req.body['new-non-eu-issuing-country'];
  // Store the Non-EU Reciprocal Healthcare issuing country in the session data
  req.session.data['new-non-eu-issuing-country'] = newNonEUIssuingCountry;

  // Extract the Non-EU Reciprocal Healthcare Last name from the form
  const newNonEULastName = req.body['new-non-eu-last-name'];
  // Store the Non-EU Reciprocal Healthcare Last name in the session data
  req.session.data['new-non-eu-last-name'] = newNonEULastName;

  // Extract the Non-EU Reciprocal Healthcare First names from the form
  const newNonEUFirstNames = req.body['new-non-eu-first-names'];
  // Store the Non-EU Reciprocal Healthcare First names in the session data
  req.session.data['new-non-eu-first-names'] = newNonEUFirstNames;

  // Extract the Non-EU Reciprocal Healthcare date of birth from the request body
  const newNonEUDateOfBirthDay = req.body['new-non-eu-date-of-birth-day'];
  const newNonEUDateOfBirthMonth = req.body['new-non-eu-date-of-birth-month'];
  const newNonEUDateOfBirthYear = req.body['new-non-eu-date-of-birth-year'];

  // Combine to form the full date (or use a default if not provided)
  const newNonEUDateOfBirth = newNonEUDateOfBirthDay && newNonEUDateOfBirthMonth && newNonEUDateOfBirthYear
  ? `${newNonEUDateOfBirthDay}/${newNonEUDateOfBirthMonth}/${newNonEUDateOfBirthYear}` 
  : '13/12/1994';
  // Store the person's date of birth in the session data
  req.session.data['new-non-eu-date-of-birth'] = newNonEUDateOfBirth;

  // Redirect to check the patient's Non-EU Reciprocal Healthcare details
  res.redirect('/multi-trust-reporting/version-1/new-non-eu-details-cya');
});

// Check treatment, PRC and person details
router.post('/new-non-eu-details-cya', function (req, res) {

  // Set flag that a new Non-EU Reciprocal Healthcare treatment was added
  req.session.data['new-non-eu-treatment'] = 'yes'

  // Redirect to confirmation Non-EU Reciprocal Healthcare treatment form processed screen
  res.redirect('/multi-trust-reporting/version-1/confirmation-non-eu-treatment-processed');
});

// Confirmation Non-EU Reciprocal Healthcare treatment processed
router.post('/confirmation-non-eu-treatment-processed', function (req, res) {
  var nonEUAddAnotherTreatment = req.session.data['non-eu-add-another-treatment'];
  
  if (nonEUAddAnotherTreatment === 'Yes, for John Doe') {
    res.redirect('/multi-trust-reporting/version-1/add-treatment-johndoe');
  } else if (nonEUAddAnotherTreatment === 'Yes, for another person') {
    res.redirect('/multi-trust-reporting/version-1/add-treatment');
  } else {
    res.redirect('/multi-trust-reporting/version-1/home');
  }
});


// Internal trust search for person //
// Search for person by personal details
router.post('/search-person', function (req, res) {
  // Extract the person's first names from the form
  const internalTrustSearchFirstNames = req.body['internal-trust-search-first-names'];

  // Store the first names in the session data
  req.session.data['internal-trust-search-first-names'] = internalTrustSearchFirstNames;

  // Extract the person's last name from the form
  const internalTrustSearchLastName = req.body['internal-trust-search-last-name'];

  // Store the first names in the session data
  req.session.data['internal-trust-search-last-name'] = internalTrustSearchLastName;

  // Extract the date of birth from the request body
  const internalTrustSearchDateOfBirthDay = req.body['internal-trust-search-date-of-birth-day'];
  const internalTrustSearchDateOfBirthMonth = req.body['internal-trust-search-date-of-birth-month'];
  const internalTrustSearchDateOfBirthYear = req.body['internal-trust-search-date-of-birth-year'];

  // Combine to form the full date (or use a default if not provided)
  const internalTrustSearchDateOfBirth = internalTrustSearchDateOfBirthDay && internalTrustSearchDateOfBirthMonth && internalTrustSearchDateOfBirthYear
  ? `${internalTrustSearchDateOfBirthDay}/${internalTrustSearchDateOfBirthMonth}/${internalTrustSearchDateOfBirthYear}` 
  : '13/12/1994';
  // Store the person's date of birth in the session data
  req.session.data['internal-trust-search-date-of-birth'] = internalTrustSearchDateOfBirth;

  // Extract the entitlement registration country
  const internalTrustSearchEntitlementRegistrationCountry = req.body['internal-trust-search-entitlement-registration-country'];

  // Store the entitlement registration country in the session data
  req.session.data['internal-trust-search-entitlement-registration-country'] = internalTrustSearchEntitlementRegistrationCountry;

  // Redirect to person search results
  res.redirect('/multi-trust-reporting/version-1/search-person-results');
});

// Search for person by treatment ID
router.post('/search-person-by-treatment-id', function (req, res) {
  // Extract the treatment ID
  const internalTrustSearchTreatmentID = req.body['internal-trust-search-treatment-id'];

  // Store the treatment ID in the session data
  req.session.data['internal-trust-search-treatment-id'] = internalTrustSearchTreatmentID;

  // Redirect to person search by treatment ID results
  res.redirect('/multi-trust-reporting/version-1/search-person-by-treatment-id-results');
});

// View EHIC details
router.post('/view-ehic-details-johndoe', function (req, res) {
  // Redirect to treatment record
  res.redirect('/multi-trust-reporting/version-1/treatment-record-johndoe');
});
module.exports = router

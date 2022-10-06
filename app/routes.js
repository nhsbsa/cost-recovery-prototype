// External dependencies
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // to support JSON bodies
router.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Add your routes here - above the module.exports line
router.get('/', function(req , res){ 
    res.render('index');
   });

// Start folder specific routes

router.use('/sprint-1', require('./views/sprint-1/_routes'));

router.use('/sprint-2', require('./views/sprint-2/_routes'));

router.use('/sprint-3', require('./views/sprint-3/_routes'));

router.use('/sprint-4', require('./views/sprint-4/_routes'));

router.use('/sprint-5/search', require('./views/sprint-5/_routes'));

router.use('/sprint-5/search-no-results', require('./views/sprint-5/_routes'));

router.use('/sprint-6/search', require('./views/sprint-6/_routes'));

router.use('/sprint-6/search-no-results', require('./views/sprint-6/_routes'));

router.use('/sprint-7/search', require('./views/sprint-7/_routes'));

router.use('/sprint-7/search-no-results', require('./views/sprint-7/_routes'));

router.use('/sprint-8/search', require('./views/sprint-8/_routes'));

router.use('/sprint-8/search-no-results', require('./views/sprint-8/_routes'));

router.use('/sprint-9/search', require('./views/sprint-9/_routes'));

router.use('/sprint-9/search-no-results', require('./views/sprint-9/_routes'));

router.use('/sprint-10/search', require('./views/sprint-10/_routes'));

router.use('/sprint-10/search-no-results', require('./views/sprint-10/_routes'));

router.use('/sprint-11/search', require('./views/sprint-11/_routes'));

router.use('/sprint-11/search-no-results', require('./views/sprint-11/_routes'));

router.use('/sprint-12/search', require('./views/sprint-12/_routes'));

router.use('/sprint-12/search-no-results', require('./views/sprint-12/_routes'));

router.use('/sprint-13/search', require('./views/sprint-13/_routes'));

router.use('/sprint-13/search-no-results', require('./views/sprint-13/_routes'));

router.use('/sprint-14/search', require('./views/sprint-14/_routes'));

router.use('/sprint-14/search-no-results', require('./views/sprint-14/_routes'));

router.use('/sprint-15/search', require('./views/sprint-15/_routes'));

router.use('/sprint-15/search-no-results', require('./views/sprint-15/_routes'));

router.use('/sprint-16/search', require('./views/sprint-16/_routes'));

router.use('/sprint-16/search-no-results', require('./views/sprint-16/_routes'));

router.use('/pb6/search', require('./views/pb6/_routes'));

router.use('/pb6/malta-quota-search', require('./views/pb6/_routes'));

router.use('/pb6/malta-additional-treatments', require('./views/pb6/_routes'));






module.exports = router;

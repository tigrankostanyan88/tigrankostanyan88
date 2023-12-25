// Modules
const { Router } = require('express');

// Controllers
const ctrls = require('../controllers');
// Routes
const router = Router();

router.get('/', ctrls.view.getHome);
router.get('/tests', ctrls.view.getTests);

module.exports = router;
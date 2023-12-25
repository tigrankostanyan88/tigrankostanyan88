// Modules
const { Router } = require('express'); // 🚀

// Controllers
const ctrls = require('../controllers');

const router = Router();

// Admin routes
router.get('/', ctrls.view.getAdmin);

module.exports = router;
const express = require('express');
const authController = require('../controllers/authController'); // No need for '.js' extension in CommonJS

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/refresh').get(authController.refresh);
router.route('/logout').post(authController.logout);
router.route('/register').post(authController.register);

module.exports = router; // Use CommonJS export

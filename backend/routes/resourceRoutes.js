const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const authMiddleware = require('../middleware/verifyJWT');

// Protect all routes with authentication middleware
router.use(authMiddleware);

// Create resource route (POST) 
router.post('/:disasterId/resources', async (req, res) => {
    try {
        await resourceController.createResource(req, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get resources by disaster ID (GET)
router.get('/:disasterId/resources', async (req, res) => {
    try {
        await resourceController.getResourcesByDisaster(req, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

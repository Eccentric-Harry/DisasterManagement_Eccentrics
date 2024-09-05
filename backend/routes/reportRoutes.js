const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/verifyJWT');

router.use(authMiddleware);

router.post('/:disasterId/report', async (req, res) => {
    try {
        await reportController.createReport(req, res);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/:disasterId/reports', async (req, res) => {
    try {
        await reportController.getReportsByDisaster(req, res);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;
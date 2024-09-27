const express = require('express');
const router = express.Router();
const disasterController = require('../controllers/disasterController');
const authMiddleware = require('../middleware/verifyJWT');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.use(authMiddleware);

router.post('/reportdisaster', upload.single('image'), async (req, res) => {
    const imageName = req.file.filename;
    req.body.image = imageName;
    try {
        await authMiddleware,disasterController.reportDisaster(req, res);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/disasters', async (req, res) => {
    try {
        await disasterController.getDisasters(req, res);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/disasters/:id', async (req, res) => {
    try {
        await disasterController.getDisasterById(req, res);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/disasters/user/:userId', async (req, res) => {
    try {
        await disasterController.getUserDisasters(req, res);
    }
    catch (err) {
        console.log(err);
    }
});

router.put('/disasters/:id', upload.single('image'), async (req, res) => {
    try {
        await disasterController.updateDisaster(req, res);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .get(usersControllers.getAllUsers)
    .post(usersControllers.craeteNewUser)
    .patch(usersControllers.updateUser)
    .delete(usersControllers.deleteUser);


router.post('/register',(req,res) => {
    const {username,email,password} = req.body;
})

// module.exports = UserRouter;
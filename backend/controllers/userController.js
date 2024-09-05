const User = require('../models/User');
const Disaster = require('../models/Disaster');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc    Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length){
        return res.status(400).json({message: 'No users found'});
    }
    res.json(users);
})

// @desc    Create a new user
// @route POST /users
// @access Private
const craeteNewUser = asyncHandler(async(req,res) => {
    const {username, password, roles} = req.body;

    //Confirm data
    if(!username || !password || !Array.isArray || !roles.length){
       return res.status(400).json({message: 'All fields are required'}); 
    }

    //Check for duplicates
    const duplicateUser = await User.findOne({username}).lean().exec();

    if (duplicateUser){
        return res.status(409).json({message: 'Duplicate Username'});
    }
    
    //Hash password
    const hashedPWD = await bcrypt.hash(password, 10); //salt rounds

    //User object
    const userObject = {username, "password":hashedPWD, roles}

    //Create and store new user
    const user = await User.create(userObject)

    if (user) {
        //created
        res.status(201).json({message:`New user ${username} craeted.`})
    } else{
        res.status(400).json({message: 'Invalid user data received.'})
    }

})

// @desc    Update a user
//@route PATCH /users/:id
//@access Private
const updateUser = asyncHandler (async(req,res) => {
    const {id,username,role,active,password} = req.body

    //Confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({message: 'All fields are required'});
    }
    const user = await User.findById(id).exec();

    if(!user){
        return res.status(400).json({message:'User not found'});
    }

    //Check for duplicate user
    const duplicateUser = await User.findOne({username}).lean().exec();
    //Allow updates to the original user
    if (duplicateUser && duplicateUser?._id.toString() !==id ){
        return res.status(409).json({message:'Dulpicate username'});
    }

    user.username = username;
    user.roles = roles;
    user.active;

    if (password){
        //Hash password
        user.password=await bcrypt.hash(password,10); //Salt rounds
    }

    const updatedUser = await user.save();

    res.json({message: `${updatedUser.username} updated`});

})

// @desc    Delete a user
//@route DELETE /users/:id
//@access Private
const deleteUser = asyncHandler (async(req,res) => {
    const { id } = req.body;

    if (!id){
        return res.status(400).json({message: 'User ID is required'});
    }

    const disaster = await Disaster({user:id}).lean().exec()

    if (disaster?.length){
        return res.status(400).json({message: 'User has an assigned disaster'});
    }

    const user = await User.findById(id).exec()

    if (!user){
        return res.status(400).json({message: 'User not found'})
    }

    const result = await user.deleteOne();
    const reply = `Username ${result.username} with ID${result._id} deleted`;

    res.json(reply);

})

module.exports = {
    getAllUsers,
    craeteNewUser,
    updateUser,
    deleteUser
}
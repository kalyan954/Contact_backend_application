const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req,res)=>{
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email, password);
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error('All fields are required');
    }
    const existingUser = await User.findOne({email});
    if(existingUser)
    {
        res.status(400);
        throw new Error('User already registerd');
    } 

    const hashedPassword = await bcrypt.hash(password,10);
    console.log('Hashed password :', hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if(user)
    {
        res.status(200).json({_id: user.id, email: user.email});
    }
    else 
    {
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({message: "User Register"});
})

const login = asyncHandler(async (req,res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn: "15m"}
        );
        res.status(200).json({accessToken});
    }
    else {
        res.status(401);
        throw new Error('email or password is not valid');
    }
});

const current = asyncHandler(async (req,res)=>{
    console.log(req.user);
    res.status(200).json(req.user);

})

module.exports = {
    register,
    login,
    current
}
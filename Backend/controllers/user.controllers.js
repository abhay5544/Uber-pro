const usermodel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenmodel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        if (!fullname?.firstname || !fullname?.lastname || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashPassword = await usermodel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email: email, 
            password: hashPassword
        });

        const token = await user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await usermodel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });  
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' }); 
        }

        const token = user.generateAuthToken();

        res.cookie('token', token );

        res.status(200).json({ token, user });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split('')[1];

    await blacklistTokenmodel.create({ token });
    
    res.status(200).json({ message: 'Logout successful' });
}
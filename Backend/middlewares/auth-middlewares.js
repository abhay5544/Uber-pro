const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenmodel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split('')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorizes'});
    }

    const blacklistToken = await blacklistTokenmodel.findOne({ token: token });

    if (blacklistToken) {
        return res.status(401).json({ error: 'Unauthorizes'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ erroe: 'Unauthorizes'});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split('')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorizes'});
    }

    const blacklistToken = await blacklistTokenmodel.findOne({ token: token });

    if (blacklistToken) {
        return res.status(401).json({ error: 'Unauthorizes'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await captainModel.findById(decoded._id);

        req.user = user;
        return next();
    } catch (err) { 
        return res.status(401).json({ erroe: 'Unauthorizes'});
    }
}








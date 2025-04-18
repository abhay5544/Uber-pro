const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');



module.exports.registercaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        if (!fullname?.firstname || !fullname?.lastname || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }


        const ifCaptainExists = await captainService.getCaptainByEmail(email);
        
        if (ifCaptainExists) {
            return res.status(400).json({ error: "Captain already exists" });
        }

        const hashPassword = await usermodel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = await user.generateAuthToken();

        res.status(201).json({ token, captain });
    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


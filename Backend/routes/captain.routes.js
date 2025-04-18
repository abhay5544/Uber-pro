const usercontroller = require('../controllers/captain.controllers');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middlewares');


router.post('/register', [
    body('email').isEmail().withMessage('invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('first name must be at Least 3 characters Long'),
    body('password').isLength({min: 6}).withMessage('password must be at Least 6 characters Long'),
    body ('vehicle.color').isLength({min: 3}).withMessage('color must be at Least 3 characters Long'),
    body("vehicle.plate").isLength({min: 3}).withMessage('plate must be at Least 3 characters Long'),
    body("vehicle.capacity").isInt().withMessage('capacity must be a least  1'),
    body("vehicle.vehicleType").isInt(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
],
   usercontroller.registercaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be at Least 6 characters Long')
],
 usercontroller.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain,  usercontroller.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain,  usercontroller.logoutCaptain);


module.exports = router;
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth-middlewares');


router.post('/register' , [
    body('email').isEmail().withMessage('invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('first name must be at Least 3 characters Long'),
    body('password').isLength({min: 6}).withMessage('password must be at Least 6 characters Long'),
],
   userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be at Least 6 characters Long')
],

 userController.loginUser
)

router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);


module.exports = router;
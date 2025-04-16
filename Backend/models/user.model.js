const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
           
        },

        lastname: {
            type: String,
        },

        email: {
            type: String,
            required: true,
            unique: true,
           
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        socketId: {
            type: String,

        }
    }
})

userSchema.methods.generateAuthToken = async function () {
        const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
        return token;
    }

    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    userSchema.statics.hashPassword = async function (password) {
        return await bcrypt.hash(password, 10);
    }

    const usermodel = mongoose.model('users', userSchema);

    module.exports = usermodel;

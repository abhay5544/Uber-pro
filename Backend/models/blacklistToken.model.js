const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');    

const blacklistTokenSchema = new mongoose.Schema({

    token: {
        type: String,
        required: true,
        unique: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }

});

captaninSchema.methods.generateAuthToken = async function () {
    token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captaninSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captaninSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);







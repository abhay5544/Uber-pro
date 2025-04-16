const User = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error("All fields are required");
    }

    const user = new User({ firstname, lastname, email, password });
    return await user.save();
};

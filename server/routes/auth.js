const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const config =  require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Site Model
const User = require('../models/user');

// @route   Post /auth
// @ desc   Authenticate the user
// @ access Public
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({msg: "Please enter all fields"});
        }

        // Check for esisting user
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({msg: "User does not exist"});
        }

        // Validate Password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({msg: "Invalid Credentials"});
        }

        const token = await jwt.sign(
            { id: existingUser.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 }
        );

        return res.status(200).json({
            token,
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email
        });
    }
    catch (e) {
        return res.status(400).json({ msg: e.message });
    }
});

// @route   Get /auth/user
// @ desc   Get the user data using token
// @ access Private
router.get('/user', auth, async (req, res) => {
    const user = await User.findById(req.user.id)
        .select('-password');

    console.log(user);

    return res.status(200).json(user);
});


module.exports = router;
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const config =  require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Site Model
const User = require('../../models/user');

// @route   Post /auth
// @ desc   Authenticate the user
// @ access Public
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({msg: "Please enter all fields"});
        }

        // Check for esisting user
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({msg: "User does not exist"});
        }

        // Validate Password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({msg: "Invalid Credentials"});
        }

        if (process.env.NODE_ENV === 'production') {
            var JWTSecret = process.env.jwtSecret;
        }
        else {
            var JWTSecret = config.get('jwtSecret');
        }

        const token = await jwt.sign(
            { id: existingUser.id },
            JWTSecret,
            { expiresIn: 3600 }
        );

        return res.status(200).json({
            token,
            user: {
                id: existingUser.id,
                username: existingUser.username
            }
            // id: existingUser.id,
            // username: existingUser.username
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
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) throw Error('User does not exist');
        res.status(200).json(user);
    } catch (e) {
        console.log(e);
        console.log(e.message );
        res.status(400).json({ msg: e.message });
    }
});


module.exports = router;
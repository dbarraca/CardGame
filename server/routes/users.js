const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const config =  require('config');
const jwt = require('jsonwebtoken');

// Site Model
const User = require('../models/user');

// @route   Post /users
// @ desc   Register new user
// @ access Public
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({msg: "Please enter all fields"});
        }

        // Check for esisting user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({msg: "User already exists"});
        }

        const newUser = new User( {
            name,
            email,
            password
        });

        // Create salt & hash
        const salt = await bcrypt.genSalt(10);
            
        const hash = await bcrypt.hash(newUser.password, salt);

        newUser.password = hash;
        newUser.save();
        
        const token = await jwt.sign(
            { id: newUser.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 }
        );

        return res.status(200).json({newUser: {
            token,
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }});
    }
    catch (e) {
        return res.status(400).json({ msg: e.message });
    }
});

module.exports = router;
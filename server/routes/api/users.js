const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const config =  require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Site Model
const User = require('../../models/user');

// @route   Post /users
// @ desc   Register new user
// @ access Public
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({msg: "Please enter all fields"});
        }

        // Check for esisting user
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({msg: "User already exists"});
        }

        const newUser = new User( {
            username,
            password,
            aiGamesWon:0
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
            username: newUser.username,
            aiGamesWon: newUser.aiGamesWon
        }});
    }
    catch (e) {
        return res.status(400).json({ msg: e.message });
    }
});

// @route   Post /users/ai
// @ desc   Get all users' AI Games won
// @ access Private
router.get('/ai', auth,  async (req, res) => {
    try {
        const users = await User.find();

        const AIGamesWon = users.map((user) => {
             return {
                username: user.username,
                aiGamesWon: user.aiGamesWon
            }; 
        });

        return res.status(200).json(AIGamesWon);
    }
    catch (e) {
        return res.status(400).json({ msg: e.message });
    }
});

module.exports = router;
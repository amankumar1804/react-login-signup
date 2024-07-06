
const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();
const User = require('../Models/User');

// Endpoint to fetch user details
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const users = await User.find({}, 'name Dob email'); // Fetch name and email of all users
        res.status(200).json(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = router;




const User = require('../models/User');

module.exports = async function(req, res, next) {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'shopkeeper') {
            return res.status(403).json({ msg: 'Access denied. Shopkeeper role required.' });
        }
        next();
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
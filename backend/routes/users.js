import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth';
import { findById } from '../models/User';

// @route   GET api/users/me
// @desc    Get current user's profile
router.get('/me', auth, async (req, res) => {
    try {
        // Find user by ID from token, exclude password from result
        const user = await findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users/address
// @desc    Add a new address
router.post('/address', auth, async (req, res) => {
    try {
        const user = await findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Add new address to the start of the addresses array
        user.addresses.unshift(req.body);
        await user.save();
        res.json(user.addresses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
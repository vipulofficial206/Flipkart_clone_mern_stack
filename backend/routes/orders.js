import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth';
import Order, { find } from '../models/Order';

// @route   POST api/orders
// @desc    Create a new order
router.post('/', auth, async (req, res) => {
    const { products, shippingAddress, totalAmount } = req.body;
    try {
        const newOrder = new Order({
            user: req.user.id,
            products,
            shippingAddress,
            totalAmount
        });
        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/orders/myorders
// @desc    Get logged in user's orders
router.get('/myorders', auth, async (req, res) => {
    try {
        const orders = await find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
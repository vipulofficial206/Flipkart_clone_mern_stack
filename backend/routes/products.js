import { Router } from 'express';
const router = Router();
import { find, findById } from '../models/Product';

// @route   GET api/products
// @desc    Get all products
router.get('/', async (req, res) => {
    try {
        const products = await find().populate('shopkeeper', 'name');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/products/:id
// @desc    Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await findById(req.params.id).populate('shopkeeper', 'name');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
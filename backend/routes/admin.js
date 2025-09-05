import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth';
import isShopkeeper from '../middleware/isShopkeeper';
import Product from '../models/Product';

// @route   POST api/admin/products
// @desc    Add a new product (shopkeeper only)
router.post('/products', [auth, isShopkeeper], async (req, res) => {
    const { name, description, price, originalPrice, discount, category, imageUrl } = req.body;
    try {
        const newProduct = new Product({
            name,
            description,
            price,
            originalPrice,
            discount,
            category,
            imageUrl,
            shopkeeper: req.user.id // Link product to the logged-in shopkeeper
        });
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
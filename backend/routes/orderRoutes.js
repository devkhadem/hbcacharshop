const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user's orders
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create order
router.post('/', auth, async (req, res) => {
    const { products } = req.body;
    try {
        let totalAmount = 0;
        for (let item of products) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            totalAmount += product.price * item.quantity;
        }

        const order = new Order({ user: req.user.id, products, totalAmount });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ cart, setCart }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/orders', {
                products: cart.map(item => ({ product: item._id, quantity: item.quantity })),
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Order placed successfully!');
            setCart([]);
        } catch (error) {
            alert('Error placing order');
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;

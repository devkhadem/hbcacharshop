import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ cart, setCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const existingItem = cart.find(item => item._id === product._id);
        if (existingItem) {
            setCart(cart.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    return (
        <div>
            <h1>Pickles for Sale</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;

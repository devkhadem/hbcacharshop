import ProductList from './components/ProductList';
import Checkout from './components/Checkout';
import './App.css';

function App() {
    const [cart, setCart] = useState([]);

    return (
        <div className="App">
            <header>
                <h1>Pickle E-Commerce</h1>
            </header>
            <main>
                <ProductList cart={cart} setCart={setCart} />
                <Checkout cart={cart} setCart={setCart} />
            </main>
        </div>
    );
}

export default App;
=======
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Pickle E-Commerce</h1>
      </header>
      <main>
        <ProductList cart={cart} setCart={setCart} />
        <Cart cart={cart} setCart={setCart} />
        <Checkout cart={cart} setCart={setCart} />
      </main>
    </div>
  );
}

export default App;

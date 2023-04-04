import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CartComponent from './CartComponent';

const Products = () => {
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    let ispresent = cart.some((elem) => elem.id === item.id);
    if (!ispresent) {
      setCart((prev) => [...prev, { ...item, qty: 1 }]);
    } else {
      let incqty = cart.filter((elem) => {
        if (elem.id === item.id) {
          elem.qty++;
        }
        return elem;
      });
      setCart(() => incqty);
    }
  }

  async function getProductsData() {
    let response = await fetch('http://localhost:8080/products');
    let data = await response.json();
    setProducts(() => data);
  }
  return (
    <div>
      {!products ? (
        <button data-testid="get-btn" onClick={() => getProductsData()}>
          Get Products
        </button>
      ) : (
        <div className="dashboard">
          <h1>Dashboard</h1>
          <div>
            <h1>Cart</h1>
            <CartComponent cartProducts={cart} />
          </div>
          <div data-testid="products-container">
            {products.map((elem) => {
              return <ProductCard key={elem.id} data={elem} addCart={addToCart} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

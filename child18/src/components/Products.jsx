import React, { useState } from 'react';

const Products = ({ searchKeyword }) => {
  const [products] = useState([
    { id: 1, name: 'React Components', price: '$29.99', description: 'Reusable UI components', category: 'Frontend' },
    { id: 2, name: 'Module Federation Kit', price: '$49.99', description: 'Microfrontend setup tools', category: 'Architecture' },
    { id: 3, name: 'React Router Pro', price: '$19.99', description: 'Advanced routing solutions', category: 'Navigation' },
    { id: 4, name: 'State Management', price: '$39.99', description: 'Redux and Context patterns', category: 'State' },
    { id: 5, name: 'Testing Suite', price: '$34.99', description: 'Complete testing framework', category: 'Testing' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const categories = ['All', 'Frontend', 'Architecture', 'Navigation', 'State', 'Testing'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = !searchKeyword || product.name.toLowerCase().includes(searchKeyword.toLowerCase()) || product.description.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f8ff', 
      borderRadius: '8px',
      border: '1px solid #2196f3'
    }}>
      <h3 style={{ color: '#1565c0', marginTop: '0' }}>🛍️ Products Catalog</h3>
      
      {searchKeyword && (
        <div style={{
          marginBottom: '20px',
          backgroundColor: '#fff3e0',
          padding: '12px 15px',
          borderRadius: '8px',
          border: '1px solid #ff9800',
          color: '#e65100'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🔍</span>
            <span style={{ fontWeight: 'bold' }}>Search Results</span>
          </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
            Showing {filteredProducts.length} product(s) matching: 
            <strong>"{searchKeyword}"</strong>
          </p>
        </div>
      )}
      
      {/* Category Filter */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#1565c0', marginBottom: '10px' }}>Filter by Category:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '6px 12px',
                backgroundColor: selectedCategory === category ? '#2196f3' : '#e3f2fd',
                color: selectedCategory === category ? 'white' : '#1565c0',
                border: '1px solid #2196f3',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Shopping Cart Summary */}
      <div style={{
        padding: '15px',
        backgroundColor: '#e8f5e8',
        borderRadius: '6px',
        border: '1px solid #4caf50',
        marginBottom: '20px'
      }}>
        <h5 style={{ color: '#2e7d32', marginTop: '0', marginBottom: '10px' }}>
          🛒 Cart ({cart.length} items)
        </h5>
        {cart.length > 0 ? (
          <div>
            {cart.map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '5px 0',
                borderBottom: '1px solid #c8e6c9'
              }}>
                <span style={{ fontSize: '14px' }}>{item.name} - {item.price}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Your cart is empty</p>
        )}
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '15px'
      }}>
        {filteredProducts.map(product => (
          <div 
            key={product.id}
            style={{
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #bbdefb',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h5 style={{ color: '#1565c0', marginTop: '0', marginBottom: '8px' }}>
              {product.name}
            </h5>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
              {product.description}
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <span style={{ 
                backgroundColor: '#e3f2fd', 
                color: '#1565c0', 
                padding: '3px 8px', 
                borderRadius: '12px', 
                fontSize: '12px' 
              }}>
                {product.category}
              </span>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: '#2e7d32' 
              }}>
                {product.price}
              </span>
            </div>
            <button
              onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: isInCart(product.id) ? '#f44336' : '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

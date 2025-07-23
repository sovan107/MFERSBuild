import React, { version, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';

// Wrapper component to handle navigation logic
function AppContent({ searchKeyword, onNavigateToProducts }) {
  const navigate = useNavigate();
  const location = useLocation();
  const previousSearchKeyword = useRef('');

  useEffect(() => {
    // Only navigate to products if we have a new search keyword
    if (searchKeyword && searchKeyword !== previousSearchKeyword.current) {
      previousSearchKeyword.current = searchKeyword;
      
      // Only navigate if we're not already on the products page
      if (location.pathname !== '/products') {
        navigate('/products');
      }
      
      if (onNavigateToProducts) {
        onNavigateToProducts();
      }
    }
  }, [searchKeyword, navigate, location.pathname, onNavigateToProducts]);

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '8px',
      minHeight: '600px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          color: '#2c3e50', 
          marginTop: '0',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          🎯 Child Microfrontend (React {version})
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#7f8c8d',
          fontSize: '14px',
          marginBottom: '20px'
        }}>
          A React 17 microfrontend with routing capabilities loaded via Module Federation
          {searchKeyword && (
            <span style={{ 
              display: 'block', 
              color: '#e67e22', 
              fontWeight: 'bold',
              marginTop: '5px'
            }}>
              🔍 Active Search: "{searchKeyword}"
            </span>
          )}
        </p>
        
        <Navigation searchKeyword={searchKeyword} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products searchKeyword={searchKeyword} />} />
        </Routes>
      </div>
    </div>
  );
}

function App({ searchKeyword, onNavigateToProducts }) {
  return (
    <Router>
      <AppContent 
        searchKeyword={searchKeyword} 
        onNavigateToProducts={onNavigateToProducts}
      />
    </Router>
  );
}

export default App;

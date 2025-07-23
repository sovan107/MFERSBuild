import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = ({ searchKeyword }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 Home', icon: '🏠' },
    { path: '/about', label: '📋 About', icon: '📋' },
    { path: '/products', label: '🛍️ Products', icon: '🛍️' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav style={{
      padding: '15px 20px',
      backgroundColor: '#3f51b5',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h2 style={{ 
          color: 'white', 
          margin: '0',
          fontSize: '20px'
        }}>
          🚀 Child18 App Navigation
        </h2>
        <div style={{
          color: '#c5cae9',
          fontSize: '14px'
        }}>
          Current: {location.pathname}
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => handleNavClick(item.path)}
            style={{
              background: 'none',
              border: 'none',
              textDecoration: 'none',
              padding: '10px 15px',
              borderRadius: '6px',
              backgroundColor: isActive(item.path) ? '#ffffff' : 'rgba(255,255,255,0.1)',
              color: isActive(item.path) ? '#3f51b5' : 'white',
              border: isActive(item.path) ? '2px solid #3f51b5' : '2px solid transparent',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              fontWeight: isActive(item.path) ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
              }
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label.replace(item.icon + ' ', '')}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;

import React, { useState } from 'react';

const Home = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello from Child18 Home Page!');

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#e8f8f5', 
      borderRadius: '8px',
      border: '1px solid #1abc9c'
    }}>
      <h3 style={{ color: '#16a085', marginTop: '0' }}>🏠 Home Page</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#2c3e50', fontWeight: 'bold' }}>{message}</p>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '2px solid #1abc9c',
            borderRadius: '4px',
            width: '100%',
            fontSize: '14px'
          }}
        />
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px',
        marginBottom: '15px'
      }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          -
        </button>
        
        <span style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#2c3e50',
          minWidth: '50px',
          textAlign: 'center'
        }}>
          {count}
        </span>
        
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          +
        </button>
      </div>
      
      <p style={{ fontSize: '14px', color: '#7f8c8d', textAlign: 'center' }}>
        Welcome to the Home page of Child18 app! This counter is independent from other pages.
      </p>
    </div>
  );
};

export default Home;

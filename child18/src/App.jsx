import React, { version, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello from Child App! --18');

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#e8f8f5', 
      borderRadius: '8px',
      border: '1px solid #1abc9c'
    }}>
      <h3 style={{ color: '#16a085', marginTop: '0' }}>🎯 Remote Child Component {version}</h3>
      
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
      
      <div style={{
        fontSize: '12px',
        color: '#7f8c8d',
        fontStyle: 'italic',
        textAlign: 'center'
      }}>
        This component is loaded via Module Federation from port 3001
      </div>
    </div>
  );
}

export default App;

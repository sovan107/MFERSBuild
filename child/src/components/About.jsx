import React, { useState } from 'react';

const About = () => {
  const [features] = useState([
    'React 17 with stable features',
    'Module Federation integration',
    'React Router for navigation',
    'Responsive design',
    'Component-based architecture'
  ]);

  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#fff3e0', 
      borderRadius: '8px',
      border: '1px solid #ff9800'
    }}>
      <h3 style={{ color: '#e65100', marginTop: '0' }}>📋 About This Application</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#2c3e50', fontSize: '16px', lineHeight: '1.6' }}>
          This is the Child microfrontend application built with React 17. 
          It demonstrates modern React patterns and microfrontend architecture using Module Federation.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#e65100', marginBottom: '15px' }}>🚀 Key Features:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {features.map((feature, index) => (
            <li 
              key={index}
              onClick={() => setSelectedFeature(index === selectedFeature ? null : index)}
              style={{
                padding: '10px 15px',
                marginBottom: '8px',
                backgroundColor: selectedFeature === index ? '#ffcc02' : '#fff8e1',
                border: '1px solid #ffb74d',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: '#2c3e50'
              }}
            >
              <span style={{ marginRight: '10px' }}>✓</span>
              {feature}
              {selectedFeature === index && (
                <div style={{ 
                  marginTop: '8px', 
                  fontSize: '14px', 
                  color: '#666',
                  fontStyle: 'italic' 
                }}>
                  Click to hide details
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        padding: '15px',
        backgroundColor: '#f3e5f5',
        borderRadius: '6px',
        border: '1px solid #9c27b0'
      }}>
        <h5 style={{ color: '#7b1fa2', marginTop: '0', marginBottom: '10px' }}>
          🔧 Technical Stack:
        </h5>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '10px',
          fontSize: '14px'
        }}>
          <span style={{ padding: '5px 10px', backgroundColor: '#e1bee7', borderRadius: '15px', textAlign: 'center' }}>
            React 17
          </span>
          <span style={{ padding: '5px 10px', backgroundColor: '#e1bee7', borderRadius: '15px', textAlign: 'center' }}>
            RSBuild
          </span>
          <span style={{ padding: '5px 10px', backgroundColor: '#e1bee7', borderRadius: '15px', textAlign: 'center' }}>
            Module Federation
          </span>
          <span style={{ padding: '5px 10px', backgroundColor: '#e1bee7', borderRadius: '15px', textAlign: 'center' }}>
            React Router
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;

import './App.css';
import React, { version, Suspense, useState, useRef } from 'react';
import { ChildApp, Child18App } from './components/RemoteComponents';
import SearchHeader from './components/SearchHeader';

const App = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const child18Ref = useRef(null);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setShowSearchResults(true);
    
    // Scroll to the Child18 app section
    setTimeout(() => {
      child18Ref.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleNavigateToProducts = () => {
    // This will be handled by the child18 app internally
    console.log('Navigating to products with keyword:', searchKeyword);
    
    // Clear the search after a delay to allow the child app to receive it
    setTimeout(() => {
      // Don't clear immediately to allow child app to process the search
    }, 1000);
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    setShowSearchResults(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <SearchHeader onSearch={handleSearch} />
      
      {showSearchResults && searchKeyword && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          color: '#856404'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#b8860b' }}>🔍 Search Results</h3>
          <p style={{ margin: '0', fontSize: '14px' }}>
            Searching for <strong>"{searchKeyword}"</strong> in Child18 Products. 
            The results will be displayed in the Child18 application below.
          </p>
          <button 
            onClick={handleClearSearch}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#ffc107',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            ✕ Clear Search
          </button>
        </div>
      )}
      
      <p style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '30px' }}>
        This host demonstrates microfrontend architecture with search functionality across applications.
      </p>

      <div style={{
        border: '2px dashed #e74c3c',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fdf2f2',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#e74c3c', marginTop: '0' }}>📦 Remote Child App (React 17):</h2>
        <p style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '15px' }}>
          This component runs on React 17 and is rendered into a div provided by the host.
        </p>
        <ChildApp searchKeyword={searchKeyword} onNavigateToProducts={handleNavigateToProducts} />
      </div>

      <div 
        ref={child18Ref}
        style={{
          border: showSearchResults ? '3px solid #f39c12' : '2px dashed #27ae60',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: showSearchResults ? '#fef9e7' : '#f2f9f2',
          marginBottom: '20px',
          transition: 'all 0.3s ease'
        }}
      >
        <h2 style={{ color: showSearchResults ? '#f39c12' : '#27ae60', marginTop: '0' }}>
          📦 Remote Child18 App (React 18):
          {showSearchResults && (
            <span style={{ fontSize: '16px', marginLeft: '10px', fontWeight: 'normal' }}>
              🔍 Searching: "{searchKeyword}"
            </span>
          )}
        </h2>
        <p style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '15px' }}>
          This component features routing and product search capabilities.
          {showSearchResults && (
            <span style={{ color: '#f39c12', fontWeight: 'bold' }}>
              {' '}Search results will be filtered below.
            </span>
          )}
        </p>
        <Suspense fallback={<div>Loading Child18 App...</div>}>
          <Child18App 
            searchKeyword={searchKeyword}
            onNavigateToProducts={handleNavigateToProducts}
          />
        </Suspense>
      </div>

      <footer style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#95a5a6'
      }}>
        <p>🚀 Powered by Rsbuild + Module Federation + mount/unmount technique</p>
      </footer>
    </div>
  );
};

export default App;

import React, { useState, useRef } from 'react';

const SearchHeader = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      // Clear the search after submitting
      setSearchTerm('');
      searchInputRef.current?.blur();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '30px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            padding: '12px',
            fontSize: '24px'
          }}>
            🏠
          </div>
          <div>
            <h1 style={{ 
              margin: '0', 
              fontSize: '28px',
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Microfrontend Host
            </h1>
            <p style={{ 
              margin: '0', 
              fontSize: '14px', 
              opacity: '0.9',
              fontWeight: '300'
            }}>
              Module Federation Demo Platform
            </p>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '25px',
            padding: '2px',
            border: isSearchFocused ? '2px solid rgba(255,255,255,0.5)' : '2px solid transparent',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onKeyPress={handleKeyPress}
              placeholder="Search products in Child18 app..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontSize: '16px',
                padding: '12px 20px',
                width: '300px',
                '::placeholder': {
                  color: 'rgba(255,255,255,0.7)'
                }
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                fontSize: '18px',
                margin: '4px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              🔍
            </button>
          </div>
        </form>
      </div>

      {/* Search Status */}
      {searchTerm && (
        <div style={{
          marginTop: '15px',
          padding: '10px 15px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          fontSize: '14px',
          opacity: '0.9'
        }}>
          <span style={{ opacity: '0.8' }}>Ready to search for:</span>
          <strong style={{ marginLeft: '8px' }}>"{searchTerm}"</strong>
          <span style={{ marginLeft: '8px', opacity: '0.8' }}>- Press Enter or click search</span>
        </div>
      )}
    </header>
  );
};

export default SearchHeader;

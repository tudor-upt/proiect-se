import React from 'react';

function Header() {
    return (
        <header style={{
            width: '100%',
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
            padding: '1rem 2rem',
            borderBottom: '1px solid #444',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
            boxSizing: 'border-box',
        }}>
            Laptop Finder
        </header>
    );
}

export default Header;

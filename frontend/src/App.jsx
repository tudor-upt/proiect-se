import React, { useState, useEffect } from 'react';
import Filters from './components/Filters.jsx';
import LaptopList from './components/LaptopList.jsx';
import Header from "./components/Header.jsx"; // you can add Tailwind or custom CSS
import './App.css';

function App() {
    const [filters, setFilters] = useState({});
    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        if (Object.keys(filters).length === 0) return;

        const query = new URLSearchParams(filters).toString();
        fetch(`http://localhost:8000/laptops/?${query}`)
            .then(res => res.json())
            .then(data => setLaptops(data))
            .catch(err => console.error(err));
    }, [filters]);

    return (
        <div>
            <Header />
            <div className="app-container" style={{ display: 'flex' }}>
                <Filters setFilters={setFilters} />
                <LaptopList laptops={laptops} />
            </div>
        </div>

    );
}

export default App;

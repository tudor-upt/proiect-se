import React, { useState, useEffect } from 'react';
import Filters from './components/Filters.jsx';
import LaptopList from './components/LaptopList.jsx';
import Header from "./components/Header.jsx"; // you can add Tailwind or custom CSS
import './App.css';

function App() {
    const [filters, setFilters] = useState({});
    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        const query = new URLSearchParams(filters).toString();
        const url = query
            ? `http://localhost:8000/laptops/?${query}`
            : `http://localhost:8000/laptops/`;

        fetch(url)
            .then(res => res.json())
            .then(data => setLaptops(data))
            .catch(err => console.error(err));
    }, [filters]);

    return (
        <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <Filters setFilters={setFilters} />
                <LaptopList laptops={laptops} />
            </div>
        </div>
    );

}

export default App;

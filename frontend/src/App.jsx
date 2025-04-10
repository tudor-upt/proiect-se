import React, { useState, useEffect } from 'react';
import Filters from './components/Filters.jsx';
import LaptopList from './components/LaptopList.jsx';
import Header from "./components/Header.jsx"; // you can add Tailwind or custom CSS
import './App.css';

function App() {
    const [filters, setFilters] = useState({});
    const [laptops, setLaptops] = useState([]);
    const [loading, setLoading] = useState(true); // 👈 Add loading state

    useEffect(() => {
        const fetchLaptops = async () => {
            setLoading(true); // 👈 Start loading
            const query = new URLSearchParams(filters).toString();
            const url = query
                ? `http://localhost:8000/laptops/?${query}`
                : `http://localhost:8000/laptops/`;

            try {
                const res = await fetch(url);
                const data = await res.json();
                setLaptops(data);
            } catch (err) {
                console.error(err);
                setLaptops([]);
            } finally {
                setLoading(false); // 👈 End loading
            }
        };

        fetchLaptops();
    }, [filters]);

    return (
        <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <Filters setFilters={setFilters} />
                <LaptopList laptops={laptops} loading={loading} />
            </div>
        </div>
    );
}


export default App;

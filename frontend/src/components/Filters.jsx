import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactSlider from 'react-slider';
// import 'react-slider/lib/index.css';
import './Filters.css';
import { useRef } from 'react';

const filterFetchEndpoints = {
    'Colors': 'colors',
    'RAM Size': 'memory-size',
    'RAM Type': 'memory-type',
    'Materials': 'materials',
    'Operating System': 'operating-system',
    'Storage Size': 'storage-size',
    'Display Size': 'display-size',
    'Display Type': 'display-type',
    'Resolution': 'resolutions',
    'Weight': 'weights',
    'Price': 'prices',
    'Battery Capacity': 'battery-capacities',
    'Battery Life': 'battery-lives',
    'Battery Type': 'battery-type',
    'Ports': 'ports',
    'CPU Producers': 'cpu/producers',
    'CPU Cores': 'cpu/cores',
    'CPU Base Speeds': 'cpu/base-speeds',
    'GPU Producers': 'gpu/producers',
    'GPU Memory': 'gpu/memory',
};

const filterQueryParams = {
    'Colors': 'colors',
    'RAM Size': 'memory_size',
    'RAM Type': 'memory_type',
    'Materials': 'materials',
    'Operating System': 'operating_system',
    'Storage Size': 'total_storage',
    'Display Size': 'display_size',
    'Display Type': 'display_type',
    'Resolution': 'display_resolution', // special handling needed
    'Weight': 'weight',
    'Price': 'price',
    'Battery Capacity': 'battery_capacity',
    'Battery Life': 'battery_life',
    'Battery Type': 'battery_type',
    'Ports': 'ports',
    'CPU Producers': 'cpu/prod',
    'CPU Cores': 'cpu/cores',
    'CPU Base Speeds': 'cpu/base_speed',
    'GPU Producers': 'gpu/prod',
    'GPU Memory': 'gpu/memory_size',
};

const filterUnits = {
    'RAM Size': 'GB',
    'Storage Size': 'GB',
    'Display Size': '"',
    'Weight': 'kg',
    'Price': 'USD',
    'Battery Capacity': 'Wh',
    'Battery Life': 'hours',
    'CPU Base Speeds': 'GHz',
    'GPU Memory': 'MB'
};

function Filters({setFilters}) {
    const [options, setOptions] = useState({});
    const [selected, setSelected] = useState({});
    const [openSections, setOpenSections] = useState({});
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [priceBounds, setPriceBounds] = useState([0, 10000]);
    const [loading, setLoading] = useState(true); // 👈 Add loading state

    useEffect(() => {
        const fetchAll = async () => {
            const results = await Promise.all(
                Object.entries(filterFetchEndpoints).map(async ([label, endpoint]) => {
                    const res = await axios.get(`http://localhost:8000/${endpoint}/`);
                    const key = Object.keys(res.data)[0];
                    let data = res.data[key];

                    if (label === 'Resolution') {
                        data = data.map(r => `${r.horizontal}x${r.vertical}`);
                    }


                    // if (label === 'Weight') {
                    //     const maxWeight = res.data.max;
                    //     const roundedMax = Math.ceil(maxWeight);
                    //     data = Array.from({length: roundedMax}, (_, i) => `< ${i + 1}kg`);
                    // }

                    if (label === 'Price') {
                        const min = res.data.min;
                        const max = res.data.max;
                        setPriceRange([min, max]);
                        setPriceBounds([min, max]);
                    }

                    return {label, data};
                })
            );

            const opts = {};
            const toggles = {};
            results.forEach(({label, data}) => {
                opts[label] = data;
                toggles[label] = false;
            });

            setOptions(opts);
            setOpenSections(toggles);
            setLoading(false); // 👈 Done loading
        };

        fetchAll();
    }, []);

    const toggleSection = (category) => {
        setOpenSections(prev => ({...prev, [category]: !prev[category]}));
    };

    const handleChange = (category, value) => {
        const updated = {...selected};
        if (!updated[category]) updated[category] = new Set();
        if (updated[category].has(value)) {
            updated[category].delete(value);
        } else {
            updated[category].add(value);
        }
        setSelected({...updated});

        const flat = {};

        for (const [cat, values] of Object.entries(updated)) {
            if (values.size) {
                if (cat === 'Resolution') {
                    const [h, v] = Array.from(values)[0].split('x');
                    flat['display_horizontal_resolution'] = h;
                    flat['display_vertical_resolution'] = v;
                } else {
                    flat[filterQueryParams[cat]] = Array.from(values).join(',');
                }
            }
        }


        setFilters(flat);
    };

    const handlePriceChange = (index, value) => {
        const updated = [...priceRange];
        updated[index] = Number(value);
        setPriceRange(updated);

        setFilters(prev => ({
            ...prev,
            [filterQueryParams['Price']]: `${updated[0]}-${updated[1]}`
        }));
    };

    const debounceTimeout = useRef(null);

    const handlePriceDebounced = (value) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            setFilters((prev) => ({
                ...prev,
                [filterQueryParams['Price']]: `${value[0]}-${value[1]}`
            }));
        }, 400); // 400ms delay
    };

    if (loading) {
        return (
            <div style={{
                width: '260px',
                padding: '1rem',
                backgroundColor: '#2a2a2a',
                borderRight: '1px solid #444',
                height: '100vh',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <p>Loading filters...</p>
            </div>
        );
    }

    return (
        <div style={{
            width: '260px',
            padding: '1rem',
            backgroundColor: '#2a2a2a',
            borderRight: '1px solid #444',
            height: '100%',
            overflowY: 'auto'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto'}}>
                <h2 style={{color: '#fff'}}>Filtre</h2>
                <button
                    onClick={() => {
                        setSelected({});
                        setFilters({});
                        setPriceRange(priceBounds);
                        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
                        axios.get('http://localhost:8000/').then(res => {
                            console.log('Refreshed data:', res.data);
                        });
                    }}
                    style={{
                        backgroundColor: '#444',
                        color: '#fff',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Clear All
                </button>
            </div>

            <hr style={{border: '0', borderTop: '1px solid #444', margin: '1rem 0'}}/>

            {Object.entries(options).map(([category, values]) => (
                <div key={category} style={{marginBottom: '1.5rem'}}>
                    <div
                        onClick={() => toggleSection(category)}
                        style={{
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <span>{category}</span>
                        <span>{openSections[category] ? '▲' : '▼'}</span>
                    </div>

                    {openSections[category] && (
                        <div style={{marginTop: '0.5rem'}}>
                            {category === 'Price' ? (
                                <div style={{color: '#ddd'}}>
                                    <div style={{marginBottom: '0.5rem'}}>
                                        <span>Min: {priceRange[0]}</span> – <span>Max: {priceRange[1]}</span>
                                    </div>
                                    <ReactSlider
                                        className="price-slider"
                                        thumbClassName="thumb"
                                        trackClassName="track"
                                        defaultValue={priceRange}
                                        value={priceRange}
                                        min={priceBounds[0]}
                                        max={priceBounds[1]}
                                        step={1}
                                        onChange={(value) => {
                                            setPriceRange(value);
                                            handlePriceDebounced(value);
                                        }}
                                        renderThumb={(props) => <div {...props} />} // 👈 No text inside thumb
                                    />
                                </div>
                            ) : (
                                values.map((value, idx) => {
                                    const label = typeof value === 'object' ? value.name : value;
                                    const unit = filterUnits[category] || '';
                                    const displayLabel = `${label}${unit ? ' ' + unit : ''}`;
                                    return (
                                        <div key={idx} style={{marginBottom: '0.3rem'}}>
                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: '#ddd'
                                            }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selected[category]?.has(label) || false}
                                                    onChange={() => handleChange(category, label)}
                                                />
                                                {displayLabel}
                                            </label>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Filters;

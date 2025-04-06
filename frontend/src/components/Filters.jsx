import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ReactSlider from 'react-slider';

const filterEndpoints = {
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

function Filters({ setFilters }) {
  const [options, setOptions] = useState({});
  const [selected, setSelected] = useState({});
  const [openSections, setOpenSections] = useState({});
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [priceBounds, setPriceBounds] = useState([0, 10000]);

  useEffect(() => {
    Object.entries(filterEndpoints).forEach(([label, endpoint]) => {
      axios.get(`http://localhost:8000/${endpoint}/`).then(res => {
        const key = Object.keys(res.data)[0];
        let data = res.data[key];

        if (label === 'Resolution') {
          data = data.map(r => `${r.horizontal}x${r.vertical}`);
        }

        if (label === 'Weight') {
          const maxWeight = res.data.max;
          const roundedMax = Math.ceil(maxWeight);
          data = Array.from({ length: roundedMax }, (_, i) => `< ${i + 1}kg`);
        }


        if (label === 'Price') {
          const min = res.data.min;
          const max = res.data.max;
          setPriceRange([min, max]);
          setPriceBounds([min, max]);
        }

        setOptions(prev => ({ ...prev, [label]: data }));
        setOpenSections(prev => ({ ...prev, [label]: false }));
      });
    });
  }, []);

  const toggleSection = (category) => {
    setOpenSections(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleChange = (category, value) => {
    const updated = { ...selected };
    if (!updated[category]) updated[category] = new Set();
    if (updated[category].has(value)) {
      updated[category].delete(value);
    } else {
      updated[category].add(value);
    }
    setSelected({ ...updated });

    const flat = {};
    for (const [cat, values] of Object.entries(updated)) {
      if (values.size) flat[filterEndpoints[cat]] = Array.from(values).join(',');
    }
    setFilters(flat);
  };

  const handlePriceChange = (index, value) => {
    const updated = [...priceRange];
    updated[index] = Number(value);
    setPriceRange(updated);

    setFilters(prev => ({
      ...prev,
      [filterEndpoints['Price']]: `${updated[0]}-${updated[1]}`
    }));
  };

  return (
      <div style={{
        width: '260px',
        padding: '1rem',
        backgroundColor: '#2a2a2a',
        borderRight: '1px solid #444',
        height: '100vh',
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
            <div key={category} style={{ marginBottom: '1.5rem' }}>
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
                  <div style={{ marginTop: '0.5rem' }}>
                    {category === 'Price' ? (
                        <div style={{ color: '#ddd' }}>
                          <div style={{ marginBottom: '0.5rem' }}>
                            <span>Min: {priceRange[0]}</span> – <span>Max: {priceRange[1]}</span>
                          </div>
                          <input
                              type="range"
                              min={priceBounds[0]}
                              max={priceBounds[1]}
                              step={1}
                              value={priceRange[0]}
                              onChange={(e) => handlePriceChange(0, e.target.value)}
                              style={{ width: '100%', marginBottom: '0.5rem' }}
                          />
                          <input
                              type="range"
                              min={priceBounds[0]}
                              max={priceBounds[1]}
                              step={1}
                              value={priceRange[1]}
                              onChange={(e) => handlePriceChange(1, e.target.value)}
                              style={{ width: '100%' }}
                          />
                        </div>
                    ) : (
                        values.map((value, idx) => {
                          const label = typeof value === 'object' ? value.name : value;
                          return (
                              <div key={idx} style={{ marginBottom: '0.3rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ddd' }}>
                                  <input
                                      type="checkbox"
                                      onChange={() => handleChange(category, label)}
                                  />
                                  {label}
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

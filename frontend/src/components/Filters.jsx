import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    Object.entries(filterEndpoints).forEach(([label, endpoint]) => {
      axios.get(`http://localhost:8000/${endpoint}/`).then(res => {
        const key = Object.keys(res.data)[0];
        let data = res.data[key];

        // Handle resolutions formatting
        if (label === 'Resolution') {
          data = data.map(r => `${r.horizontal}x${r.vertical}`);
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

  return (
      <div style={{
        width: '260px',
        padding: '1rem',
        backgroundColor: '#2a2a2a',
        borderRight: '1px solid #444',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Filtre</h2>
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
                    {values.map((value, idx) => {
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
                    })}
                  </div>
              )}
            </div>
        ))}
      </div>
  );
}

export default Filters;

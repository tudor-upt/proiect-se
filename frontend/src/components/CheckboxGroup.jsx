// src/components/CheckboxGroup.jsx
import { useEffect, useState } from 'react';
import { fetchOptions } from '../api';

export default function CheckboxGroup({ title, endpoint, dataKey, renderOption }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchOptions(endpoint)
            .then((data) => {
                const values = dataKey ? data[dataKey] : data;
                setOptions(values || []);
            })
            .catch((err) => {
                console.error(`Failed to fetch ${endpoint}:`, err);
            });
    }, [endpoint, dataKey]);

    return (
        <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            {options.map((item, index) => (
                <label key={index} className="block">
                    <input type="checkbox" className="mr-2" />
                    {renderOption ? renderOption(item) : item}
                </label>
            ))}
        </div>
    );
}

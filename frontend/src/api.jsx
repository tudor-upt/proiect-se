// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // adjust if needed

export const fetchOptions = async (endpoint) => {
    const res = await axios.get(`${BASE_URL}/${endpoint}`);
    return res.data;
};

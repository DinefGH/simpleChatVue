// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export function login(username, password) {
    return axios.post(`${API_URL}/login`, { username, password });
}

export function logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
}

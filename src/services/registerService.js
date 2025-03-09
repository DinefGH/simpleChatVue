import axios from 'axios';

const API_URL = 'http://localhost:8080/users'; // Adjust the base URL as needed

export function register(username, email, password) {
    // Adjust the endpoint if necessary (e.g., /register)
    return axios.post(`${API_URL}/register`, { username, email, password });
}
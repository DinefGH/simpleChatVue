import axios from 'axios'

// Base URL for your Spring Boot backend messages endpoint
const API_URL = 'http://localhost:8080/messages'

export function getMessages() {
    return axios.get(API_URL)
}

export function sendMessage(message) {
    return axios.post(API_URL, message)
}
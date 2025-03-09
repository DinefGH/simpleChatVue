# Vue & Spring Boot Chat Project
This project was created to learn the basics of Vue.js and test HTTP responses by integrating with a Java Spring Boot backend. It demonstrates user authentication, sending and receiving messages, and basic state management using localStorage.

## Features
- User Authentication: 
Users can log in and register via a Spring Boot backend. JWT tokens are used for authentication.

- Message Handling:
The Vue frontend retrieves messages from the backend and displays them. Logged-in users can send messages, which include their user id and text.

- Dynamic UI:
The UI conditionally aligns messages (own messages on the right, others on the left) and displays user information.

## Project Structure

```
├── src/
│   ├── assets/             # CSS and other static assets
│   ├── components/         # Vue components (e.g., Home.vue, Login.vue, Register.vue)
│   ├── services/           # API service files (e.g., authService.js, messageService.js)
│   ├── App.vue             # Main Vue component
│   └── main.js             # Application entry point; configures Vue, router, axios defaults
├── backend/
│   ├── src/main/java/      # Spring Boot application source code
│   └── pom.xml             # Maven configuration for the backend
└── README.md               # This file
```


## Prerequisites

- Node.js and npm installed for the Vue.js frontend.
- Java JDK 11 or later and Maven (or your preferred build tool) for the Spring Boot backend.
- Basic knowledge of Vue.js, Java, and Spring Boot.


## Installation & Setup

### Frontend (Vue.js)

1. **Install dependencies:**

In the project root, run:
```sh
npm install
```


2. **Configure Axios:**

Ensure that in main.js, axios is configured to include the JWT token (if available) from localStorage:



```
import axios from 'axios'
const token = localStorage.getItem('token')
if (token) {
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
```


3. **Run the Vue dev server:**

Start the frontend with:


```sh
npm run dev

```


## Usage
1. **Register or Login:**

Use the frontend forms to register or log in. On successful login, your token, username, and user id will be stored in localStorage.


2. **Send & Receive Messages:**

Once logged in, navigate to the Home page to see messages. Your messages will appear on the right side (if sent by you) while messages from other users will appear on the left.

3. **Logout:**

Click the "Logout" button to clear authentication details from localStorage and return to the login page.



## Learning Outcomes
- Frontend-Backend Integration:
Understanding how a Vue.js application can interact with a Java Spring Boot backend via HTTP.


- Authentication with JWT:
Implementing basic login and registration flows, and securely storing tokens.


- State Management & Dynamic UI:
Using localStorage and Vue’s reactivity system to manage user state and conditionally render content.





## Troubleshooting

- **User Not Logged In:**
If you see the error "User not logged in!" when sending messages, verify that your login response includes the user id and that it's stored correctly in localStorage.


- **CORS Issues:**
If you encounter CORS errors, make sure your Spring Boot backend is configured to allow cross-origin requests from your Vue dev server (e.g., http://localhost:5173).

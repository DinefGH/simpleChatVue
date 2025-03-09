import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/views/Home.vue'
import Login from '@/components/views/Login.vue'
import Register from '@/components/views/Register.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }  // Protect this route
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Update authentication check to look for token
function isAuthenticated() {
    return !!localStorage.getItem('token')  // Returns true if token exists
}

// Global navigation guard
router.beforeEach((to, from, next) => {
    // If the route requires authentication and the user is not authenticated...
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next({ name: 'Login' })  // Redirect to the login page
    } else {
        next()  // Allow access
    }
})

export default router

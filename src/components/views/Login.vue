<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'
import axios from 'axios'

const username = ref('')
const password = ref('')
const router = useRouter()

async function handleLogin() {
  try {
    const response = await login(username.value, password.value)
    const token = response.data.token
    // Store token and username from the response
    localStorage.setItem('token', token)
    localStorage.setItem('username', response.data.username || username.value)
    // Store the user id from the response
    if(response.data.id) {
      localStorage.setItem('id', response.data.id)
    } else {
      console.warn('No user id returned from login API.')
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    router.push({ name: 'Home' })
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed, please check your credentials.')
  }
}

</script>

<template>
  <div class="loginContainer">

    <div class="inputContainer">
      <div class="loginHeadlineContainer">
        <h1 class="loginHeadline">Login</h1>
      </div>
      <form class="usernameInput" @submit.prevent="handleLogin">
        <div class="usernameInput">
          <input class="input" v-model="username" placeholder="Username" required/>

        </div>
        <div class="passwordInput">
          <input class="input" v-model="password" type="password" placeholder="Password" required/>

        </div>
        <div class="loginButtonContainer">
          <button class="loginButton" type="submit">Login</button>
        </div>
      </form>
    </div>

  </div>
</template>

<style scoped>


.loginContainer{
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff0dc;


}

.loginHeadline {
  color: #3f51b5;
  font-weight: bolder;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 240px;
  width: 500px;
  background-color: white;
  border-radius: 24px;
  padding-top: 30px;
}

.input {
  width: 300px;
  background-color: #fff0dc;
}

.usernameInput {
  height: 24px;
  width: 300px;
  background-color: #fff0dc;
  border-radius: 8px;
  margin-bottom: 16px;
}


.passwordInput {
  height: 24px;
  width: 300px;
  background-color: #fff0dc;
  border-radius: 8px;
  margin-bottom: 16px;
}


.loginButtonContainer {
  display: flex;
  justify-content: center;
}


button {
  width: 120px;
  color: white;
  height: 4vh;
  background-color: #ff4081;
  margin-right: 16px;
  border-radius: 8px;
  cursor: pointer;
}


</style>
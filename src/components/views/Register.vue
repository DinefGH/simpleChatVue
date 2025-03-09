<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register as registerService } from '@/services/registerService.js'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

async function register() {
  try {
    // Call the registration endpoint with the form values
    const response = await registerService(username.value, email.value, password.value)
    // Assuming your API returns a token in response.data.token
    const token = response.data.token
    // Store the token and username in localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('username', username.value)
    // Optionally, set axios default header (if not handled globally)
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Navigate to the Home page after successful registration
    router.push({ name: 'Home' })
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Registration failed, please try again.')
  }
}

</script>

<template>
  <div class="registerContainer">

    <div class="inputContainer">
      <div class="registerInput">
        <div class="registerHeadlineContainer">
          <h1 class="registerHeadline">Register</h1>
        </div>
        <form class="usernameInput" @submit.prevent="register">
          <div class="usernameInput">
            <input class="input" v-model="username" placeholder="Username" required/>
          </div>
          <div class="emailInput">
            <input class="input" v-model="email" type="email" placeholder="Email" required/>
          </div>
          <div class="passwordInput">
            <input class="input" v-model="password" type="password" placeholder="Password" required/>
          </div>
          <div class="registerButtonContainer">
            <button class="registerButton" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>


.registerContainer {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff0dc;


}

.registerHeadline {
  color: #3f51b5;
  font-weight: bolder;
  display: flex;
  justify-content: center;
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
  padding-top: 16px;
}


.usernameInput {
  height: 24px;
  width: 300px;
  border-radius: 8px;
  margin-bottom: 16px;
}


.emailInput {
  height: 24px;
  width: 300px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.input {
  width: 300px;
  background-color: #fff0dc;
}


.passwordInput {
  height: 24px;
  width: 30vw;

  border-radius: 8px;
  margin-bottom: 16px;
}


.registerButtonContainer {
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
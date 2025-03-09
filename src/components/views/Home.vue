<script setup>
import { ref, onMounted } from 'vue'
import { getMessages, sendMessage } from '@/services/messageService'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const messages = ref([])

// Retrieve the logged-in user's name and id from localStorage
const loggedUser = ref(localStorage.getItem('username') || 'Guest')
const id = localStorage.getItem('id')  // Ensure your login logic stores userId

// Reactive variable for the new message text
const messageText = ref('')

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString()
}

onMounted(async () => {
  try {
    const response = await getMessages()
    messages.value = response.data
  } catch (error) {
    console.error('Error fetching messages:', error)
  }
})

async function sendMessageHandler() {
  // Ensure the user is logged in
  if (!id) {
    alert("User not logged in!")
    return
  }

  // Validate the input
  if (!messageText.value.trim()) {
    alert("Please enter a message.")
    return
  }

  // Construct the payload with the user id from localStorage
  const payload = {
    text: messageText.value,
    user: {
      id: parseInt(id)
    }
  }

  try {
    await sendMessage(payload)
    // Optionally refresh the messages after sending:
    const response = await getMessages()
    messages.value = response.data
    messageText.value = ''  // Clear the input field
  } catch (error) {
    console.error('Error sending message:', error)
    alert("Error sending message, please try again.")
  }
}

function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('id')
  delete axios.defaults.headers.common['Authorization']
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="mainContainer">
    <header>
      <div class="welcomeNameContainer">
        <div class="welcome">Willkommen,&nbsp</div>
        <div class="welcomeName">{{ loggedUser }}</div>
      </div>


      <div class="logoutButtonContainer">
        <button class="logoutButton" @click="handleLogout">Logout</button>      </div>
    </header>
    <main>
      <article
          v-for="msg in messages"
          :key="msg.id"
          :class="{'message-self': msg.user.username === loggedUser, 'message-other': msg.user.username !== loggedUser}">
        <div class="createdAt">{{ formatDate(msg.createdTime) }}</div>
        <div  v-if="msg.user.username !== loggedUser"  class="messageName">{{ msg.user.username }}:</div>
        <div class="messageText">{{ msg.text }}</div>
      </article>

    </main>
    <footer>
      <input class="inputSend" v-model="messageText" placeholder="Type your message...">
      <button @click="sendMessageHandler">Send</button>
    </footer>
  </div>
</template>

<style scoped>

.mainContainer {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3f51b5;
  width: 100vw;
  height: 5vh;
}

.welcomeNameContainer {
  display: flex;
  color: white;
}


.welcome {
  margin-left: 16px;
}

main {
  background-color: #fff0dc;
  width: 100vw;
  height: 90vh;
}

/* Base styling for each message */
article {
  display: flex;

  padding: 8px;
  background-color: #ffffff;
  width: fit-content;
  margin: 8px;
  border-radius: 8px;
}

/* Align messages from the logged-in user to the right */
.message-self {
  margin-left: auto;
  background-color: #e0ffe0; /* Optional: a different background to distinguish self-messages */
}

/* Align messages from others to the left */
.message-other {
  margin-right: auto;
}


.createdAt {
  color: #b2ada6;
}


.messageName {
  color: black;
  font-weight: bold;
  margin-left: 8px;
}


.messageText {
  color: black;
  margin-left: 8px;

}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3f51b5;
  width: 100vw;
  height: 5vh;
}

.inputSend {
  width: 80vw;
  height: 4vh;
  background-color: #3f51b5;
  border-color: black;
  border-style: solid;
  margin-left: 16px;
  border-radius: 8px;
  padding-left: 16px;
  color: white!important;
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

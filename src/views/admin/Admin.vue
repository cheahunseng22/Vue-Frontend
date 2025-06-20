<script setup>
import '../../style.css'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('') // store error message
const router = useRouter()

// Optional: Set axios baseURL globally if you want
axios.defaults.baseURL = 'https://elarastore.duckdns.org'
axios.defaults.withCredentials = true // if backend uses cookies/session

const handleAdmin = async () => {
  errorMessage.value = '' // clear previous error

  try {
    const response = await axios.post('/api/admin/login', {
      email: email.value,
      password: password.value,
    })

    console.log('Admin login response:', response.data)
    alert('Login successful!')

    // Save token in localStorage
    localStorage.setItem('token', response.data.access_token)

    // Set default axios Authorization header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`

    // Set flag to allow dashboard access
    sessionStorage.setItem('admin_just_logged_in', 'true')

    // Redirect to admin dashboard
    router.push('/admin/dashboard')
  } catch (error) {
    // Get error message safely
    const errMsg = error.response?.data?.message || 'Login failed. Please try again.'
    errorMessage.value = errMsg
    alert(errMsg) // optional: show alert popup
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div
      class="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full"
    >
      <!-- Left side image -->
      <div class="md:w-1/2">
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifViV-Z5u1Igxho8OlMreEDl0AMrV0O36Sw-6qjQeGtSX0ElXUyCwxcYCoFsrcU_2kDuuRi7f8tC9_r9FzN84Ljp-6H8cll1JabCzGGnlpUBjfH8gkbyUEIWYQ1H-6iAFgDlKRkGIwvm19/w919/bts-jungkook-fila-photoshoot-uhdpaper.com-4K-8.1273-wp.thumbnail.jpg"
          alt="Admin Login Visual"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <!-- Right side form -->
      <div class="md:w-1/2 p-8 flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">
          Admin Login
        </h2>
        <form @submit.prevent="handleAdmin" class="space-y-5 text-gray-800">
          <input
            type="email"
            v-model="email"
            placeholder="Enter admin email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            autocomplete="username"
            autofocus
          />
          <input
            type="password"
            v-model="password"
            placeholder="Enter admin password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            autocomplete="current-password"
          />
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login Admin
          </button>
          <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

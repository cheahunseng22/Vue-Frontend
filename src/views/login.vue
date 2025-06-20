<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-5xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">

      <!-- Image Section -->
      <div class="w-full md:w-1/2 h-78 md:h-auto">
        <img
          src="https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_M/louis-vuitton--HQA15WTZ0605_PM2_Front%20view.jpg?wid=750&hei=870"
          alt="Login Illustration"
          class="object-cover w-full h-full"
        />
      </div>

      <!-- Form Section -->
      <form
        @submit.prevent="handleLogin"
        class="w-full md:w-1/2 p-8 sm:p-12"
      >
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Login to Your Account
        </h2>

        <div class="space-y-6">
          <div>
            <label for="email" class="block mb-2 font-semibold text-gray-700">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="w-full px-4 py-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="password" class="block mb-2 font-semibold text-gray-700">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full mt-8 bg-green-600 cursor-pointer hover:bg-green-700 text-white py-3 rounded-md font-semibold transition-colors"
        >
          Login
        </button>

        <p class="mt-6 text-center text-gray-600">
          Don't have an account?
          <RouterLink to="/register" class="text-green-600 font-semibold hover:underline">
            Register
          </RouterLink>
        </p>
      </form>

      <Toast ref="toastRef">Purchase confirmed successfully!</Toast>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Initialize refs
const email = ref('')
const password = ref('')
const router = useRouter()

// Configure Axios defaults
axios.defaults.baseURL = 'https://elarastore.duckdns.org' // <-- Your remote backend URL
axios.defaults.withCredentials = true  // important if your backend uses cookies/sanctum auth

const handleLogin = async () => {
  try {
    const { data } = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
    })

    const token = data.access_token

    // Clear admin session if any
    sessionStorage.removeItem('admin_just_logged_in')

    // Save token and user flag locally
    localStorage.setItem('token', token)
    localStorage.setItem('user_store', 'true')

    // Set token in Axios headers for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    alert('Login successful')

    // Redirect to /home
    await router.push('/home')
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message)
    if (error.response?.data?.errors) {
      const messages = Object.values(error.response.data.errors).flat()
      alert(messages.join('\n'))
    } else if (error.response?.data?.message) {
      alert(error.response.data.message)
    } else {
      alert('Something went wrong. Please try again.')
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

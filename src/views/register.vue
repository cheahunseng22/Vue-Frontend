<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-5xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">

      <!-- Image Section (always visible) -->
      <div class="w-full md:w-1/2 h-78 md:h-auto">
        <img
          src="https://image-raw.reversible.com/raw_images/06d28c0a03f4ce1be1a8e36baef49bc34e02bb6c701487730e295d0f2da93900"
          alt="Register Illustration"
          class="object-cover w-full h-full"
        />
      </div>

      <!-- Form Section -->
      <form
        @submit.prevent="handleregister"
        class="w-full md:w-1/2 p-8 sm:p-12"
      >
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Create Your Account
        </h2>

        <div class="space-y-6">
          <div>
            <label for="name" class="block mb-2 font-semibold text-gray-700">Name</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Enter your name"
              required
              class="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="email" class="block mb-2 font-semibold text-gray-700 ">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="w-full px-4 py-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              class="w-full px-4 py-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="confirmpassword" class="block mb-2 font-semibold text-gray-700">Confirm Password</label>
            <input
              id="confirmpassword"
              v-model="confirmpassword"
              type="password"
              placeholder="Confirm your password"
              required
              class="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full cursor-pointer mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition-colors"
        >
          Register
        </button>

        <p class="mt-6 text-center text-gray-600">
          Already have an account?
          <RouterLink to="/login" class="text-green-600 font-semibold hover:underline">
            Login
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Reactive form fields
const name = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')
const router = useRouter()

// Configure Axios
axios.defaults.baseURL = 'https://elarastore.duckdns.org'
axios.defaults.withCredentials = true

const handleregister = async () => {
  if (password.value !== confirmpassword.value) {
    alert('Passwords do not match')
    return
  }

  try {
    const response = await axios.post('/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmpassword.value
    })

    alert('Registration successful')
    console.log('Response:', response.data)

    // Redirect to login page
    await router.push('/login')
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message)
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
/* No additional styles needed—Tailwind handles styling */
</style>
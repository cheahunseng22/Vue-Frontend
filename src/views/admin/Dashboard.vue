<template>
  <div class="flex flex-col min-h-screen bg-gray-100">

    <!-- Header -->
    <header class="bg-white shadow-md p-4 md:p-6 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <span class="text-base font-medium text-gray-700">Admin Only</span>
        <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
          Logout
        </button>
      </div>

      <!-- Mobile Sidebar Toggle Button -->
      <button class="md:hidden text-blue-700" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>

    <!-- Main Content (flex) -->
    <div class="flex flex-1">

      <!-- Sidebar (hidden on mobile) -->
      <aside
        :class="['fixed md:static top-0 left-0 z-30 h-150 w-64 transform md:translate-x-0 transition-transform duration-200 ease-in-out bg-blue-900  text-white p-6 space-y-6 md:flex md:flex-col ', sidebarOpen ? 'translate-x-0' : '-translate-x-full']">
        <h2 class="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav class="space-y-2 flex-grow">
          <button @click="activeTab = 'page1'; sidebarOpen = false"
            :class="activeTab === 'page1' ? 'bg-blue-700' : 'hover:bg-blue-700'"
            class="block p-2 rounded cursor-pointer w-full text-left transition">
            Add More Product
          </button>
          <button @click="activeTab = 'page2'; sidebarOpen = false"
            :class="activeTab === 'page2' ? 'bg-blue-700' : 'hover:bg-blue-700'"
            class="block p-2 rounded cursor-pointer w-full text-left transition">
            Manage All Products
          </button>

          <button @click="activeTab = 'page3'; sidebarOpen = false"
            :class="activeTab === 'page3' ? 'bg-blue-700' : 'hover:bg-blue-700'"
            class="block p-2 rounded cursor-pointer w-full text-left transition">
            Analysis product
          </button>

          <button @click="activeTab = 'page4'; sidebarOpen = false"
            :class="activeTab === 'page4' ? 'bg-blue-700' : 'hover:bg-blue-700'"
            class="block p-2 rounded cursor-pointer w-full text-left transition">
            Analysis user
          </button>

          <button @click="activeTab = 'page5'; sidebarOpen = false"
            :class="activeTab === 'page5' ? 'bg-blue-700' : 'hover:bg-blue-700'"
            class="block p-2 rounded cursor-pointer w-full text-left transition">
            Sell Product Management
          </button>

          <button @click="activeTab = 'page6'; sidebarOpen = false"
            :class="activeTab === 'page6' ? 'bg-blue-700' : 'hover:bg-blue-700'"
            class="block p-2 rounded cursor-pointer w-full text-left transition">
            ចំណាយ
          </button>


          <button @click="activeTab = 'page7'; sidebarOpen = false"
            :class="activeTab === 'page7' ? 'bg-blue-700' : 'hover:bg-blue-700'"
            class="block p-2 rounded cursor-pointer w-full text-left transition">
           ចំណូល​​​ 
          </button>

        </nav>


      </aside>

      <!-- Main area -->
      <main class="flex-1 p-4 md:p-6 overflow-auto">
        <h1 class="text-xl font-bold text-gray-800 mb-4">{{ activeTabLabel }}</h1>
        <section>
          <component :is="currentComponent" />
        </section>
      </main>
    </div>
  </div>
</template>


<script setup>
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

import { useRouter } from 'vue-router'
const router = useRouter();

import { ref, computed } from 'vue'
import axios from 'axios'

// Import your components here:
import page1 from './section/page1.vue'
import page2 from './section/page2.vue'
import page3 from './section/page3.vue'
import page4 from './section/page4.vue'
import Page5 from './section/page5.vue';
import Page6 from './section/page6.vue';
import Page7 from './section/page7.vue';


// Make sure initial active tab matches one of the keys below
const activeTab = ref('page1')

// Map activeTab value to component
const currentComponent = computed(() => {
  switch (activeTab.value) {
    case 'page7':
      return Page7
    case 'page6':
      return Page6
    case 'page5':
      return Page5
    case 'page4':
      return page4
    case 'page3':
      return page3
    case 'page2':
      return page2
    case 'page1':
    default:
      return page1
  }
})

// Optional: label display for the active tab header
const activeTabLabel = computed(() => {
  switch (activeTab.value) {
    case 'page2': return 'Products'
    case 'Users': return 'Users'
    case 'page1': return 'Dashboard'
    default: return ''
  }
})

const logout = async () => {
  try {
    // Set auth header explicitly just in case
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    await axios.post('/api/logout')

    // Only after logout success remove token & redirect
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  } catch (e) {
    console.error('Logout failed:', e.response?.data || e.message)
    // Optional: still clear tokens and redirect on error
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  }
}

</script>

<style scoped>
/* optional custom styling */
</style>

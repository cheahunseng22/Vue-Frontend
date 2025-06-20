<template>
  <div class="p-4 space-y-6">
    <!-- Chart Section -->
    <div class="bg-white rounded shadow p-4">
      <h2 class="text-xl font-semibold mb-4 text-black">
        User Statistics (Total: <span class="text-blue-500 font-bold">{{ users.length }}</span>)
      </h2>
      <div class="h-[300px]">
        <BarChart :chart-data="chartData" :chart-options="chartOptions" />
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded shadow p-4 overflow-x-auto">
      <h2 class="text-xl font-semibold mb-4 text-black">Registered Users</h2>

      <!-- Global Loading Spinner -->
      <div v-if="isLoading" class="text-center mb-4 my-5">
        <span
          class="loader inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        ></span>
      </div>

      <table class="min-w-full table-auto text-sm text-left text-gray-700" v-else>
        <thead class="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, defineComponent, h, onMounted } from 'vue'
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Loading state
const isLoading = ref(false)

// Users data
const users = ref([])

// Chart reactive data
const chartData = ref({
  labels: ['Registered Users'],
  datasets: [
    {
      label: 'Users',
      backgroundColor: '#60a5fa',
      data: [0],
    },
  ],
})

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: false,
    },
  },
}

// Wrapper component to bind reactive props to Bar chart
const BarChart = defineComponent({
  name: 'BarChart',
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // Use render function without JSX
    return () =>
      h(Bar, {
        data: props.chartData,
        options: props.chartOptions,
      })
  },
})

// Fetch users
const fetchUsers = async () => {
  isLoading.value = true
  try {
    const res = await axios.get('https://elarastore.duckdns.org/api/auth/listuser')
    users.value = res.data.user ?? []

    // Update chart data
    chartData.value.datasets[0].data[0] = users.value.length
  } catch (e) {
    console.error('User fetch failed:', e.response?.data || e.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchUsers)
</script>

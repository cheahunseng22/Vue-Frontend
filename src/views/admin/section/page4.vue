<template>
  <div class="p-4 space-y-6">
    <!-- Chart Section -->
    <div class="bg-white rounded shadow p-4">
      <h2 class="text-xl font-semibold mb-4 text-black">
        User Statistics (Total: <span class="text-blue-500 font-bold">{{ users.length }}</span>)
      </h2>
      <div class="h-[300px]">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded shadow p-4 overflow-x-auto">
      <h2 class="text-xl font-semibold mb-4 text-black">Registered Users</h2>
      <table class="min-w-full table-auto text-sm text-left text-gray-700">
        <thead class="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="border-b hover:bg-gray-50"
          >
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Chart data and options
const chartData = ref({
  labels: ['Registered Users'],
  datasets: [
    {
      label: 'Users',
      backgroundColor: '#60a5fa',
      data: [0],
    },
  ],
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: 'black', // or white if your background is dark
      anchor: 'end',
      align: 'top',
      font: {
        weight: 'bold',
      },
      formatter: (value) => `${value}`, // just show the number
    },
  },
};
// User list state
const users = ref([]);

const fetchUsers = async () => {
  try {
    const res = await axios.get('/api/auth/listuser');
    users.value = res.data.user || [];

    // Update chart
    chartData.value.datasets[0].data[0] = users.value.length;
  } catch (e) {
    console.error('User fetch failed:', e.response?.data || e.message);
  }
};

onMounted(fetchUsers);
</script>

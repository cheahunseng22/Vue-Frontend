<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Sales Summary</h1>

    <div v-if="isLoading" class="text-center py-8">
      <div class="loader inline-block w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" aria-label="Loading"></div>
    </div>

    <div v-if="errorMessage" class="text-red-600 text-center mb-4 font-semibold">
      {{ errorMessage }}
    </div>

    <div v-else>
      <p class="text-gray-700 mb-2">
        Total items sold(លក់បាន): <strong>{{ totalItemsSold }}​</strong> items
      </p>
      <p class="text-gray-700">
        Total revenue​ (ចំណេញបាន): <strong>${{ totalRevenue.toFixed(2) }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const isLoading = ref(false)
const errorMessage = ref(null)
const payments = ref([])

const totalItemsSold = ref(0)
const totalRevenue = ref(0)

onMounted(async () => {
  isLoading.value = true
  errorMessage.value = null

  try {
    const token = localStorage.getItem('token') // add token if needed
    const response = await axios.get('http://127.0.0.1:8000/api/pay/all', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })

    payments.value = response.data

    // Calculate total items sold (sum of quantities)
    totalItemsSold.value = payments.value.reduce((sum, payment) => {
      return (
        sum +
        payment.purchased_products.reduce((subSum, item) => subSum + item.quantity, 0)
      )
    }, 0)

    // Calculate total revenue (sum of payment amounts)
    totalRevenue.value = payments.value.reduce((sum, payment) => sum + Number(payment.amount), 0)
  } catch (error) {
    errorMessage.value = "Failed to load sales data. Please try again later."
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.loader {
  border-top-color: transparent;
}
</style>

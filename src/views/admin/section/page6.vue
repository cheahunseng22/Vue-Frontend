<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">All Products Price Summary</h1>

    <div v-if="isLoading" class="text-center py-8">
      <div class="loader inline-block w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" aria-label="Loading"></div>
    </div>

    <div v-else-if="errorMessage" class="text-red-600 text-center mb-4 font-semibold">
      {{ errorMessage }}
    </div>

    <div v-else>
      <ul class="mb-6 space-y-2 max-h-64 overflow-auto">
        <li v-for="product in products" :key="product.id" class="flex justify-between border-b border-gray-200 py-2">
          <span class="text-gray-700 font-medium">Product Name: <span class="font-bold text-lg font-mono">{{ product.name }}</span></span>
          <span class="text-gray-900 font-semibold">${{ Number(product.price).toFixed(2) }}</span>
        </li>
      </ul>

      <div class="text-right text-xl font-bold text-blue-700 border-t pt-4">
        Total Price ចំណាយ: ${{ totalPrice.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const totalPrice = ref(0)
const isLoading = ref(false)
const errorMessage = ref(null)

onMounted(async () => {
  isLoading.value = true
  errorMessage.value = null

  try {
    const response = await axios.get('https://elarastore.duckdns.org/api/products')
    products.value = response.data

    totalPrice.value = products.value.reduce((sum, p) => sum + Number(p.price), 0)
  } catch (err) {
    errorMessage.value = 'Failed to load products. Please try again later.'
    console.error(err)
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

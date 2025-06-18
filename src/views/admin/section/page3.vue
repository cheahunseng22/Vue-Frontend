<template>
  <div class="min-h-screen bg-gray-100 p-4">

    <!-- Header with chart -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <h1 class="text-2xl font-bold text-gray-800">Product Management</h1>

      <!-- Circular progress chart -->
      <div class="relative w-24 h-24">
        <svg class="transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-gray-300" cx="50" cy="50" r="45" stroke-width="10" fill="none" stroke="currentColor" />
          <circle
            class="text-green-500"
            cx="50"
            cy="50"
            r="45"
            stroke-width="10"
            fill="none"
            :stroke-dasharray="282.6"
            :stroke-dashoffset="circleOffset"
            stroke-linecap="round"
            stroke="currentColor"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-sm font-bold text-gray-700">{{ productPercentage }}%</span>
        </div>
      </div>
    </div>

    <!-- Product List
    <section class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="product in products" :key="product.id" class="bg-white shadow-md rounded-md overflow-hidden">
        <figure>
          <img v-if="product.image" :src="`http://localhost:8000/storage/${product.image}`" alt="Product" class="w-full h-48 object-cover" />
        </figure>
        <div class="p-4 space-y-2">
          <h2 class="text-lg font-semibold">{{ product.name }}</h2>
          <p class="text-sm text-gray-600">{{ product.description }}</p>
          <div class="flex justify-between items-center mt-2">
            <p class="text-green-600 font-bold">${{ product.price }}</p>
            <div class="space-x-2">
              <button class="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded" @click="startEdit(product)">Edit</button>
              <button class="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded" @click="deleteProduct(product.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section> -->

 
  <div class="p-4 min-h-screen">
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full table-auto text-sm text-left text-gray-700">
        <thead class="bg-gray-900 text-xs uppercase text-gray-500">
          <tr>
            <th class="px-6 py-3">Image</th>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-6 py-4">
              <img
                v-if="product.image"
                :src="`http://localhost:8000/storage/${product.image}`"
                alt="Product"
                class="w-16 h-16 object-cover rounded"
              />
            </td>
            <td class="px-6 py-4 font-medium">{{ product.name }}</td>
            <td class="px-6 py-4">{{ product.description }}</td>
            <td class="px-6 py-4 text-green-600 font-semibold">${{ product.price }}</td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>


  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const products = ref([]);
const maxProducts = 100; // define max limit for the chart

const fetchProducts = async () => {
  try {
    const res = await axios.get('/api/products');
    products.value = res.data;
  } catch (e) {
    console.error('Failed to load products:', e.response?.data || e.message);
  }
};
onMounted(fetchProducts);

// Compute product count and percentage
const productCount = computed(() => products.value.length);
const productPercentage = computed(() => Math.min(Math.round((productCount.value / maxProducts) * 100), 100));

// SVG circle progress: full circle is ~2πr = 2*π*45 ≈ 282.6
const circleOffset = computed(() => 282.6 - (282.6 * productPercentage.value) / 100);


</script>

<style scoped>
/* Optionally style more or let Tailwind handle most */
</style>

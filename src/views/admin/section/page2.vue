<template>
  <div class="min-h-screen bg-gray-100 p-4">


    <!-- Product List -->
    <section class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="product in products" :key="product.id" className="card bg-base-100  shadow-sm">
        <figure>
          <img v-if="product.image" :src="`http://localhost:8000/storage/${product.image}`" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <div className="card-actions justify-end">
            <p>${{ product.price }}</p>
            <button className="btn bg-green-500" @click="startEdit(product)">Edit</button>
            <button className="btn bg-red-500" @click="deleteProduct(product.id)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const products = ref([]);

const fetchProducts = async () => {
  try {
    const res = await axios.get('/api/products');
    products.value = res.data;
  } catch (e) {
    console.error('Failed to load products:', e.response?.data || e.message);
  }
};
onMounted(fetchProducts);



</script>



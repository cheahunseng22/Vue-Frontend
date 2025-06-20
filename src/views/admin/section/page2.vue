<template>
  <div class="min-h-screen bg-gray-100 p-4">

    <!-- Edit Modal -->
    <div v-if="editingProduct" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Edit Product</h2>
        <form @submit.prevent="submitUpdate">
          <input
            v-model="form.name"
            placeholder="Product name"
            required
            class="w-full border border-gray-300 rounded px-4 py-2 mb-3 text-black"
          />
          <input
            v-model.number="form.price"
            type="number"
            step="0.001"
            placeholder="Price"
            required
            class="w-full border border-gray-300 rounded px-4 py-2 mb-3 text-black"
          />
          <textarea
            v-model="form.description"
            placeholder="Description"
            class="w-full border border-gray-300 rounded px-4 py-2 mb-3 text-black"
          ></textarea>

          <!-- stock dropdown -->
          <label class="block mb-1 font-semibold text-gray-700">stock</label>
          <select
            v-model="form.stock"
            class="w-full border border-gray-300 rounded px-4 py-2 mb-3 text-black"
          >
            <option value="in stock">In Stock</option>
            <option value="out of stock">Out of Stock</option>
          </select>

          <input
            type="file"
            @change="handleImageUpload"
            class="block mb-3 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <div class="flex justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              type="button"
              @click="cancelEdit"
              class="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>

        <!-- Global Loading Spinner -->
        <div v-if="isLoading" class="text-center mb-4">
          <span
            class="loader inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          ></span>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <p v-if="successMessage" class="text-green-600 relative top-0 text-center mb-4 font-semibold">
      {{ successMessage }}
    </p>

    <!-- Global Loading Spinner -->
    <div v-if="isLoading" class="text-center mb-4 sticky top-0 z-50">
      <span class="loader inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
    </div>

    <!-- Product List -->
    <section class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="product in products" :key="product.id" class="card bg-base-100 shadow-sm">
        <figure>
          <img v-if="product.image" :src="`http://localhost:8000/storage/${product.image}`" alt="Product" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <div class="card-actions justify-end">
            <p>${{ product.price }}</p>
            <p class="font-bold text-green-500">{{ product.stock }}</p>
            
            <button class="btn bg-green-500" @click="startEdit(product)">Edit</button>
            <button class="btn bg-red-500" @click="deleteProduct(product.id)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const isLoading = ref(false);
const successMessage = ref('');
const products = ref([]);

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get('/api/products');
    products.value = res.data;
  } catch (e) {
    console.error('Failed to load products:', e.response?.data || e.message);
  } finally {
    isLoading.value = false;
  }
};

const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  isLoading.value = true;
  successMessage.value = '';

  try {
    await axios.delete(`/api/products/${id}`);
    await fetchProducts();
    successMessage.value = 'Product deleted successfully!';
  } catch (e) {
    console.error('Failed to delete product:', e.response?.data || e.message);
  } finally {
    isLoading.value = false;
    setTimeout(() => successMessage.value = '', 3000);
  }
};

onMounted(fetchProducts);

const editingProduct = ref(false);
const form = ref({
  id: null,
  name: '',
  price: null,
  description: '',
  stock: '',
  image: null,
});

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.image = file;
  }
};

const startEdit = (product) => {
  form.value = {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    stock: product.stock,
    image: null,
  };
  editingProduct.value = true;
};

const cancelEdit = () => {
  editingProduct.value = false;
  form.value = {
    id: null,
    name: '',
    price: null,
    description: '',
    stock: '',
    image: null,
  };
};

const submitUpdate = async () => {
  if (!form.value.id) return;

  isLoading.value = true;
  successMessage.value = '';

  try {
    const data = new FormData();
    data.append('name', form.value.name);
    data.append('price', form.value.price);
    data.append('description', form.value.description);
    data.append('stock', form.value.stock);
    if (form.value.image) {
      data.append('image', form.value.image);
    }
    data.append('_method', 'PUT');

    await axios.post(`/api/products/${form.value.id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    await fetchProducts();
    cancelEdit();
    successMessage.value = 'Product updated successfully!';
  } catch (e) {
    console.error('Product update failed:', e.response?.data || e.message);
  } finally {
    isLoading.value = false;
    setTimeout(() => (successMessage.value = ''), 3000);
  }
};
</script>

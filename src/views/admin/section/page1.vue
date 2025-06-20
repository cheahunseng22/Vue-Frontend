<template>
  <div class="min-h-screen bg-gray-100 p-4">


    <!-- Product Form -->
<section class="bg-white p-6 rounded-lg shadow-md mb-8 max-w-xl mx-auto">
  <h2 class="text-lg font-semibold mb-4 text-gray-800">
    {{ isEditing ? 'Update Product' : 'Create Product' }}
  </h2>
  <form @submit.prevent="isEditing ? submitUpdate() : submitProduct()" ref="productForm" class="space-y-4">
    <input
      v-model="form.name"
      placeholder="Product name"
      required
      class="w-full border border-gray-300 rounded px-4 py-2 text-black"
    />

    <input
      v-model.number="form.price"
      type="number"
      placeholder="Price"
      required
      class="w-full border border-gray-300 rounded px-4 py-2 text-black"
    />

    <textarea
      v-model="form.description"
      placeholder="Description"
      class="w-full border border-gray-300 rounded px-4 py-2 text-black"
    ></textarea>

    <!-- New stock input -->
    <input
      v-model="form.stock"
      type="text"
      placeholder="Stock stock (e.g., in stock, out of stock)"
      required
      class="w-full border border-gray-300 rounded px-4 py-2 text-black"
    />

    <input
      type="file"
      @change="handleImageUpload"
      accept="image/*"
      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />

    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition"
    >
      {{ isEditing ? 'Update Product' : 'Create Product' }}
    </button>
  </form>

  <!-- Global Loading Spinner -->
  <div v-if="isLoading" class="text-center mb-4 sticky top-0 z-50">
    <span
      class="loader inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
    ></span>
  </div>

  <p v-if="successMessage" class="text-green-600 relative top-0 text-center mb-4 font-semibold">
    {{ successMessage }}
  </p>
</section>



  </div>
</template>

<script setup>
import imageCompression from 'browser-image-compression';
import { ref } from 'vue';
import axios from 'axios';
const isEditing = ref(false);


const isLoading = ref(false);
const successMessage = ref('');


const token = localStorage.getItem('token');
axios.defaults.baseURL = 'https://elarastore.duckdns.org';
axios.defaults.withCredentials = true;
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


// Form state
const form = ref({
  id: null,
  name: '',
  price: null,
  description: '',
  image: null,
  stock:'',
});



const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    form.value.image = compressedFile;
  } catch (error) {
    console.error("Image compression error:", error);
    form.value.image = file;
  }
};

const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    price: null,
    description: '',
    stock: '',
    image: null,
  };
  isEditing.value = false;
  const productForm = document.querySelector('form');
  if (productForm) productForm.reset();
};


const submitProduct = async () => {
  isLoading.value = true;
  try {
    const data = new FormData();
    data.append('name', form.value.name);
    data.append('price', form.value.price);
    data.append('description', form.value.description);
    data.append('stock', form.value.stock);   // <--- add this line!
    if (form.value.image) {
      data.append('image', form.value.image);
    }

    await axios.post('/api/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    successMessage.value = 'Product added successfully!';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);

    resetForm();
  } catch (e) {
    console.error('Product creation failed:', e.response?.data || e.message);
  } finally {
    isLoading.value = false;
  }
};





</script>

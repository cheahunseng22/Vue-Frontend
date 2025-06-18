<template>
  <div class="min-h-screen bg-gray-100 p-4">


    <!-- Product Form -->
    <section class="bg-white p-6 rounded-lg shadow-md mb-8 max-w-xl mx-auto">
      <h2 class="text-lg font-semibold mb-4 text-gray-800">{{ isEditing ? 'Update Product' : 'Create Product' }}</h2>
      <form @submit.prevent="isEditing ? submitUpdate() : submitProduct()" ref="productForm" class="space-y-4">
        <input v-model="form.name" placeholder="Product name" required
          class="w-full border border-gray-300 rounded px-4 py-2 text-black" />
        <input v-model.number="form.price" type="number" placeholder="Price" required
          class="w-full border border-gray-300 rounded px-4 py-2 text-black" />
        <textarea v-model="form.description" placeholder="Description"
          class="w-full border border-gray-300 rounded px-4 py-2 text-black"></textarea>

        <input type="file" @change="handleImageUpload" accept="image/*" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />

        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition">
          {{'Create Product' }}
        </button>


      </form>
    </section>


  </div>
</template>

<script setup>
import imageCompression from 'browser-image-compression';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();


const token = localStorage.getItem('token');
axios.defaults.baseURL = 'http://localhost:8000';
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
    image: null,
  };
  isEditing.value = false;
  // reset file input manually
  const productForm = document.querySelector('form');
  if (productForm) productForm.reset();
};

const submitProduct = async () => {
  try {
    const data = new FormData();
    data.append('name', form.value.name);
    data.append('price', form.value.price);
    data.append('description', form.value.description);
    if (form.value.image) {
      data.append('image', form.value.image);
    }

    await axios.post('/api/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    await fetchProducts();
    resetForm();
  } catch (e) {
    console.error('Product creation failed:', e.response?.data || e.message);
  }
};



const submitUpdate = async () => {
  if (!form.value.id) return;

  try {
    const data = new FormData();
    data.append('name', form.value.name);
    data.append('price', form.value.price);
    data.append('description', form.value.description);
    if (form.value.image) {
      data.append('image', form.value.image);
    }
    data.append('_method', 'PUT'); // for Laravel PUT method spoofing

    await axios.post(`/api/products/${form.value.id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    await fetchProducts();
    resetForm();
  } catch (e) {
    console.error('Product update failed:', e.response?.data || e.message);
  }
};

const cancelEdit = () => {
  resetForm();
};



</script>


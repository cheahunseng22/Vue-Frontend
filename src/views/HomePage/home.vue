<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <!-- Navbar -->
    <header class="bg-white shadow-md p-4 rounded-lg mb-6 text-base-200">
      <div class="grid grid-cols-3 items-center">
        <h1 class="md:text-xl font-bold text-gray-800 ">CHEAHUN STORE</h1>

        <nav class="flex justify-center">
          <ul class="md:flex gap-4 text-gray-600 text-[12px] hidden text-nowrap font-medium">
            <li><a href="#" class="hover:text-blue-500">All Product</a></li>
            <li><a href="#" class="hover:text-blue-500">Popular</a></li>
            <li><a href="#" class="hover:text-blue-500">New Arrival</a></li>
          </ul>
        </nav>
        <!-- right secttion  -->

        <div class="flex justify-end items-center space-x-4 cursor-pointer" >
          <div class="cart relative">
            <i class="fa-brands fa-opencart" @click="toggleCart"></i>
            <span class="text-red-500 text-[12px] font-bold -top-2
             right-0 absolute">{{ cartCount }}</span>
          </div>
          
          <span class="text-sm font-medium text-gray-800">
            <template v-if="loading">Loading...</template>
            <template v-else-if="username">{{ username }}</template>
            <template v-else>No user</template>
          </span>
          <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded transition">
            Logout
          </button>
        </div>
      </div>




      <!-- 🧾 Cart Items Dropdown -->
      <div v-if="showCart"
        class="items absolute top-0 right-0 mt-2 w-[250px] bg-white shadow-lg border rounded p-3 z-50">
        <div class="head flex justify-between">
          <h3 class="font-bold text-lg mb-2">Cart Items</h3>
          <h1 @click="close" class="btn ">X</h1>
        </div>
        <div v-if="cart.length === 0">Cart is empty
        </div>
        <button v-else @click="checkout" class="btn text-green-500 absolute bottom-0 left-0  w-full ">Check Out</button>


        <div v-for="item in cart" :key="item.id" class="flex justify-between items-center border-b py-1">
          <div>
            <img class="w-full h-full object-contain" v-if="item.image"
              :src="`http://localhost:8000/storage/${item.image}`" alt="Product" />
            <p class="font-semibold text-sm">{{ item.name }}</p>
            <p class="text-sm font-medium">${{ item.price * item.quantity }}</p>

            <div class="qty flex justify-between w-full items-center ">
              <div class="qty1">
                <p class="text-xs text-gray-500 ">Qty: {{ item.quantity }} </p>
              </div>

              <div class="space-x-1">
                <button @click="increaseQuantity(item)" class=" btn">+</button>
                <button @click="decreaseQuantity(item)" class=" btn">-</button>

              </div>

            </div>
            <div class="w-full flex justify-between my-10">
              <button @click="removeItem(item)" class="btn text-red-500">Delete</button>

            </div>

          </div>

        </div>
        <!-- 🔔 Toast Message -->
        <div v-if="showToast" :class="[
          'fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg transition-all duration-500 z-50 animate-slide-in-out',
          toastType === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        ]">
          <p class="text-sm font-semibold">{{ toastMessage }}</p>
        </div>

      </div>




    </header>



    <!-- hero  -->

    <div class="hero flex justify-between text-base-200 text-[2rem] md:text-7xl">
      <div class="text">WE HAVE NEW ARRIVAL THIS WEEKS</div>
      <div class="logo ">
        <img class="w-250" src="https://pbs.twimg.com/media/F6v8jhbbYAAqte1?format=jpg&name=4096x4096" alt="">
      </div>
    </div>
    <!-- end gero  -->

    <!-- Products Section -->

    <h1 class="text-3xl text-base-100 text-center my-10">All Products</h1>

    <section class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="product in products" :key="product.id"
        class="card text-base-100 shadow-sm flex flex-col justify-between">
        <!-- Image Container with fixed height -->
        <figure class="w-full h-48 overflow-hidden">
          <img class="w-full h-full object-contain" v-if="product.image"
            :src="`http://localhost:8000/storage/${product.image}`" alt="Product" />
        </figure>

        <!-- Card Body fills remaining space -->
        <div class="card-body flex flex-col justify-between flex-grow">
          <div>

            <h2 class="card-title">{{ product.name }}</h2>
            <p>{{ product.description }}</p>
          </div>
          <div class="card-actions justify-between items-center mt-4">
            <p class="font-bold">${{ product.price }}</p>
            <button @click="addToCart(product)" class="btn bg-green-500 text-white">Add To Cart</button>
          </div>
        </div>
      </div>
    </section>





  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const showToast = ref(false);
const toastMessage = ref('');

const showErrorToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 3000); // Toast disappears after 3 seconds
};


const showCart = ref(false)


const router = useRouter();
const username = ref('');

const loading = ref(true);

const token = localStorage.getItem('token');

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  // Redirect if no token
  router.push('/login');
}

const increaseQuantity = (item) => {
  if (item.quantity < 10) {
    item.quantity++;
  }
  else {
    showErrorToast("we limit only for 10 item!");
  }
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeItem(item); // optional: remove if quantity hits 0
  }
};

const removeItem = (item) => {
  const index = cart.value.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    cart.value.splice(index, 1);
  }
};

const cart = ref([])

const addToCart = (product) => {
  const found = cart.value.find((item) => item.id === product.id)
  if (found) {
    found.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }

  alert(`${product.name} added to cart successfully!`)
}

// 🧮 Count total quantity
const cartCount = computed(() =>
  cart.value.reduce((total, item) => total + item.quantity, 0)
)

// Toggle cart items view
const toggleCart = () => {
  showCart.value = !showCart.value
}
const close = () => {
  showCart.value = !showCart.value
}

//fetch product
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

// Fetch current user info
const fetchUser = async () => {
  try {
    const res = await axios.get('/api/auth/listuser');
    // Adjust this depending on your API response structure
    username.value = res.data.user?.[0]?.name || '';
    if (!username.value) {
      router.push('/login');
    }
  } catch (e) {
    console.error('User fetch failed:', e.response?.data || e.message);
    router.push('/login');
  }
};

// Fetch product list


const logout = async () => {
  try {
    await axios.post('/api/logout');
  } catch (e) {
    console.error('Logout failed:', e.response?.data || e.message);
  } finally {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
  }
};

// Run both fetches concurrently, then mark loading done
onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchUser()]);
  loading.value = false;
});


//check out
const checkout = () => {
  if (cart.value.length === 0) {
    showErrorToast("Your cart is empty!");
    return;
  }

  // Here you can integrate real payment API later
  showSuccessToast(" process to payment.");

  // Clear cart after checkout
  cart.value = [];
};

// Success toast function, similar to error toast
const showSuccessToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

</script>

<style scoped>
/* Optional styling */
</style>

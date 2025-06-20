<template>
    <div class="p-4 text-black max-w-7xl mx-auto">
        <h2 class="text-3xl font-extrabold mb-8 text-gray-800">All Users Purchase Summary</h2>

        <div v-if="isLoading" class="text-center my-8">
            <span
                class="loader inline-block w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
                aria-label="Loading"></span>
        </div>

        <div v-if="errorMessage" class="text-red-600 my-6 text-center font-semibold text-lg">
            {{ errorMessage }}
        </div>

        <div v-else-if="payments.length"
            class="overflow-x-auto rounded-xl bg-white/30 backdrop-blur-md shadow-lg border border-white/30">
            <table class="min-w-full text-gray-900">
                <thead>
                    <tr class="bg-white/40 backdrop-blur-sm">
                        <th class="text-left py-4 px-6 text-sm font-semibold border-b border-white/50">
                            User
                        </th>
                        <th class="text-left py-4 px-6 text-sm font-semibold border-b border-white/50">
                            Purchased Products
                        </th>
                        <th class="text-right py-4 px-6 text-sm font-semibold border-b border-white/50">
                            Total Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(payment, index) in payments" :key="index"
                        class="odd:bg-white/20 even:bg-white/10 hover:bg-white/40 transition-colors duration-300">
                        <td class="py-4 px-6 align-top whitespace-nowrap">
                            <p class="font-semibold text-blue-700 text-lg">
                                {{ payment.user.name }}
                            </p>
                            <p class="text-blue-900 text-xs opacity-80">ID: {{ payment.user.id }}</p>
                        </td>

                        <td class="py-4 px-6 align-top">
                            <ul class="list-none space-y-1 text-gray-900 text-sm">
                                <li v-for="(item, idx) in payment.purchased_products" :key="idx">
                                    Product ID: <strong>{{ item.product_id }}</strong> — Qty:
                                    <strong>{{ item.quantity }}</strong>
                                </li>
                            </ul>
                        </td>


                        <td
                            class="py-4 px-6 align-top text-right font-semibold text-gray-900 whitespace-nowrap text-lg">
                            ${{ Number(payment.amount).toFixed(2) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="text-center py-14 text-gray-500 text-lg font-light">
            <p>No payment data yet.</p>
        </div>
    </div>
</template>




<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const isLoading = ref(false);
const payments = ref([]);
const errorMessage = ref(null);

onMounted(async () => {
    isLoading.value = true;
    errorMessage.value = null;

    const token = localStorage.getItem('token');
    if (!token) {
        errorMessage.value = 'You must be logged in to view payments.';
        isLoading.value = false;
        return;
    }

    try {
        const response = await axios.get('http://127.0.0.1:8000/api/pay/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        payments.value = response.data;
        console.log('All payments:', response.data);
    } catch (err) {
        if (err.response) {
            console.error('API error:', err.response.data, 'Status:', err.response.status);
        } else if (err.request) {
            console.error('No response received:', err.request);
        } else {
            console.error('Request error:', err.message);
        }
        errorMessage.value = 'Failed to load payments. Please try again later.';
    } finally {
        isLoading.value = false;
    }
});
</script>

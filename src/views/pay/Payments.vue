<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const paymentData = ref(null)
const checking = ref(false)
const checkResult = ref('')

onMounted(() => {
  const data = localStorage.getItem('payment_qr')
  if (data) {
    paymentData.value = JSON.parse(data)
  }
})

const checkPaymentStatus = async () => {
  if (!paymentData.value?.payment_id) return

  checking.value = true
  checkResult.value = ''

  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`http://127.0.0.1:8000/api/payment-status/${paymentData.value.payment_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    checkResult.value = res.data.status

    // Optional: Update local status
    paymentData.value.status = res.data.status
  } catch (err) {
    checkResult.value = 'Error checking status'
  } finally {
    checking.value = false
  }
}
</script>

<template>
  <div v-if="paymentData">
    <h2 class="text-lg font-bold">Payment Status: {{ paymentData.status }}</h2>
    <p>Payment ID: {{ paymentData.payment_id }}</p>
    <p>MD5 Hash: {{ paymentData.md5 }}</p>

    <div class="my-4">
      <qrcode-vue :value="paymentData.qr_string" :size="200" />
    </div>

    <button @click="checkPaymentStatus" class="btn bg-blue-500 text-white px-4 py-2 rounded">
      {{ checking ? 'Checking...' : 'Check Payment Status' }}
    </button>

    <p v-if="checkResult" class="mt-3">Result: {{ checkResult }}</p>
  </div>

  <div v-else>
    <p>No payment data found.</p>
  </div>
</template>

<template>
  <div class="p-6 max-w-md mx-auto pt-[150px]">
    <h1 class="text-xl font-bold mb-4">Contact Form with reCAPTCHA</h1>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border p-2 w-full"
        required
      />

      <!-- reCAPTCHA widget -->
      <div
        class="g-recaptcha"
        :data-sitekey="siteKey"
      ></div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>

    <!-- Show token if received -->
    <div v-if="token" class="mt-4 p-2 bg-green-100 border">
      <strong>Token received:</strong>
      <p>{{ token }}</p>
    </div>

    <!-- Show error if not verified -->
    <div v-if="error" class="mt-4 p-2 bg-red-100 border text-red-700">
      <strong>Error:</strong>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const email = ref('')
const token = ref(null)
const error = ref(null)

// Replace with your real site key from Google reCAPTCHA admin
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const onSubmit = () => {
  const value = document.querySelector('[name="g-recaptcha-response"]')?.value

  if (!value) {
    error.value = 'Please verify the reCAPTCHA before submitting.'
    token.value = null
    return
  }

  error.value = null
  token.value = value
  console.log('Token:', value)

  // Normally you'd send this token + form data to backend
}

onMounted(() => {
  // Load reCAPTCHA script dynamically if not already present
  if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
})
</script>

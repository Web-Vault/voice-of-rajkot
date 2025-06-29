<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded shadow max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" class="w-full mb-4 px-3 py-2 border rounded" />
        <input v-model="password" type="password" placeholder="Password" class="w-full mb-4 px-3 py-2 border rounded" />
        <button class="w-full bg-blue-600 text-white py-2 rounded font-semibold">Login</button>
      </form>
      <div class="flex justify-between mt-4 text-sm">
        <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
        <router-link to="/forgot-password" class="text-blue-600 hover:underline">Forgot Password?</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const email = ref('');
const password = ref('');
// Dummy: toggle this to test artist/normal user redirection
const isArtist = ref(false);
function handleLogin() {
  if (isArtist.value) {
    router.push('/artist/home');
  } else {
    router.push('/');
  }
}
</script> 
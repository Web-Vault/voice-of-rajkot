<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded shadow max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <input type="text" placeholder="Name" class="w-full mb-4 px-3 py-2 border rounded" />
        <input type="email" placeholder="Email" class="w-full mb-4 px-3 py-2 border rounded" />
        <input type="password" placeholder="Password" class="w-full mb-4 px-3 py-2 border rounded" />
        <input type="password" placeholder="Confirm Password" class="w-full mb-4 px-3 py-2 border rounded" />
        <div class="flex items-center mb-4">
          <input type="checkbox" id="artist" class="mr-2" />
          <label for="artist" class="text-gray-700">Register as Artist/Poet</label>
        </div>
        <button class="w-full bg-blue-600 text-white py-2 rounded font-semibold">Register</button>
      </form>
      <div class="mt-4 text-sm text-center">
        <router-link to="/login" class="text-blue-600 hover:underline">Already have an account? Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function handleRegister() {
  router.push('/email-verification');
}
</script> 
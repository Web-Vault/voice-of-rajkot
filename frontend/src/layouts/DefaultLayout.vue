<template>
  <div class="min-h-screen bg-gray-50">
    <AppNavbar />
    <main class="max-w-5xl mx-auto p-4">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
</script> 
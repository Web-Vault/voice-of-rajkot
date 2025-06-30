<template>
  <div class="base-bg min-h-screen flex flex-col">
    <AppNavbar />
    <div class="flex-1 flex flex-col items-center justify-center py-8 px-2">
      <main class="main-card-container w-full max-w-4xl mx-auto flex-1">
        <router-view />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
</script>

<style scoped>
.base-bg {
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
  color: #232946;
  min-height: 100vh;
}
.main-card-container {
  background: #fff;
  border-radius: 1.3rem;
  box-shadow: 0 4px 32px 0 #6366f11a, 0 1.5px 0 #e0e7ff inset;
  padding: 2.5rem 2rem 2rem 2rem;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  min-height: 60vh;
  width: 100%;
  transition: box-shadow 0.2s;
}
@media (max-width: 900px) {
  .main-card-container {
    padding: 1.2rem 0.7rem 1.2rem 0.7rem;
    border-radius: 0.8rem;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }
}
</style> 
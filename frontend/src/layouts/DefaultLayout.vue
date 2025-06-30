<template>
  <div class="base-bg min-h-screen flex flex-col">
    <AppNavbar />
    <main class="main-content flex-1 w-full">
      <router-view />
    </main>
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
.main-content {
  min-height: 70vh;
  width: 100%;
  /* padding-top: 2.5rem; */
  padding-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
}
@media (max-width: 900px) {
  .main-content {
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }
}
</style> 
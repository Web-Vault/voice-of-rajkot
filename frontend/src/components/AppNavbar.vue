<template>
  <nav class="bg-blue-700 text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
    <div class="font-bold text-xl tracking-wide">Voice of Rajkot</div>
    <div class="space-x-4">
      <router-link to="/" class="hover:bg-blue-800 px-3 py-1 rounded transition">Home</router-link>
      <router-link to="/events" class="hover:bg-blue-800 px-3 py-1 rounded transition">Events</router-link>
      <router-link to="/artists" class="hover:bg-blue-800 px-3 py-1 rounded transition">Artists</router-link>
      <router-link to="/posts" class="hover:bg-blue-800 px-3 py-1 rounded transition">Posts</router-link>
      <router-link to="/profile" class="hover:bg-blue-800 px-3 py-1 rounded transition">Profile</router-link>
      <router-link to="/login" class="hover:bg-blue-800 px-3 py-1 rounded transition">Login</router-link>
      <router-link to="/register" class="hover:bg-blue-800 px-3 py-1 rounded transition">Register</router-link>
    </div>
  </nav>
</template>

<script setup>
</script> 
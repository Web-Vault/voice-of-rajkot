<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Posts</h2>
    <div class="space-y-4">
      <div v-for="n in 3" :key="n" class="bg-white rounded shadow p-6">
        <div class="font-semibold text-blue-700 mb-2">Artist {{ n }}</div>
        <div class="text-gray-700">Sample post content goes here. This is a placeholder for artist/poet content.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script> 
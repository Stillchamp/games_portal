<template>
  <nav class="w-full bg-white flex items-center px-8 py-4 border-b border-gray-200">
    <img src="@/assets/logo.png" alt="Logo" style="width: 67px; height: 59px; margin-right: 12px; cursor:pointer;" @click="goDashboard" />
    <span class="font-semibold text-base text-gray-700">Game-P</span>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goDashboard() {
  router.push('/')
}
</script>

<style scoped>
nav {
  font-family: 'Poppins', sans-serif;
}
</style>

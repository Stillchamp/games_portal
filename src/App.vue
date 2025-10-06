<script setup>
import { RouterView, useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const route = useRoute();
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
</script>

<template>
  <template v-if="isAuthenticated && !['login','forgot-password','verification','reset-password','password-changed'].includes(route.name)">
    <MainLayout>
      <RouterView />
    </MainLayout>
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family:'Poppins', sans-serif ;
}
</style>
<template>
  <!-- Redirecting, no login form -->
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Optionally set authentication flag
  localStorage.setItem('isAuthenticated', 'true')
  router.push('/dashboard')
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

/* Background matching the Figma design */
.bg-gray-50 {
  background-color: #f9fafb;
}

/* Input styling to match Figma exactly */
input {
  font-size: 14px;
  letter-spacing: 0.025em;
}

input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

/* Enhanced focus styles */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Button styling */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
}

/* Card shadow matching Figma */
.shadow-lg {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.game{
  /* border: 2px solid red; */
   border-radius: 50px;
}

/* Checkbox styling */
input[type='checkbox']:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

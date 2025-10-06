<template>
  <div class=" flex py-3 sm:py-4 md:py-6 px-2 sm:px-3 bg-[#e6f0fa] " style="height: 87vh; overflow: auto;">
    <div class="w-full mx-auto overflow-auto space-y-4 sm:space-y-6">
      <ScholarshipAwardStats />
      <ManageScholarshipYear />
    </div>
  </div>
</template>

<script setup>
import ScholarshipAwardStats from '@/components/setup/ScholarshipAwardStats.vue'
import ManageScholarshipYear from '@/components/setup/ManageScholarshipYear.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family:'Poppins', sans-serif ;
}
</style>

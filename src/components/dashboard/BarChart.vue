<template>
  <div
    style="
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      background: white;
    "
  >
    <canvas ref="canvas" width="600" height="370" style="max-width: 100%; height: auto"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => ({}),
  },
})

const canvas = ref(null)
let chartInstance = null

onMounted(() => {
  chartInstance = new Chart(canvas.value, {
    type: 'bar',
    data: props.chartData,
    options: props.chartOptions,
  })
})
</script>

<script setup>
import { ref } from 'vue'

import DashboardMetricCard from '@/components/dashboard/DashboardMetricCard.vue'
import TrendPill from '@/components/dashboard/TrendPill.vue'
import BarChart from '@/components/dashboard/BarChart.vue'
import DonutChart from '@/components/dashboard/DonutChart.vue'

const metricCards = [
  {
    id: 'total-beneficiaries',
    label: 'Total Beneficiaries',
    value: '1034',
    icon: 'beneficiaries',
    trendValue: '25%',
  },
  {
    id: 'total-funding',
    label: 'Total Funding',
    value: 'N252.5M',
    icon: 'funding',
    trendValue: '30%',
  },
  {
    id: 'active-beneficiaries',
    label: 'Active Beneficiaries',
    value: '866',
    icon: 'active',
    trendValue: '30%',
  },
  {
    id: 'graduated-beneficiaries',
    label: 'Graduated Beneficiaries',
    value: '66',
    icon: 'graduated',
  },
]

const tabItems = [
  { id: 'beneficiary-demography', label: 'Beneficiary Demography' },
  { id: 'funding-overview', label: 'Funding Overview' },
  { id: 'academic-performance', label: 'Academic Performance' },
]

const activeTab = ref(tabItems[0].id)
const viewOptions = ref([{ value: 'all-years', label: 'All Years' }])
const selectedView = ref(viewOptions.value[0].value)

const categoryChartData = {
  labels: ['Primary', 'Secondary', 'Technical', 'Tertiary'],
  datasets: [
    {
      label: 'Beneficiaries',
      data: [337, 389, 75, 293],
      backgroundColor: '#4A90E2',
      borderRadius: 4,
    },
  ],
}

const genderChartData = {
  labels: ['Male', 'Female'],
  datasets: [
    {
      data: [39, 61],
      backgroundColor: ['#FF6B6B', '#34D399'],
    },
  ],
}

const lgaChartData = {
  labels: ['Ikenne', 'Sagam', 'Remo', 'Others'],
  datasets: [
    {
      label: 'Beneficiaries',
      data: [30%, 40%, 20%, 10%],
      backgroundColor: '#4A90E2',
      borderRadius: 6,
    },
  ],
}

const awardChartData = {
  labels: ['Merit-Based', 'Indigent/Need-Based'],
  datasets: [
    {
      data: [37, 37],
      backgroundColor: ['#1D4ED8', '#34D399'],
    },
  ],
}

const fundingTrendChartData = {
  labels: ['2023', '2024', '2025'],
  datasets: [
    {
      label: 'Funding',
      data: [75000000, 90000000, 105000000],
      backgroundColor: '#1D4ED8',
      borderRadius: 6,
    },
  ],
}

const fundingCategoryChartData = {
  labels: ['Tertiary', 'Secondary', 'Primary', 'Technical Colleges'],
  datasets: [
    {
      data: [41, 37, 21, 11],
      backgroundColor: ['#1D4ED8', '#FF6B6B', '#34D399', '#475569'],
    },
  ],
}

const fundingCategoryBreakdown = [
  { label: 'Tertiary', value: '41%', color: '#1D4ED8' },
  { label: 'Secondary', value: '37%', color: '#FF6B6B' },
  { label: 'Primary', value: '21%', color: '#34D399' },
  { label: 'Technical Colleges', value: '11%', color: '#475569' },
]

const primarySecondaryPerformanceChartData = {
  labels: ['2023', '2024'],
  datasets: [
    {
      label: 'Primary',
      data: [58, 64],
      backgroundColor: '#3B82F6',
      borderRadius: 6,
    },
    {
      label: 'Secondary',
      data: [72, 80],
      backgroundColor: '#10B981',
      borderRadius: 6,
    },
  ],
}

const primarySecondaryPerformanceOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#334155',
        font: { family: 'Inter', size: 12 },
        usePointStyle: true,
      },
    },
  },
  layout: {
    padding: { top: 16, right: 12, bottom: 12, left: 12 },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#334155',
        font: { family: 'Inter', size: 12 },
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      max: 100,
      grid: {
        color: '#E2E8F0',
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        color: '#94A3B8',
        font: { family: 'Inter', size: 12 },
        padding: 8,
        stepSize: 20,
      },
    },
  },
}

const tertiaryPerformanceChartData = {
  labels: ['2023', '2024'],
  datasets: [
    {
      label: 'Average GPA',
      data: [3, 4.2],
      backgroundColor: '#1D4ED8',
      borderRadius: 6,
    },
  ],
}

const tertiaryPerformanceOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  layout: {
    padding: { top: 16, right: 12, bottom: 12, left: 12 },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#334155',
        font: { family: 'Inter', size: 12 },
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      max: 5,
      grid: {
        color: '#E2E8F0',
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        color: '#94A3B8',
        font: { family: 'Inter', size: 12 },
        padding: 8,
        stepSize: 1,
      },
    },
  },
}

const primarySecondaryPerformanceDistributionChartData = {
  labels: ['Excellent (< 70%)', 'Average (50 - 70%)', 'Need Support (> 50%)'],
  datasets: [
    {
      data: [45, 40, 15],
      backgroundColor: ['#34D399', '#FACC15', '#F87171'],
    },
  ],
}

const primarySecondaryPerformanceDistributionLegend = [
  { label: 'Excellent (< 70%)', value: '45%', color: '#34D399' },
  { label: 'Average (50 - 70%)', value: '40%', color: '#FACC15' },
  { label: 'Need Support (> 50%)', value: '15%', color: '#F87171' },
]

const tertiaryPerformanceDistributionChartData = {
  labels: ['Excellent (< 4.5)', 'Average (3.5 - 4.4)', 'Need Support (> 3.5)'],
  datasets: [
    {
      data: [35, 57, 8],
      backgroundColor: ['#1D4ED8', '#F87171', '#34D399'],
    },
  ],
}

const tertiaryPerformanceDistributionLegend = [
  { label: 'Excellent (< 4.5)', value: '35%', color: '#1D4ED8' },
  { label: 'Average (3.5 - 4.4)', value: '57%', color: '#F87171' },
  { label: 'Need Support (> 3.5)', value: '8%', color: '#34D399' },
]

viewOptions.value = [
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
]
selectedView.value = viewOptions.value[0].value

const nairaFormatter = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 })

const fundingBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  layout: {
    padding: { top: 16, right: 12, bottom: 12, left: 12 },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#334155',
        font: { family: 'Inter', size: 12 },
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      max: 125000000,
      grid: {
        color: '#E2E8F0',
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        color: '#94A3B8',
        font: { family: 'Inter', size: 12 },
        padding: 8,
        stepSize: 25000000,
        callback: (value) => nairaFormatter.format(value),
      },
    },
  },
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  layout: {
    padding: { top: 16, right: 12, bottom: 12, left: 12 },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#334155',
        font: { family: 'Inter', size: 12 },
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      max: 400,
      grace: 30,
      grid: {
        color: '#E2E8F0',
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        color: '#94A3B8',
        font: { family: 'Inter', size: 12 },
        padding: 8,
        stepSize: 100,
      },
    },
  },
}

const horizontalBarOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  layout: {
    padding: { top: 16, right: 12, bottom: 12, left: 12 },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: '#E2E8F0',
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        color: '#94A3B8',
        font: { family: 'Inter', size: 12 },
        padding: 8,
      },
    },
    y: {
      grid: { display: false },
      ticks: {
        color: '#334155',
        font: { family: 'Inter', size: 12 },
      },
      border: { display: false },
    },
  },
}

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0F172A',
      padding: 12,
      titleColor: '#E2E8F0',
      bodyColor: '#CBD5F5',
    },
  },
}
</script>

<template>
  <div class="space-y-10 bg-[#d9e8f5] p-8" style="min-height: 87vh; overflow: auto">
    <section class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <DashboardMetricCard
        v-for="metric in metricCards"
        :key="metric.id"
        :label="metric.label"
        :value="metric.value"
      >
        <template #icon>
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe4e1] text-[#ff6b6b]"
          >
            <svg
              v-if="metric.icon === 'beneficiaries' || metric.icon === 'active'"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6"
            >
              <path
                d="M12 12a5 5 0 1 0-5-5 5.006 5.006 0 0 0 5 5m-3.6 1.5a6.893 6.893 0 0 0-6.4 6.45.3.3 0 0 0 .3.3h19.4a.3.3 0 0 0 .3-.3 6.893 6.893 0 0 0-6.4-6.45"
              />
            </svg>
            <svg
              v-else-if="metric.icon === 'funding'"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m4.25-12.5H10a2.5 2.5 0 1 0 0 5h3a2.5 2.5 0 1 1 0 5H7.75"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6"
            >
              <path
                v-if="metric.icon === 'graduated'"
                d="M12 3.5 2 8l10 4.5L20 9M4 10.17V15l8 3.5 8-3.5V10"
              />
              <path
                v-else
                d="M12 2a10 10 0 0 0-7.9 16.1l-1.9 3.3a1 1 0 0 0 1.4 1.4l3.3-1.9A10 10 0 1 0 12 2m0 18a8 8 0 0 1-4.2-1.2 1 1 0 0 0-1.1.1l-1.4.8.8-1.4a1 1 0 0 0 .1-1.1A8 8 0 1 1 12 20"
              />
            </svg>
          </div>
        </template>

        <template v-if="metric.trendValue" #trend>
          <TrendPill :value="metric.trendValue" />
        </template>
      </DashboardMetricCard>
    </section>

    <nav
      class="mx-auto flex w-full max-w-[960px] items-center gap-4 rounded-[36px] bg-white/80 p-3 shadow-card backdrop-blur-sm"
    >
      <button
        v-for="tab in tabItems"
        :key="tab.id"
        type="button"
        class="flex-1 rounded-[28px] px-10 py-3 text-[15px] font-semibold transition"
        :class="[
          activeTab === tab.id
            ? 'bg-white text-slate-900 shadow-[0_14px_28px_-16px_rgba(15,23,42,0.55)]'
            : 'text-slate-400 hover:text-slate-600',
        ]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>

    <section v-if="activeTab === 'beneficiary-demography'" class="grid gap-6 xl:grid-cols-2">
      <div class="flex justify-start xl:col-span-2">
        <label
          class="inline-flex items-center gap-3 rounded-2xl bg-[#bdd3e5] px-4 py-3 text-base font-semibold text-slate-900 shadow-card"
        >
          View by :
          <div class="relative">
            <select
              v-model="selectedView"
              class="appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <option v-for="option in viewOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <span
              class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-4 w-4"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </span>
          </div>
        </label>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-6 text-xl font-semibold text-slate-800">Beneficiary by Categories</h2>
        <div class="h-[320px]">
          <BarChart :chartData="categoryChartData" :chartOptions="barOptions" />
        </div>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-6 text-xl font-semibold text-slate-800">Gender Distribution</h2>
        <div class="flex flex-col items-center gap-6">
          <div class="flex items-center justify-center">
            <div class="h-[220px] w-[220px] sm:h-[240px] sm:w-[240px]">
              <DonutChart :chartData="genderChartData" :chartOptions="donutOptions" />
            </div>
          </div>
          <div class="w-full max-w-[320px] space-y-4">
            <div class="flex items-center gap-3">
              <span class="inline-block h-4 w-4 rounded-full bg-[#FF6B6B]"></span>
              <span class="font-medium text-slate-700">Male</span>
              <span class="ml-auto font-semibold text-slate-900">37%</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="inline-block h-4 w-4 rounded-full bg-[#34D399]"></span>
              <span class="font-medium text-slate-700">Female</span>
              <span class="ml-auto font-semibold text-slate-900">37%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-6 text-xl font-semibold text-slate-800">Top 5 L.G.A’s Beneficiaries</h2>
        <div class="h-[320px]">
          <BarChart :chartData="lgaChartData" :chartOptions="horizontalBarOptions" />
        </div>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-6 text-xl font-semibold text-slate-800">Award Type</h2>
        <div class="flex flex-col items-center gap-6">
          <div class="flex items-center justify-center">
            <div class="h-[220px] w-[220px] sm:h-[240px] sm:w-[240px]">
              <DonutChart :chartData="awardChartData" :chartOptions="donutOptions" />
            </div>
          </div>
          <div class="w-full max-w-[320px] space-y-4">
            <div class="flex items-center gap-3">
              <span class="inline-block h-4 w-4 rounded-full bg-[#1D4ED8]"></span>
              <span class="font-medium text-slate-700">Merit-Based</span>
              <span class="ml-auto font-semibold text-slate-900">37%</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="inline-block h-4 w-4 rounded-full bg-[#34D399]"></span>
              <span class="font-medium text-slate-700">Indigent/Need-Based</span>
              <span class="ml-auto font-semibold text-slate-900">37%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else-if="activeTab === 'funding-overview'" class="grid gap-6 xl:grid-cols-2">
      <div class="flex justify-start xl:col-span-2">
        <label
          class="inline-flex items-center gap-3 rounded-2xl bg-[#bdd3e5] px-4 py-3 text-base font-semibold text-slate-900 shadow-card"
        >
          View by :
          <div class="relative">
            <select
              v-model="selectedView"
              class="appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <option v-for="option in viewOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <span
              class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-4 w-4"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </span>
          </div>
        </label>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-6 text-xl font-semibold text-slate-800">Funding Trend</h2>
        <div class="h-[320px]">
          <BarChart :chartData="fundingTrendChartData" :chartOptions="fundingBarOptions" />
        </div>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-6 text-xl font-semibold text-slate-800">Funding by Category</h2>
        <div class="flex flex-col items-center gap-6">
          <div class="flex items-center justify-center">
            <div class="h-[220px] w-[220px] sm:h-[240px] sm:w-[240px]">
              <DonutChart :chartData="fundingCategoryChartData" :chartOptions="donutOptions" />
            </div>
          </div>
          <div class="w-full space-y-4">
            <div
              v-for="category in fundingCategoryBreakdown"
              :key="category.label"
              class="flex items-center gap-3"
            >
              <span
                class="inline-block h-4 w-4 rounded-full"
                :style="{ backgroundColor: category.color }"
              ></span>
              <span class="font-medium text-slate-700">{{ category.label }}</span>
              <span class="ml-auto font-semibold text-slate-900">{{ category.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else-if="activeTab === 'academic-performance'" class="grid gap-6 xl:grid-cols-2">
      <div class="flex justify-start xl:col-span-2">
        <label
          class="inline-flex items-center gap-3 rounded-2xl bg-[#bdd3e5] px-4 py-3 text-base font-semibold text-slate-900 shadow-card"
        >
          View by :
          <div class="relative">
            <select
              v-model="selectedView"
              class="appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <option v-for="option in viewOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <span
              class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-4 w-4"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </span>
          </div>
        </label>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-6 text-xl font-semibold text-slate-800">
          Average Performance <span class="font-normal">(Primary, Secondary &amp; Technical)</span>
        </h2>
        <div class="h-[320px]">
          <BarChart
            :chartData="primarySecondaryPerformanceChartData"
            :chartOptions="primarySecondaryPerformanceOptions"
          />
        </div>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-4 text-xl font-semibold text-slate-800">
          Performance Distribution
          <span class="font-normal">(Primary, Secondary &amp; Technical)</span>
        </h2>
        <div class="flex flex-col items-center gap-6">
          <div class="flex items-center justify-center">
            <div class="h-[220px] w-[220px] sm:h-[240px] sm:w-[240px]">
              <DonutChart
                :chartData="primarySecondaryPerformanceDistributionChartData"
                :chartOptions="donutOptions"
              />
            </div>
          </div>
          <div class="w-full space-y-4">
            <div
              v-for="segment in primarySecondaryPerformanceDistributionLegend"
              :key="segment.label"
              class="flex items-center gap-3"
            >
              <span
                class="inline-block h-4 w-4 rounded-full"
                :style="{ backgroundColor: segment.color }"
              ></span>
              <span class="font-medium text-slate-700">{{ segment.label }}</span>
              <span class="ml-auto font-semibold text-slate-900">{{ segment.value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-6 text-xl font-semibold text-slate-800">
          Average Performance <span class="font-normal">(Tertiary)</span>
        </h2>
        <div class="h-[320px]">
          <BarChart
            :chartData="tertiaryPerformanceChartData"
            :chartOptions="tertiaryPerformanceOptions"
          />
        </div>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-card">
        <h2 class="mb-4 text-xl font-semibold text-slate-800">
          Performance Distribution <span class="font-normal">(Tertiary)</span>
        </h2>
        <div class="flex flex-col items-center gap-6">
          <div class="flex items-center justify-center">
            <div class="h-[220px] w-[220px] sm:h-[240px] sm:w-[240px]">
              <DonutChart
                :chartData="tertiaryPerformanceDistributionChartData"
                :chartOptions="donutOptions"
              />
            </div>
          </div>
          <div class="w-full space-y-4">
            <div
              v-for="segment in tertiaryPerformanceDistributionLegend"
              :key="segment.label"
              class="flex items-center gap-3"
            >
              <span
                class="inline-block h-4 w-4 rounded-full"
                :style="{ backgroundColor: segment.color }"
              ></span>
              <span class="font-medium text-slate-700">{{ segment.label }}</span>
              <span class="ml-auto font-semibold text-slate-900">{{ segment.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="rounded-2l bg-white p-10 text-center text-slate-500 shadow-card">
      <p class="text-lg font-medium">
        Dashboard insights for {{ tabItems.find((tab) => tab.id === activeTab)?.label }} are coming
        soon.
      </p>
      <p class="mt-2 text-sm">
        Switch back to Beneficiary Demography to view the currently available analytics.
      </p>
    </section>
  </div>
</template>

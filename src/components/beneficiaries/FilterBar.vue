<template>
  <div class="rounded-2xl bg-white/90 px-6 py-4 shadow-card backdrop-blur">
    <div class="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-5">
      <div class="w-full sm:w-auto">
        <slot name="leading" />
      </div>

      <select
        v-model="localFilters.category"
        class="form-select w-full flex-1 sm:flex-none sm:w-[180px] lg:w-[200px]"
      >
        <option value="">Category</option>
        <option v-for="option in categories" :key="option" :value="option">{{ option }}</option>
      </select>

      <select
        v-model="localFilters.awardType"
        class="form-select w-full flex-1 sm:flex-none sm:w-[180px] lg:w-[200px]"
      >
        <option value="">Type</option>
        <option v-for="option in awardTypes" :key="option" :value="option">{{ option }}</option>
      </select>

      <select
        v-model="localFilters.status"
        class="form-select w-full flex-1 sm:flex-none sm:w-[180px] lg:w-[200px]"
      >
        <option value="">Status</option>
        <option value="Active">Active</option>
        <option value="Graduated">Graduated</option>
      </select>

      <select
        v-model="localFilters.gender"
        class="form-select w-full flex-1 sm:flex-none sm:w-[180px] lg:w-[200px]"
      >
        <option value="">Gender</option>
        <option v-for="option in genders" :key="option" :value="option">{{ option }}</option>
      </select>

      <div
        class="flex w-full flex-wrap items-stretch gap-3 sm:flex-nowrap sm:flex-1 sm:min-w-[260px] sm:ml-auto"
      >
        <div class="relative flex-1 basis-full sm:basis-auto">
          <input
            v-model="localFilters.search"
            type="text"
            placeholder="Search"
            class="form-input w-full pl-10"
          />
          <svg
            class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35M11.5 18a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"
            />
          </svg>
        </div>

        <div
          class="relative flex-1 basis-full sm:basis-auto sm:flex-none sm:w-auto"
          @keydown.escape.stop="closeActionMenu"
        >
          <button
            ref="actionButtonRef"
            type="button"
            class="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 sm:w-auto"
            @click.stop="toggleActionMenu"
            aria-haspopup="true"
            :aria-expanded="isActionMenuOpen"
          >
            <span class="text-lg leading-none">+</span>
            Add Beneficiary
            <svg
              class="h-4 w-4 text-white/80"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 8l4 4 4-4" />
            </svg>
          </button>

          <transition name="fade">
            <div
              v-if="isActionMenuOpen"
              ref="actionMenuRef"
              class="actions-menu"
              role="menu"
              aria-label="Add beneficiary options"
            >
              <button
                type="button"
                class="actions-menu__item"
                role="menuitem"
                @click.stop="selectAction('single')"
              >
                Add Single User
              </button>
              <button
                type="button"
                class="actions-menu__item"
                role="menuitem"
                @click.stop="selectAction('bulk')"
              >
                Add Bulk User
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({}),
  },
  categories: {
    type: Array,
    default: () => [],
  },
  awardTypes: {
    type: Array,
    default: () => [],
  },
  genders: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:filters', 'add-single', 'add-bulk'])

const localFilters = reactive({
  category: props.filters.category || '',
  awardType: props.filters.awardType || '',
  status: props.filters.status || '',
  gender: props.filters.gender || '',
  search: props.filters.search || '',
})

watch(
  localFilters,
  (value) => {
    emit('update:filters', { ...value })
  },
  { deep: true },
)

watch(
  () => props.filters,
  (value) => {
    if (!value) return
    Object.assign(localFilters, value)
  },
  { deep: true },
)

const isActionMenuOpen = ref(false)
const actionButtonRef = ref(null)
const actionMenuRef = ref(null)

const toggleActionMenu = () => {
  isActionMenuOpen.value = !isActionMenuOpen.value
}

const closeActionMenu = () => {
  isActionMenuOpen.value = false
}

const handleClickOutside = (event) => {
  if (!isActionMenuOpen.value) return

  const buttonEl = actionButtonRef.value
  const menuEl = actionMenuRef.value
  if (!buttonEl || !menuEl) return

  if (!buttonEl.contains(event.target) && !menuEl.contains(event.target)) {
    closeActionMenu()
  }
}

const selectAction = (type) => {
  closeActionMenu()
  if (type === 'single') {
    emit('add-single')
  } else if (type === 'bulk') {
    emit('add-bulk')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.form-select {
  @apply min-w-[150px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100;
}

.form-input {
  @apply w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-600 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100;
}

.actions-menu {
  @apply absolute right-0 top-[calc(100%+12px)] z-10 min-w-[170px] rounded-xl border border-slate-100 bg-white py-2 text-sm text-slate-700 shadow-xl;
}

.actions-menu::before {
  @apply absolute -top-2 right-4 h-3 w-3 rotate-45 bg-white content-[''];
  box-shadow: -1px -1px 1px rgba(148, 163, 184, 0.15);
}

.actions-menu__item {
  @apply flex w-full items-center px-4 py-2 text-left transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 120ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

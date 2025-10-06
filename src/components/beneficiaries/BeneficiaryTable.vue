<template>
  <div class="overflow-hidden rounded-2xl bg-white shadow-card">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-primary-600 text-white">
        <tr>
          <th
            v-for="column in columns"
            :key="column"
            class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr
          v-for="beneficiary in paginatedBeneficiaries"
          :key="beneficiary.id"
          class="hover:bg-slate-50"
        >
          <td class="px-6 py-4 text-sm font-medium text-slate-800">{{ beneficiary.name }}</td>
          <td class="px-6 py-4 text-sm text-slate-600">{{ beneficiary.gender }}</td>
          <td class="px-6 py-4 text-sm text-slate-600">{{ beneficiary.category }}</td>
          <td class="px-6 py-4 text-sm text-slate-600">{{ beneficiary.awardType }}</td>
          <td class="px-6 py-4">
            <span
              class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              :class="statusClasses(beneficiary.status)"
            >
              <span
                class="h-2.5 w-2.5 rounded-full"
                :class="statusDotClasses(beneficiary.status)"
              ></span>
              {{ beneficiary.status }}
            </span>
          </td>
          <td class="relative px-6 py-4">
            <div class="flex justify-end">
              <div class="relative" @keydown.escape.stop="closeActionMenu(beneficiary.id)">
                <button
                  :data-row-menu-button-id="beneficiary.id"
                  type="button"
                  class="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-primary-600"
                  @click.stop="toggleActionMenu(beneficiary.id)"
                  :aria-expanded="isRowMenuOpen(beneficiary.id)"
                  aria-haspopup="true"
                >
                  Action
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <transition name="fade">
                  <div
                    v-if="isRowMenuOpen(beneficiary.id)"
                    class="actions-menu"
                    role="menu"
                    aria-label="Row actions"
                    :data-row-menu-id="beneficiary.id"
                    @click.stop
                  >
                    <button
                      type="button"
                      class="actions-menu__item"
                      role="menuitem"
                      @click.stop="handleRowAction('view-profile', beneficiary)"
                    >
                      View Profile
                    </button>
                    <button
                      type="button"
                      class="actions-menu__item"
                      role="menuitem"
                      @click.stop="handleRowAction('edit-profile', beneficiary)"
                    >
                      Edit Profile
                    </button>
                  </div>
                </transition>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-4 text-sm text-slate-500"
    >
      <p>
        Showing
        <span class="font-semibold text-slate-700">{{ rangeStart }}-{{ rangeEnd }}</span>
        of
        <span class="font-semibold text-slate-700">{{ total }}</span>
      </p>
      <div class="flex items-center gap-4">
        <button
          type="button"
          class="text-primary-600 disabled:text-slate-300"
          :disabled="currentPage === 1"
          @click="$emit('update:page', currentPage - 1)"
        >
          Previous
        </button>
        <button
          type="button"
          class="text-primary-600 disabled:text-slate-300"
          :disabled="currentPage === totalPages"
          @click="$emit('update:page', currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  beneficiaries: {
    type: Array,
    default: () => [],
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['update:page', 'row-view-profile', 'row-edit-profile'])

const columns = ['Beneficiary Name', 'Gender', 'Category', 'Award Type', 'Status', 'Action']

const openRowId = ref(null)

const total = computed(() => props.beneficiaries.length)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / props.pageSize)))

const rangeStart = computed(() =>
  total.value === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1,
)
const rangeEnd = computed(() => Math.min(props.currentPage * props.pageSize, total.value))

const paginatedBeneficiaries = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize
  return props.beneficiaries.slice(start, start + props.pageSize)
})

const statusClasses = (status) => {
  if (status === 'Active') {
    return 'bg-success/10 text-success'
  }
  return 'bg-slate-100 text-slate-500'
}

const statusDotClasses = (status) => (status === 'Active' ? 'bg-success' : 'bg-slate-400')

const isRowMenuOpen = (id) => openRowId.value === id

const toggleActionMenu = (id) => {
  openRowId.value = openRowId.value === id ? null : id
}

const closeActionMenu = (id) => {
  if (openRowId.value === id) {
    openRowId.value = null
  }
}

const handleRowAction = (action, beneficiary) => {
  if (action === 'view-profile') {
    emit('row-view-profile', beneficiary)
  } else if (action === 'edit-profile') {
    emit('row-edit-profile', beneficiary)
  }
  openRowId.value = null
}

const handleClickOutside = (event) => {
  if (!openRowId.value) return
  const target = event.target
  const openMenuId = openRowId.value
  const menuEl = document.querySelector(`[data-row-menu-id="${openMenuId}"]`)
  const buttonEl = document.querySelector(`[data-row-menu-button-id="${openMenuId}"]`)

  if (menuEl && menuEl.contains(target)) return
  if (buttonEl && buttonEl.contains(target)) return

  openRowId.value = null
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.actions-menu {
  @apply absolute right-0 top-[calc(100%+12px)] z-20 min-w-[170px] rounded-xl border border-slate-200 bg-white py-2 text-left shadow-xl;
}

.actions-menu::before {
  @apply absolute -top-2 right-4 h-3 w-3 rotate-45 bg-white content-[''];
  box-shadow: -1px -1px 1px rgba(148, 163, 184, 0.15);
}

.actions-menu__item {
  @apply flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none;
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

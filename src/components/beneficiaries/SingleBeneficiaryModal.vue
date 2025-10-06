<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[2100] flex items-center justify-center px-4 py-10 sm:px-6"
        
      >
        <div
          class="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
          aria-hidden="true"
          @click="emitClose"
        />

        <div
          class="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200"
          role="dialog"
          aria-modal="true"
        >
          <form @submit.prevent="handleSubmit">
            <div
              class="flex items-start justify-between gap-6 border-b border-slate-100 px-6 py-5 sm:px-8"
            >
              <div class="space-y-1">
                <h2 class="text-xl font-semibold text-slate-900 sm:text-2xl">
                  Add Single Beneficiary
                </h2>
                <p class="text-sm text-slate-500">
                  Fill in the details below to create a new beneficiary record.
                </p>
              </div>
              <button
                type="button"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100/70 text-base font-semibold text-rose-600 transition hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                @click="emitClose"
              >
                <span aria-hidden="true">✕</span>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="space-y-6 px-6 py-6 sm:px-8">
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="space-y-2 text-sm font-medium text-slate-700">
                  <span>Full Name</span>
                  <input
                    ref="firstFieldRef"
                    v-model="formState.fullName"
                    type="text"
                    placeholder="Enter full name"
                    class="form-control"
                    required
                  />
                </label>

                <label class="space-y-2 text-sm font-medium text-slate-700">
                  <span>Email Address</span>
                  <input
                    v-model="formState.email"
                    type="email"
                    placeholder="name@example.com"
                    class="form-control"
                  />
                </label>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <label class="space-y-2 text-sm font-medium text-slate-700">
                  <span>Category</span>
                  <select v-model="formState.category" class="form-control" required>
                    <option value="" disabled>Select category</option>
                    <option v-for="category in categories" :key="category" :value="category">
                      {{ category }}
                    </option>
                  </select>
                </label>

                <label class="space-y-2 text-sm font-medium text-slate-700">
                  <span>Award Type</span>
                  <select v-model="formState.awardType" class="form-control" required>
                    <option value="" disabled>Select award type</option>
                    <option v-for="type in awardTypes" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>
                </label>

                <label class="space-y-2 text-sm font-medium text-slate-700">
                  <span>Gender</span>
                  <select v-model="formState.gender" class="form-control" required>
                    <option value="" disabled>Select gender</option>
                    <option v-for="gender in genders" :key="gender" :value="gender">
                      {{ gender }}
                    </option>
                  </select>
                </label>

                <div class="hidden sm:block"></div>
              </div>

              <label class="space-y-2 text-sm font-medium text-slate-700">
                <span>Notes</span>
                <textarea
                  v-model="formState.notes"
                  rows="3"
                  class="form-control resize-none"
                  placeholder="Optional remarks (e.g. cohort, scholarship reason)"
                />
              </label>
            </div>

            <div
              class="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:px-8"
            >
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-200"
                @click="emitClose"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:cursor-not-allowed disabled:bg-primary-300 disabled:text-white/80"
                :disabled="!isValid"
              >
                Add Beneficiary
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  awardTypes: {
    type: Array,
    default: () => ['Merit-Based', 'Need-Based'],
  },
  genders: {
    type: Array,
    default: () => ['Male', 'Female'],
  },
})

const emit = defineEmits(['close', 'submit'])

const formState = reactive({
  fullName: '',
  email: '',
  category: '',
  awardType: '',
  gender: '',
  notes: '',
})

const firstFieldRef = ref(null)

const isValid = computed(() => {
  return Boolean(
    formState.fullName.trim() && formState.category && formState.awardType && formState.gender,
  )
})

const resetForm = () => {
  formState.fullName = ''
  formState.email = ''
  formState.category = ''
  formState.awardType = ''
  formState.gender = ''
  formState.notes = ''
}

const emitClose = () => {
  emit('close')
}

const handleSubmit = () => {
  if (!isValid.value) return

  const payload = {
    fullName: formState.fullName.trim(),
    email: formState.email.trim(),
    category: formState.category,
    awardType: formState.awardType,
    gender: formState.gender,
    notes: formState.notes.trim(),
  }

  emit('submit', payload)
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emitClose()
  }
}

watch(
  () => props.open,
  (value) => {
    if (value) {
      document.addEventListener('keydown', handleKeydown)
      nextTick(() => {
        firstFieldRef.value?.focus()
      })
    } else {
      document.removeEventListener('keydown', handleKeydown)
      resetForm()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 150ms ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.form-control {
  @apply w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100;
}
</style>

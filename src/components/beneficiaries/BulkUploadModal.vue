<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[2000] flex items-center justify-center px-4 py-10 sm:px-6"
      >
        <div
          class="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
          aria-hidden="true"
          @click="emitClose"
        />

        <div
          class="relative z-10 w-full max-w-4xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex justify-end p-4">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
              @click="emitClose"
            >
              <span aria-hidden="true">✕</span>
              Close
            </button>
          </div>

          <div class="space-y-10 px-6 pb-10 sm:px-10">
            <div
              class="rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-5 text-center sm:px-8"
            >
              <h2 class="text-lg font-semibold text-slate-800">Select from the options below</h2>
            </div>

            <div class="grid gap-8 md:grid-cols-[1fr_min-content_1fr] md:items-start">
              <div class="space-y-4">
                <h3 class="text-base font-semibold text-slate-800">
                  Download Bulk User Excel Sheet
                </h3>
                <p class="text-sm text-slate-500">
                  Download the template to ensure your data columns match the expected format.
                </p>
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  @click="emitDownloadTemplate"
                >
                  Download Bulk Excel Sheet
                </button>
              </div>

              <div class="hidden h-full w-px bg-slate-200 md:block" aria-hidden="true" />

              <div class="space-y-4">
                <h3 class="text-base font-semibold text-slate-800">Upload Bulk User Excel Sheet</h3>

                <label class="block text-sm font-medium text-slate-600" for="bulk-upload-input">
                  Add Bulk Excel Sheet
                </label>

                <div class="flex flex-col gap-3">
                  <input
                    id="bulk-upload-input"
                    ref="fileInputRef"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    class="sr-only"
                    @change="handleFileSelection"
                  />

                  <div
                    class="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-600 shadow-sm"
                  >
                    <button
                      type="button"
                      class="whitespace-nowrap border-r border-slate-200 bg-slate-200/80 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      @click="triggerFilePicker"
                    >
                      Select File
                    </button>
                    <span
                      class="flex-1 px-4 py-3 text-left"
                      :class="{ 'text-slate-400': !selectedFileName }"
                    >
                      {{ selectedFileName || 'No file selected' }}
                    </span>
                  </div>

                  <p class="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-500">
                    Ensure you are uploading the downloaded excel sheet.
                  </p>
                </div>

                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:cursor-not-allowed disabled:bg-primary-300 disabled:text-white/80"
                  :disabled="!localFile"
                  @click="triggerUpload"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'download-template', 'upload'])

const localFile = ref(null)
const fileInputRef = ref(null)

const selectedFileName = computed(() => {
  return localFile.value ? localFile.value.name : ''
})

const resetFileInput = () => {
  localFile.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const emitClose = () => {
  emit('close')
}

const emitDownloadTemplate = () => {
  emit('download-template')
}

const handleFileSelection = (event) => {
  const [file] = event.target.files || []
  localFile.value = file || null
}

const triggerFilePicker = () => {
  fileInputRef.value?.click()
}

const triggerUpload = () => {
  if (!localFile.value) return
  emit('upload', localFile.value)
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
    } else {
      document.removeEventListener('keydown', handleKeydown)
      resetFileInput()
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
</style>

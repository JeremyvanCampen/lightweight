<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed inset-0 z-30 overflow-y-auto bg-bg dark:bg-bg-darkOffset"
      @close="!loading && cancel()"
    >
      <div class="flex justify-center min-h-screen text-center sm:block">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 transition-opacity bg-bg dark:bg-bg-darkOffset dark:bg-opacity-60"
          />
        </TransitionChild>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform shadow-xl sm:rounded-lg   sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="sm:flex sm:items-start ">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 bg-red-100"
              >
                <ExclamationIcon
                  class="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-primary-textTitle"
                >
                  {{ title }}
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm font-light text-primary-textSub">{{ body }}</p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse ">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm bg-red-600 hover:bg-red-700"
                @click="confirm()"
                :class="{
                  'pointer-events-none cursor-not-allowed': loading,
                  'pointer-events-none opacity-70 cursor-not-allowed':
                    isDisabled,
                }"
                :disabled="isDisabled || loading"
                :aria-disabled="isDisabled || loading"
              >
                <div class="flex items-center justify-center" v-if="loading">
                  <svg
                    class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <div>Processing...</div>
                </div>
                <div v-else>
                  {{ confirmButtonText }}
                </div>
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
                @click="cancel()"
                            :class="{
                  'pointer-events-none opacity-70 cursor-not-allowed':
                    loading,
                }"
              >
                {{ cancelButtonText }}
              </button>
            </div>
          </div>


        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
  import { ref } from 'vue';
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue';
  import { ExclamationTriangleIcon as ExclamationIcon } from '@heroicons/vue/20/solid'

  const props = defineProps({
    open: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    title: {
      type: String,
      required: true,
      default: () => '',
    },
    body: {
      type: String,
      required: true,
      default: () => '',
    },
    cancelButtonText: {
      type: String,
      required: true,
      default: () => '',
    },
    confirmButtonText: {
      type: String,
      required: true,
      default: () => '',
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
     isDisabled: {
      type: Boolean,
      default: false,
    },
  });

  const internalOpen = ref(false);

  const emit = defineEmits(['cancel', 'confirm']);

  function cancel() {
    // if (loading) 
    //make sure to set open prop to false in parent component
    emit('cancel');
  }

  function confirm() {
    //make sure to set open prop to false in parent component
    emit('confirm');
  }
</script>

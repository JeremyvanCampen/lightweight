<template>
  <button
    class="btn btn--primary"
    :class="{
      'pointer-events-none cursor-not-allowed': loading,
      'pointer-events-none opacity-70 cursor-not-allowed': isDisabled,
    }"
    :disabled="isDisabled || loading"
    :aria-disabled="isDisabled || loading"
  >
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-100 ease-in-out"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="transition-all duration-100 ease-in-out"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <div class="flex items-center justify-center" v-if="loading">
        <svg
          class="w-5 h-5 mr-3 -ml-1 text-secondary animate-spin"
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
        <div>
          <slot name="loading-text" />
        </div>
      </div>
      <div v-else>
        <slot name="text" />
      </div>
    </Transition>
  </button>
</template>

<script setup>
  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>

  <div class="col-span-2 space-y-1 w-full">
    <label
        class="block text-center"
    >
      Dark mode
    </label>
    <div class="justify-center flex">
      <Switch
          v-model="isDark"
          class="flex-shrink-0 block group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer"
      >
        <span class="sr-only">Use setting</span>
        <span
            aria-hidden="true"
            class="pointer-events-none absolute  w-full h-full rounded-md"
        />
        <span
            aria-hidden="true"
            :class="[
                                isDark ? 'bg-secondary-button' : 'bg-gray-200',
                                'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200',
                              ]"
        />
        <span
            aria-hidden="true"
            :class="[
                                isDark ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200',
                              ]"
        />
      </Switch>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useDark, useToggle} from '@vueuse/core'
import {Switch} from "@headlessui/vue";

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

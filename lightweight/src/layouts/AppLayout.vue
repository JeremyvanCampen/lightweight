<template>
  <Transition
    enter-from-class="opacity-90"
    enter-active-class="transition-opacity duration-300 ease-in-out"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in-out"
    leave-to-class="opacity-90"
    mode="out-in"
  >
    <component :is="layout">
      <slot />
    </component>
  </Transition>
</template>

<script setup>
  import { ref, shallowRef, watch, markRaw } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const layout = ref();
  const layouts = shallowRef({});

  /**
   * Load all layout files in '@/layouts' and assign them to an object
   */
  function loadLayouts(context) {
    return context
      .keys()
      .map((file) => [
        // Reduce the file path to only the file name, without extension
        file.replace(/(^.\/)|(\.vue$)/g, ''),
        context(file),
      ])
      .reduce(
        (layouts, [layoutName, module]) => ({
          ...layouts,
          [layoutName]: module.default,
        }),
        {}
      );
  }

  layouts.value = loadLayouts(require.context('@/layouts', false, /^.*\.vue$/));

  watch(
    () => route.meta,
    (meta) => {
      if (meta.layout in layouts.value) {
        layout.value = markRaw(layouts.value[meta.layout]);
      } else {
        layout.value = markRaw(layouts.value['AppLayoutDefault']);
      }
    }
  );
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <app-layout>

      <component :is="Component" />
    </app-layout>
  </router-view>
</template>

<script setup></script>

<style>
html.dark{
  color-scheme: dark;
}
</style>
<script>
import DarkMode from "@/components/DarkMode";
export default {
  components: {DarkMode}
}
</script>
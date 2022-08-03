<template>
  <router-view v-slot="{ Component, route }">
    <app-layout>
      <component :is="Component" />
    </app-layout>
  </router-view>
</template>

<script setup></script>
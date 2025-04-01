<template>
  <fwb-card class="mb-3 mx-auto text-center !max-w-full flex-grow hover:bg-white dark:hover:bg-gray-800">
    <h5 class="pt-3 text-base font-bold tracking-tight text-gray-900 dark:text-white">
      <slot name="title" />
    </h5>
    <p class="text-3xl">
      <slot name="content" />
    </p>
    <p class="text-base">
      <slot name="footer" />
    </p>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbCard } from "flowbite-vue";
</script>

<style scoped></style>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: "ja-JP" },
  title: "yuzuwatch",
  meta: [
    {
      name: "description",
      content: "柚子の成長をまったり観察します。",
    },
  ],
});
</script>

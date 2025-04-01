<template>
  <header>
    <fwb-navbar>
      <template #logo>
        <div class="flex items-center cursor-pointer">
          <nuxt-link to="/">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <img src="/public/icon.png" alt="O" class="inline-block h-6 pb-1 pl-0.5" /> yuzuwatch
            </span>
          </nuxt-link>
        </div>
      </template>
      <template #default="{ isShowMenu }">
        <fwb-navbar-collapse :is-show-menu="isShowMenu">
          <fwb-navbar-link @click="toggleDarkMode = !toggleDarkMode">
            <Icon name="icon-park-solid:dark-mode" size="1.5em" class="cursor-pointer select-none dark:text-white" />
          </fwb-navbar-link>
          <fwb-navbar-link link="https://github.com/mikan/yuzuwatch">
            <Icon name="grommet-icons:github" size="1.5em" class="cursor-pointer select-none dark:text-white" />
          </fwb-navbar-link>
        </fwb-navbar-collapse>
      </template>
    </fwb-navbar>
  </header>
  <main class="p-4 mx-auto container dark:text-gray-300">
    <slot></slot>
  </main>
  <footer class="my-10">
    <p class="text-sm text-center text-zinc-600">
      Copyright&copy; {{ new Date().getFullYear() }}
      <nuxt-link to="https://github.com/mikan" target="_blank" class="hover:underline">mikan</nuxt-link>
    </p>
  </footer>
</template>

<script setup lang="ts">
import "../node_modules/flowbite-vue/dist/index.css";
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink } from "flowbite-vue";
import { initFlowbite } from "flowbite";

const toggleDarkMode = ref(false);
const configLoaded = ref(false);
const meta = computed(() => {
  return {
    bodyAttrs: {
      class: configLoaded.value ? (toggleDarkMode.value ? "dark bg-black" : "bg-slate-50") : "",
    },
  };
});

useHead(meta);

onBeforeMount(() => {
  toggleDarkMode.value = localStorage.getItem("theme") === "dark";
  configLoaded.value = true;
});

onMounted(() => {
  initFlowbite();
});

watch(toggleDarkMode, () => localStorage.setItem("theme", toggleDarkMode.value ? "dark" : "light"));
</script>

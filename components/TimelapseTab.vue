<template>
  <div class="mt-4">
    <div class="flex justify-center gap-3 mb-5">
      <fwb-select
        v-model="targetHour"
        :options="HOUR_OPTIONS"
        label="表示時間帯"
        placeholder="時間帯を選択..."
        class="h-[42px]"
      />
      <fwb-input v-model="intervalDays" label="表示間隔 (日)" type="number" min="1" class="w-[148px]" />
    </div>
    <ul>
      <template v-for="key in displayKeys" :key="key">
        <li v-if="timeFromKey(key) > EPOCH" class="mb-2">
          <div class="text-center">{{ timeFromKey(key).toLocaleString() }} ({{ relativeTime(timeFromKey(key)) }})</div>
          <img :src="runtimeConfig.public.imgUrl + '/' + key" :alt="key" loading="lazy" class="mx-auto" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { FwbInput, FwbSelect } from "flowbite-vue";

const EPOCH = new Date(2025, 3, 11);
const HOUR_OPTIONS = [
  { value: "15", name: "0時台" },
  { value: "16", name: "1時台" },
  { value: "17", name: "2時台" },
  { value: "18", name: "3時台" },
  { value: "19", name: "4時台" },
  { value: "20", name: "5時台" },
  { value: "21", name: "6時台" },
  { value: "22", name: "7時台" },
  { value: "23", name: "8時台" },
  { value: "00", name: "9時台" },
  { value: "01", name: "10時台" },
  { value: "02", name: "11時台" },
  { value: "03", name: "12時台" },
  { value: "04", name: "13時台" },
  { value: "05", name: "14時台" },
  { value: "06", name: "15時台" },
  { value: "07", name: "16時台" },
  { value: "08", name: "17時台" },
  { value: "09", name: "18時台" },
  { value: "10", name: "19時台" },
  { value: "11", name: "20時台" },
  { value: "12", name: "21時台" },
  { value: "13", name: "22時台" },
  { value: "14", name: "23時台" },
];

const runtimeConfig = useRuntimeConfig();
const targetHour = ref("05"); // 05 = 14時台
const intervalDays = ref(3);
const keys = ref<string[]>([]);
const displayKeys = ref<string[]>([]);
const errorMessage = ref("");

const timeFromKey = (key: string): Date => {
  const tokens = key.split("/");
  return new Date(
    Date.UTC(
      Number(tokens[3]),
      Number(tokens[4]) - 1,
      Number(tokens[5]),
      Number(tokens[6].substring(0, 2)),
      Number(tokens[6].substring(2, 4)),
      Number(tokens[6].substring(4, 6)),
    ),
  );
};
const fetchKeys = async (): Promise<string[]> =>
  await $fetch<string[]>(runtimeConfig.public.apiUrl + "/api/tl/still/mikan/camera-a", {
    query: { prefix: targetHour.value },
  });
const handleError = (e: unknown) => (errorMessage.value = "データの取得に失敗しました: " + e);
const slimDown = (src: string[]): string[] => src.filter((_, i) => i % intervalDays.value === 0);

fetchKeys()
  .then((res) => (keys.value = res))
  .catch((e) => handleError(e))
  .finally(() => (displayKeys.value = slimDown(keys.value)));

watch(targetHour, () => {
  fetchKeys()
    .then((res) => (keys.value = res))
    .catch((e) => handleError(e))
    .finally(() => (displayKeys.value = slimDown(keys.value)));
});
watch(intervalDays, () => (displayKeys.value = slimDown(keys.value)));
</script>

<style scoped></style>

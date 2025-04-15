<template>
  <div class="mt-4">
    <div class="flex gap-3 justify-evenly flex-wrap">
      <dashboard-card class="w-[31%] min-w-[120px]">
        <template #title>土壌水分</template>
        <template #content>
          <fwb-spinner v-if="!moistLatest" size="12" class="m-auto" />
          <div v-else class="py-5" :class="moistColor(moistLatest.moist_v ?? NaN)">
            {{ moistText(moistLatest.moist_v ?? NaN) ?? "-" }}
            <small class="text-sm">({{ moistLatest?.moist_v?.toFixed(2) }}V)</small>
          </div>
        </template>
      </dashboard-card>
      <dashboard-card class="w-[31%] min-w-[120px]">
        <template #title>温度</template>
        <template #content>
          <fwb-spinner v-if="!amedasLatest" size="12" class="m-auto" />
          <div v-else class="py-5">{{ amedasLatest?.temp_c?.toFixed(1) }}<small> °C</small></div>
        </template>
      </dashboard-card>
      <dashboard-card class="w-[31%] min-w-[120px]">
        <template #title>湿度</template>
        <template #content>
          <fwb-spinner v-if="!amedasLatest" size="12" class="m-auto" />
          <div v-else class="py-5">{{ amedasLatest?.hum_p?.toFixed(1) }}<small> %</small></div>
        </template>
      </dashboard-card>
    </div>
    <div v-if="latestStillUrl" class="mt-1 flex items-center text-sm flex-col text-gray-500 dark:text-gray-400">
      <img alt="Live Picture" :src="latestStillUrl" class="w-full" />
      <div>
        撮影時刻:
        {{ stillUrlToTime(latestStillUrl).toLocaleString() }}
        ({{ relativeTime(stillUrlToTime(latestStillUrl)) }})
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbSpinner } from "flowbite-vue";

defineProps<{
  moistLatest?: Measurement;
  amedasLatest?: Measurement;
}>();

const runtimeConfig = useRuntimeConfig();
const latestStillUrl = ref("");

const stillUrlToTime = (url: string): Date => {
  const tokens = url.split("/");
  const y = Number(tokens[tokens.length - 4]);
  const m = Number(tokens[tokens.length - 3]) - 1;
  const d = Number(tokens[tokens.length - 2]);
  const hour = Number(tokens[tokens.length - 1].slice(0, 2));
  const min = Number(tokens[tokens.length - 1].slice(2, 4));
  const sec = Number(tokens[tokens.length - 1].slice(4, 6));
  return new Date(Date.UTC(y, m, d, hour, min, sec));
};
const moistColor = (moist?: number): string => {
  if (!moist) return "";
  if (moist < 1.8) return "text-blue-500";
  if (moist < 2.1) return "text-green-500";
  return "text-red-300";
};
const moistText = (moist?: number): string => {
  if (!moist) return "-";
  if (moist < 1.8) return "高";
  if (moist < 2.1) return "中";
  return "低";
};

fetch(runtimeConfig.public.imgUrl + "/still/mikan/camera-a/latest.txt").then((v) =>
  v.text().then((s) => (latestStillUrl.value = runtimeConfig.public.imgUrl + "/" + s)),
);
</script>

<style scoped></style>

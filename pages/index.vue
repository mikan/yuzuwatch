<template>
  <div>
    <fwb-alert v-if="errorMessage" icon type="danger" class="mb-3">{{ errorMessage }}</fwb-alert>
    <fwb-tabs v-model="activeTab" directive="if">
      <fwb-tab name="dashboard" title="🌱 Live">
        <home-tab :moist-latest="moistLatest" :amedas-latest="amedasLatest" />
      </fwb-tab>
    </fwb-tabs>
  </div>
</template>

<script setup lang="ts">
import { FwbAlert, FwbTabs, FwbTab } from "flowbite-vue";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const errorMessage = ref("");
const activeTab = ref(route.query.tab ? String(route.query.tab) : "dashboard");
const amedasMeasurements = ref<Measurement[] | undefined>(undefined);
const moistMeasurements = ref<Measurement[] | undefined>(undefined);
const amedasLatest = ref<Measurement | undefined>(undefined);
const moistLatest = ref<Measurement | undefined>(undefined);
const fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 14);
const fromYmd = fromDate.toLocaleDateString("sv-SE"); // yyyy-mm-dd

const fetchMeasurements = async (did: string, dateFrom: string): Promise<Measurement[]> =>
  await $fetch<Measurement[]>(runtimeConfig.public.apiUrl + "/api/devices/" + did + "/measurements", {
    query: { "date-from": dateFrom },
  });
const handleError = (e: unknown) => (errorMessage.value = "データの取得に失敗しました: " + e);

fetchMeasurements("AME44132", fromYmd)
  .then((v) => {
    amedasMeasurements.value = v ?? [];
    amedasLatest.value = v.slice(-1)[0];
  })
  .catch(handleError);
fetchMeasurements("K0000007", fromYmd)
  .then((v) => {
    moistMeasurements.value = v ?? [];
    moistLatest.value = v.slice(-1)[0];
  })
  .catch(handleError);
</script>

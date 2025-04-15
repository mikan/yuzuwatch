<template>
  <Line :data="chartData" :options="chartOptions" style="width: 100%; height: 300px" />
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs";
import "chart.js/auto";
import "chartjs-adapter-luxon";

const props = defineProps<{
  moistMeasurements?: Measurement[];
  amedasMeasurements?: Measurement[];
}>();

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

const alpha = (rgb: string, a: number): string => rgb.replace("rgb", "rgba").replace(")", ", " + String(a) + ")");
const chartData = ref({
  labels: props.moistMeasurements?.map((m) => new Date(m.received_at)),
  datasets: [
    {
      type: "line",
      label: "土壌水分 (符号反転)",
      borderColor: CHART_COLORS.blue,
      backgroundColor: CHART_COLORS.blue,
      data: props.moistMeasurements?.map((m) => 0 - (m.moist_v ?? 0)) ?? [],
      radius: 0,
      yAxisID: "y1",
    },
    {
      type: "bar",
      label: "日照 (10分間)",
      borderColor: alpha(CHART_COLORS.orange, 0.8),
      backgroundColor: alpha(CHART_COLORS.orange, 0.8),
      data: props.amedasMeasurements?.map((m) => m.sun_10min) ?? [],
      radius: 0,
      yAxisID: "y2",
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "time",
      time: {
        tooltipFormat: "DD T",
      },
      ticks: {
        major: {
          enabled: true,
        },
        font: function (context: any) {
          if (context.tick && context.tick.major) {
            return {
              weight: "bold",
            };
          }
        },
      },
    },
    y1: {
      min: -2.3,
      max: -1.4,
    },
    y2: {
      position: "right",
      display: false,
      max: 50,
    },
  },
});
</script>

<style scoped></style>

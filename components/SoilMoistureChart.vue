<template>
  <Chart type="line" :data="chartData" :options="chartOptions" style="width: 100%; height: 300px" />
</template>

<script setup lang="ts">
import "chart.js/auto";
import "chartjs-adapter-luxon";
import { Chart } from "vue-chartjs";
import type { ChartData, ChartOptions, ChartType, ScriptableContext } from "chart.js";

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
const chartData = ref<ChartData<"line" | "bar">>({
  labels: props.moistMeasurements?.map((m) => new Date(m.received_at)),
  datasets: [
    {
      type: "line",
      label: "土壌水分",
      borderColor: CHART_COLORS.blue,
      backgroundColor: CHART_COLORS.blue,
      data: props.moistMeasurements?.map((m) => (m.moist_v && m.moist_v > 0.1 ? 0 - m.moist_v : null)) ?? [], // invert sign
      yAxisID: "y1",
    },
    {
      type: "bar",
      label: "日照",
      borderColor: alpha(CHART_COLORS.orange, 0.8),
      backgroundColor: alpha(CHART_COLORS.orange, 0.8),
      data: props.amedasMeasurements?.map((m) => (m.sun_10min !== undefined ? (m.sun_10min / 10) * 100 : null)) ?? [], // sun per 10min to percentage
      yAxisID: "y2",
    },
    {
      type: "line",
      label: "気温",
      borderColor: alpha(CHART_COLORS.purple, 0.8),
      backgroundColor: alpha(CHART_COLORS.purple, 0.8),
      data: props.amedasMeasurements?.map((m) => m.temp_c ?? null) ?? [],
      yAxisID: "y3",
    },
  ],
});
const chartOptions = ref<ChartOptions<"line" | "bar">>({
  responsive: true,
  maintainAspectRatio: false,
  elements: { point: { radius: 0 } },
  scales: {
    x: {
      type: "time",
      time: { tooltipFormat: "DD T" },
      ticks: {
        major: { enabled: true },
        font(context: any) {
          if (context.tick && context.tick.major) {
            return { weight: "bold" };
          }
        },
      },
    },
    y1: {
      min: -2.3,
      max: -1.4,
      ticks: { callback: (tickValue: string | number): string => (0 - Number(tickValue)).toFixed(1) + "V" },
    },
    y2: {
      position: "right",
      display: false,
      max: 500, // 1/5 scale
    },
    y3: {
      position: "right",
      display: false,
      max: 150,
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: (context: ScriptableContext<ChartType>) => {
        let label = context.dataset.label || "";
        if (label) {
          label += ": ";
        }
        switch (context.datasetIndex) {
          case 0: // Moisture (recover inverted sign)
            label += (0 - context.parsed.y).toFixed(2) + "V";
            break;
          case 1: // Sun
            label += context.parsed.y + "%";
            break;
          case 2: // Temperature
            label += context.parsed.y + "°C";
            break;
          default:
            label += context.parsed.y;
            break;
        }
        return label;
      },
    },
  },
});
</script>

<style scoped></style>

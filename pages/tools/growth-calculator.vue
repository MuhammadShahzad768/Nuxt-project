<template>
  <div class="min-h-screen bg-stone-100 font-sans text-stone-950 antialiased mt-[120px]">
    <div class="h-20 lg:h-24" />
    <main class="pt-10 lg:pt-0">
      <section>
        <div class="mx-auto max-w-3xl px-4 pb-8">
          <nav class="flex items-center justify-center text-sm text-stone-600">
            <a href="" class="hover:text-rose-600" target="_blank" rel="noopener noreferrer">Home</a>
            <Chevron class="mx-2 size-4" />
            <a href="/tools" class="hover:text-rose-600" target="_blank" rel="noopener noreferrer">Tools</a>
            <Chevron class="mx-2 size-4" />
            <span>Growth Calculator</span>
          </nav>
        </div>

        <header class="mx-auto mb-12 max-w-3xl px-4 text-center md:mb-20">
          <h1 class="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">Growth Calculator for Agencies</h1>
          <p class="mt-3 text-lg text-stone-600 md:text-xl">
            Simulate different growth scenarios for your agency and visualize the impact of customer acquisition, churn, and pricing on your MRR.
          </p>
        </header>

        <div class="mx-auto max-w-7xl px-5 pb-16">
          <div class="flex w-full flex-col gap-6 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm lg:flex-row">
            <!-- Left -->
            <div class="w-full p-6 lg:w-3/5 lg:p-8">
              <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 class="text-xl font-bold text-stone-800">Growth Projections</h2>
                <div class="flex flex-wrap gap-3 sm:space-x-4">
                  <div class="flex items-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2">
                    <span class="mr-2">①</span>
                    <span class="font-semibold text-blue-800">{{ formatCurrency(final1) }}</span>
                  </div>
                  <div class="flex items-center rounded-xl border border-teal-200 bg-teal-50 px-4 py-2">
                    <span class="mr-2">②</span>
                    <span class="font-semibold text-teal-800">{{ formatCurrency(final2) }}</span>
                  </div>
                </div>
              </div>

              <div class="chart-container mb-6 overflow-hidden rounded-xl border border-stone-200 px-2 sm:px-4" style="min-height: 395px">
                <div ref="chartEl" class="min-h-[380px] w-full" />
              </div>

              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div class="rounded-xl border border-stone-200 bg-stone-50/80 p-5 shadow-sm">
                  <h2 class="mb-3 flex items-center text-lg font-bold text-blue-800">
                    <ChartBars class="mr-2 h-5 w-5" />
                    Scenario 1
                  </h2>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="mb-1 block text-xs font-semibold">Current Customers</label>
                      <input
                        v-model.number="s1.currentCustomers"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-semibold">New Customers/Month</label>
                      <input
                        v-model.number="s1.newPerMonth"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-semibold">Monthly Churn (%)</label>
                      <input
                        v-model.number="s1.churn"
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label class="mb-2 block text-xs font-semibold">MRR Per Customer ($)</label>
                      <div class="relative">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                        <input
                          v-model.number="s1.mrrPer"
                          type="number"
                          min="0"
                          class="w-full rounded-lg border border-stone-300 py-2 pl-7 pr-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="rounded-xl border border-stone-200 bg-stone-50/80 p-5 shadow-sm">
                  <h2 class="mb-3 flex items-center text-lg font-bold text-teal-800">
                    <TrendUp class="mr-2 h-5 w-5" />
                    Scenario 2
                  </h2>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="mb-1 block text-xs font-semibold">Current Customers</label>
                      <input
                        v-model.number="s2.currentCustomers"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-semibold">New Customers/Month</label>
                      <input
                        v-model.number="s2.newPerMonth"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-semibold">Monthly Churn (%)</label>
                      <input
                        v-model.number="s2.churn"
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label class="mb-2 block text-xs font-semibold">MRR Per Customer ($)</label>
                      <div class="relative">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                        <input
                          v-model.number="s2.mrrPer"
                          type="number"
                          min="0"
                          class="w-full rounded-lg border border-stone-300 py-2 pl-7 pr-3 text-sm shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right -->
            <div class="w-full border-t border-stone-200 p-6 lg:mt-0 lg:w-2/5 lg:border-l lg:border-t-0 lg:p-8">
              <h2 class="mb-6 text-xl font-bold text-stone-800">Growth Analysis</h2>

              <div class="mb-6 space-y-4">
                <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                  <h3 class="mb-2 text-lg font-semibold text-stone-800">Projected MRR Comparison</h3>
                  <div class="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                    <div class="flex flex-col">
                      <span class="pb-2 text-sm text-stone-500">After 32 Months</span>
                      <div class="mt-1 flex items-center">
                        <div class="mr-2 h-3 w-3 rounded-full bg-blue-500" />
                        <span>Scenario ①</span>
                        <span class="ml-2 font-semibold text-blue-800">{{ formatCurrency(final1) }}</span>
                      </div>
                      <div class="mt-1 flex items-center">
                        <div class="mr-2 h-3 w-3 rounded-full bg-teal-500" />
                        <span>Scenario ②</span>
                        <span class="ml-2 font-semibold text-teal-800">{{ formatCurrency(final2) }}</span>
                      </div>
                    </div>

                    <div class="rounded-xl border border-stone-200 px-4 py-2 text-center">
                      <span class="text-xs text-stone-500">Difference</span>
                      <p class="text-lg font-bold" :class="diffColorClass">{{ diffLabel }}</p>
                    </div>
                  </div>
                </div>

                <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                  <h3 class="mb-1 text-lg font-semibold text-stone-800">Key Insights</h3>
                  <ul class="mt-2 space-y-2 text-sm text-stone-600">
                    <li v-for="(t, i) in keyInsights" :key="i" class="flex items-start">
                      <Question class="mr-2 size-5 shrink-0 text-stone-700" />
                      <span>{{ t }}</span>
                    </li>
                  </ul>
                </div>

                <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                  <h3 class="mb-1 text-lg font-semibold text-stone-800">Recommended Actions</h3>
                  <ul class="mt-2 space-y-2 text-sm text-stone-600">
                    <li v-for="(t, i) in recommendedActions" :key="i" class="flex items-start">
                      <Check class="mr-2 size-5 shrink-0 text-orange-600" />
                      <span>{{ t }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                type="button"
                class="text-[#00296B] border-2 border-[#00296B] rounded-full px-6 py-2 text-lg font-semibold hover:bg-[#00296B] hover:text-white transition-all"
                @click="pushChartUpdate"
              >
                Calculate Growth Projections
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { ApexOptions } from 'apexcharts'

const chartEl = ref<HTMLElement | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let chart: any = null

const s1 = reactive({
  currentCustomers: 100,
  newPerMonth: 10,
  churn: 5,
  mrrPer: 100,
})

const s2 = reactive({
  currentCustomers: 100,
  newPerMonth: 15,
  churn: 3,
  mrrPer: 100,
})

type Scenario = typeof s1

function seriesFor(scenario: Scenario) {
  const months = 32
  const growthData: number[] = []
  let customers = scenario.currentCustomers
  for (let month = 1; month <= months; month++) {
    const lostCustomers = Math.round((customers * scenario.churn) / 100)
    customers = customers + scenario.newPerMonth - lostCustomers
    growthData.push(customers * scenario.mrrPer)
  }
  return growthData
}

const data1 = computed(() => seriesFor(s1))
const data2 = computed(() => seriesFor(s2))
const final1 = computed(() => data1.value[data1.value.length - 1] ?? 0)
const final2 = computed(() => data2.value[data2.value.length - 1] ?? 0)

const differencePct = computed(() => {
  const a = final1.value
  const b = final2.value
  if (a <= 0) return null
  return ((b - a) / a) * 100
})

const diffLabel = computed(() => {
  const d = differencePct.value
  if (d === null) return '—'
  return d > 0 ? `+${d.toFixed(1)}%` : `${d.toFixed(1)}%`
})

const diffColorClass = computed(() => {
  const d = differencePct.value
  if (d === null) return 'text-stone-500'
  return d > 0 ? 'text-emerald-600' : 'text-red-600'
})

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

const keyInsights = [
  'Small improvements in churn rate can make a substantial impact on MRR growth over time.',
  'Increasing new customers per month creates a compounding effect on revenue growth.',
  'Balance acquisition and retention strategies for optimal growth outcomes.',
]

const recommendedActions = [
  'Implement customer success programs to reduce churn.',
  'Optimize acquisition channels to increase new customer rate.',
  'Consider pricing adjustments to increase MRR per customer.',
]

function buildOptions(): ApexOptions {
  return {
    series: [
      { name: 'Scenario 1 MRR', data: [...data1.value] },
      { name: 'Scenario 2 MRR', data: [...data2.value] },
    ],
    chart: {
      height: 380,
      type: 'line',
      toolbar: { show: false },
      fontFamily: 'inherit',
      background: 'transparent',
    },
    colors: ['#3b82f6', '#14b8a6'],
    dataLabels: { enabled: false },
    stroke: { width: 3, curve: 'smooth', lineCap: 'round' },
    grid: {
      borderColor: '#f1f5f9',
      row: { colors: ['transparent', 'transparent'], opacity: 0.5 },
    },
    xaxis: {
      categories: Array.from({ length: 32 }, (_, i) => i + 1),
      title: { text: 'Months', style: { fontWeight: 600 } },
      labels: { style: { colors: '#64748b' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { text: 'Monthly Recurring Revenue ($)', style: { fontWeight: 600 } },
      labels: {
        formatter: (value: number) => formatCurrency(value),
        style: { colors: '#64748b' },
      },
      min: 0,
    },
    tooltip: {
      y: { formatter: (value: number) => formatCurrency(value) },
      x: { formatter: (value: string | number) => `Month ${value}` },
      theme: 'light',
      style: { fontSize: '12px', fontFamily: 'inherit' },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      offsetY: -15,
      markers: { width: 12, height: 12, radius: 12 },
      itemMargin: { horizontal: 10 },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { height: 280 },
          legend: { position: 'bottom' },
        },
      },
    ],
  }
}

function pushChartUpdate() {
  chart?.updateSeries([
    { name: 'Scenario 1 MRR', data: [...data1.value] },
    { name: 'Scenario 2 MRR', data: [...data2.value] },
  ])
}

onMounted(async () => {
  const ApexCharts = (await import('apexcharts')).default
  if (!chartEl.value) return
  chart = new ApexCharts(chartEl.value, buildOptions())
  await chart.render()
})

watch([s1, s2], pushChartUpdate, { deep: true })

onBeforeUnmount(() => {
  chart?.destroy?.()
  chart = null
})

const Chevron = () =>
  h('svg', { class: 'mx-2 size-4', xmlns: 'http://www.w3.org/2000/svg', height: '18', width: '18', viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('polyline', { points: '7.5 16.5 14 10 7.5 3.5', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ])

const ChartBars = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', class: 'h-5 w-5', viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('path', {
      d: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z',
    }),
  ])

const TrendUp = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', class: 'h-5 w-5', viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('path', {
      'fill-rule': 'evenodd',
      d: 'M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z',
      'clip-rule': 'evenodd',
    }),
  ])

const Question = () =>
  h('svg', { class: 'mr-2 size-5 shrink-0', xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20' }, [
    h('path', {
      fill: 'currentColor',
      d: 'm10,2C5.589,2,2,5.589,2,10s3.589,8,8,8,8-3.589,8-8S14.411,2,10,2Zm0,13.5c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25,1.25.56,1.25,1.25-.56,1.25-1.25,1.25Zm1.668-5.121c-.466.331-.622.467-.686.805-.09.481-.51.816-.982.816-.061,0-.123-.005-.185-.017-.543-.102-.9-.625-.799-1.167.218-1.16.985-1.706,1.492-2.066.513-.365.634-.468.634-.913,0-.776-.641-.837-.837-.837-.988,0-1.227.657-1.305.873-.188.52-.763.788-1.282.598-.519-.189-.787-.763-.598-1.282.499-1.371,1.689-2.189,3.185-2.189,1.375,0,2.837.994,2.837,2.837,0,1.494-.888,2.125-1.475,2.542Z',
    }),
  ])

const Check = () =>
  h('svg', { class: 'mr-2 size-5 shrink-0', xmlns: 'http://www.w3.org/2000/svg', height: '18', width: '18', viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('polyline', { points: '4 11 8 15 16 5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ])
</script>
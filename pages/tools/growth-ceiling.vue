<template>
  <div class="min-h-screen bg-stone-100 font-sans text-stone-950 antialiased pt-[140px]">
    <main class=" lg:pt-0 mt-[140px]">
      <div class="mx-auto max-w-3xl px-4 pb-8">
        <nav class="flex items-center text-sm text-slate-600">
          <a href="https://wayfront.com/" class="hover:text-blue-600" target="_blank" rel="noopener noreferrer">Home</a>
          <Chevron class="mx-2 size-4" />
          <a href="https://wayfront.com/tools" class="hover:text-blue-600" target="_blank" rel="noopener noreferrer">Tools</a>
          <Chevron class="mx-2 size-4" />
          <span>Growth Ceiling Calculator</span>
        </nav>
      </div>

      <article>
        <header class="mx-auto mb-12 max-w-3xl px-4 text-center md:mb-20">
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Growth Ceiling Calculator for Agencies</h1>
          <p class="mt-3 text-lg text-slate-600 md:text-xl">
            Discover your maximum achievable MRR based on your acquisition and churn rates. Find the equilibrium point where new revenue equals churned revenue.
          </p>
        </header>

        <div class="mx-auto max-w-7xl px-5 pb-16">
          <div class="flex w-full flex-col gap-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:flex-row">
            <div class="w-full p-6 lg:w-3/5 lg:p-8">
              <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 class="text-xl font-bold text-slate-800">MRR Growth Projection</h2>
                <div class="flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2">
                  <span class="mr-2 text-sm text-slate-600">Ceiling:</span>
                  <span class="font-semibold text-indigo-700">{{ ceilingPill }}</span>
                </div>
              </div>

              <div class="chart-container mb-6 min-h-[395px] overflow-hidden rounded-xl border border-slate-200 px-2 sm:px-4">
                <div v-if="chartError" class="flex h-[380px] items-center justify-center text-slate-500">{{ chartError }}</div>
                <div v-show="!chartError" ref="chartEl" class="h-[380px] w-full" />
              </div>

              <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 class="mb-4 flex items-center text-lg font-bold text-slate-800">
                  <Cog class="mr-2 size-5 text-indigo-600" />
                  Your Metrics
                </h2>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">New MRR per Month</label>
                    <div class="relative">
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">$</span>
                      <input
                        v-model="newMrrRaw"
                        type="number"
                        min="100"
                        class="w-full rounded-md border border-slate-300 py-2 pl-7 pr-3 [appearance:textfield] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </div>
                    <p class="mt-1 text-xs text-slate-500">Average new revenue added monthly</p>
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">Monthly Churn Rate</label>
                    <div class="relative">
                      <input
                        v-model="churnRaw"
                        type="number"
                        min="0.1"
                        max="50"
                        step="0.1"
                        class="w-full rounded-md border border-slate-300 px-3 py-2 pr-8 [appearance:textfield] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">%</span>
                    </div>
                    <p class="mt-1 text-xs text-slate-500">Percentage of MRR lost monthly</p>
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">Current MRR</label>
                    <div class="relative">
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">$</span>
                      <input
                        v-model="currentMrrRaw"
                        type="number"
                        min="0"
                        class="w-full rounded-md border border-slate-300 py-2 pl-7 pr-3 [appearance:textfield] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </div>
                    <p class="mt-1 text-xs text-slate-500">Your starting point for projection</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full border-t border-slate-200 p-6 lg:mt-0 lg:w-2/5 lg:border-l lg:border-t-0 lg:p-8">
              <h2 class="mb-6 text-xl font-bold text-slate-800">Growth Analysis</h2>

              <div class="mb-6 grid grid-cols-1 gap-4">
                <div class="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5">
                  <h3 class="text-sm font-medium uppercase text-slate-500">Growth Ceiling</h3>
                  <div class="mt-2">
                    <span class="text-3xl font-semibold text-indigo-700">{{ growthCeilingMain }}</span>
                  </div>
                  <p class="mt-1 text-sm text-slate-600">Maximum achievable MRR</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="rounded-xl border border-slate-200 bg-white p-5">
                    <h3 class="text-sm font-medium uppercase text-slate-500">{{ timeLabel }}</h3>
                    <div class="mt-2 flex items-baseline">
                      <span class="text-2xl font-semibold text-slate-800" :title="timeTitle">{{ timeDisplay }}</span>
                      <span v-if="showMonthsSuffix" class="ml-1 text-slate-600">months</span>
                    </div>
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-white p-5">
                    <h3 class="text-sm font-medium uppercase text-slate-500">{{ gapLabel }}</h3>
                    <div class="mt-2 flex items-baseline">
                      <span class="text-2xl font-semibold text-slate-800">{{ gapDisplay }}</span>
                    </div>
                    <p v-show="showGapContext" class="mt-1 text-sm text-slate-500">Unsustainable position</p>
                  </div>
                </div>

                <div v-show="showAboveWarning" class="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div class="flex items-start gap-3">
                    <Alert class="mt-0.5 size-5 shrink-0 text-amber-600" />
                    <div>
                      <p class="text-sm font-medium text-amber-800">MRR Above Equilibrium</p>
                      <p class="mt-1 text-sm text-amber-800/90">
                        Your current MRR exceeds your growth ceiling. With these metrics, your MRR will naturally decline toward equilibrium.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 class="text-sm font-medium uppercase text-slate-500">Monthly Churn at Ceiling</h3>
                  <div class="mt-2 flex flex-wrap items-baseline gap-x-2">
                    <span class="text-2xl font-semibold text-slate-600">{{ churnAtCeilingDisplay }}</span>
                    <span class="text-sm text-slate-500">= New MRR (equilibrium)</span>
                  </div>
                </div>
              </div>

              <div class="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 class="mb-3 flex items-center text-lg font-semibold text-slate-800">
                  <Lightbulb class="mr-2 size-5 text-amber-500" />
                  What If You Improved?
                </h3>
                <div class="space-y-3 text-sm">
                  <div class="flex flex-col justify-between gap-1 rounded-lg bg-white p-3 sm:flex-row sm:items-center">
                    <span class="text-slate-600">Reduce churn by 1%:</span>
                    <span class="font-semibold text-indigo-600">{{ whatIfChurn }}</span>
                  </div>
                  <div class="flex flex-col justify-between gap-1 rounded-lg bg-white p-3 sm:flex-row sm:items-center">
                    <span class="text-slate-600">Increase new MRR by 20%:</span>
                    <span class="font-semibold text-indigo-600">{{ whatIfMrr }}</span>
                  </div>
                  <div class="flex flex-col justify-between gap-1 rounded-lg bg-white p-3 sm:flex-row sm:items-center">
                    <span class="text-slate-600">Both improvements:</span>
                    <span class="font-semibold text-indigo-600">{{ whatIfBoth }}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="text-[#00296B] border-2 border-[#00296B] rounded-full px-6 py-2 text-lg font-semibold hover:bg-[#00296B] hover:text-white transition-all"
                @click="syncChart"
              >
                Calculate Growth Ceiling
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ApexOptions } from 'apexcharts'

const chartEl = ref<HTMLElement | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let chart: any = null
const chartError = ref('')

const newMrrRaw = ref<number | string>(5000)
const churnRaw = ref<number | string>(5)
const currentMrrRaw = ref<number | string>(50000)

function sanitizeNumber(value: string | number): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  return parseFloat(String(value).replace(/[$,\s]/g, '')) || 0
}

function formatCurrency(value: number) {
  if (value >= 1_000_000_000) return '$' + (value / 1_000_000_000).toFixed(1) + 'B'
  if (value >= 1_000_000) return '$' + (value / 1_000_000).toFixed(1) + 'M'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

const newMRR = computed(() => sanitizeNumber(newMrrRaw.value))
const churnRate = computed(() => sanitizeNumber(churnRaw.value))
const currentMRR = computed(() => sanitizeNumber(currentMrrRaw.value))

type Status = 'ok' | 'bad_inputs' | 'churn_too_low'

const status = computed<Status>(() => {
  const n = newMRR.value
  const c = churnRate.value
  if (n <= 0 || c <= 0) return 'bad_inputs'
  const ceiling = n / (c / 100)
  if (!Number.isFinite(ceiling) || ceiling > 1e12) return 'churn_too_low'
  return 'ok'
})

const growthCeiling = computed(() => {
  if (status.value !== 'ok') return 0
  return newMRR.value / (churnRate.value / 100)
})

const isAboveCeiling = computed(() => status.value === 'ok' && currentMRR.value > growthCeiling.value)

const timeToTarget = computed(() => {
  if (status.value !== 'ok') return 0
  const gc = growthCeiling.value
  const churn = churnRate.value
  const add = newMRR.value
  let t = 0
  if (isAboveCeiling.value) {
    let mrr = currentMRR.value
    while (mrr > gc && t < 120) {
      const churned = mrr * (churn / 100)
      mrr = mrr - churned + add
      t++
    }
    return t
  }
  if (currentMRR.value < gc * 0.9) {
    let mrr = currentMRR.value
    const target = gc * 0.9
    while (mrr < target && t < 120) {
      const churned = mrr * (churn / 100)
      mrr = mrr + add - churned
      t++
    }
  }
  return t
})

const gapValue = computed(() => {
  if (status.value !== 'ok') return 0
  if (isAboveCeiling.value) return currentMRR.value - growthCeiling.value
  return Math.max(0, growthCeiling.value - currentMRR.value)
})

const churnAtCeiling = computed(() => {
  if (status.value !== 'ok') return 0
  return growthCeiling.value * (churnRate.value / 100)
})

const whatIf = computed(() => {
  if (status.value !== 'ok') return { churn: '', mrr: '', both: '' }
  const gc = growthCeiling.value
  const n = newMRR.value
  const c = churnRate.value
  const improvedChurn = Math.max(0.1, c - 1)
  const ceilingChurn = n / (improvedChurn / 100)
  const improvedNew = n * 1.2
  const ceilingMrr = improvedNew / (c / 100)
  const ceilingBoth = improvedNew / (improvedChurn / 100)
  const pct = (x: number) => Math.round(((x - gc) / gc) * 100)
  return {
    churn: `${formatCurrency(ceilingChurn)} (+${pct(ceilingChurn)}%)`,
    mrr: `${formatCurrency(ceilingMrr)} (+${pct(ceilingMrr)}%)`,
    both: `${formatCurrency(ceilingBoth)} (+${pct(ceilingBoth)}%)`,
  }
})

const growthCeilingMain = computed(() => {
  if (status.value === 'bad_inputs') return newMRR.value <= 0 ? 'Enter new MRR' : 'Enter churn rate'
  if (status.value === 'churn_too_low') return 'Churn rate too low'
  return formatCurrency(growthCeiling.value)
})

const ceilingPill = computed(() => {
  if (status.value !== 'ok') return '--'
  return formatCurrency(growthCeiling.value)
})

const timeLabel = computed(() => (isAboveCeiling.value ? 'Time to Ceiling' : 'Time to 90%'))
const gapLabel = computed(() => (isAboveCeiling.value ? 'Above Ceiling' : 'Gap to Ceiling'))

const timeDisplay = computed(() => {
  if (status.value !== 'ok') return '--'
  return timeToTarget.value >= 120 ? '120+' : String(timeToTarget.value)
})

const timeTitle = computed(() => (timeToTarget.value >= 120 ? 'Exceeds 10-year calculation horizon' : ''))

const showMonthsSuffix = computed(() => status.value === 'ok' && timeDisplay.value !== '--')

const gapDisplay = computed(() => (status.value !== 'ok' ? '--' : formatCurrency(gapValue.value)))
const showGapContext = computed(() => status.value === 'ok' && isAboveCeiling.value)
const showAboveWarning = computed(() => status.value === 'ok' && isAboveCeiling.value)

const churnAtCeilingDisplay = computed(() => (status.value !== 'ok' ? '--' : formatCurrency(churnAtCeiling.value)))
const whatIfChurn = computed(() => (status.value !== 'ok' ? '--' : whatIf.value.churn))
const whatIfMrr = computed(() => (status.value !== 'ok' ? '--' : whatIf.value.mrr))
const whatIfBoth = computed(() => (status.value !== 'ok' ? '--' : whatIf.value.both))

const projectionData = computed(() => {
  if (status.value !== 'ok') return [] as number[]
  const churn = churnRate.value
  const add = newMRR.value
  const out: number[] = []
  let mrr = currentMRR.value
  for (let month = 0; month <= 36; month++) {
    out.push(Math.round(mrr))
    const churned = mrr * (churn / 100)
    mrr = mrr + add - churned
  }
  return out
})

function baseChartOptions(): ApexOptions {
  return {
    series: [{ name: 'Projected MRR', data: [...projectionData.value] }],
    chart: {
      height: 380,
      type: 'line',
      toolbar: { show: false },
      fontFamily: 'inherit',
      background: 'transparent',
    },
    colors: ['#4f46e5'],
    dataLabels: { enabled: false },
    stroke: { width: 3, curve: 'smooth', lineCap: 'round' },
    grid: { borderColor: '#f1f5f9', row: { colors: ['transparent', 'transparent'], opacity: 0.5 } },
    xaxis: {
      categories: Array.from({ length: 37 }, (_, i) => i),
      title: { text: 'Months', style: { fontWeight: 600 } },
      labels: { style: { colors: '#64748b' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      max: Math.max(growthCeiling.value * 1.1, currentMRR.value * 1.2),
      title: { text: 'Monthly Recurring Revenue ($)', style: { fontWeight: 600 } },
      labels: {
        formatter: (v: number) => formatCurrency(v),
        style: { colors: '#64748b' },
      },
      min: 0,
    },
    annotations: {
      yaxis: [
        {
          y: growthCeiling.value,
          borderColor: '#4f46e5',
          borderWidth: 2,
          strokeDashArray: 5,
          label: {
            borderColor: '#4f46e5',
            style: { color: '#fff', background: '#4f46e5' },
            text: 'Ceiling: ' + formatCurrency(growthCeiling.value),
            position: 'right',
          },
        },
      ],
    },
    tooltip: {
      y: { formatter: (v: number) => formatCurrency(v) },
      x: { formatter: (v: string | number) => `Month ${v}` },
      theme: 'light',
      style: { fontSize: '12px', fontFamily: 'inherit' },
    },
    legend: { show: false },
    responsive: [{ breakpoint: 768, options: { chart: { height: 280 } } }],
  }
}

function syncChart() {
  if (!chart) return
  chart.updateSeries([{ name: 'Projected MRR', data: [...projectionData.value] }])
  if (status.value === 'ok') {
    chart.updateOptions({
      annotations: {
        yaxis: [
          {
            y: growthCeiling.value,
            borderColor: '#4f46e5',
            borderWidth: 2,
            strokeDashArray: 5,
            label: {
              borderColor: '#4f46e5',
              style: { color: '#fff', background: '#4f46e5' },
              text: 'Ceiling: ' + formatCurrency(growthCeiling.value),
              position: 'right',
            },
          },
        ],
      },
      yaxis: {
        max: Math.max(growthCeiling.value * 1.1, currentMRR.value * 1.2),
        title: { text: 'Monthly Recurring Revenue ($)', style: { fontWeight: 600 } },
        labels: {
          formatter: (v: number) => formatCurrency(v),
          style: { colors: '#64748b' },
        },
        min: 0,
      },
    })
  }
}

async function initChart() {
  chartError.value = ''
  try {
    const ApexCharts = (await import('apexcharts')).default
    if (!chartEl.value) return
    chart = new ApexCharts(chartEl.value, baseChartOptions())
    await chart.render()
    syncChart()
  } catch {
    chartError.value = 'Chart failed to initialize'
  }
}

onMounted(() => {
  initChart()
})

watch([newMrrRaw, churnRaw, currentMrrRaw, projectionData, status, growthCeiling], syncChart, { deep: true })

onBeforeUnmount(() => {
  chart?.destroy?.()
  chart = null
})

const Chevron = () =>
  h('svg', { class: 'mx-2 size-4', xmlns: 'http://www.w3.org/2000/svg', height: '18', width: '18', viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('polyline', { points: '7.5 16.5 14 10 7.5 3.5', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ])

const Cog = () =>
  h('svg', { class: 'mr-2 size-5 text-indigo-600', xmlns: 'http://www.w3.org/2000/svg', height: '18', width: '18', viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('path', {
      d: 'm17.447,8.605l-1.278-.639c-.101-.307-.227-.602-.371-.887l.453-1.359c.12-.359.026-.756-.241-1.023l-.707-.707c-.267-.268-.664-.362-1.023-.242l-1.36.453c-.285-.144-.58-.269-.887-.371l-.639-1.278c-.17-.339-.516-.553-.895-.553h-1c-.379,0-.725.214-.895.553l-.639,1.278c-.307.101-.602.227-.887.371l-1.36-.453c-.359-.12-.756-.026-1.023.242l-.707.707c-.268.268-.361.664-.241,1.023l.453,1.359c-.144.285-.269.58-.371.887l-1.278.639c-.339.169-.553.516-.553.895v1c0,.379.214.725.553.895l1.278.639c.101.307.227.602.371.887l-.453,1.359c-.12.359-.026.756.241,1.023l.707.707c.19.191.446.293.707.293.105,0,.213-.017.316-.051l1.36-.453c.285.144.58.269.887.371l.639,1.278c.17.339.516.553.895.553h1c.379,0,.725-.214.895-.553l.639-1.278c.307-.101.602-.227.887-.371l1.36.453c.104.035.211.051.316.051.261,0,.517-.103.707-.293l.707-.707c.268-.268.361-.664.241-1.023l-.453-1.359c.144-.285.269-.58.371-.887l1.278-.639c.339-.169.553-.516.553-.895v-1c0-.379-.214-.725-.553-.895Zm-7.447,4.395c-1.657,0-3-1.343-3-3s1.343-3,3-3,3,1.343,3,3-1.343,3-3,3Z',
      'stroke-width': '0',
    }),
  ])

const Lightbulb = () =>
  h('svg', { class: 'mr-2 size-5 text-amber-500', xmlns: 'http://www.w3.org/2000/svg', height: '18', width: '18', viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'm10,13.5v-3l-2-2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('path', { d: 'm10,10.5l2-2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('circle', { cx: '10', cy: '8.5', r: '5.5' }),
    h('path', { fill: 'currentColor', 'stroke-width': '0', d: 'm10,14c-1.1077,0-2.1368-.3304-3-.8937v2.8937c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-2.8937c-.8632.5634-1.8923.8937-3,.8937Z' }),
  ])

const Alert = () =>
  h('svg', { class: 'mt-0.5 size-5 shrink-0 text-amber-600', xmlns: 'http://www.w3.org/2000/svg', height: '18', width: '18', viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('path', {
      d: 'm10,2C5.589,2,2,5.589,2,10s3.589,8,8,8,8-3.589,8-8S14.411,2,10,2Zm1,12c0,.552-.447,1-1,1s-1-.448-1-1v-4.5c0-.552.447-1,1-1s1,.448,1,1v4.5Zm-1-6.5c-.689,0-1.25-.561-1.25-1.25s.561-1.25,1.25-1.25,1.25.561,1.25,1.25-.561,1.25-1.25,1.25Z',
      'stroke-width': '0',
    }),
  ])
</script>
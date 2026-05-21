<script setup lang="ts">
import breadcrumb from '~/components/Sections/breadcrumb.vue'
import Faqs from '~/components/Sections/Faqs.vue'
definePageMeta({ layout: 'tools' })
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const developmentCosts = ref(20000)
const marketingCosts = ref(5000)
const packagePrice = ref(3500)
const deliveryCost = ref(2800)
const initialClients = ref(5)
const monthlyGrowth = ref(2)
const churnRate = ref(5)
const projectionMonths = ref(12)

const totalInvestment = computed(
  () => (Number(developmentCosts.value) || 0) + (Number(marketingCosts.value) || 0),
)

const profitAmount = computed(
  () => (Number(packagePrice.value) || 0) - (Number(deliveryCost.value) || 0),
)

const profitMarginPct = computed(() => {
  const price = Number(packagePrice.value) || 0
  if (price <= 0) return 0
  return (profitAmount.value / price) * 100
})

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

type MonthRow = {
  month: number
  clients: number
  newClients: number
  churnedClients: number
  revenue: number
  deliveryCosts: number
  monthlyProfit: number
  cumulativeProfit: number
  investmentApplied: number
}

type RunResult = {
  breakEvenMonth: number | null
  netProfit: number
  roi: number
  monthlyRetentionRate: string
  annualRetentionRate: string
  projectionData: MonthRow[]
  totalInvestment: number
  showEquilibrium: boolean
  equilibriumClients: number
  equilibriumRevenue: number
  monthlyGrowth: number
  churnRate: number
}

const run = ref<RunResult | null>(null)
const showResults = ref(false)

function computeProjection(): RunResult | null {
  const dev = Number(developmentCosts.value) || 0
  const mkt = Number(marketingCosts.value) || 0
  const price = Number(packagePrice.value) || 0
  const delivery = Number(deliveryCost.value) || 0
  const initial = Math.floor(Number(initialClients.value) || 0)
  const growth = Math.floor(Number(monthlyGrowth.value) || 0)
  const churn = Number(churnRate.value) || 0
  const months = Math.min(60, Math.max(1, Math.floor(Number(projectionMonths.value) || 12)))

  if (price <= 0) {
    window.alert('Package price must be greater than zero.')
    return null
  }

  const totalInv = dev + mkt
  const projectionData: MonthRow[] = []
  let currentClients = initial
  let cumulativeProfit = -totalInv
  let breakEvenMonth: number | null = null

  for (let month = 1; month <= months; month++) {
    let churnedClients = 0
    let newClients = 0

    if (month === 1) {
      newClients = initial
    } else {
      const actualChurn = currentClients * (churn / 100)
      churnedClients = Math.floor(actualChurn)

      if (currentClients < 20 && actualChurn < 0.95) {
        churnedClients = 0
      }

      newClients = growth
      currentClients = currentClients - churnedClients + newClients
    }

    const monthlyRevenue = currentClients * price
    const monthlyDeliveryCosts = currentClients * delivery
    const monthlyProfit = monthlyRevenue - monthlyDeliveryCosts
    cumulativeProfit += monthlyProfit

    if (breakEvenMonth === null && cumulativeProfit >= 0) {
      breakEvenMonth = month
    }

    projectionData.push({
      month,
      clients: currentClients,
      newClients,
      churnedClients,
      revenue: monthlyRevenue,
      deliveryCosts: monthlyDeliveryCosts,
      monthlyProfit,
      cumulativeProfit,
      investmentApplied: month === 1 ? totalInv : 0,
    })
  }

  const last = projectionData[projectionData.length - 1]
  const firstYearCumulative =
    projectionData.length >= 12 ? projectionData[11].cumulativeProfit : last.cumulativeProfit
  const netProfit = firstYearCumulative + totalInv
  const roi = totalInv > 0 ? (netProfit / totalInv) * 100 : 0

  const monthlyRetentionRate = (100 - churn).toFixed(1)
  const annualRetentionRate = (Math.pow(1 - churn / 100, 12) * 100).toFixed(1)

  const theoreticalEquilibriumClients =
    churn > 0 ? Math.round(growth / (churn / 100)) : 0
  const showEquilibrium = churn > 0 && months >= 24 && theoreticalEquilibriumClients > 0

  return {
    breakEvenMonth,
    netProfit,
    roi,
    monthlyRetentionRate,
    annualRetentionRate,
    projectionData,
    totalInvestment: totalInv,
    showEquilibrium,
    equilibriumClients: theoreticalEquilibriumClients,
    equilibriumRevenue: theoreticalEquilibriumClients * price,
    monthlyGrowth: growth,
    churnRate: churn,
  }
}

function calculateROI() {
  const r = computeProjection()
  if (!r) return
  run.value = r
  showResults.value = true
}

const monthlyCanvas = ref<HTMLCanvasElement | null>(null)
const cumulativeCanvas = ref<HTMLCanvasElement | null>(null)
const clientCanvas = ref<HTMLCanvasElement | null>(null)

type ChartJs = import('chart.js').Chart
let monthlyChart: ChartJs | null = null
let cumulativeChart: ChartJs | null = null
let clientChart: ChartJs | null = null

function destroyCharts() {
  monthlyChart?.destroy()
  cumulativeChart?.destroy()
  clientChart?.destroy()
  monthlyChart = null
  cumulativeChart = null
  clientChart = null
}

async function buildCharts(r: RunResult) {
  await nextTick()
  if (!monthlyCanvas.value || !cumulativeCanvas.value || !clientCanvas.value) return

  const { default: Chart } = await import('chart.js/auto')
  const annotationMod = await import('chartjs-plugin-annotation')
  const annotationPlugin = annotationMod.default
  Chart.register(annotationPlugin)

  destroyCharts()

  const labels = r.projectionData.map((d) => `Month ${d.month}`)
  const revenueData = r.projectionData.map((d) => d.revenue)
  const costData = r.projectionData.map((d) => d.deliveryCosts)
  const profitData = r.projectionData.map((d) => d.monthlyProfit)
  const cumulativeData = r.projectionData.map((d) => d.cumulativeProfit)
  const clientsData = r.projectionData.map((d) => d.clients)
  const newClientsData = r.projectionData.map((d) => d.newClients)
  const churnedClientsData = r.projectionData.map((d) => d.churnedClients)

  let breakEvenIndex = -1
  for (let i = 0; i < cumulativeData.length; i++) {
    if (cumulativeData[i] >= 0) {
      breakEvenIndex = i
      break
    }
  }

  const annotations: Record<string, unknown> = {}
  if (breakEvenIndex >= 0) {
    annotations.breakEven = {
      type: 'line',
      xMin: breakEvenIndex,
      xMax: breakEvenIndex,
      borderColor: 'rgba(0, 0, 0, 0.5)',
      borderWidth: 2,
      borderDash: [6, 6],
      label: {
        content: 'Break-even',
        display: true,
        position: 'start',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        font: { weight: 'bold' },
      },
    }
  }

  monthlyChart = new Chart(monthlyCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          backgroundColor: 'rgba(99, 102, 241, 0.7)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1,
          order: 3,
        },
        {
          label: 'Delivery Costs',
          data: costData,
          backgroundColor: 'rgba(244, 63, 94, 0.7)',
          borderColor: 'rgba(244, 63, 94, 1)',
          borderWidth: 1,
          order: 2,
        },
        {
          label: 'Monthly Profit',
          data: profitData,
          type: 'line',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
          tension: 0.1,
          pointBackgroundColor: 'rgba(16, 185, 129, 1)',
          pointRadius: 4,
          order: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Amount ($)' },
        },
      },
      plugins: {
        title: { display: true, text: 'Monthly Revenue, Costs, and Profit' },
      },
    },
  })

  cumulativeChart = new Chart(cumulativeCanvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Cumulative Profit',
          data: cumulativeData,
          backgroundColor: (ctx) => {
            const v = Number(ctx.dataset.data[ctx.dataIndex])
            return v < 0 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)'
          },
          borderColor: (ctx) => {
            const v = Number(ctx.dataset.data[ctx.dataIndex])
            return v < 0 ? 'rgba(244, 63, 94, 1)' : 'rgba(16, 185, 129, 1)'
          },
          borderWidth: 2,
          tension: 0.1,
          fill: true,
          pointBackgroundColor: (ctx) => {
            const v = Number(ctx.dataset.data[ctx.dataIndex])
            return v < 0 ? 'rgba(244, 63, 94, 1)' : 'rgba(16, 185, 129, 1)'
          },
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          title: { display: true, text: 'Cumulative Profit ($)' },
          grid: {
            color: (ctx) =>
              ctx.tick.value === 0 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)',
            lineWidth: (ctx) => (ctx.tick.value === 0 ? 2 : 1),
          },
        },
      },
      plugins: {
        title: { display: true, text: 'Path to Profitability' },
        annotation: { annotations },
      },
    },
  })

  const netGrowthData = newClientsData.map((n, i) => n - churnedClientsData[i])

  clientChart = new Chart(clientCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Net Client Change',
          data: netGrowthData,
          backgroundColor: netGrowthData.map((val) =>
            val >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(244, 63, 94, 0.7)',
          ),
          borderColor: netGrowthData.map((val) =>
            val >= 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(244, 63, 94, 1)',
          ),
          borderWidth: 1,
        },
        {
          label: 'Total Clients',
          data: clientsData,
          type: 'line',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          tension: 0.1,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 4,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          position: 'left',
          title: { display: true, text: 'Net Client Change' },
          suggestedMin: -3,
          suggestedMax: 5,
          grid: {
            color: (ctx) =>
              ctx.tick.value === 0 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)',
            lineWidth: (ctx) => (ctx.tick.value === 0 ? 2 : 1),
          },
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          title: { display: true, text: 'Total Clients' },
          grid: { drawOnChartArea: false },
        },
      },
      plugins: {
        title: { display: true, text: 'Client Growth & Retention' },
        tooltip: {
          callbacks: {
            label(ctx) {
              const label = ctx.dataset.label || ''
              const value = Number(ctx.raw)
              if (label === 'Net Client Change') {
                if (value > 0) return `Gained ${value} clients`
                if (value < 0) return `Lost ${Math.abs(value)} clients`
                return 'No change in clients'
              }
              return `${label}: ${value}`
            },
          },
        },
      },
    },
  })
}

watch(
  run,
  async (r) => {
    if (!r || !showResults.value) return
    await buildCharts(r)
  },
  { flush: 'post' },
)

onMounted(async () => {
  if (run.value && showResults.value) await buildCharts(run.value)
})

onBeforeUnmount(() => {
  destroyCharts()
})
</script>

<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
    
      <main class="pt-10 text-neutral-900 lg:pt-0">
        <section >
        <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Service Standardization ROI Calculator for productized Agencies</h1>
        <p class="mt-4 text-lg text-stone-600">Determine whether investing in systems, templates, and processes is worth the cost by calculating the ROI of standardization investments over time.</p>
      </div>

          <div class="container mx-auto max-w-6xl px-4 py-8">
            <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div class="mb-8">
                <h2 class="mb-4 border-b border-neutral-200 pb-2 font-bold text-[#233267]">Initial Investment &amp; Package Economics</h2>
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 class="mb-3 text-lg font-medium text-neutral-800">Initial Investment</h3>
                    <div class="mb-4">
                      <label for="developmentCosts" class="mb-1 block text-sm font-semibold">
                        Development Costs (research, documentation, training)
                      </label>
                      <div class="relative mt-1">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">$</span>
                        <input
                          id="developmentCosts"
                          v-model.number="developmentCosts"
                          type="number"
                          min="0"
                          class="w-full rounded-md border border-neutral-300 py-2 pr-3 pl-7 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                          placeholder="0"
                        >
                      </div>
                    </div>
                    <div class="mb-4">
                      <label for="marketingCosts" class="mb-1 block text-sm font-semibold">Marketing &amp; Launch Costs</label>
                      <div class="relative mt-1">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">$</span>
                        <input
                          id="marketingCosts"
                          v-model.number="marketingCosts"
                          type="number"
                          min="0"
                          class="w-full rounded-md border border-neutral-300 py-2 pr-3 pl-7 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                          placeholder="0"
                        >
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="mb-1 block text-sm font-semibold">Total Initial Investment</label>
                      <div class="mt-1">
                        <span class="font-semibold text-#233267]">{{ formatCurrency(totalInvestment) }}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 class="mb-3 text-lg font-medium text-neutral-800">Package Economics</h3>
                    <div class="mb-4">
                      <label for="packagePrice" class="mb-1 block text-sm font-semibold">Monthly Package Price</label>
                      <div class="relative mt-1">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">$</span>
                        <input
                          id="packagePrice"
                          v-model.number="packagePrice"
                          type="number"
                          min="0"
                          class="w-full rounded-md border border-neutral-300 py-2 pr-3 pl-7 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                          placeholder="0"
                        >
                      </div>
                    </div>
                    <div class="mb-4">
                      <label for="deliveryCost" class="mb-1 block text-sm font-semibold">
                        Estimated Delivery Cost per Client per Month
                      </label>
                      <div class="relative mt-1">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">$</span>
                        <input
                          id="deliveryCost"
                          v-model.number="deliveryCost"
                          type="number"
                          min="0"
                          class="w-full rounded-md border border-neutral-300 py-2 pr-3 pl-7 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                          placeholder="0"
                        >
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="mb-1 block text-sm font-semibold">Profit per Client</label>
                      <div class="mt-1 flex gap-4">
                        <div class="flex-1">
                          <span class="font-semibold text-#233267]">{{ formatCurrency(profitAmount) }}</span>
                        </div>
                        <div class="flex-1">
                          <span class="font-semibold text-#233267]">{{ profitMarginPct.toFixed(1) }}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h2 class="mb-4 border-b border-neutral-200 pb-2 text-xl font-bold text-[#233267]">Sales Projections</h2>
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div class="mb-4">
                    <label for="initialClients" class="mb-1 block text-sm font-semibold">Initial Package Subscribers (Month 1)</label>
                    <input
                      id="initialClients"
                      v-model.number="initialClients"
                      type="number"
                      min="0"
                      class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      placeholder="0"
                    >
                  </div>
                  <div class="mb-4">
                    <label for="monthlyGrowth" class="mb-1 block text-sm font-semibold">Monthly Growth (new clients)</label>
                    <input
                      id="monthlyGrowth"
                      v-model.number="monthlyGrowth"
                      type="number"
                      min="0"
                      class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      placeholder="0"
                    >
                  </div>
                  <div class="mb-4">
                    <label for="churnRate" class="mb-1 block text-sm font-semibold">Monthly Churn Rate (%)</label>
                    <input
                      id="churnRate"
                      v-model.number="churnRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      placeholder="0"
                    >
                  </div>
                  <div class="mb-4">
                    <label for="projectionMonths" class="mb-1 block text-sm font-semibold">Projection Period (months)</label>
                    <input
                      id="projectionMonths"
                      v-model.number="projectionMonths"
                      type="number"
                      min="1"
                      max="60"
                      class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      placeholder="12"
                    >
                  </div>
                </div>
                <div class="mt-4 text-center">
                  <button
                    type="button"
                    class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
                    @click="calculateROI"
                  >
                    Calculate ROI
                  </button>
                </div>
              </div>

              <div v-if="showResults && run" class="my-8">
                <h2 class="mb-4 border-b border-neutral-200 pb-2 text-xl font-bold text-[#233267]">Key Metrics</h2>
                <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                  <div class="rounded-lg border border-neutral-200 p-4">
                    <h3 class="mb-2 text-lg font-medium">Break-even Month</h3>
                    <p class="text-3xl font-bold">
                      {{ run.breakEvenMonth !== null ? `Month ${run.breakEvenMonth}` : 'Beyond projection' }}
                    </p>
                  </div>
                  <div class="rounded-lg border border-neutral-200 p-4">
                    <h3 class="mb-2 text-lg font-medium">First-year Profit</h3>
                    <p class="text-3xl font-bold">{{ formatCurrency(run.netProfit) }}</p>
                  </div>
                  <div class="rounded-lg border border-neutral-200 p-4">
                    <h3 class="mb-2 text-lg font-medium">ROI Percentage</h3>
                    <p class="text-3xl font-bold">{{ run.roi.toFixed(1) }}%</p>
                  </div>
                  <div class="rounded-lg border border-neutral-200 p-4">
                    <h3 class="mb-2 text-lg font-medium">Client Retention Rates</h3>
                    <p class="text-3xl font-bold">
                      {{ run.monthlyRetentionRate }}%
                      <span class="mt-1 block text-xs text-neutral-600">Monthly Retention</span>
                      <span class="mt-1 block text-sm font-normal">Annual: {{ run.annualRetentionRate }}%</span>
                    </p>
                  </div>
                </div>

                <div v-if="run.showEquilibrium" class="mb-6">
                  <div class="border-l-4 border-amber-500 bg-amber-50 p-4">
                    <div class="flex gap-3">
                      <div class="shrink-0">
                        <svg class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path
                            fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div class="min-w-0 text-sm text-amber-900">
                        <h3 class="text-sm font-medium text-amber-800">Growth Ceiling Detected</h3>
                        <p class="mt-2">
                          Your business will reach a
                          <strong>natural growth ceiling</strong>
                          at
                          {{ run.equilibriumClients }} clients and
                          {{ formatCurrency(run.equilibriumRevenue) }} monthly revenue.
                        </p>
                        <p class="mt-2">
                          At this point, your client acquisition rate ({{ run.monthlyGrowth }} new clients/month) exactly balances your
                          churn rate ({{ run.churnRate }}% monthly), creating an equilibrium.
                        </p>
                        <p class="mt-2">To break through this ceiling, you'll need to either:</p>
                        <ul class="mt-1 list-disc pl-5">
                          <li>Decrease your churn rate</li>
                          <li>Increase your client acquisition rate</li>
                          <li>Raise your package price</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-8">
                  <h2 class="mb-4 border-b border-neutral-200 pb-2 text-xl font-bold text-[#233267]">Financial Projection</h2>

                  <ClientOnly>
                    <div class="mb-6">
                      <h3 class="mb-2 text-lg font-medium text-neutral-800">Monthly Performance</h3>
                      <div class="rounded-xl border border-neutral-200 p-4">
                        <div class="h-64">
                          <canvas ref="monthlyCanvas" />
                        </div>
                      </div>
                    </div>
                    <div class="mb-6">
                      <h3 class="mb-2 text-lg font-medium text-neutral-800">Cumulative Profit &amp; Break-even</h3>
                      <div class="rounded-xl border border-neutral-200 p-4">
                        <div class="h-64">
                          <canvas ref="cumulativeCanvas" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 class="mb-2 text-lg font-medium text-neutral-800">Client Growth &amp; Retention</h3>
                      <div class="rounded-xl border border-neutral-200 p-4">
                        <div class="h-64">
                          <canvas ref="clientCanvas" />
                        </div>
                      </div>
                    </div>
                    <template #fallback>
                      <p class="text-sm text-neutral-500">Loading charts…</p>
                    </template>
                  </ClientOnly>
                </div>

                <div>
                  <h2 class="mb-4 border-b border-neutral-200 pb-2 text-xl font-bold text-[#233267]">Monthly Breakdown</h2>
                  <div class="overflow-x-auto rounded-xl border border-neutral-200">
                    <table class="min-w-full divide-y divide-neutral-200">
                      <thead class="bg-neutral-50">
                        <tr>
                          <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                            Month
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                            Clients
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                            New Clients
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                            Churned Clients
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                            Revenue
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                            Delivery Costs
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                            Monthly Profit
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                            Cumulative Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-neutral-200 bg-white">
                        <tr v-for="row in run.projectionData" :key="row.month">
                          <td class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-neutral-900">
                            {{ row.month }}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-center text-sm text-neutral-600">{{ row.clients }}</td>
                          <td class="whitespace-nowrap px-6 py-4 text-center text-sm text-neutral-600">{{ row.newClients }}</td>
                          <td class="whitespace-nowrap px-6 py-4 text-center text-sm text-neutral-600">
                            {{ row.month === 1 ? 0 : row.churnedClients }}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-600">
                            {{ formatCurrency(row.revenue) }}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-600">
                            {{ formatCurrency(row.deliveryCosts) }}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-600">
                            {{ formatCurrency(row.monthlyProfit) }}
                          </td>
                          <td
                            class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                            :class="row.cumulativeProfit >= 0 ? 'text-emerald-600' : 'text-red-500'"
                          >
                            {{ formatCurrency(row.cumulativeProfit) }}
                            <span
                              v-if="row.month === 1"
                              class="mt-1 block text-xs font-normal text-neutral-500"
                            >
                              (Includes {{ formatCurrency(row.investmentApplied) }} initial investment)
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
 
  </div>
    <Faqs/>
</template>
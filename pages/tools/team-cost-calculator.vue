<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import breadcrumb from '~/components/Sections/breadcrumb.vue'
definePageMeta({ layout: 'tools' })
type PackageRow = {
  id: number
  name: string
  clients: number
  hoursPerClient: number
  price: number
}

let nextId = 4
const packages = ref<PackageRow[]>([
  { id: 1, name: 'Package A', clients: 15, hoursPerClient: 12, price: 2500 },
  { id: 2, name: 'Package B', clients: 10, hoursPerClient: 9, price: 1800 },
  { id: 3, name: 'Package C', clients: 20, hoursPerClient: 18, price: 3500 },
])

const specialistCapacity = ref(120)
const generalistEfficiencyPct = ref(70)
const businessOverheadPct = ref(25)

const specialistCostType = ref<'hourly' | 'salary'>('hourly')
const specialistRate = ref(55)
const specialistSalary = ref(4500)

const generalistCostType = ref<'hourly' | 'salary'>('hourly')
const generalistRate = ref(35)
const generalistSalary = ref(2500)

function rowTotalHours(p: PackageRow) {
  return (Number(p.clients) || 0) * (Number(p.hoursPerClient) || 0)
}

function rowRevenue(p: PackageRow) {
  return (Number(p.clients) || 0) * (Number(p.price) || 0)
}

const totals = computed(() => {
  let totalHours = 0
  let totalRevenue = 0
  let totalClients = 0
  for (const p of packages.value) {
    totalHours += rowTotalHours(p)
    totalRevenue += rowRevenue(p)
    totalClients += Number(p.clients) || 0
  }
  return { totalHours, totalRevenue, totalClients }
})

const team = computed(() => {
  const totalHours = totals.value.totalHours
  const capacity = Number(specialistCapacity.value) || 0
  const efficiency = (Number(generalistEfficiencyPct.value) || 0) / 100

  const specialistWorkRatio = 0.7
  const generalistWorkRatio = 0.3
  const specialistWork = totalHours * specialistWorkRatio
  const generalistWork = totalHours * generalistWorkRatio

  const requiredSpecialists =
    capacity > 0 ? Math.ceil(specialistWork / capacity) : 0
  const generalistCapacity = capacity * efficiency
  const requiredGeneralists =
    generalistCapacity > 0 ? Math.ceil(generalistWork / generalistCapacity) : 0

  let specialistUtilizationRate = 0
  if (requiredSpecialists > 0 && capacity > 0) {
    specialistUtilizationRate = Math.min(specialistWork / (requiredSpecialists * capacity), 1)
  }

  const totalCapacity =
    requiredSpecialists * capacity + requiredGeneralists * generalistCapacity
  let teamUtilizationRate = 0
  if (totalCapacity > 0) {
    teamUtilizationRate = Math.min(totalHours / totalCapacity, 1)
  }

  const specPct = Math.round(specialistUtilizationRate * 100)
  const teamPct = Math.round(teamUtilizationRate * 100)

  return {
    requiredSpecialists,
    requiredGeneralists,
    specialistUtilizationPct: specPct,
    teamUtilizationPct: teamPct,
  }
})

const financial = computed(() => {
  const { requiredSpecialists, requiredGeneralists } = team.value
  const capacity = Number(specialistCapacity.value) || 0

  let specialistTotalCost = 0
  if (specialistCostType.value === 'hourly') {
    const rate = Number(specialistRate.value) || 0
    specialistTotalCost = requiredSpecialists * rate * capacity
  } else {
    const salary = Number(specialistSalary.value) || 0
    specialistTotalCost = requiredSpecialists * salary
  }

  let generalistTotalCost = 0
  if (generalistCostType.value === 'hourly') {
    const rate = Number(generalistRate.value) || 0
    generalistTotalCost = requiredGeneralists * rate * capacity
  } else {
    const salary = Number(generalistSalary.value) || 0
    generalistTotalCost = requiredGeneralists * salary
  }

  const overheadPct = Number(businessOverheadPct.value) || 0
  const laborCost = specialistTotalCost + generalistTotalCost
  const overheadAmount = laborCost * (overheadPct / 100)
  const totalCostAmount = laborCost + overheadAmount

  const revenue = totals.value.totalRevenue
  const profit = revenue - totalCostAmount
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0

  return {
    specialistTotalCost,
    generalistTotalCost,
    overheadAmount,
    totalCostAmount,
    revenue,
    profit,
    margin,
  }
})

const breakEven = computed(() => {
  const totalClients = totals.value.totalClients
  const totalRevenue = totals.value.totalRevenue
  const monthlyCost = financial.value.totalCostAmount

  const avgRevenuePerClient = totalClients > 0 ? totalRevenue / totalClients : 0
  const breakEvenPoint =
    avgRevenuePerClient > 0 ? Math.ceil(monthlyCost / avgRevenuePerClient) : 0
  const buffer = totalClients - breakEvenPoint
  const avgCostPerClient = totalClients > 0 ? monthlyCost / totalClients : 0

  const maxClients = Math.max(totalClients * 2, breakEvenPoint * 2, 40)
  const clientLabels: number[] = []
  const revenueData: number[] = []
  const costData: number[] = []

  const variablePerClient =
    totalClients > 0 ? (monthlyCost * 0.2) / totalClients : 0
  const fixedCost = monthlyCost * 0.8

  for (let i = 0; i <= maxClients; i += 5) {
    clientLabels.push(i)
    revenueData.push(i * avgRevenuePerClient)
    costData.push(fixedCost + i * variablePerClient)
  }

  return {
    breakEvenPoint,
    buffer,
    avgCostPerClient,
    clientLabels,
    revenueData,
    costData,
  }
})

function formatMoney(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

function profitMarginClass(m: number) {
  if (m < 15) return 'text-red-600'
  if (m < 30) return 'text-yellow-600'
  return 'text-emerald-600'
}

function specialistBarClass(pct: number) {
  if (pct > 95) return 'bg-red-500'
  if (pct > 80) return 'bg-yellow-500'
  return 'bg-amber-600'
}

function teamBarClass(pct: number) {
  if (pct > 95) return 'bg-red-500'
  if (pct > 80) return 'bg-yellow-500'
  return 'bg-emerald-600'
}

function bufferClass(buffer: number) {
  return buffer < 0 ? 'text-red-700' : 'text-emerald-600'
}

function addPackage() {
  const idx = packages.value.length
  const letter = String.fromCharCode(65 + (idx % 26))
  packages.value.push({
    id: nextId++,
    name: `Package ${letter}`,
    clients: 0,
    hoursPerClient: 0,
    price: 0,
  })
}

function removePackage(id: number) {
  if (packages.value.length <= 1) {
    window.alert('You must have at least one package.')
    return
  }
  packages.value = packages.value.filter((p) => p.id !== id)
}

const teamCanvas = ref<HTMLCanvasElement | null>(null)
const financialCanvas = ref<HTMLCanvasElement | null>(null)
const breakevenCanvas = ref<HTMLCanvasElement | null>(null)

type ChartType = import('chart.js').Chart
let teamChart: ChartType | null = null
let financialChart: ChartType | null = null
let breakevenChart: ChartType | null = null

function destroyCharts() {
  teamChart?.destroy()
  financialChart?.destroy()
  breakevenChart?.destroy()
  teamChart = null
  financialChart = null
  breakevenChart = null
}

async function buildCharts() {
  await nextTick()
  if (!teamCanvas.value || !financialCanvas.value || !breakevenCanvas.value) return

  const { default: Chart } = await import('chart.js/auto')

  destroyCharts()

  const t = team.value
  teamChart = new Chart(teamCanvas.value, {
    type: 'doughnut',
    data: {
      labels: ['Specialists', 'Generalists'],
      datasets: [
        {
          data: [t.requiredSpecialists, t.requiredGeneralists],
          backgroundColor: ['#3B82F6', '#65a30d'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
    },
  })

  const f = financial.value
  financialChart = new Chart(financialCanvas.value, {
    type: 'doughnut',
    data: {
      labels: ['Specialists', 'Generalists', 'Overhead', 'Profit'],
      datasets: [
        {
          data: [
            Math.round(f.specialistTotalCost),
            Math.round(f.generalistTotalCost),
            Math.round(f.overheadAmount),
            Math.round(f.profit),
          ],
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(124, 58, 237, 0.7)',
            'rgba(234, 179, 8, 0.7)',
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right' },
        tooltip: {
          callbacks: {
            label(ctx) {
              const value = Number(ctx.raw)
              const arr = (ctx.dataset.data as number[]).map(Number)
              const total = arr.reduce((a, b) => a + b, 0)
              const pct = total ? Math.round((value / total) * 100) : 0
              return `$${value.toLocaleString()} (${pct}%)`
            },
          },
        },
      },
    },
  })

  const b = breakEven.value
  breakevenChart = new Chart(breakevenCanvas.value, {
    type: 'line',
    data: {
      labels: b.clientLabels,
      datasets: [
        {
          label: 'Revenue',
          data: b.revenueData,
          borderColor: 'rgba(16, 185, 129, 1)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.1,
        },
        {
          label: 'Costs',
          data: b.costData,
          borderColor: 'rgba(239, 68, 68, 1)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Monthly Amount ($)' },
          ticks: {
            callback(value) {
              return '$' + Number(value).toLocaleString()
            },
          },
        },
        x: {
          title: { display: true, text: 'Number of Clients' },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label(ctx) {
              return `${ctx.dataset.label}: $${Number(ctx.raw).toLocaleString()}`
            },
          },
        },
      },
    },
  })
}

function syncCharts() {
  if (!teamChart || !financialChart || !breakevenChart) return

  const t = team.value
  teamChart.data.datasets[0].data = [t.requiredSpecialists, t.requiredGeneralists]
  teamChart.update()

  const f = financial.value
  financialChart.data.datasets[0].data = [
    Math.round(f.specialistTotalCost),
    Math.round(f.generalistTotalCost),
    Math.round(f.overheadAmount),
    Math.round(f.profit),
  ]
  financialChart.update()

  const b = breakEven.value
  breakevenChart.data.labels = b.clientLabels
  breakevenChart.data.datasets[0].data = b.revenueData
  breakevenChart.data.datasets[1].data = b.costData
  breakevenChart.update()
}

onMounted(async () => {
  await buildCharts()
})

watch(
  [
    packages,
    specialistCapacity,
    generalistEfficiencyPct,
    businessOverheadPct,
    specialistCostType,
    specialistRate,
    specialistSalary,
    generalistCostType,
    generalistRate,
    generalistSalary,
  ],
  async () => {
    if (!teamChart) await buildCharts()
    else syncCharts()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  destroyCharts()
})
</script>

<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
    <main class="pt-10 text-neutral-900 lg:pt-0 ">
        <section >
          <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Team Cost Calculator for productized Agencies</h1>
        <p class="mt-4 text-lg text-stone-600">Plan your team structure and analyze financial impact for your standardized service packages.</p>
      </div>

          <div class="container mx-auto max-w-6xl px-4 py-8">
            <div class="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-xl font-semibold text-[#233267]">Service Packages</h2>
                <button
                  type="button"
                  class="px-3 py-1 text-sm font-medium text-[#233267] hover:text-red-800"
                  @click="addPackage"
                >
                  + Add Package
                </button>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                  <thead>
                    <tr class="border-b-2 border-neutral-200">
                      <th class="py-2 text-left text-sm font-semibold">Package</th>
                      <th class="py-2 text-left text-sm font-semibold">Clients</th>
                      <th class="py-2 text-left text-sm font-semibold">Hours/Client</th>
                      <th class="py-2 text-left text-sm font-semibold">Total Hours</th>
                      <th class="py-2 text-left text-sm font-semibold">Package Price</th>
                      <th class="py-2 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="p in packages"
                      :key="p.id"
                      class="border-b border-neutral-100"
                    >
                      <td class="py-3 pr-2">
                        <input
                          v-model="p.name"
                          type="text"
                          class="w-full rounded-md border border-neutral-300 px-2 py-1.5 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                        >
                      </td>
                      <td class="py-3 pr-2">
                        <input
                          v-model.number="p.clients"
                          type="number"
                          class="w-full rounded-md border border-neutral-300 px-2 py-1.5 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                        >
                      </td>
                      <td class="py-3 pr-2">
                        <input
                          v-model.number="p.hoursPerClient"
                          type="number"
                          class="w-full rounded-md border border-neutral-300 px-2 py-1.5 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                        >
                      </td>
                      <td class="py-3 pr-2">
                        <div class="rounded-md bg-neutral-50 p-2 text-center text-sm font-medium">
                          {{ rowTotalHours(p) }}
                        </div>
                      </td>
                      <td class="py-3 pr-2">
                        <div class="relative">
                          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">$</span>
                          <input
                            v-model.number="p.price"
                            type="number"
                            class="w-full rounded-md border border-neutral-300 py-1.5 pr-2 pl-7 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                          >
                        </div>
                      </td>
                      <td class="py-3">
                        <button
                          type="button"
                          class="px-2 py-1 text-[#5D688F] hover:text-[#233267]"
                          @click="removePackage(p.id)"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td class="py-3 font-semibold" colspan="3">Total</td>
                      <td class="py-3 text-center font-bold">{{ totals.totalHours }}</td>
                      <td class="py-3 font-bold">{{ formatMoney(totals.totalRevenue) }}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div class="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-semibold text-[#233267]">Team Settings</h2>

              <div class="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 class="mb-3 text-lg font-semibold text-neutral-700">Global Settings</h3>
                  <div class="mb-6 grid grid-cols-2 gap-6">
                    <div>
                      <label for="specialist-capacity" class="mb-1 block text-sm font-semibold">
                        Specialist Capacity (hours/month)
                      </label>
                      <input
                        id="specialist-capacity"
                        v-model.number="specialistCapacity"
                        type="number"
                        class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      >
                    </div>
                    <div>
                      <label for="generalist-efficiency" class="mb-1 block text-sm font-semibold">
                        Generalist Efficiency (%)
                      </label>
                      <input
                        id="generalist-efficiency"
                        v-model.number="generalistEfficiencyPct"
                        type="number"
                        class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      >
                      <p class="mt-1 text-xs text-neutral-500">
                        Percentage of specialist work a generalist can handle
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="mb-3 text-lg font-semibold text-neutral-700">Overhead</h3>
                  <label class="mb-1 block text-sm font-semibold">Business Overhead (% of labor cost)</label>
                  <div class="mb-4 flex items-center gap-3">
                    <input
                    style='background-color: #E7E5E4;'
                      id="business-overhead"
                      v-model.number="businessOverheadPct"
                      type="range"
                      min="0"
                      max="100"
                      class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E7E5E4] accent-neutral-900"
                    >
                    <span class="min-w-[3rem] text-sm font-medium text-neutral-800">{{ businessOverheadPct }}%</span>
                  </div>
                </div>
              </div>

              <div class="mt-6 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 class="mb-3 text-lg font-semibold text-neutral-700">Specialist Costs</h3>
                  <div class="grid gap-4 md:grid-cols-2">
                    <div>
                      <label class="mb-1 flex items-center text-sm font-semibold">
                        <input v-model="specialistCostType" type="radio" value="hourly" class="mr-2">
                        Hourly Rate
                      </label>
                      <div class="relative">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">$</span>
                        <input
                          v-model.number="specialistRate"
                          type="number"
                          :disabled="specialistCostType === 'salary'"
                          class="w-full rounded-md border border-neutral-300 py-2 pr-2 pl-7 disabled:bg-neutral-100"
                        >
                      </div>
                    </div>
                    <div>
                      <label class="mb-1 flex items-center text-sm font-semibold">
                        <input v-model="specialistCostType" type="radio" value="salary" class="mr-2">
                        Monthly Salary
                      </label>
                      <div class="relative">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">$</span>
                        <input
                          v-model.number="specialistSalary"
                          type="number"
                          :disabled="specialistCostType === 'hourly'"
                          class="w-full rounded-md border border-neutral-300 py-2 pr-2 pl-7 disabled:bg-neutral-100"
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="mb-3 text-lg font-semibold text-neutral-700">Generalist Costs</h3>
                  <div class="grid gap-4 md:grid-cols-2">
                    <div>
                      <label class="mb-1 flex items-center text-sm font-semibold">
                        <input v-model="generalistCostType" type="radio" value="hourly" class="mr-2">
                        Hourly Rate
                      </label>
                      <div class="relative">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">$</span>
                        <input
                          v-model.number="generalistRate"
                          type="number"
                          :disabled="generalistCostType === 'salary'"
                          class="w-full rounded-md border border-neutral-300 py-2 pr-2 pl-7 disabled:bg-neutral-100"
                        >
                      </div>
                    </div>
                    <div>
                      <label class="mb-1 flex items-center text-sm font-semibold">
                        <input v-model="generalistCostType" type="radio" value="salary" class="mr-2">
                        Monthly Salary
                      </label>
                      <div class="relative">
                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">$</span>
                        <input
                          v-model.number="generalistSalary"
                          type="number"
                          :disabled="generalistCostType === 'hourly'"
                          class="w-full rounded-md border border-neutral-300 py-2 pr-2 pl-7 disabled:bg-neutral-100"
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-[#233267]">Financial Impact</h2>

              <div class="grid gap-8 md:grid-cols-3">
                <div>
                  <h3 class="mb-3 text-lg font-semibold text-neutral-700">Monthly Team Costs</h3>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between gap-2">
                      <span class="text-neutral-600">Specialists ({{ team.requiredSpecialists }}):</span>
                      <span class="font-medium">{{ formatMoney(financial.specialistTotalCost) }}</span>
                    </div>
                    <div class="flex justify-between gap-2">
                      <span class="text-neutral-600">Generalists ({{ team.requiredGeneralists }}):</span>
                      <span class="font-medium">{{ formatMoney(financial.generalistTotalCost) }}</span>
                    </div>
                    <div class="flex justify-between gap-2">
                      <span class="text-neutral-600">Overhead:</span>
                      <span class="font-medium">{{ formatMoney(financial.overheadAmount) }}</span>
                    </div>
                    <div class="flex justify-between gap-2 border-t border-neutral-200 pt-2">
                      <span class="font-semibold">Total Monthly Cost:</span>
                      <span class="font-bold">{{ formatMoney(financial.totalCostAmount) }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="mb-3 text-lg font-semibold text-neutral-700">Revenue Analysis</h3>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between gap-2">
                      <span class="text-neutral-600">Monthly Revenue:</span>
                      <span class="font-medium">{{ formatMoney(financial.revenue) }}</span>
                    </div>
                    <div class="flex justify-between gap-2">
                      <span class="text-neutral-600">Monthly Profit:</span>
                      <span class="font-medium">{{ formatMoney(financial.profit) }}</span>
                    </div>
                    <div class="flex justify-between gap-2 border-t border-neutral-200 pt-2">
                      <span class="font-semibold">Profit Margin:</span>
                      <span class="font-bold" :class="profitMarginClass(financial.margin)">
                        {{ Math.round(financial.margin) }}%
                      </span>
                    </div>
                  </div>
                </div>

                <ClientOnly>
                  <div>
                    <h3 class="mb-3 text-lg font-semibold text-neutral-700">Cost Breakdown</h3>
                    <div class="h-64">
                      <canvas ref="financialCanvas" />
                    </div>
                  </div>
                  <template #fallback>
                    <div class="flex h-64 items-center justify-center text-sm text-neutral-500">Loading chart…</div>
                  </template>
                </ClientOnly>
              </div>
            </div>

            <div class="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-[#233267]">Team Composition</h2>

              <div class="grid gap-8 md:grid-cols-3">
                <ClientOnly>
                  <div class="flex items-center justify-center">
                    <div class="h-64 w-full max-w-xs">
                      <canvas ref="teamCanvas" />
                    </div>
                  </div>
                  <template #fallback>
                    <div class="flex h-64 items-center justify-center text-sm text-neutral-500">Loading chart…</div>
                  </template>
                </ClientOnly>

                <div class="flex flex-col justify-center">
                  <div class="mb-6 grid grid-cols-2 gap-4">
                    <div class="rounded-xl border border-neutral-200 p-4 text-center">
                      <p class="mb-1 text-sm text-neutral-600">Specialists</p>
                      <p class="text-2xl font-bold">{{ team.requiredSpecialists }}</p>
                    </div>
                    <div class="rounded-xl border border-neutral-200 p-4 text-center">
                      <p class="mb-1 text-sm text-neutral-600">Generalists</p>
                      <p class="text-2xl font-bold">{{ team.requiredGeneralists }}</p>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col justify-center">
                  <div>
                    <div class="mb-2 flex justify-between text-sm">
                      <span class="font-medium text-neutral-800">Specialist Utilization</span>
                      <span class="font-semibold">{{ team.specialistUtilizationPct }}%</span>
                    </div>
                    <div class="mb-4 h-2.5 w-full rounded-full bg-neutral-200">
                      <div
                        class="h-2.5 rounded-full transition-all"
                        :class="specialistBarClass(team.specialistUtilizationPct)"
                        :style="{ width: `${Math.min(team.specialistUtilizationPct, 100)}%` }"
                      />
                    </div>

                    <div class="mb-2 flex justify-between text-sm">
                      <span class="font-medium text-neutral-800">Team Utilization</span>
                      <span class="font-semibold">{{ team.teamUtilizationPct }}%</span>
                    </div>
                    <div class="mb-4 h-2.5 w-full rounded-full bg-neutral-200">
                      <div
                        class="h-2.5 rounded-full transition-all"
                        :class="teamBarClass(team.teamUtilizationPct)"
                        :style="{ width: `${Math.min(team.teamUtilizationPct, 100)}%` }"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-[#233267]">Break-Even Analysis</h2>

              <div class="grid gap-8 md:grid-cols-2">
                <ClientOnly>
                  <div class="h-64">
                    <canvas ref="breakevenCanvas" />
                  </div>
                  <template #fallback>
                    <div class="flex h-64 items-center justify-center text-sm text-neutral-500">Loading chart…</div>
                  </template>
                </ClientOnly>

                <div class="flex items-center">
                  <div class="grid w-full gap-6 md:grid-cols-3">
                    <div class="rounded-xl border border-neutral-200 p-4 text-center">
                      <p class="mb-1 text-sm text-neutral-600">Break-Even Point</p>
                      <p class="text-2xl font-bold">{{ breakEven.breakEvenPoint }}</p>
                      <p class="text-xs text-neutral-500">across all packages</p>
                    </div>
                    <div class="rounded-xl border border-neutral-200 p-4 text-center">
                      <p class="mb-1 text-sm text-neutral-600">Current Buffer</p>
                      <p class="text-2xl font-bold" :class="bufferClass(breakEven.buffer)">
                        {{ breakEven.buffer > 0 ? `+${breakEven.buffer}` : breakEven.buffer }}
                      </p>
                      <p class="text-xs text-neutral-500">above break-even</p>
                    </div>
                    <div class="rounded-xl border border-neutral-200 p-4 text-center">
                      <p class="mb-1 text-sm text-neutral-600">Cost Per Client</p>
                      <p class="text-2xl font-bold text-orange-700">
                        {{ formatMoney(breakEven.avgCostPerClient) }}
                      </p>
                      <p class="text-xs text-neutral-500">monthly average</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

  </div>
</template>
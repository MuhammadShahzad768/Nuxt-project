<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
    
      <section>
        <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Package Optimizer for productized Agencies</h1>
        <p class="mt-4 text-lg text-stone-600"> Determine the optimal mix of different service packages to maximize profit</p>
      </div>
        <div class="mx-auto max-w-5xl overflow-hidden p-6 md:p-8">
          <!-- Team capacity -->
          <div class="mb-8 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 class="mb-5 border-b border-stone-100 pb-2 text-xl font-bold text-[#233267]">Team Capacity</h2>
            <div class="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
              <div class="lg:col-span-3">
                <label for="hoursSlider" class="mb-2 block text-sm font-semibold">Available Team Hours per Month</label>
                <div class="mt-2 sm:mt-3">
                  <div class="mb-2 flex items-center justify-between">
                    <span v-for="t in [0, 1250, 2500, 3750, 5000]" :key="t" class="text-xs text-stone-500">{{ t }}</span>
                  </div>
                  <input
                    id="hoursSlider"
                    v-model.number="availableHours"
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-[#233267]"
                  />
                  <div class="mt-2 text-center">
                    <span class="text-sm font-medium text-[#233267]">{{ availableHours }} hours</span>
                  </div>
                </div>
              </div>
              <div class="lg:col-span-1">
                <label for="availableHours" class="mb-2 block text-sm font-semibold">Current Capacity</label>
                <div class="relative mt-2 sm:mt-3">
                  <input
                    id="availableHours"
                    v-model.number="availableHours"
                    type="number"
                    min="0"
                    max="5000"
                    class="w-full rounded-lg border border-stone-300 py-2 pl-3 pr-12 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    placeholder="0"
                  />
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-stone-500">hrs</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Packages -->
          <div class="mb-8 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <div class="mb-5 flex flex-col gap-3 border-b border-stone-100 pb-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 class="text-xl font-bold text-[#233267]">Package Configuration</h2>
              <button type="button" class="inline-flex items-center border border-transparent text-sm font-medium leading-4 text-[#233267] hover:text-[#233267]" @click="addPackage">
                + Add Package
              </button>
            </div>

            <div class="flex gap-2 flex-wrap">
              <div
                v-for="pkg in packages"
                :key="pkg.id"
                class="rounded-xl border border-stone-200 p-4 shadow-sm max-w-[32%] w-full"
              >
                <div class="mb-3 flex items-center justify-between border-b border-stone-100 pb-2">
                  <h3 class="font-medium text-stone-800">Package {{ pkg.name }}</h3>
                  <button
                    type="button"
                    class="rounded-full p-1 transition-colors hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
                    :disabled="packages.length <= 1"
                    aria-label="Remove package"
                    @click="removePackage(pkg.id)"
                  >
                    <TrashIcon />
                  </button>
                </div>
                <div class="space-y-4">
                  <div>
                    <label class="mb-1.5 block text-sm font-semibold" :for="`${pkg.id}-price`">Monthly Price ($)</label>
                    <div class="relative">
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                      <input
                        :id="`${pkg.id}-price`"
                        v-model.number="pkg.price"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 py-2 pl-7 pr-3 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="mb-1.5 block text-sm font-semibold" :for="`${pkg.id}-hours`">Hours per Month</label>
                    <input
                      :id="`${pkg.id}-hours`"
                      v-model.number="pkg.hours"
                      type="number"
                      min="0"
                      class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label class="mb-1.5 block text-sm font-semibold" :for="`${pkg.id}-margin`">Profit Margin (%)</label>
                    <div class="relative">
                      <input
                        :id="`${pkg.id}-margin`"
                        v-model.number="pkg.margin"
                        type="number"
                        min="0"
                        max="100"
                        class="w-full rounded-lg border border-stone-300 py-2 pl-3 pr-10 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                        placeholder="0"
                      />
                      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-stone-500">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-8 flex justify-center">
              <button
                type="button"
                class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
                @click="optimizePackageMix"
              >
                Find Optimal Mix
              </button>
            </div>
          </div>

          <!-- Results -->
          <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 class="mb-5 border-b border-stone-100 pb-2 text-xl font-bold text-[#233267]">Optimization Results</h2>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <h3 class="mb-3 text-lg font-medium text-stone-800">Optimal Package Mix</h3>
                <div class="rounded-xl border border-stone-200 p-4">
                  <div class="space-y-3">
                    <div v-for="r in opt.packageResults" :key="r.name" class="flex items-center justify-between">
                      <span class="text-sm font-semibold">Package {{ r.name }} Clients:</span>
                      <span class="text-lg font-bold text-stone-900">{{ r.count }}</span>
                    </div>
                  </div>
                  <div class="mt-4 border-t border-stone-100 pt-3">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-semibold">Total Hours Used:</span>
                      <span class="text-lg font-bold text-stone-900">
                        {{ Math.round(opt.totalHoursUsed).toLocaleString() }} / {{ availableHours.toLocaleString() }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="mb-3 text-lg font-medium text-stone-800">Financial Impact</h3>
                <div class="rounded-xl border border-stone-200 p-4">
                  <div class="space-y-3">
                    <div class="flex items-center justify-between p-1">
                      <span class="text-sm font-semibold">Monthly Revenue:</span>
                      <span class="text-lg font-bold text-stone-900">${{ Math.round(opt.totalRevenue).toLocaleString() }}</span>
                    </div>
                    <div class="flex items-center justify-between p-1">
                      <span class="text-sm font-semibold">Monthly Profit:</span>
                      <span class="text-lg font-bold text-emerald-600">${{ Math.round(opt.totalProfit).toLocaleString() }}</span>
                    </div>
                    <div class="flex items-center justify-between p-1">
                      <span class="text-sm font-semibold">Resource Utilization:</span>
                      <span class="text-lg font-bold" :class="utilizationColorClass">{{ opt.resourceUtilization.toFixed(1) }}%</span>
                    </div>
                    <div class="mt-1 border-t border-stone-100 pt-3">
                      <div class="flex items-center justify-between p-1">
                        <span class="text-sm font-semibold">Profit per Hour:</span>
                        <span class="text-lg font-bold text-emerald-600">${{ opt.profitPerHour.toFixed(2) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-xl border border-stone-200 p-5 lg:col-span-2">
                <h3 class="mb-4 text-lg font-medium text-stone-800">Package Profit Contribution Chart</h3>
                <div class="h-72">
                  <canvas ref="chartCanvas" />
                </div>
              </div>
            </div>

            <div class="mt-6 rounded-xl border border-[#233267] bg-[#DFDFDF] p-4 ">
              <p>
                <strong class='text-[#233267]'>Note</strong>
                : This optimizer uses a balanced approach that first ensures diversity (minimum 3 clients per package when possible) and then allocates remaining resources based on balanced profit-per-hour efficiency with diminishing returns for each package type. For more complex business constraints, consider consulting with a business analyst.
              </p>
            </div>
          </div>
        </div>
      </section>

  </div>
</template>

<script setup lang="ts">
import breadcrumb from '~/components/Sections/breadcrumb.vue'
definePageMeta({ layout: 'tools' })
import { computed, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Chart, ArcElement, Tooltip, Legend, PieController, type Chart as ChartJS } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend, PieController)

const PACKAGE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const CHART_COLORS = [
  'rgba(59, 130, 246, 0.8)',
  'rgba(16, 185, 129, 0.8)',
  'rgba(245, 158, 11, 0.8)',
  'rgba(239, 68, 68, 0.8)',
  'rgba(139, 92, 246, 0.8)',
  'rgba(249, 115, 22, 0.8)',
  'rgba(20, 184, 166, 0.8)',
  'rgba(217, 70, 239, 0.8)',
  'rgba(79, 70, 229, 0.8)',
  'rgba(234, 88, 12, 0.8)',
]

type Pkg = { id: string; name: string; price: number; hours: number; margin: number }

let idCounter = 0
function newId() {
  return `package-${idCounter++}`
}

const availableHours = ref(500)

const packages = ref<Pkg[]>([
  { id: newId(), name: 'A', price: 3500, hours: 25, margin: 45 },
  { id: newId(), name: 'B', price: 1500, hours: 12, margin: 35 },
  { id: newId(), name: 'C', price: 5000, hours: 40, margin: 45 },
])

type OptPkg = Pkg & { profit: number; profitPerHour: number; balanceFactor?: number; effectiveProfitPerHour?: number }

function getNextPackageLetter(): string {
  for (let i = 0; i < PACKAGE_LETTERS.length; i++) {
    const letter = PACKAGE_LETTERS[i]!
    const exists = packages.value.some((p) => p.name === letter)
    if (!exists) return letter
  }
  return 'Package ' + (packages.value.length + 1)
}

function addPackage() {
  const letter = getNextPackageLetter()
  packages.value.push({ id: newId(), name: letter, price: 2000, hours: 20, margin: 40 })
}

function removePackage(id: string) {
  if (packages.value.length <= 1) {
    window.alert('You must have at least one package defined.')
    return
  }
  packages.value = packages.value.filter((p) => p.id !== id)
}

function optimizePackageMix() {
  /* reactive opt + chart driven by computed/watch */
}

type OptRow = { name: string; count: number; profit: number }

const opt = computed(() => {
  const hoursAvail = Math.max(0, Math.floor(availableHours.value || 0))

  const packagesForOptimization: OptPkg[] = packages.value.map((pkg) => {
    const profit = pkg.price * (pkg.margin / 100)
    const profitPerHour = pkg.hours > 0 ? profit / pkg.hours : 0
    return { ...pkg, profit, profitPerHour }
  })

  const minAllocation = 3
  let remainingHours = hoursAvail
  const allocation: Record<string, number> = {}
  packagesForOptimization.forEach((pkg) => {
    allocation[pkg.id] = 0
  })

  for (const pkg of packagesForOptimization) {
    if (pkg.hours <= 0) continue
    const minRequired = Math.min(minAllocation, Math.floor(remainingHours / pkg.hours))
    allocation[pkg.id] = minRequired
    remainingHours -= minRequired * pkg.hours
  }

  packagesForOptimization.sort((a, b) => b.profitPerHour - a.profitPerHour)

  const validPackages = packagesForOptimization.filter((pkg) => pkg.hours > 0)

  while (validPackages.length > 0 && remainingHours > 0) {
    for (const pkg of validPackages) {
      const currentAllocation = allocation[pkg.id]!
      pkg.balanceFactor = Math.pow(0.9, currentAllocation)
      pkg.effectiveProfitPerHour = pkg.profitPerHour * pkg.balanceFactor
    }
    validPackages.sort((a, b) => (b.effectiveProfitPerHour ?? 0) - (a.effectiveProfitPerHour ?? 0))
    const top = validPackages[0]!
    if (remainingHours >= top.hours) {
      allocation[top.id] = (allocation[top.id] ?? 0) + 1
      remainingHours -= top.hours
    } else {
      validPackages.shift()
    }
  }

  let totalHoursUsed = 0
  let totalRevenue = 0
  let totalProfit = 0
  const packageResults: OptRow[] = []
  const profitData: number[] = []
  const profitLabels: string[] = []

  packagesForOptimization.forEach((pkg) => {
    const count = allocation[pkg.id] ?? 0
    const packageRevenue = count * pkg.price
    const packageProfit = count * pkg.profit
    const packageHours = count * pkg.hours
    totalHoursUsed += packageHours
    totalRevenue += packageRevenue
    totalProfit += packageProfit
    packageResults.push({ name: pkg.name, count, profit: packageProfit })
    if (packageProfit > 0) {
      profitData.push(packageProfit)
      profitLabels.push('Package ' + pkg.name)
    }
  })

  const resourceUtilization = hoursAvail > 0 ? (totalHoursUsed / hoursAvail) * 100 : 0
  const profitPerHour = totalHoursUsed > 0 ? totalProfit / totalHoursUsed : 0

  return {
    packageResults,
    totalHoursUsed,
    totalRevenue,
    totalProfit,
    resourceUtilization,
    profitPerHour,
    profitData,
    profitLabels,
  }
})

const utilizationColorClass = computed(() => {
  const u = opt.value.resourceUtilization
  if (u > 95) return 'text-emerald-600'
  if (u > 80) return 'text-rose-600'
  return 'text-yellow-600'
})

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let profitChart: ChartJS<'pie'> | null = null

function buildPieChart(profits: number[], labels: string[]) {
  const ctx = chartCanvas.value?.getContext('2d')
  if (!ctx) return

  profitChart?.destroy()

  if (profits.length === 0) {
    profitChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['No Profit Data'],
        datasets: [{ data: [1], backgroundColor: ['rgba(156, 163, 175, 0.5)'], borderColor: 'rgba(255, 255, 255, 0.8)', borderWidth: 2 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { callbacks: { label: () => 'No profit data available' } },
        },
      },
    })
    return
  }

  const totalProfit = profits.reduce((s, v) => s + v, 0)
  const exactPercentages = profits.map((p) => (totalProfit > 0 ? (p / totalProfit) * 100 : 0))
  const roundedPercentages = exactPercentages.map((p) => parseFloat(p.toFixed(1)))
  const sumAfter = roundedPercentages.reduce((s, v) => s + v, 0)
  let adjusted = [...roundedPercentages]
  if (Math.abs(100 - sumAfter) > 0.01) {
    const err = 100 - sumAfter
    const largestIndex = roundedPercentages.indexOf(Math.max(...roundedPercentages))
    adjusted[largestIndex] = parseFloat((roundedPercentages[largestIndex]! + err).toFixed(1))
  }
  const percentages = adjusted.map((p) => p.toFixed(1))
  const labelsWithPercentages = labels.map((l, i) => `${l} (${percentages[i]}%)`)
  const backgroundColors = profits.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]!)

  profitChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labelsWithPercentages,
      datasets: [
        {
          data: profits,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(255, 255, 255, 0.8)',
          borderWidth: 2,
          hoverOffset: 15,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 12, family: 'system-ui' }, padding: 20 },
        },
        tooltip: {
          callbacks: {
            label: (c) => {
              const value = Number(c.raw) || 0
              return `$${Math.round(value).toLocaleString()} (${percentages[c.dataIndex]}%)`
            },
          },
        },
      },
    },
  })
}

async function refreshChart() {
  await nextTick()
  const { profitData, profitLabels } = opt.value
  buildPieChart(profitData, profitLabels)
}

onMounted(() => {
  refreshChart()
})

watch([opt, availableHours, packages], refreshChart, { deep: true })

onBeforeUnmount(() => {
  profitChart?.destroy()
  profitChart = null
})

const Chevron = () =>
  h('svg', { class: 'mx-2 size-4', xmlns: 'http://www.w3.org/2000/svg', height: '18', width: '18', viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('polyline', { points: '7.5 16.5 14 10 7.5 3.5', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ])

const TrashIcon = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20' }, [
    h('g', { fill: '#212121' }, [
      h('rect', { x: '8', y: '3', width: '4', height: '2', stroke: '#212121', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', fill: '#212121' }),
      h('path', { d: 'm4.299,8l.358,7.149c.079,1.599,1.396,2.851,2.996,2.851h4.695c1.601,0,2.917-1.252,2.996-2.851l.358-7.149H4.299Z', 'stroke-width': '0', fill: '#212121' }),
      h('line', { x1: '17', y1: '5', x2: '3', y2: '5', fill: 'none', stroke: '#212121', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2' }),
    ]),
  ])
</script>
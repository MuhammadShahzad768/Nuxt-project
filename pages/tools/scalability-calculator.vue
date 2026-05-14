<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

type AutomationLevel = 'automated' | 'semi-automated' | 'manual'

type ComponentRow = {
  id: number
  name: string
  automation: AutomationLevel
  timeAllocation: number
  automationCost: number
}

type ScoredComponent = ComponentRow & { constraintPercentage: number }

function constraintPercentage(level: AutomationLevel): number {
  switch (level) {
    case 'automated':
      return 0
    case 'semi-automated':
      return 30
    case 'manual':
      return 100
    default:
      return 0
  }
}

let nextId = 5

const currentDelivery = ref(25)
const targetDelivery = ref(100)

const components = ref<ComponentRow[]>([
  { id: 1, name: 'Content Creation', automation: 'manual', timeAllocation: 40, automationCost: 20000 },
  { id: 2, name: 'Content Distribution', automation: 'semi-automated', timeAllocation: 25, automationCost: 10000 },
  { id: 3, name: 'Analytics', automation: 'automated', timeAllocation: 20, automationCost: 0 },
  { id: 4, name: 'Client Reporting', automation: 'automated', timeAllocation: 15, automationCost: 0 },
])

const errorMessage = ref<string | null>(null)
let errorTimer: ReturnType<typeof setTimeout> | null = null

const showResults = ref(false)
const scalabilityScore = ref(0)
const primaryBottleneckName = ref('-')
const totalInvestment = ref(0)
const chartRows = ref<ScoredComponent[]>([])

const constraintCanvas = ref<HTMLCanvasElement | null>(null)
type ChartJs = import('chart.js').Chart
let constraintChart: ChartJs | null = null

function showError(msg: string) {
  errorMessage.value = msg
  if (errorTimer) clearTimeout(errorTimer)
  errorTimer = setTimeout(() => {
    errorMessage.value = null
    errorTimer = null
  }, 5000)
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      document.getElementById('scalability-error')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }
}

function hideError() {
  errorMessage.value = null
  if (errorTimer) {
    clearTimeout(errorTimer)
    errorTimer = null
  }
}

function addComponent() {
  components.value.push({
    id: nextId++,
    name: '',
    automation: 'manual',
    timeAllocation: 25,
    automationCost: 5000,
  })
}

function removeComponent(id: number) {
  components.value = components.value.filter((c) => c.id !== id)
  if (components.value.length === 0) {
    addComponent()
  }
}

function resetCalculator() {
  currentDelivery.value = 0
  targetDelivery.value = 0
  components.value = []
  addComponent()
  showResults.value = false
  hideError()
  destroyChart()
}

const scoreColorClass = computed(() => {
  const s = scalabilityScore.value
  if (s < 30) return 'text-red-600'
  if (s < 70) return 'text-yellow-600'
  return 'text-emerald-600'
})

const progressBarClass = computed(() => {
  const s = scalabilityScore.value
  if (s < 30) return 'bg-red-600'
  if (s < 70) return 'bg-yellow-500'
  return 'bg-emerald-600'
})

function parseScored(): ScoredComponent[] | null {
  const rows: ScoredComponent[] = []
  let totalTime = 0

  for (const c of components.value) {
    const name = c.name.trim()
    const time = Math.floor(Number(c.timeAllocation) || 0)
    if (!name || time <= 0) {
      showError('Please fill in all component details correctly.')
      return null
    }
    totalTime += time
    rows.push({
      ...c,
      name,
      timeAllocation: time,
      automationCost: Math.max(0, Math.floor(Number(c.automationCost) || 0)),
      constraintPercentage: constraintPercentage(c.automation),
    })
  }

  if (Math.abs(totalTime - 100) > 5) {
    showError(`Time allocation should sum to approximately 100%. Current sum: ${totalTime}%`)
    return null
  }

  return rows
}

async function calculateScalability() {
  const cur = Math.floor(Number(currentDelivery.value) || 0)
  const tgt = Math.floor(Number(targetDelivery.value) || 0)

  if (cur <= 0 || tgt <= 0) {
    showError('Please enter valid delivery volumes greater than zero.')
    return
  }

  if (tgt <= cur) {
    showError('Target delivery should be greater than current delivery.')
    return
  }

  const scored = parseScored()
  if (!scored) return

  hideError()

  let weighted = 0
  for (const c of scored) {
    weighted += (c.constraintPercentage * c.timeAllocation) / 100
  }
  const score = Math.round(100 - weighted)

  const sorted = [...scored].sort(
    (a, b) => b.constraintPercentage * b.timeAllocation - a.constraintPercentage * a.timeAllocation,
  )
  const primary = sorted[0]
  const invest = scored.reduce(
    (sum, c) => sum + (c.constraintPercentage > 0 ? c.automationCost : 0),
    0,
  )

  scalabilityScore.value = score
  primaryBottleneckName.value = primary.name
  totalInvestment.value = invest
  chartRows.value = sorted
  showResults.value = true

  await nextTick()
  await updateConstraintChart(sorted)
}

function destroyChart() {
  constraintChart?.destroy()
  constraintChart = null
}

async function updateConstraintChart(rows: ScoredComponent[]) {
  if (!constraintCanvas.value) return

  const { default: Chart } = await import('chart.js/auto')

  destroyChart()

  const labels = rows.map((c) => c.name)
  const constraintData = rows.map((c) => c.constraintPercentage)
  const backgroundColors = rows.map((c) => {
    if (c.constraintPercentage < 30) return 'rgba(34, 197, 94, 0.6)'
    if (c.constraintPercentage < 70) return 'rgba(234, 179, 8, 0.6)'
    return 'rgba(220, 38, 38, 0.6)'
  })

  constraintChart = new Chart(constraintCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Constraint Level (%)',
          data: constraintData,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((c) => c.replace('0.6', '1')),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, max: 100 },
      },
      plugins: {
        title: { display: true, text: 'Component Constraint Levels' },
      },
    },
  })
}

onMounted(() => {
  setTimeout(() => {
    void calculateScalability()
  }, 500)
})

onBeforeUnmount(() => {
  destroyChart()
  if (errorTimer) clearTimeout(errorTimer)
})
</script>

<template>
  <div class="min-h-screen bg-stone-900 font-sans text-stone-950 antialiased">
    <div class="flex min-h-screen flex-col bg-stone-100">
      <div class="h-20 lg:h-24" />
      <main class="pt-10 text-neutral-900 lg:pt-0">
        <section data-theme="light">
          <div class="mx-auto max-w-4xl px-4 pb-8">
            <nav class="flex items-center justify-center text-sm text-neutral-600">
              <NuxtLink to="/" class="hover:text-red-600">Home</NuxtLink>
              <svg class="mx-2 size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                <g fill="currentColor">
                  <polyline
                    points="7.5 16.5 14 10 7.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </g>
              </svg>
              <NuxtLink to="/tools" class="hover:text-red-600">Tools</NuxtLink>
              <svg class="mx-2 size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                <g fill="currentColor">
                  <polyline
                    points="7.5 16.5 14 10 7.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </g>
              </svg>
              <span>Scalability Assessment Calculator</span>
            </nav>
          </div>

          <header class="mx-auto mb-20 max-w-4xl px-4 text-center">
            <h1 class="text-3xl font-bold tracking-tight md:text-4xl">Scalability Assessment Calculator for productized Agencies</h1>
            <p class="mt-4 text-lg text-neutral-600">
              Determine the long-term value of
              <a
                href="https://wayfront.com/tools/retainer-calculator"
                class="text-red-700 underline hover:text-red-800"
                target="_blank"
                rel="noopener noreferrer"
              >subscription clients</a>
              in your productized agency model.
            </p>
          </header>

          <div class="mx-auto max-w-7xl overflow-hidden p-6 md:p-8">
            <div
              class="my-6 rounded-xl border border-l-4 border-red-600 bg-white p-4 text-neutral-800 shadow-sm"
              role="alert"
            >
              <p class="mt-1 text-sm md:text-base">
                This calculator is configured with realistic automation levels for a modern productized agency. Client Reporting and
                Analytics are fully automated, while Content Creation remains primarily manual.
              </p>
            </div>

            <div
              v-if="errorMessage"
              id="scalability-error"
              class="mb-6 rounded border-l-4 border-red-500 bg-red-100 p-4 text-red-800"
              role="alert"
            >
              <p>{{ errorMessage }}</p>
            </div>

            <div class="mb-10 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <form class="block" @submit.prevent="calculateScalability">
                <div class="mb-8">
                  <h2 class="mb-4 text-xl font-semibold text-neutral-800">Delivery Volume</h2>
                  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label for="current-delivery" class="mb-1 block text-sm font-semibold">
                        Current Delivery (packages/month)
                      </label>
                      <input
                        id="current-delivery"
                        v-model.number="currentDelivery"
                        type="number"
                        min="1"
                        placeholder="e.g., 25"
                        class="w-full rounded-md border border-neutral-300 py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      >
                    </div>
                    <div>
                      <label for="target-delivery" class="mb-1 block text-sm font-semibold">
                        Target Delivery (packages/month)
                      </label>
                      <input
                        id="target-delivery"
                        v-model.number="targetDelivery"
                        type="number"
                        min="1"
                        placeholder="e.g., 100"
                        class="w-full rounded-md border border-neutral-300 py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      >
                    </div>
                  </div>
                </div>

                <div class="mb-8">
                  <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 class="text-xl font-semibold text-neutral-800">Service Components</h2>
                    <button
                      type="button"
                      class="inline-flex items-center rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-neutral-50"
                      @click="addComponent"
                    >
                      <svg class="mr-2 -ml-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Add Component
                    </button>
                  </div>

                  <p class="mb-8 text-sm text-neutral-600 md:mb-12">
                    Break down your service into components and analyze each one's scalability constraint. The total time allocation should
                    sum to 100%.
                  </p>

                  <div class="space-y-6">
                    <div
                      v-for="c in components"
                      :key="c.id"
                      class="rounded-lg border border-neutral-100 p-4 md:border-0 md:p-0"
                    >
                      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div>
                          <label class="mb-1 block text-sm font-semibold">Component Name</label>
                          <input
                            v-model="c.name"
                            type="text"
                            placeholder="e.g., Content Creation"
                            class="w-full rounded-md border border-neutral-300 py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                          >
                        </div>
                        <div>
                          <label class="mb-1 block text-sm font-semibold">Automation Level</label>
                          <select
                            v-model="c.automation"
                            class="w-full rounded-md border border-neutral-300 bg-white py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                          >
                            <option value="automated">Automated (0% constraint)</option>
                            <option value="semi-automated">Semi-automated (30% constraint)</option>
                            <option value="manual">Manual (100% constraint)</option>
                          </select>
                        </div>
                        <div>
                          <label class="mb-1 block text-sm font-semibold">Time Allocation (%)</label>
                          <input
                            v-model.number="c.timeAllocation"
                            type="number"
                            min="1"
                            max="100"
                            class="w-full rounded-md border border-neutral-300 py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                          >
                        </div>
                        <div>
                          <label class="mb-1 block text-sm font-semibold">Est. Automation Cost ($)</label>
                          <input
                            v-model.number="c.automationCost"
                            type="number"
                            min="0"
                            class="w-full rounded-md border border-neutral-300 py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                          >
                        </div>
                      </div>
                      <div class="mt-2 text-right">
                        <button type="button" class="text-sm text-red-600 hover:text-red-800" @click="removeComponent(c.id)">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-end gap-6">
                  <button type="button" class="text-sm text-neutral-500 transition duration-150 hover:text-red-700" @click="resetCalculator">
                    Reset
                  </button>
                  <button type="submit" class="rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white hover:bg-neutral-800">
                    Calculate
                  </button>
                </div>
              </form>
            </div>

            <div v-if="showResults" class="mb-10 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="mb-6 text-2xl font-semibold text-neutral-800">Scalability Assessment Results</h2>

              <div class="mb-8">
                <h3 class="mb-2 text-lg font-semibold">Overall Scalability Score</h3>
                <div class="mb-2 flex items-end">
                  <span class="text-4xl font-bold" :class="scoreColorClass">{{ scalabilityScore }}</span>
                  <span class="ml-1 text-lg text-neutral-500">/100</span>
                </div>
                <div class="h-4 w-full rounded-full bg-neutral-200">
                  <div
                    class="h-4 rounded-full transition-all duration-300"
                    :class="progressBarClass"
                    :style="{ width: `${Math.min(100, Math.max(0, scalabilityScore))}%` }"
                  />
                </div>
                <p class="mt-2 text-sm text-neutral-600">
                  A higher score indicates better scalability. Scores below 50 suggest significant scaling challenges.
                </p>
              </div>

              <div class="mb-8">
                <h3 class="mb-4 text-lg font-semibold">Component Constraints</h3>
                <div class="rounded-md bg-neutral-50 p-4">
                  <ClientOnly>
                    <div class="chart-container h-64">
                      <canvas ref="constraintCanvas" />
                    </div>
                    <template #fallback>
                      <div class="flex h-64 items-center justify-center text-sm text-neutral-500">Loading chart…</div>
                    </template>
                  </ClientOnly>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="mb-4 text-lg font-semibold">Scaling Recommendations</h3>
                <div class="rounded-xl border border-l-4 border-red-600 bg-white p-4 shadow-sm">
                  <p class="mb-2">
                    <strong>Primary bottleneck:</strong>
                    {{ primaryBottleneckName }}
                  </p>
                  <p class="mb-4">
                    <strong>Estimated total investment needed:</strong>
                    ${{ totalInvestment.toLocaleString() }}
                  </p>
                  <p class="text-sm text-neutral-700">
                    Focus on automating your primary bottleneck first. This will provide the greatest immediate improvement to your scalability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
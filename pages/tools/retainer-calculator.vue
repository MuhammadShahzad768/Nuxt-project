<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
       <section>
         <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl"> Retainer Calculator for Agencies</h1>
        <p class="mt-4 text-lg text-stone-600">Calculate optimal
            <a
              href=""
              class="text-[#233267] underline decoration-[#233267] underline-offset-2 hover:text-[#fff]"
              target="_blank"
              rel="noopener noreferrer"
            >
              retainer fees
            </a> based on costs and desired profit margin</p>
      </div>

        <div class="mx-auto max-w-6xl px-5 pb-16">
          <!-- Monthly costs (risk buffer field kept in UI like original save; not used in JS there) -->
          <div class="mb-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-bold text-[#233267]">Monthly Costs &amp; Target Profit</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label for="team-costs" class="mb-1 block text-sm font-semibold">Team Costs ($)</label>
                <input
                  id="team-costs"
                  v-model.number="form.teamCosts"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Total monthly cost of all team members working on this account</p>
              </div>
              <div>
                <label for="tool-costs" class="mb-1 block text-sm font-semibold">Tool Costs ($)</label>
                <input
                  id="tool-costs"
                  v-model.number="form.toolCosts"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Monthly cost of software and tools dedicated to client work</p>
              </div>
              <div>
                <label for="other-expenses" class="mb-1 block text-sm font-semibold">Other Expenses ($)</label>
                <input
                  id="other-expenses"
                  v-model.number="form.otherExpenses"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Additional monthly expenses related to client service</p>
              </div>
              <div>
                <label for="profit-margin" class="mb-1 block text-sm font-semibold">Target Profit Margin (%)</label>
                <input
                  id="profit-margin"
                  v-model.number="form.profitMargin"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Your desired profit margin percentage</p>
              </div>
            </div>
          </div>

          <div class="mb-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-bold text-[#233267]">Additional Factors</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label for="risk-buffer" class="mb-1 block text-sm font-semibold">Risk Buffer (%)</label>
                <input
                  id="risk-buffer"
                  v-model.number="form.riskBuffer"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Additional buffer for unexpected costs or scope changes</p>
              </div>
              <div>
                <label for="estimated-hours" class="mb-1 block text-sm font-semibold">Estimated Hours / Month</label>
                <input
                  id="estimated-hours"
                  v-model.number="form.estimatedHours"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">For hourly rate calculation</p>
              </div>
              <div>
                <label for="client-size" class="mb-1 block text-sm font-semibold">Client Size</label>
                <select
                  id="client-size"
                  v-model="form.clientSize"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                >
                  <option value="small">Small Business</option>
                  <option value="medium">Mid-Market</option>
                  <option value="enterprise">Enterprise</option>
                </select>
                <p class="mt-1 text-xs text-stone-500">Affects package recommendations</p>
              </div>
              <div>
                <label for="service-complexity" class="mb-1 block text-sm font-semibold">Service Complexity</label>
                <select
                  id="service-complexity"
                  v-model="form.serviceComplexity"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <p class="mt-1 text-xs text-stone-500">Complexity of services being provided</p>
              </div>
            </div>
          </div>

          <div class="mb-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-bold text-[#233267]">Scope Creep Protection</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label for="scope-creep-percentage" class="mb-1 block text-sm font-semibold">Expected Scope Creep (%)</label>
                <input
                  id="scope-creep-percentage"
                  v-model.number="form.scopeCreepPercentage"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Percentage of additional unplanned work typically requested</p>
              </div>
              <div>
                <label for="buffer-hours" class="mb-1 block text-sm font-semibold">Buffer Hours</label>
                <input
                  id="buffer-hours"
                  v-model.number="form.bufferHours"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Additional hours reserved for unplanned requests</p>
              </div>
              <div class="col-span-1 md:col-span-2">
                <label class="flex cursor-pointer items-center">
                  <input
                    id="include-scope-protection"
                    v-model="form.includeScopeProtection"
                    type="checkbox"
                    class="h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span class="ml-2 text-sm text-stone-700">Include scope protection in retainer price</span>
                </label>
              </div>
              <div class="col-span-1 rounded-xl border border-[#233267] bg-[#DFDFDF] p-4 md:col-span-2">
                <h3 class="text-sm font-medium text-[#233267]">Why protect against scope creep?</h3>
                <p class="mt-1 text-sm ">
                  Scope creep can reduce your profit margin by up to 40%. Adding a buffer protects your profitability and sets clear boundaries with clients about what's included in the retainer.
                </p>
              </div>
            </div>
          </div>

          <div class="mb-8 flex justify-center">
            <button
              type="button"
              class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#fff] hover:text-[#233267] hover:border-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267] focus:ring-offset-[#233267]"
              @click="onCalculate"
            >
              Calculate Retainer Fee
            </button>
          </div>

          <div v-show="showResults" ref="resultsEl">
            <div class="mb-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-[#233267]">Base Retainer Results</h2>

              <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div class="rounded-xl border border-stone-200 p-4">
                  <h3 class="text-sm font-medium uppercase text-stone-500">Recommended Retainer</h3>
                  <div class="mt-2">
                    <span class="text-2xl font-semibold text-orange-600">{{ formatCurrency(calc.recommendedRetainer) }}</span>
                    <span class="ml-1 text-sm text-stone-500">/month</span>
                  </div>
                </div>
                <div class="rounded-xl border border-stone-200 p-4">
                  <h3 class="text-sm font-medium uppercase text-stone-500">Total Monthly Costs</h3>
                  <div class="mt-2 text-2xl font-semibold text-emerald-600">{{ formatCurrency(calc.totalCostsWithBuffer) }}</div>
                </div>
                <div class="rounded-xl border border-stone-200 p-4">
                  <h3 class="text-sm font-medium uppercase text-stone-500">Monthly Profit</h3>
                  <div class="mt-2 text-2xl font-semibold text-rose-600">{{ formatCurrency(calc.monthlyProfit) }}</div>
                </div>
                <div class="rounded-xl border border-stone-200 p-4">
                  <h3 class="text-sm font-medium uppercase text-stone-500">Hourly Rate Equivalent</h3>
                  <div class="mt-2">
                    <span class="text-2xl font-semibold text-rose-600">{{ formatCurrency(calc.hourlyRate) }}</span>
                    <span class="ml-1 text-sm text-stone-500">/hour</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div class="rounded-xl border border-stone-200 p-4">
                  <h3 class="mb-4 text-lg font-medium text-stone-800">Cost &amp; Profit Breakdown</h3>
                  <div class="h-72">
                    <canvas ref="chartCanvas" />
                  </div>
                </div>
                <div class="rounded-xl border border-stone-200 p-4">
                  <h3 class="mb-4 text-lg font-medium text-stone-800">Retainer Insights</h3>
                  <div class="space-y-3 text-stone-700">
                    <div v-for="(t, i) in insights" :key="i" class="flex items-start">
                      <p>{{ t }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-center">
                <button
                  type="button"
                  class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
                  @click="onGenerateTiers"
                >
                  Generate Pricing Tiers
                </button>
              </div>
            </div>

            <div v-show="showTiers" ref="tiersEl" class="mb-6 pt-8">
              <h2 class="mb-4 text-center text-2xl font-semibold text-stone-800">Recommended Pricing Tiers</h2>
              <p class="mb-6 pb-8 text-center text-stone-600">
                Present these options to your clients to increase deal size and conversion rates
              </p>

              <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div class="transform overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-transform hover:scale-[1.02]">
                  <div class="border-b border-stone-200 bg-stone-50 p-6">
                    <h3 class="text-center text-lg font-bold text-stone-700">Basic</h3>
                    <div class="mt-4 text-center">
                      <span class="text-3xl font-bold text-stone-800">{{ formatCurrency(tierPrices.basic) }}</span>
                      <span class="text-stone-500">/month</span>
                    </div>
                  </div>
                  <div class="p-6">
                    <ul class="space-y-3">
                      <li v-for="(f, i) in tierFeatures.basic" :key="'b' + i" class="flex items-start">
                        <FeatureCheck />
                        <span class="text-stone-600">{{ f }}</span>
                      </li>
                    </ul>
                    <div class="mt-6 border-t border-stone-100 pt-4">
                      <p class="mb-1 text-sm text-stone-500">Profit Margin:</p>
                      <p class="font-medium text-stone-800">{{ tierMargins.basic }}%</p>
                    </div>
                  </div>
                </div>

                <div
                  class="relative mt-0 transform overflow-hidden rounded-xl border-2 border-[#233267] bg-white shadow-md transition-transform hover:scale-[1.02] md:-mt-4"
                >
                  <div class="absolute inset-x-0 top-0 bg-[#233267] px-3 py-1 text-center text-xs font-semibold uppercase tracking-wide text-white">
                    Recommended
                  </div>
                  <div class="border-b border-[#233267] bg-bg-[#ECECEC] p-6 pt-8">
                    <h3 class="text-center text-lg font-bold text-stone-700">Standard</h3>
                    <div class="mt-4 text-center">
                      <span class="text-3xl font-bold text-[#233267]">{{ formatCurrency(tierPrices.standard) }}</span>
                      <span class="text-stone-500">/month</span>
                    </div>
                  </div>
                  <div class="p-6">
                    <ul class="space-y-3">
                      <li v-for="(f, i) in tierFeatures.standard" :key="'s' + i" class="flex items-start">
                        <FeatureCheck />
                        <span class="text-stone-600">{{ f }}</span>
                      </li>
                    </ul>
                    <div class="mt-6 border-t border-stone-100 pt-4">
                      <p class="mb-1 text-sm text-stone-500">Profit Margin:</p>
                      <p class="font-medium text-[#233267]">{{ tierMargins.standard }}%</p>
                    </div>
                  </div>
                </div>

                <div class="transform overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-transform hover:scale-[1.02]">
                  <div class="border-b border-stone-200 bg-stone-50 p-6">
                    <h3 class="text-center text-lg font-bold text-stone-700">Premium</h3>
                    <div class="mt-4 text-center">
                      <span class="text-3xl font-bold text-stone-800">{{ formatCurrency(tierPrices.premium) }}</span>
                      <span class="text-stone-500">/month</span>
                    </div>
                  </div>
                  <div class="p-6">
                    <ul class="space-y-3">
                      <li v-for="(f, i) in tierFeatures.premium" :key="'p' + i" class="flex items-start">
                        <FeatureCheck />
                        <span class="text-stone-600">{{ f }}</span>
                      </li>
                    </ul>
                    <div class="mt-6 border-t border-stone-100 pt-4">
                      <p class="mb-1 text-sm text-stone-500">Profit Margin:</p>
                      <p class="font-medium text-stone-800">{{ tierMargins.premium }}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-8 rounded-lg border border-stone-200 bg-stone-50 p-6">
                <h3 class="mb-4 text-lg font-bold text-[#233267]">Tiered Pricing Strategy Tips</h3>
                <ul class="space-y-3 text-stone-700">
                  <li>Position the Standard package as the best value and highlight it visually.</li>
                  <li>Make sure each tier has clear differentiation in both features and value.</li>
                  <li>Include the Premium tier even if few clients choose it – it makes the Standard tier look more attractive.</li>
                  <li>Customize the feature descriptions based on your specific services and client needs.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    
  </div>
  <Faqs/>
  <Ready/>
</template>

<script setup lang="ts">
import Ready from '~/components/Sections/Ready.vue'
import Faqs from '~/components/Sections/Faqs.vue'
import breadcrumb from '~/components/Sections/breadcrumb.vue'
definePageMeta({ layout: 'tools' })
import { computed, nextTick, reactive, ref, h } from 'vue'
import { Chart, ArcElement, Tooltip, Legend, DoughnutController, type Chart as ChartJS } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend, DoughnutController)

const FeatureCheck = () =>
  h(
    'svg',
    {
      class: 'mr-2 size-5 shrink-0 text-[#233267]',
      xmlns: 'http://www.w3.org/2000/svg',
      height: '18',
      width: '18',
      viewBox: '0 0 20 20',
      fill: 'none',
      stroke: 'currentColor',
    },
    [
      h('polyline', {
        points: '4 11 8 15 16 5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
      }),
    ],
  )

const form = reactive({
  teamCosts: 5000,
  toolCosts: 750,
  otherExpenses: 500,
  profitMargin: 40,
  riskBuffer: 10,
  estimatedHours: 40,
  clientSize: 'medium' as 'small' | 'medium' | 'enterprise',
  serviceComplexity: 'medium' as 'low' | 'medium' | 'high',
  scopeCreepPercentage: 15,
  bufferHours: 6,
  includeScopeProtection: true,
})

const showResults = ref(false)
const showTiers = ref(false)
const resultsEl = ref<HTMLElement | null>(null)
const tiersEl = ref<HTMLElement | null>(null)
const chartCanvas = ref<HTMLCanvasElement | null>(null)
let breakdownChart: ChartJS<'doughnut'> | null = null

const calc = reactive({
  recommendedRetainer: 0,
  totalCostsWithBuffer: 0,
  monthlyProfit: 0,
  hourlyRate: 0,
  scopeCreepBufferCost: 0,
  teamCosts: 0,
  toolCosts: 0,
  otherExpenses: 0,
})

function formatCurrency(value: number) {
  return (
    '$' +
    value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  )
}

function runCalculation() {
  const teamCosts = form.teamCosts || 0
  const toolCosts = form.toolCosts || 0
  const otherExpenses = form.otherExpenses || 0
  const profitMargin = form.profitMargin || 0
  const estimatedHours = form.estimatedHours || 0
  const scopeCreepPercentage = form.scopeCreepPercentage || 0
  const bufferHours = form.bufferHours || 0

  const totalCosts = teamCosts + toolCosts + otherExpenses
  const hourlyTeamCost = estimatedHours > 0 ? teamCosts / estimatedHours : 0
  const scopeCreepBufferCost = form.includeScopeProtection
    ? hourlyTeamCost * bufferHours + totalCosts * (scopeCreepPercentage / 100)
    : 0
  const totalCostsWithBuffer = totalCosts + scopeCreepBufferCost

  const denom = 1 - profitMargin / 100
  const recommendedRetainer = denom <= 0 ? totalCostsWithBuffer : totalCostsWithBuffer / denom
  const monthlyProfit = recommendedRetainer - totalCostsWithBuffer
  const hourlyRate = estimatedHours > 0 ? recommendedRetainer / estimatedHours : 0

  calc.teamCosts = teamCosts
  calc.toolCosts = toolCosts
  calc.otherExpenses = otherExpenses
  calc.scopeCreepBufferCost = scopeCreepBufferCost
  calc.totalCostsWithBuffer = totalCostsWithBuffer
  calc.recommendedRetainer = recommendedRetainer
  calc.monthlyProfit = monthlyProfit
  calc.hourlyRate = hourlyRate
}

const insights = computed(() => {
  const {
    hourlyRate,
    profitMargin,
    scopeCreepBufferCost,
    totalCostsWithBuffer,
    recommendedRetainer,
  } = calc
  const list: string[] = []

  if (hourlyRate < 100) {
    list.push(
      `Your hourly equivalent rate of ${formatCurrency(hourlyRate)} is below the industry average. Consider increasing your retainer or reducing allocated hours.`,
    )
  } else if (hourlyRate > 250) {
    list.push(
      `Your hourly equivalent rate of ${formatCurrency(hourlyRate)} is excellent. Ensure you're delivering premium value to justify this rate.`,
    )
  } else {
    list.push(`Your hourly equivalent rate of ${formatCurrency(hourlyRate)} is within industry norms.`)
  }

  list.push(`Your profit margin of ${profitMargin}% is healthy for an agency business.`)

  if (scopeCreepBufferCost > 0 && totalCostsWithBuffer > 0) {
    const bufferPercentage = ((scopeCreepBufferCost / totalCostsWithBuffer) * 100).toFixed(1)
    list.push(
      `Your scope creep protection adds ${formatCurrency(scopeCreepBufferCost)} (${bufferPercentage}%) to your costs, safeguarding your profit margin.`,
    )
  }

  const annualRevenue = recommendedRetainer * 12
  list.push(`This retainer will generate ${formatCurrency(annualRevenue)} in annual revenue from this client.`)

  return list
})

function createBreakdownChart() {
  const ctx = chartCanvas.value?.getContext('2d')
  if (!ctx) return

  breakdownChart?.destroy()

  const { teamCosts, toolCosts, otherExpenses, scopeCreepBufferCost, monthlyProfit } = calc

  breakdownChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Team Costs', 'Tool Costs', 'Other Expenses', 'Scope Creep Buffer', 'Profit'],
      datasets: [
        {
          data: [teamCosts, toolCosts, otherExpenses, scopeCreepBufferCost, monthlyProfit],
          backgroundColor: [
            'rgba(79, 70, 229, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(139, 92, 246, 0.7)',
          ],
          borderColor: ['rgb(79, 70, 229)', 'rgb(59, 130, 246)', 'rgb(16, 185, 129)', 'rgb(245, 158, 11)', 'rgb(139, 92, 246)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } },
        tooltip: {
          callbacks: {
            label(ctx) {
              const value = Number(ctx.raw) || 0
              const data = (ctx.dataset.data as number[]) || []
              const total = data.reduce((a, b) => a + b, 0)
              const percentage = total > 0 ? Math.round((value / total) * 100) : 0
              const label = ctx.label || ''
              return `${label}: ${formatCurrency(value)} (${percentage}%)`
            },
          },
        },
      },
    },
  })
}

async function onCalculate() {
  runCalculation()
  showResults.value = true
  showTiers.value = false
  await nextTick()
  createBreakdownChart()
  resultsEl.value?.scrollIntoView({ behavior: 'smooth' })
}

const tierPrices = reactive({ basic: 0, standard: 0, premium: 0 })
const tierMargins = reactive({ basic: '0', standard: '0', premium: '0' })
const tierFeatures = reactive({ basic: [] as string[], standard: [] as string[], premium: [] as string[] })

function marginPct(price: number, cost: number) {
  return price > 0 ? (((price - cost) / price) * 100).toFixed(1) : '0.0'
}

async function onGenerateTiers() {
  if (calc.recommendedRetainer <= 0) return

  const recommendedRetainer = Math.round(calc.recommendedRetainer)
  const totalCosts = calc.totalCostsWithBuffer

  tierPrices.basic = Math.round(recommendedRetainer * 0.8)
  tierPrices.standard = recommendedRetainer
  tierPrices.premium = Math.round(recommendedRetainer * 1.5)

  const basicCost = Math.round(totalCosts * 0.9)
  const standardCost = totalCosts
  const premiumCost = Math.round(totalCosts * 1.2)

  tierMargins.basic = marginPct(tierPrices.basic, basicCost)
  tierMargins.standard = marginPct(tierPrices.standard, standardCost)
  tierMargins.premium = marginPct(tierPrices.premium, premiumCost)

  const { basic, standard, premium } = buildTierFeatures(form.clientSize, form.serviceComplexity)
  tierFeatures.basic = basic
  tierFeatures.standard = standard
  tierFeatures.premium = premium

  showTiers.value = true
  await nextTick()
  tiersEl.value?.scrollIntoView({ behavior: 'smooth' })
}

function buildTierFeatures(clientSize: string, serviceComplexity: string) {
  let basicFeatures: string[] = []
  let standardFeatures: string[] = []
  let premiumFeatures: string[] = []

  if (serviceComplexity === 'low') {
    basicFeatures = ['Monthly strategy planning', 'Implementation of 1 core service', 'Basic reporting', 'Email support']
    standardFeatures = [
      'Monthly strategy planning',
      'Implementation of 2 core services',
      'Detailed monthly reporting',
      'Email & scheduled call support',
      'Quarterly performance reviews',
    ]
    premiumFeatures = [
      'Comprehensive strategy planning',
      'Implementation of all core services',
      'Advanced reporting with insights',
      'Priority support via dedicated manager',
      'Monthly performance reviews',
      'Quarterly business impact analysis',
    ]
  } else if (serviceComplexity === 'medium') {
    basicFeatures = ['Bi-weekly strategy planning', 'Implementation of 2 core services', 'Standard reporting', 'Email support within 48 hours']
    standardFeatures = [
      'Weekly strategy planning',
      'Implementation of 3 core services',
      'Comprehensive reporting dashboard',
      'Email & phone support within 24 hours',
      'Monthly performance reviews',
    ]
    premiumFeatures = [
      'Weekly strategy planning with leadership',
      'Implementation of all services with priority',
      'Custom reporting & analytics dashboard',
      'Priority support with dedicated team',
      'Bi-weekly performance reviews',
      'Quarterly business consulting',
      'Access to beta/advanced features',
    ]
  } else {
    basicFeatures = ['Weekly strategy planning', 'Implementation of 2 core services', 'Regular performance reporting', 'Email support with 24hr response']
    standardFeatures = [
      'Weekly strategy & execution planning',
      'Implementation of 4 core services',
      'Comprehensive analytics & reporting',
      'Same-day email & phone support',
      'Bi-weekly performance reviews',
      'Basic consulting services',
    ]
    premiumFeatures = [
      'Daily strategy & execution planning',
      'Implementation of all services with priority',
      'Real-time analytics & custom dashboard',
      '24/7 priority support with dedicated team',
      'Weekly performance & optimization reviews',
      'Monthly executive briefings',
      'Strategic consulting & roadmapping',
      'Competitive analysis & insights',
    ]
  }

  if (clientSize === 'enterprise') {
    standardFeatures = [...standardFeatures, 'Basic compliance support']
    premiumFeatures = [...premiumFeatures, 'Full compliance & regulatory support', 'Multi-department coordination']
  } else if (clientSize === 'small') {
    basicFeatures = basicFeatures.slice(0, 3)
    standardFeatures = standardFeatures.slice(0, 4)
    premiumFeatures = premiumFeatures.slice(0, 5)
  }

  return { basic: basicFeatures, standard: standardFeatures, premium: premiumFeatures }
}
</script>
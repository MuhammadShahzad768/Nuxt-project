<script setup lang="ts">
import Faqs from '~/components/Sections/Faqs.vue'
import Ready from '~/components/Sections/Ready.vue'

import { computed, reactive, ref, watch } from 'vue'
import breadcrumb from '~/components/Sections/breadcrumb.vue'
definePageMeta({ layout: 'tools' })
type Package = {
  id: number
  name: string
  price: number
  cost: number
  margin: number
}

const packages = ref<Package[]>([])

const draft = reactive({
  name: '',
  price: '' as number | '',
  cost: '' as number | '',
})

const efficiencyGainPct = ref(25)
const targetDiscountPct = ref(10)

const estimatedSales = ref(10)
const timePeriod = ref<'monthly' | 'quarterly' | 'yearly'>('yearly')

const hasCalculated = ref(false)

const showCalculateBtn = computed(() => packages.value.length >= 2)

type BundleCalc = {
  totalPrice: number
  totalCost: number
  avgMargin: number
  bundlePrice: number
  bundleCost: number
  bundleMargin: number
  appliedDiscountPct: number
  efficiencyGainPct: number
  bundleProfit: number
  individualProfit: number
  recommendation: string
  analysis: 'more' | 'less' | 'equal'
  maxViableDiscount?: number
  profitAdvantage?: number
  breakEvenDiscount?: string
  breakEvenEfficiency?: string
  profitGap?: number
}

const bundleCalc = ref<BundleCalc | null>(null)

function formatMoney(n: number) {
  return `$${n.toFixed(2)}`
}

function addPackage(name: string, price: number, cost: number) {
  const margin = price > 0 ? ((price - cost) / price) * 100 : 0
  packages.value.push({
    id: Date.now(),
    name,
    price,
    cost,
    margin,
  })
}

function onAddPackage(e: Event) {
  e.preventDefault()
  const name = draft.name.trim()
  const price = Number(draft.price)
  const cost = Number(draft.cost)
  if (!name || Number.isNaN(price) || Number.isNaN(cost)) return
  addPackage(name, price, cost)
  draft.name = ''
  draft.price = ''
  draft.cost = ''
}

function removePackage(id: number) {
  packages.value = packages.value.filter((p) => p.id !== id)
  if (packages.value.length === 0) {
    hasCalculated.value = false
    bundleCalc.value = null
  }
}

function loadSampleData() {
  packages.value = []
  hasCalculated.value = false
  bundleCalc.value = null
  addPackage('SEO Package', 1500, 900)
  addPackage('Content Marketing', 2000, 1200)
  efficiencyGainPct.value = 25
  targetDiscountPct.value = 10
  calculateBundlePricing()
}

function calculateBundlePricing() {
  if (packages.value.length < 2) return

  const efficiencyGain = Number(efficiencyGainPct.value) / 100
  const targetDiscount = Number(targetDiscountPct.value) / 100

  const totalPrice = packages.value.reduce((s, p) => s + p.price, 0)
  const totalCost = packages.value.reduce((s, p) => s + p.cost, 0)
  const avgMargin = packages.value.reduce((s, p) => s + p.margin, 0) / packages.value.length

  const costReduction = totalCost * efficiencyGain
  const bundleCost = totalCost - costReduction
  const bundlePrice = totalPrice * (1 - targetDiscount)
  const bundleMargin = bundlePrice > 0 ? ((bundlePrice - bundleCost) / bundlePrice) * 100 : 0

  const bundleProfit = bundlePrice - bundleCost
  const individualProfit = totalPrice - totalCost

  let recommendation = ''
  if (bundleMargin > avgMargin) {
    recommendation = `Recommended: Your bundle price of ${formatMoney(bundlePrice)} provides a ${(targetDiscount * 100).toFixed(1)}% discount to clients while increasing your profit margin from ${avgMargin.toFixed(1)}% to ${bundleMargin.toFixed(1)}%. This is a win-win for both you and your clients.`
  } else if (bundleMargin > 0) {
    recommendation = `Caution: While your bundle is profitable at a ${bundleMargin.toFixed(1)}% margin, it's lower than your average individual package margin of ${avgMargin.toFixed(1)}%. Consider reducing the discount or increasing the efficiency gain.`
  } else {
    recommendation = `Warning: Your bundle is not profitable at the current discount rate of ${(targetDiscount * 100).toFixed(1)}%. Reduce the discount or increase your delivery efficiency to make this bundle viable.`
  }

  const revenueLoss = totalPrice * targetDiscount
  const costSavings = totalCost * efficiencyGain
  const profitGap = Math.abs(individualProfit - bundleProfit)

  let analysis: BundleCalc['analysis'] = 'equal'
  let maxViableDiscount: number | undefined
  let profitAdvantage: number | undefined
  let breakEvenDiscount: string | undefined
  let breakEvenEfficiency: string | undefined

  if (bundleProfit > individualProfit) {
    analysis = 'more'
    const additionalDiscountRoom = (costSavings - revenueLoss) / totalPrice
    maxViableDiscount = (targetDiscount + additionalDiscountRoom) * 100
    profitAdvantage = bundleProfit - individualProfit
  } else if (bundleProfit < individualProfit) {
    analysis = 'less'
    breakEvenDiscount = ((costSavings / totalPrice) * 100).toFixed(1)
    breakEvenEfficiency = ((revenueLoss / totalCost) * 100).toFixed(1)
  } else {
    analysis = 'equal'
  }

  bundleCalc.value = {
    totalPrice,
    totalCost,
    avgMargin,
    bundlePrice,
    bundleCost,
    bundleMargin,
    appliedDiscountPct: targetDiscount * 100,
    efficiencyGainPct: efficiencyGain * 100,
    bundleProfit,
    individualProfit,
    recommendation,
    analysis,
    maxViableDiscount,
    profitAdvantage,
    breakEvenDiscount,
    breakEvenEfficiency,
    profitGap,
  }
  hasCalculated.value = true
}

const projections = computed(() => {
  if (!bundleCalc.value || !hasCalculated.value) return null
  const sales = Math.max(0, Math.floor(Number(estimatedSales.value) || 0))
  const { bundlePrice, bundleCost, totalPrice, totalCost } = bundleCalc.value

  const bundleTotalRevenue = bundlePrice * sales
  const bundleTotalCosts = bundleCost * sales
  const bundleTotalProfit = bundleTotalRevenue - bundleTotalCosts
  const bundleROI = bundleTotalCosts > 0 ? (bundleTotalProfit / bundleTotalCosts) * 100 : 0

  const individualTotalRevenue = totalPrice * sales
  const individualTotalCosts = totalCost * sales
  const individualTotalProfit = individualTotalRevenue - individualTotalCosts
  const individualROI =
    individualTotalCosts > 0 ? (individualTotalProfit / individualTotalCosts) * 100 : 0

  const profitDifference = bundleTotalProfit - individualTotalProfit
  const profitPercentChange =
    individualTotalProfit !== 0 ? (profitDifference / Math.abs(individualTotalProfit)) * 100 : 0

  let timePeriodText = 'year'
  if (timePeriod.value === 'monthly') timePeriodText = 'month'
  if (timePeriod.value === 'quarterly') timePeriodText = 'quarter'

  let projectionSummary = ''
  if (profitDifference > 0) {
    projectionSummary = `With ${sales} bundle sales per ${timePeriodText}, you'll make an additional $${Math.abs(profitDifference).toFixed(2)} profit (${Math.abs(profitPercentChange).toFixed(1)}% more) compared to selling the same packages individually.`
  } else if (profitDifference < 0) {
    projectionSummary = `Warning: With ${sales} bundle sales per ${timePeriodText}, you'll lose $${Math.abs(profitDifference).toFixed(2)} in profit (${Math.abs(profitPercentChange).toFixed(1)}% less) compared to selling the same packages individually.`
  } else {
    projectionSummary = `With ${sales} bundle sales per ${timePeriodText}, your profit remains the same as selling packages individually.`
  }

  return {
    sales,
    timePeriodText,
    bundleTotalRevenue,
    bundleTotalCosts,
    bundleTotalProfit,
    bundleROI,
    individualTotalRevenue,
    individualTotalCosts,
    individualTotalProfit,
    individualROI,
    profitDifference,
    projectionSummary,
  }
})

watch([estimatedSales, timePeriod, bundleCalc], () => {
  /* projections computed; no-op hook optional */
})
</script>

<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
     <section >
           <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Bundle Pricing Calculator for productized Agencies</h1>
        <p class="mt-4 text-lg text-stone-600">Determine optimal pricing for bundled service packages based on delivery efficiency gains and cost reduction.</p>
      </div>

          <div class="mb-4 flex justify-center px-4">
            <button
              type="button"
              class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
              @click="loadSampleData"
            >
              Load Sample Agency Scenario
            </button>
          </div>

          <div class="container mx-auto max-w-6xl px-4 py-8">
            <div class="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-[#233267]">1. Add Your Service Packages</h2>

              <form class="mb-6 grid gap-4 md:grid-cols-3" @submit="onAddPackage">
                <div>
                  <label class="mb-1 block text-sm font-semibold">Package Name</label>
                  <input
                    v-model="draft.name"
                    type="text"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    placeholder="e.g. SEO Package"
                    required
                  >
                </div>
                <div>
                  <label class="mb-1 block text-sm font-semibold">Standalone Price ($)</label>
                  <input
                    v-model.number="draft.price"
                    type="number"
                    min="0"
                    step="0.01"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    placeholder="e.g. 1500"
                    required
                  >
                </div>
                <div>
                  <label class="mb-1 block text-sm font-semibold">Delivery Cost ($)</label>
                  <input
                    v-model.number="draft.cost"
                    type="number"
                    min="0"
                    step="0.01"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    placeholder="e.g. 1000"
                    required
                  >
                </div>
                <div class="md:col-span-3">
                  <button type="submit" class="font-medium text-[#233267] hover:text-[#8188A3]">+ Add Package</button>
                </div>
              </form>

              <div class="overflow-x-auto rounded-xl border border-neutral-200">
                <table class="min-w-full divide-y divide-neutral-200">
                  <thead class="bg-neutral-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                        Package
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                        Price ($)
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                        Cost ($)
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                        Margin
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase" scope="col">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-neutral-200 bg-white">
                    <tr v-for="pkg in packages" :key="pkg.id">
                      <td class="whitespace-nowrap px-6 py-4 text-sm">{{ pkg.name }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-sm">{{ formatMoney(pkg.price) }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-sm">{{ formatMoney(pkg.cost) }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-sm">{{ pkg.margin.toFixed(1) }}%</td>
                      <td class="whitespace-nowrap px-6 py-4 text-sm">
                        <button type="button" class="text-[#233267] hover:text-[#8188A3]" @click="removePackage(pkg.id)">Remove</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="packages.length === 0" class="py-4 text-center text-neutral-500">
                No packages added yet. Add packages above to calculate bundle pricing.
              </div>
            </div>

            <div class="card mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-[#233267]">2. Bundling Efficiency</h2>
              <div class="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label class="mb-1 block text-sm font-semibold">Combined Delivery Efficiency Gain (%)</label>
                  <input
                    v-model.number="efficiencyGainPct"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    placeholder="e.g. 20"
                  >
                </div>
                <div>
                  <label class="mb-1 block text-sm font-semibold">Target Bundle Discount (%)</label>
                  <input
                    v-model.number="targetDiscountPct"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    placeholder="e.g. 15"
                  >
                </div>
              </div>
            </div>

            <div v-show="showCalculateBtn" class="mb-8 text-center">
              <button
                type="button"
                class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
                @click="calculateBundlePricing"
              >
                Calculate Bundle Pricing
              </button>
            </div>

            <div v-if="hasCalculated && bundleCalc" class="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-[#233267]">Bundle Pricing Results</h2>

              <div class="mb-6 grid gap-6 md:grid-cols-2">
                <div class="rounded-lg border border-neutral-200 p-4">
                  <h3 class="mb-2 text-lg font-semibold">Individual Packages Totals</h3>
                  <div class="grid grid-cols-2 gap-2 text-neutral-800">
                    <div class="text-sm text-neutral-600">Total Price:</div>
                    <div class="text-sm font-medium">{{ formatMoney(bundleCalc.totalPrice) }}</div>
                    <div class="text-sm text-neutral-600">Total Cost:</div>
                    <div class="text-sm font-medium">{{ formatMoney(bundleCalc.totalCost) }}</div>
                    <div class="text-sm text-neutral-600">Average Margin:</div>
                    <div class="text-sm font-medium">{{ bundleCalc.avgMargin.toFixed(1) }}%</div>
                  </div>
                </div>
                <div class="rounded-lg border border-neutral-200 p-4">
                  <h3 class="mb-2 text-lg font-semibold">Bundle Package</h3>
                  <div class="grid grid-cols-2 gap-2 text-neutral-800">
                    <div class="text-sm text-neutral-600">Bundle Price:</div>
                    <div class="text-sm font-medium">{{ formatMoney(bundleCalc.bundlePrice) }}</div>
                    <div class="text-sm text-neutral-600">Cost After Efficiency:</div>
                    <div class="text-sm font-medium">{{ formatMoney(bundleCalc.bundleCost) }}</div>
                    <div class="text-sm text-neutral-600">Bundle Margin:</div>
                    <div class="text-sm font-medium">{{ bundleCalc.bundleMargin.toFixed(1) }}%</div>
                    <div class="text-sm text-neutral-600">Discount Applied:</div>
                    <div class="text-sm font-medium">{{ bundleCalc.appliedDiscountPct.toFixed(1) }}%</div>
                  </div>
                </div>
              </div>

              <div class="mb-6 rounded-xl border border-neutral-200 p-4">
                <h3 class="mb-2 text-lg font-medium">Recommendation</h3>
                <p class="text-neutral-800">{{ bundleCalc.recommendation }}</p>
              </div>

              <h3 class="mb-4 border-t border-neutral-200 pt-6 text-lg font-semibold">Bundle Profitability Analysis</h3>

              <div class="mb-6">
                <div v-if="bundleCalc.analysis === 'more'" class="mb-4 text-neutral-800">
                  <div class="mb-2 flex items-center">
                    <svg class="mr-2 size-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                      <g fill="currentColor">
                        <polyline
                          points="4 11 8 15 16 5"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </g>
                    </svg>
                    <span class="font-semibold">Your bundle is more profitable than selling packages individually!</span>
                  </div>
                  <p class="mb-2">Your current configuration is ideal, with efficiency gains outweighing the discount offered.</p>
                  <ul class="mb-2 list-disc pl-5">
                    <li>
                      <strong>You could increase your discount</strong> up to {{ bundleCalc.maxViableDiscount?.toFixed(1) }}% while still
                      breaking even with individual sales.
                    </li>
                    <li>
                      <strong>Current profit advantage:</strong> {{ formatMoney(bundleCalc.profitAdvantage ?? 0) }} per bundle.
                    </li>
                  </ul>
                  <p>Consider testing a slightly higher discount to attract more clients while maintaining profitability.</p>
                </div>

                <div
                  v-else-if="bundleCalc.analysis === 'less'"
                  class="mb-4 rounded border border-amber-200 bg-white p-4 text-amber-900"
                >
                  <div class="mb-2 flex items-center">
                    <svg class="mr-2 h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span class="font-semibold">Your bundle is currently less profitable than selling packages individually.</span>
                  </div>
                  <p class="mb-2">To make this bundle financially beneficial, you need to adjust either discount or efficiency:</p>
                  <div class="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div class="rounded border border-amber-200 bg-amber-50 p-3">
                      <p class="font-medium">Option 1: Reduce Discount</p>
                      <p>
                        Reduce discount from {{ bundleCalc.appliedDiscountPct.toFixed(1) }}% to
                        <strong>{{ bundleCalc.breakEvenDiscount }}%</strong> or lower
                      </p>
                    </div>
                    <div class="rounded border border-amber-200 bg-amber-50 p-3">
                      <p class="font-medium">Option 2: Increase Efficiency</p>
                      <p>
                        Increase efficiency from {{ bundleCalc.efficiencyGainPct.toFixed(1) }}% to
                        <strong>{{ bundleCalc.breakEvenEfficiency }}%</strong> or higher
                      </p>
                    </div>
                  </div>
                  <p class="text-sm">Current profit gap: {{ formatMoney(bundleCalc.profitGap ?? 0) }} per bundle</p>
                </div>

                <div v-else class="mb-4 rounded border border-orange-200 bg-white p-4 text-orange-900">
                  <div class="mb-2 flex items-center">
                    <svg class="mr-2 h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span class="font-semibold">Your bundle is at the perfect break-even point!</span>
                  </div>
                  <p>Your efficiency gains exactly offset your discount, resulting in the same profit as individual sales.</p>
                  <p class="mt-2">This means you can offer clients the convenience of a bundle without impacting your bottom line.</p>
                </div>
              </div>

              <h3 class="mb-4 border-t border-neutral-200 pt-6 text-lg font-bold text-[#233267]">Revenue Projections</h3>

              <div class="mb-6 grid gap-4 md:grid-cols-3">
                <div>
                  <label class="mb-1 block text-sm font-semibold">Estimated Bundle Sales</label>
                  <input
                    v-model.number="estimatedSales"
                    type="number"
                    min="1"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  >
                </div>
                <div>
                  <label class="mb-1 block text-sm font-semibold">Time Period</label>
                  <select
                    v-model="timePeriod"
                    class="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div class="flex items-end">
                  <button
                    type="button"
                    class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
                    @click="calculateBundlePricing"
                  >
                    Update Projections
                  </button>
                </div>
              </div>

              <div v-if="projections" class="grid gap-6 md:grid-cols-2">
                <div class="rounded-xl border border-amber-200/80 bg-[#DFDFDF] p-4">
                  <h3 class="mb-3 text-lg font-medium">Bundle Sales Projections</h3>
                  <div class="grid grid-cols-2 gap-3 text-neutral-900">
                    <div class="text-sm font-medium">Total Revenue:</div>
                    <div class="text-sm font-bold">{{ formatMoney(projections.bundleTotalRevenue) }}</div>
                    <div class="text-sm font-medium">Total Costs:</div>
                    <div class="text-sm font-bold">{{ formatMoney(projections.bundleTotalCosts) }}</div>
                    <div class="text-sm font-medium">Total Profit:</div>
                    <div class="text-sm font-bold">{{ formatMoney(projections.bundleTotalProfit) }}</div>
                    <div class="text-sm font-medium">Return on Investment:</div>
                    <div class="text-sm font-bold">{{ projections.bundleROI.toFixed(1) }}%</div>
                  </div>
                </div>
                <div class="rounded-xl border border-neutral-200 p-4">
                  <h3 class="mb-3 text-lg font-semibold">Individual Sales Comparison</h3>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="text-sm font-medium text-neutral-600">Total Revenue:</div>
                    <div class="text-sm font-bold text-neutral-800">{{ formatMoney(projections.individualTotalRevenue) }}</div>
                    <div class="text-sm font-medium text-neutral-600">Total Costs:</div>
                    <div class="text-sm font-bold text-neutral-800">{{ formatMoney(projections.individualTotalCosts) }}</div>
                    <div class="text-sm font-medium text-neutral-600">Total Profit:</div>
                    <div class="text-sm font-bold text-neutral-800">{{ formatMoney(projections.individualTotalProfit) }}</div>
                    <div class="text-sm font-medium text-neutral-600">Return on Investment:</div>
                    <div class="text-sm font-bold text-neutral-800">{{ projections.individualROI.toFixed(1) }}%</div>
                  </div>
                </div>
              </div>

              <div class="mt-4 rounded-xl border border-neutral-200 p-4">
                <div class="flex items-center text-neutral-900">
                  <div v-if="projections && projections.profitDifference > 0" class="mr-2 text-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div v-else-if="projections" class="mr-2 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div v-else class="mr-2 text-neutral-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                      <polyline
                        points="3 13 8 8 11 11 16 6"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        d="m17,17H6c-1.6569,0-3-1.3431-3-3V3"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium">Projected Impact</h3>
                </div>
                <p class="mt-2 text-neutral-800">{{ projections?.projectionSummary }}</p>
              </div>

              <div class="mt-6 border-t border-neutral-200 pt-6">
                <details class="group" open>
                  <summary class="flex cursor-pointer list-none items-center text-lg font-semibold text-neutral-900">
                    <svg class="mr-2 size-5 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fill="#212121"
                        d="m10,2C5.589,2,2,5.589,2,10s3.589,8,8,8,8-3.589,8-8S14.411,2,10,2Zm1,12c0,.552-.447,1-1,1s-1-.448-1-1v-4.5c0-.552.447-1,1-1s1,.448,1,1v4.5Zm-1-6.5c-.689,0-1.25-.561-1.25-1.25s.561-1.25,1.25-1.25,1.25.561,1.25,1.25-.561,1.25-1.25,1.25Z"
                      />
                    </svg>
                    How to Make Bundles Profitable
                    <svg
                      class="ml-auto h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div class="mt-3 pl-5 text-neutral-700">
                    <h4 class="mb-2 text-lg font-medium">The Profitability Equation</h4>
                    <p class="mb-4">
                      For a bundle to be more profitable than selling packages individually, this equation must be true:
                    </p>
                    <div class="mb-4 rounded-xl border border-neutral-200 p-3 text-center font-mono text-sm">
                      (Efficiency gain % × Total cost) &gt; (Discount % × Total price)
                    </div>
                    <p class="mb-4">
                      In simpler terms, the money you save from delivery efficiency must exceed the revenue you lose from the discount.
                    </p>

                    <h4 class="mb-2 pt-4 text-lg font-medium">Your Adjustment Recommendations</h4>
                    <div class="mb-4">
                      <div v-if="!bundleCalc" class="text-center text-neutral-500 italic">
                        Calculate bundle pricing to see personalized recommendations
                      </div>
                      <template v-else>
                        <div v-if="bundleCalc.analysis === 'more'" class="text-neutral-800">
                          <p class="mb-2 font-semibold">Your bundle is more profitable than selling packages individually!</p>
                          <ul class="list-disc pl-5">
                            <li>
                              You could increase your discount up to {{ bundleCalc.maxViableDiscount?.toFixed(1) }}% while still breaking even
                              with individual sales.
                            </li>
                            <li>Current profit advantage: {{ formatMoney(bundleCalc.profitAdvantage ?? 0) }} per bundle.</li>
                          </ul>
                        </div>
                        <div v-else-if="bundleCalc.analysis === 'less'" class="rounded border border-amber-200 bg-amber-50 p-3 text-amber-950">
                          <p class="mb-2 font-semibold">Your bundle is currently less profitable than selling packages individually.</p>
                          <p class="mb-2">
                            Reduce discount to <strong>{{ bundleCalc.breakEvenDiscount }}%</strong> or raise efficiency to
                            <strong>{{ bundleCalc.breakEvenEfficiency }}%</strong> or better. Gap:
                            {{ formatMoney(bundleCalc.profitGap ?? 0) }} per bundle.
                          </p>
                        </div>
                        <div v-else class="text-neutral-800">
                          <p class="font-semibold">Break-even: efficiency gains match the discount versus individual sales.</p>
                        </div>
                      </template>
                    </div>

                    <h4 class="mb-2 pt-4 text-lg font-medium">General Tips to Improve Bundle Profitability</h4>
                    <ul class="mb-4 list-disc space-y-2 pl-5">
                      <li>
                        <strong>Add value instead of discounting</strong>: Consider adding a bonus service to bundles rather than deeply
                        discounting the core services.
                      </li>
                      <li>
                        <strong>Focus on high-cost packages</strong>: Bundles work best when there's more cost to optimize. Packages with
                        higher delivery costs benefit more from efficiency gains.
                      </li>
                      <li>
                        <strong>Create true package synergies</strong>: Design packages that genuinely work better together, creating real
                        efficiency gains (e.g., content marketing + SEO).
                      </li>
                      <li>
                        <strong>Streamline handoffs</strong>: Eliminate duplicate onboarding, discovery, and reporting when delivering multiple
                        services.
                      </li>
                      <li>
                        <strong>Cross-train team members</strong>: Staff who can work across multiple service areas increase efficiency for
                        bundle delivery.
                      </li>
                    </ul>

                    <p class="text-sm text-neutral-500">
                      <strong>Remember</strong>: Higher margin businesses need higher efficiency gains to offset discounts. The calculator
                      shows you exactly what adjustments will make your bundle profitable.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
  </div>
    <Faqs/>
        <Ready/>

</template>
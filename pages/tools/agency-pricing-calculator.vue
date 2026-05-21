<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
    
      <section>
          <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl"> Pricing Calculator for Agencies</h1>
        <p class="mt-4 text-lg text-stone-600"> Calculate optimal pricing and generate attractive pricing tiers</p>
      </div>
      
        <div class="mx-auto max-w-4xl px-5 pb-16">
          <!-- Basic inputs -->
          <div class="mb-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-bold text-[#233267]">Basic Inputs</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label for="hourly-cost" class="mb-1 block text-sm font-semibold">Team Hourly Cost ($)</label>
                <input
                  id="hourly-cost"
                  v-model.number="form.hourlyCost"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Average cost per hour for your team</p>
              </div>
              <div>
                <label for="hours-required" class="mb-1 block text-sm font-semibold">Estimated Hours</label>
                <input
                  id="hours-required"
                  v-model.number="form.hoursRequired"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Total hours needed for the project</p>
              </div>
              <div>
                <label for="overhead-percent" class="mb-1 block text-sm font-semibold">Overhead (%)</label>
                <input
                  id="overhead-percent"
                  v-model.number="form.overheadPercent"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Percentage to add for overhead costs</p>
              </div>
              <div>
                <label for="profit-margin" class="mb-1 block text-sm font-semibold">Target Profit Margin (%)</label>
                <input
                  id="profit-margin"
                  v-model.number="form.profitMargin"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Your desired profit margin percentage</p>
              </div>
            </div>
          </div>

          <!-- Pricing model -->
          <div class="mb-6 rounded-xl border border-neutral-500 bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-bold text-[#233267]">Pricing Model</h2>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <button
                type="button"
                class="cursor-pointer rounded-lg border p-4 text-left transition hover:border-neutral-500"
                :class="form.pricingModel === 'hourly' ? 'border-neutral-500 ring-1 ring-neutral-500' : 'border-neutral-500'"
                @click="form.pricingModel = 'hourly'"
              >
                <div class="mb-2 flex items-center">
                  <input id="hourly-radio" v-model="form.pricingModel" type="radio" value="hourly" class="mr-2" />
                  <label for="hourly-radio" class="font-medium">Hourly Rate</label>
                </div>
                <p class="text-sm text-stone-500">Charge based on time spent</p>
              </button>
              <button
                type="button"
                class="cursor-pointer rounded-lg border p-4 text-left transition hover:border-neutral-500"
                :class="form.pricingModel === 'fixed' ? 'border-neutral-500 ring-1 ring-neutral-500' : 'border-stone-200'"
                @click="form.pricingModel = 'fixed'"
              >
                <div class="mb-2 flex items-center">
                  <input id="fixed-radio" v-model="form.pricingModel" type="radio" value="fixed" class="mr-2" />
                  <label for="fixed-radio" class="font-medium">Fixed Price</label>
                </div>
                <p class="text-sm text-stone-500">Set price for the whole project</p>
              </button>
              <button
                type="button"
                class="cursor-pointer rounded-lg border p-4 text-left transition hover:border-neutral-500"
                :class="form.pricingModel === 'value' ? 'border-neutral-500 ring-1 ring-neutral-500' : 'border-stone-200'"
                @click="form.pricingModel = 'value'"
              >
                <div class="mb-2 flex items-center">
                  <input id="value-radio" v-model="form.pricingModel" type="radio" value="value" class="mr-2" />
                  <label for="value-radio" class="font-medium">Value-Based</label>
                </div>
                <p class="text-sm text-stone-500">Price based on client ROI</p>
              </button>
            </div>

            <div class="mt-6">
              <div v-show="form.pricingModel === 'hourly'">
                <label for="hourly-rate" class="mb-1 block text-sm font-semibold">Your Hourly Rate ($)</label>
                <input
                  id="hourly-rate"
                  v-model.number="form.hourlyRate"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
              </div>
              <div v-show="form.pricingModel === 'fixed'">
                <label for="risk-buffer" class="mb-1 block text-sm font-semibold">Risk Buffer (%)</label>
                <input
                  id="risk-buffer"
                  v-model.number="form.riskBuffer"
                  type="number"
                  class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-500">Additional percentage to account for scope uncertainty</p>
              </div>
              <div v-show="form.pricingModel === 'value'">
                <div class="mb-4">
                  <label for="client-value" class="mb-1 block text-sm font-semibold">Value to Client ($)</label>
                  <input
                    id="client-value"
                    v-model.number="form.clientValue"
                    type="number"
                    class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                  <p class="mt-1 text-xs text-stone-500">Estimated value your work will deliver to the client</p>
                </div>
                <div>
                  <label for="value-capture" class="mb-1 block text-sm font-semibold">Value Capture (%)</label>
                  <input
                    id="value-capture"
                    v-model.number="form.valueCapture"
                    type="number"
                    class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                  <p class="mt-1 text-xs text-stone-500">Percentage of created value you capture as your fee</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8 flex justify-center">
            <button
              type="button"
              class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#fff] hover:text-[#233267] hover:border-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267] focus:ring-offset-[#233267]"
              @click="calculatePrice"
            >
              Calculate Price
            </button>
          </div>

          <!-- Results -->
          <div v-show="showResults" ref="resultsEl" class="mb-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-bold text-[#233267]">Base Price Results</h2>
            <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div class="rounded-xl border border-stone-200 p-4">
                <h3 class="text-sm font-medium uppercase text-stone-500">Recommended Price</h3>
                <div class="mt-2 text-2xl font-semibold text-orange-600">{{ formatMoney(results.recommendedPrice) }}</div>
              </div>
              <div class="rounded-xl border border-stone-200 p-4">
                <h3 class="text-sm font-medium uppercase text-stone-500">Direct Labor Cost</h3>
                <div class="mt-2 text-2xl font-semibold text-emerald-600">{{ formatMoney(results.laborCost) }}</div>
              </div>
              <div class="rounded-xl border border-stone-200 p-4">
                <h3 class="text-sm font-medium uppercase text-stone-500">Total Cost</h3>
                <div class="mt-2 text-2xl font-semibold text-rose-600">{{ formatMoney(results.totalCost) }}</div>
              </div>
              <div class="rounded-xl border border-stone-200 p-4">
                <h3 class="text-sm font-medium uppercase text-stone-500">Profit Margin</h3>
                <div class="mt-2 text-2xl font-semibold text-rose-600">{{ results.profitMarginPct.toFixed(1) }}%</div>
              </div>
            </div>
            <div class="mt-6 rounded-xl border border-stone-200 p-4">
              <h3 class="mb-2 text-lg font-medium text-stone-800">Pricing Analysis</h3>
              <p class="text-stone-700">{{ results.analysisText }}</p>
            </div>
            <div class="mt-6 flex justify-center">
              <button
                type="button"
                class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
                @click="generatePricingTiers"
              >
                Generate Pricing Tiers
              </button>
            </div>
          </div>

          <!-- Tiers -->
          <div v-show="showTiers" ref="tiersEl" class="mb-6">
            <h2 class="mb-4 text-center text-2xl font-bold text-[#233267]">Recommended Pricing Tiers</h2>
            <p class="mb-6 text-center text-stone-600">
              Present these options to your clients to increase deal size and conversion rates
            </p>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              <!-- Basic -->
              <div class="transform overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-transform hover:scale-[1.02]">
                <div class="border-b border-stone-200 bg-stone-50 p-6">
                  <h3 class="text-center text-lg font-bold text-stone-700">Basic</h3>
                  <div class="mt-4 text-center">
                    <span class="text-3xl font-bold text-stone-800">{{ formatMoney(tierPrices.basic) }}</span>
                  </div>
                </div>
                <div class="p-6">
                  <ul class="space-y-3">
                    <li v-for="(f, i) in tierFeatures.basic" :key="'b' + i" class="flex items-start text-stone-600">
                      <CheckIcon class="mr-2 size-5 shrink-0 text-emerald-600" />
                      <span>{{ f }}</span>
                    </li>
                    <li class="flex items-start text-stone-400">
                      <XIcon class="mr-2 size-5 shrink-0" />
                      <span class="line-through">Premium features</span>
                    </li>
                  </ul>
                  <div class="mt-6 border-t border-stone-100 pt-4">
                    <p class="mb-1 text-sm text-stone-500">Profit Margin:</p>
                    <p class="font-medium text-stone-800">{{ tierMargins.basic }}%</p>
                  </div>
                </div>
              </div>

              <!-- Standard (recommended) -->
              <div class="transform overflow-hidden rounded-xl border-2 border-[#233267] bg-white shadow-md transition-transform hover:scale-[1.02]">
                <div class="border-b border-orange-100 bg-[#ECECEC] p-6">
                  <div class="flex justify-center">
                    <span class="rounded-full bg-[#233267] px-3 py-1 text-xs font-semibold text-[#fff]">RECOMMENDED</span>
                  </div>
                  <h3 class="mt-2 text-center text-lg font-bold text-stone-700">Standard</h3>
                  <div class="mt-4 text-center">
                    <span class="text-3xl font-bold text-[#233267]">{{ formatMoney(tierPrices.standard) }}</span>
                  </div>
                </div>
                <div class="p-6">
                  <ul class="space-y-3">
                    <li v-for="(f, i) in tierFeatures.standard" :key="'s' + i" class="flex items-start text-stone-600">
                      <CheckIcon class="mr-2 size-5 shrink-0 text-emerald-600" />
                      <span>{{ f }}</span>
                    </li>
                  </ul>
                  <div class="mt-6 border-t border-stone-100 pt-4">
                    <p class="mb-1 text-sm text-stone-500">Profit Margin:</p>
                    <p class="font-medium text-[#233267]">{{ tierMargins.standard }}%</p>
                  </div>
                </div>
              </div>

              <!-- Premium -->
              <div class="transform overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-transform hover:scale-[1.02]">
                <div class="border-b border-stone-200 bg-stone-50 p-6">
                  <h3 class="text-center text-lg font-bold text-stone-700">Premium</h3>
                  <div class="mt-4 text-center">
                    <span class="text-3xl font-bold text-stone-800">{{ formatMoney(tierPrices.premium) }}</span>
                  </div>
                </div>
                <div class="p-6">
                  <ul class="space-y-3">
                    <li v-for="(f, i) in tierFeatures.premium" :key="'p' + i" class="flex items-start text-stone-600">
                      <CheckIcon class="mr-2 size-5 shrink-0 text-emerald-600" />
                      <span>{{ f }}</span>
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
              <ul class="space-y-3">
                <li v-for="(tip, i) in strategyTips" :key="i" class="flex items-start">
                  <svg class="mr-2 mt-0.5 h-5 w-5 shrink-0 text-[#233267]" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-stone-700">{{ tip }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    
  </div>
   <Faqs/>
</template>

<script setup lang="ts">
import Faqs from '~/components/Sections/Faqs.vue'
import { computed, nextTick, reactive, ref } from 'vue'
import breadcrumb from '~/components/Sections/breadcrumb.vue'
definePageMeta({ layout: 'tools' })
type PricingModel = 'hourly' | 'fixed' | 'value'

const form = reactive({
  hourlyCost: 75,
  hoursRequired: 40,
  overheadPercent: 30,
  profitMargin: 40,
  pricingModel: 'hourly' as PricingModel,
  hourlyRate: 150,
  riskBuffer: 15,
  clientValue: 50000,
  valueCapture: 10,
})

const calculatedPrice = ref(0)
const totalCostValue = ref(0)
const showResults = ref(false)
const showTiers = ref(false)
const resultsEl = ref<HTMLElement | null>(null)
const tiersEl = ref<HTMLElement | null>(null)

const results = reactive({
  recommendedPrice: 0,
  laborCost: 0,
  totalCost: 0,
  profitMarginPct: 0,
  analysisText: '',
})

const tierPrices = reactive({ basic: 0, standard: 0, premium: 0 })
const tierMargins = reactive({ basic: '0', standard: '0', premium: '0' })

const tierFeatures = computed(() => {
  const m = form.pricingModel
  if (m === 'hourly') {
    return {
      basic: ['Core deliverable', 'Email support'],
      standard: ['Core deliverable', 'Priority email support', 'Regular progress updates'],
      premium: ['Core deliverable', 'Phone & email support', 'Detailed progress updates', 'Expedited delivery'],
    }
  }
  if (m === 'fixed') {
    return {
      basic: ['Core deliverable', 'Standard revisions'],
      standard: ['Core deliverable', 'Extended revisions', 'Detailed documentation'],
      premium: ['Core deliverable', 'Unlimited revisions', 'Comprehensive documentation', '30-day support period'],
    }
  }
  return {
    basic: ['Core deliverable', 'Basic implementation'],
    standard: ['Core deliverable', 'Full implementation', 'Results tracking'],
    premium: ['Core deliverable', 'Premium implementation', 'Advanced results tracking', 'Performance guarantee'],
  }
})

const strategyTips = [
  'Position the Standard package as the best value and highlight it visually.',
  'Make sure each tier has clear differentiation in both features and value.',
  'Include the Premium tier even if few clients choose it – it makes the Standard tier look more attractive.',
  'Customize the feature descriptions based on your specific services and client needs.',
]

function formatMoney(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

function calculatePrice() {
  const hourlyCost = form.hourlyCost || 0
  const hoursRequired = form.hoursRequired || 0
  const overheadPercent = form.overheadPercent || 0
  const targetMargin = form.profitMargin || 0

  const laborCost = hourlyCost * hoursRequired
  const overheadCost = laborCost * (overheadPercent / 100)
  const totalCost = laborCost + overheadCost
  totalCostValue.value = totalCost

  let recommendedPrice = 0
  let analysisText = ''

  if (form.pricingModel === 'hourly') {
    const hourlyRate = form.hourlyRate || 0
    recommendedPrice = hourlyRate * hoursRequired
    const marginPct =
      recommendedPrice > 0 ? ((recommendedPrice - totalCost) / recommendedPrice) * 100 : 0
    analysisText = `Based on your hourly rate of $${hourlyRate.toLocaleString('en-US')} and an estimated ${hoursRequired} hours, the recommended price is $${recommendedPrice.toLocaleString('en-US')}. This provides a profit margin of ${marginPct.toFixed(1)}%.`
  } else if (form.pricingModel === 'fixed') {
    const riskBuffer = form.riskBuffer || 0
    const basePrice = targetMargin >= 100 ? totalCost : totalCost / (1 - targetMargin / 100)
    recommendedPrice = basePrice * (1 + riskBuffer / 100)
    analysisText = `Using the fixed price model with a ${targetMargin}% target margin and ${riskBuffer}% risk buffer, the recommended price is $${recommendedPrice.toLocaleString('en-US')}. This covers your costs of $${totalCost.toLocaleString('en-US')} while allowing for unexpected scope changes.`
  } else {
    const clientValue = form.clientValue || 0
    const valueCapture = form.valueCapture || 0
    recommendedPrice = clientValue * (valueCapture / 100)
    const mult = totalCost > 0 ? recommendedPrice / totalCost : 0
    analysisText = `Using the value-based model, if your work delivers $${clientValue.toLocaleString('en-US')} in value to the client and you capture ${valueCapture}% of that value, the recommended price is $${recommendedPrice.toLocaleString('en-US')}. This is ${mult.toFixed(1)}x your cost.`
  }

  calculatedPrice.value = recommendedPrice
  const profit = recommendedPrice - totalCost
  const profitMargin = recommendedPrice > 0 ? (profit / recommendedPrice) * 100 : 0

  results.recommendedPrice = recommendedPrice
  results.laborCost = laborCost
  results.totalCost = totalCost
  results.profitMarginPct = profitMargin
  results.analysisText = analysisText

  showResults.value = true
  showTiers.value = false
  nextTick(() => resultsEl.value?.scrollIntoView({ behavior: 'smooth' }))
}

function generatePricingTiers() {
  if (calculatedPrice.value <= 0) return

  const basicMultiplier = 0.75
  const premiumMultiplier = 1.5
  const std = Math.round(calculatedPrice.value)
  tierPrices.basic = Math.round(calculatedPrice.value * basicMultiplier)
  tierPrices.standard = std
  tierPrices.premium = Math.round(calculatedPrice.value * premiumMultiplier)

  const basicCost = Math.round(totalCostValue.value * 0.9)
  const standardCost = totalCostValue.value
  const premiumCost = Math.round(totalCostValue.value * 1.2)

  const pct = (price: number, cost: number) =>
    price > 0 ? (((price - cost) / price) * 100).toFixed(1) : '0.0'

  tierMargins.basic = pct(tierPrices.basic, basicCost)
  tierMargins.standard = pct(tierPrices.standard, standardCost)
  tierMargins.premium = pct(tierPrices.premium, premiumCost)

  showTiers.value = true
  nextTick(() => tiersEl.value?.scrollIntoView({ behavior: 'smooth' }))
}

const CheckIcon = {
  name: 'CheckIcon',
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 11 8 15 16 5" stroke-linecap="round" stroke-linejoin="round" /></svg>',
}

const XIcon = {
  name: 'XIcon',
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="5" x2="15" y2="15" stroke-linecap="round" /><line x1="5" y1="15" x2="15" y2="5" stroke-linecap="round" /></svg>',
}

const Chevron = {
  name: 'Chevron',
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7.5 16.5 14 10 7.5 3.5" stroke-linecap="round" stroke-linejoin="round" /></svg>',
}
</script>
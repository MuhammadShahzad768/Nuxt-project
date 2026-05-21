<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
      <section>
      <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Service Standardization ROI Calculator for productized Agencies</h1>
        <p class="mt-4 text-lg text-stone-600">Determine whether investing in systems, templates, and processes is worth the cost by calculating the ROI of standardization investments over time.</p>
      </div>

        <div class="mx-auto mb-16 max-w-7xl px-4">
          <div class="overflow-hidden rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <div class="space-y-4">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label for="packagePrice" class="mb-1 block text-sm font-semibold text-stone-800">
                    Package Price ($/month)
                  </label>
                  <div class="relative mt-1">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span class="text-stone-500">$</span>
                    </div>
                    <input
                      id="packagePrice"
                      v-model.number="packagePrice"
                      type="number"
                      min="0"
                      step="any"
                      class="block h-10 w-full rounded-md border border-stone-300 bg-white pl-7 pr-3 text-stone-900 shadow-sm focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                      placeholder="1500"
                    />
                  </div>
                </div>

                <div>
                  <label for="retention" class="mb-1 block text-sm font-semibold text-stone-800">
                    Average Retention (months)
                  </label>
                  <input
                    id="retention"
                    v-model.number="retention"
                    type="number"
                    min="0"
                    step="any"
                    class="mt-1 block h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-stone-900 shadow-sm focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                    placeholder="8"
                  />
                </div>

                <div>
                  <label for="deliveryCost" class="mb-1 block text-sm font-semibold text-stone-800">
                    Monthly Delivery Cost ($)
                  </label>
                  <div class="relative mt-1">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span class="text-stone-500">$</span>
                    </div>
                    <input
                      id="deliveryCost"
                      v-model.number="deliveryCost"
                      type="number"
                      min="0"
                      step="any"
                      class="block h-10 w-full rounded-md border border-stone-300 bg-white pl-7 pr-3 text-stone-900 shadow-sm focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                      placeholder="900"
                    />
                  </div>
                </div>

                <div>
                  <label for="acquisitionCost" class="mb-1 block text-sm font-semibold text-stone-800">
                    Client Acquisition Cost ($)
                  </label>
                  <div class="relative mt-1">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span class="text-stone-500">$</span>
                    </div>
                    <input
                      id="acquisitionCost"
                      v-model.number="acquisitionCost"
                      type="number"
                      min="0"
                      step="any"
                      class="block h-10 w-full rounded-md border border-stone-300 bg-white pl-7 pr-3 text-stone-900 shadow-sm focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                      placeholder="2000"
                    />
                  </div>
                </div>
              </div>

              <div class="my-10 flex justify-center">
                <button
                  type="button"
                  class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
                  @click="scrollToResults"
                >
                  Calculate Lifetime Value
                </button>
              </div>
            </div>

            <div id="clv-results" class="mt-8 border-t border-stone-200 pt-6">
              <h2 class="mb-6 text-center text-xl font-bold text-[#233267]">Results</h2>

              <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div class="rounded-lg border border-stone-200 bg-stone-50 p-4 shadow-sm">
                  <h3 class="text-sm font-medium text-stone-500">Lifetime Revenue</h3>
                  <p class="mt-1 text-2xl font-semibold text-stone-900">
                    {{ formatCurrency(lifetimeRevenue) }}
                  </p>
                </div>

                <div class="rounded-lg border border-stone-200 bg-stone-50 p-4 shadow-sm">
                  <h3 class="text-sm font-medium text-stone-500">Lifetime Profit</h3>
                  <p class="mt-1 text-2xl font-semibold" :class="profitClass">
                    {{ formatCurrency(lifetimeProfit) }}
                  </p>
                </div>

                <div class="rounded-lg border border-stone-200 bg-stone-50 p-4 shadow-sm">
                  <h3 class="text-sm font-medium text-stone-500">ROI on Acquisition</h3>
                  <p class="mt-1 text-2xl font-semibold" :class="roiClass">
                    {{ roi.toFixed(1) }}%
                  </p>
                </div>
              </div>

              <div class="mt-8 rounded-lg border border-stone-200 bg-stone-50/50 p-5">
                <h3 class="mb-3 text-lg font-medium text-stone-800">Key Insights</h3>
                <ul class="list-disc space-y-2 pl-5 text-sm text-stone-700">
                  <li>{{ insight1 }}</li>
                  <li>{{ insight2 }}</li>
                  <li>{{ insight3 }}</li>
                  <li class="mt-1 border-t border-stone-200 pt-2">
                    Break-even occurs after
                    <span class="font-medium text-stone-900">{{ breakEvenPoint }}</span>
                    months.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

  </div>
    <Faqs/>
</template>

<script setup>
import Faqs from '~/components/Sections/Faqs.vue'
import { computed, ref } from 'vue'
import breadcrumb from '~/components/Sections/breadcrumb.vue'
definePageMeta({ layout: 'tools' })
const packagePrice = ref(1500)
const retention = ref(8)
const deliveryCost = ref(900)
const acquisitionCost = ref(2000)

function n(v) {
  const x = typeof v === 'number' ? v : parseFloat(String(v))
  return Number.isFinite(x) ? x : 0
}

const lifetimeRevenue = computed(() => n(packagePrice.value) * n(retention.value))

const lifetimeProfit = computed(() => {
  const rev = lifetimeRevenue.value
  const deliveryTotal = n(deliveryCost.value) * n(retention.value)
  return rev - deliveryTotal - n(acquisitionCost.value)
})

const roi = computed(() => {
  const cac = n(acquisitionCost.value)
  return cac > 0 ? (lifetimeProfit.value / cac) * 100 : 0
})

const breakEvenPoint = computed(() => {
  const price = n(packagePrice.value)
  const delivery = n(deliveryCost.value)
  const cac = n(acquisitionCost.value)
  const margin = price - delivery
  if (margin <= 0) return 0
  return Math.ceil(cac / margin)
})

const profitClass = computed(() =>
  lifetimeProfit.value < 0 ? 'text-red-600' : 'text-emerald-600',
)

const roiClass = computed(() =>
  roi.value < 0 ? 'text-red-600' : 'text-orange-600',
)

const insight1 = computed(
  () =>
    `Each client brings in ${formatCurrency(lifetimeRevenue.value)} total revenue over their lifetime.`,
)

const insight2 = computed(
  () => `After costs, you profit ${formatCurrency(lifetimeProfit.value)} per client.`,
)

const insight3 = computed(
  () => `You get ${roi.value.toFixed(1)}% return on your acquisition investment.`,
)

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

function scrollToResults() {
  document.getElementById('clv-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
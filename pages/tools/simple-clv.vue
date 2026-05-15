<template>
  <div class="min-h-screen bg-stone-100 font-sans text-stone-950 antialiased mt-[150px]">
    <div class="h-16 lg:h-20" />
    <main class="pt-10 lg:pt-0">
      <section>
        <div class="mx-auto max-w-4xl px-4 pb-8 pt-10">
          <nav class="flex items-center justify-center text-sm text-stone-600">
            <a href="/" class="transition hover:text-orange-600">Home</a>
            <svg class="mx-2 size-4 shrink-0 text-stone-400" viewBox="0 0 20 20" aria-hidden="true">
              <polyline
                points="7.5 16.5 14 10 7.5 3.5"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <a href="/tools" class="transition hover:text-orange-600">Tools</a>
            <svg class="mx-2 size-4 shrink-0 text-stone-400" viewBox="0 0 20 20" aria-hidden="true">
              <polyline
                points="7.5 16.5 14 10 7.5 3.5"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <span class="text-stone-800">Simple CLV Calculator</span>
          </nav>
        </div>

        <header class="mx-auto mb-16 max-w-4xl px-4 text-center">
          <h1 class="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            Simple CLV Calculator for productized Agencies
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Determine the long-term value of subscription clients in your productized agency model.
          </p>
        </header>

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
                      class="block h-10 w-full rounded-md border border-stone-300 bg-white pl-7 pr-3 text-stone-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
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
                    class="mt-1 block h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-stone-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
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
                      class="block h-10 w-full rounded-md border border-stone-300 bg-white pl-7 pr-3 text-stone-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
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
                      class="block h-10 w-full rounded-md border border-stone-300 bg-white pl-7 pr-3 text-stone-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="2000"
                    />
                  </div>
                </div>
              </div>

              <div class="my-10 flex justify-center">
                <button
                  type="button"
                  class="rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  @click="scrollToResults"
                >
                  Calculate Lifetime Value
                </button>
              </div>
            </div>

            <div id="clv-results" class="mt-8 border-t border-stone-200 pt-6">
              <h2 class="mb-6 text-center text-xl font-medium text-stone-800">Results</h2>

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
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

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
<template>
  <div class="min-h-screen bg-stone-100 font-sans text-stone-950 antialiased mt-[100px]">
    <div class="h-20 lg:h-24" />
    <main class="pt-10 lg:pt-0">
      <section>
        <header class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-20">
          <h1 class="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            Package Profitability for productized Agencies
          </h1>
          <p class="mt-3 text-lg text-stone-600 md:text-xl">
            Determine the true profitability of your standardized service packages
          </p>
        </header>

        <div class="mx-auto mb-16 max-w-5xl px-4">
          <div class="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div class="grid md:grid-cols-2">
              <div class="border-b border-stone-200 p-8 md:border-b-0 md:border-r">
                <h2 class="mb-8 text-2xl font-semibold text-stone-800">Package Details</h2>
                <form class="space-y-6" @submit.prevent>
                  <div>
                    <label for="packagePrice" class="mb-2 block font-semibold">Package Price ($/month)</label>
                    <div class="relative">
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                      <input
                        id="packagePrice"
                        v-model.number="form.packagePrice"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 py-2 pl-8 pr-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="0.00"
                        @input="calculate"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="laborHours" class="mb-2 block font-semibold">Direct Labor Hours (per month)</label>
                    <input
                      id="laborHours"
                      v-model.number="form.laborHours"
                      type="number"
                      min="0"
                      class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="0"
                      @input="calculate"
                    />
                  </div>

                  <div>
                    <label for="hourlyRate" class="mb-2 block font-semibold">Hourly Labor Rate ($)</label>
                    <div class="relative">
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                      <input
                        id="hourlyRate"
                        v-model.number="form.hourlyRate"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 py-2 pl-8 pr-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="0.00"
                        @input="calculate"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="softwareCost" class="mb-2 block font-semibold">Software/Tools Allocation ($/month)</label>
                    <div class="relative">
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                      <input
                        id="softwareCost"
                        v-model.number="form.softwareCost"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 py-2 pl-8 pr-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="0.00"
                        @input="calculate"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="pmCost" class="mb-2 block font-semibold">Project Management Overhead ($/month)</label>
                    <div class="relative">
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                      <input
                        id="pmCost"
                        v-model.number="form.pmCost"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 py-2 pl-8 pr-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="0.00"
                        @input="calculate"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="acquisitionCost" class="mb-2 block font-semibold">Acquisition Cost Amortization ($/month)</label>
                    <div class="relative">
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                      <input
                        id="acquisitionCost"
                        v-model.number="form.acquisitionCost"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 py-2 pl-8 pr-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="0.00"
                        @input="calculate"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="fixedOverhead" class="mb-2 block font-semibold">Fixed Overhead ($/month)</label>
                    <div class="relative">
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                      <input
                        id="fixedOverhead"
                        v-model.number="form.fixedOverhead"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-stone-300 py-2 pl-8 pr-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="0.00"
                        @input="calculate"
                      />
                    </div>
                  </div>

                  <div class="pt-4">
                    <button
                      type="button"
                      class="text-[#00296B] border-2 border-[#00296B] rounded-full px-6 py-2 text-lg font-semibold hover:bg-[#00296B] hover:text-white transition-all"
                      @click="calculate"
                    >
                      Calculate Profitability
                    </button>
                  </div>
                </form>
              </div>

              <div class="bg-stone-50/50 p-8">
                <h2 class="mb-8 text-2xl font-semibold text-stone-800">Profitability Analysis</h2>
                <div class="space-y-6">
                  <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h3 class="mb-1 font-semibold">Direct Labor Costs</h3>
                    <p class="text-2xl font-bold text-stone-900">{{ formatMoney(out.laborCosts) }}</p>
                  </div>

                  <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h3 class="mb-1 font-semibold">Total Costs</h3>
                    <p class="text-2xl font-bold text-stone-900">{{ formatMoney(out.variableCosts) }}</p>
                  </div>

                  <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h3 class="mb-1 font-semibold">Real Profit</h3>
                    <p class="text-2xl font-bold" :class="valueColorClass">{{ formatMoney(out.profit) }}</p>
                  </div>

                  <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h3 class="mb-1 font-semibold">Profit Margin</h3>
                    <p class="text-2xl font-bold" :class="valueColorClass">{{ out.margin.toFixed(2) }}%</p>
                  </div>

                  <div class="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h3 class="mb-1 font-semibold">Minimum Clients for Break-Even</h3>
                    <p class="text-2xl font-bold text-stone-900">{{ out.minClientsDisplay }}</p>
                    <p class="mt-1 text-xs text-stone-500">(Based on fixed overhead &amp; profit per package)</p>
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

<script setup lang="ts">
import { computed, reactive, onMounted, h } from 'vue'

const Chevron = () =>
  h('svg', { class: 'mx-2 size-4', xmlns: 'http://www.w3.org/2000/svg', height: '18', width: '18', viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('polyline', { points: '7.5 16.5 14 10 7.5 3.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ])

const form = reactive({
  packagePrice: 2500,
  laborHours: 25,
  hourlyRate: 50,
  softwareCost: 200,
  pmCost: 300,
  acquisitionCost: 250,
  fixedOverhead: 600,
})

const out = reactive({
  laborCosts: 0,
  variableCosts: 0,
  profit: 0,
  margin: 0,
  minClientsDisplay: '2' as string | number,
})

const valueColorClass = computed(() => {
  if (out.profit <= 0) return 'text-red-600'
  if (out.margin < 20) return 'text-yellow-600'
  return 'text-emerald-600'
})

function formatMoney(value: number) {
  return (
    '$' +
    value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}

function calculate() {
  const packagePrice = form.packagePrice || 0
  const laborHours = form.laborHours || 0
  const hourlyRate = form.hourlyRate || 0
  const softwareCost = form.softwareCost || 0
  const pmCost = form.pmCost || 0
  const acquisitionCost = form.acquisitionCost || 0
  const fixedOverhead = form.fixedOverhead || 0

  const laborCosts = laborHours * hourlyRate
  const variableCosts = laborCosts + softwareCost + pmCost + acquisitionCost
  const profit = packagePrice - variableCosts
  const margin = packagePrice > 0 ? (profit / packagePrice) * 100 : 0
  const minClients = profit > 0 ? Math.ceil(fixedOverhead / profit) : '∞'

  out.laborCosts = laborCosts
  out.variableCosts = variableCosts
  out.profit = profit
  out.margin = margin
  out.minClientsDisplay = minClients
}

onMounted(() => {
  calculate()
})
</script>
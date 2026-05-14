<template>
  <div class="min-h-screen bg-stone-100 font-sans text-stone-950 antialiased mt-[150px]">
    <main class="pt-10 lg:pt-0 ">
      <section class="pt-10">
        <div class="mx-auto max-w-4xl px-4 pb-8">
          <nav class="flex items-center justify-center text-sm text-stone-600">
            <a href="" class="hover:text-rose-600" target="_blank" rel="noopener noreferrer">Home</a>
            <Chevron class="mx-2 size-4" />
            <a href="/tools" class="hover:text-rose-600" target="_blank" rel="noopener noreferrer">Tools</a>
            <Chevron class="mx-2 size-4" />
            <span>Capacity Calculator</span>
          </nav>
        </div>

        <header class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-20">
          <h1 class="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            Capacity Calculator for productized Agencies
          </h1>
          <p class="mt-3 text-lg text-stone-600 md:text-xl">
            Understand how many packages you can deliver with your current team resources
          </p>
        </header>

        <div class="mx-auto mb-16 max-w-5xl px-4">
          <div class="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm md:flex flex">
            <div class="border-b border-stone-200 p-6 md:w-1/2 md:border-b-0 md:border-r">
              <h2 class="mb-6 text-xl font-semibold text-stone-800">Team Resources</h2>
              <form class="space-y-5" @submit.prevent>
                <div>
                  <label for="specialists" class="mb-1 block text-sm font-semibold">Number of Specialists</label>
                  <input
                    id="specialists"
                    v-model.number="specialists"
                    type="number"
                    min="1"
                    class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label for="productiveHours" class="mb-1 block text-sm font-semibold">Productive Hours per Month (per specialist)</label>
                  <input
                    id="productiveHours"
                    v-model.number="productiveHours"
                    type="number"
                    min="1"
                    class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label for="utilization" class="mb-1 block text-sm font-semibold">Current Utilization (%)</label>
                  <div class="relative mt-1">
                    <input
                      id="utilization"
                      v-model.number="utilization"
                      type="number"
                      min="0"
                      max="100"
                      class="w-full rounded-lg border border-stone-300 py-2 pl-3 pr-10 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="0"
                    />
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-stone-500">%</span>
                  </div>
                </div>

                <div class="mt-6 border-t border-stone-200 pt-4">
                  <h3 class="mb-3 text-lg font-medium text-stone-800">Package Requirements</h3>

                  <div v-for="pkg in packages" :key="pkg.letter" class="mb-4">
                    <div v-if="!isCoreLetter(pkg.letter)" class="cursor-pointer text-right text-xs text-red-600 hover:underline" @click="removePackage(pkg.letter)">
                      Remove
                    </div>
                    <label :for="`package${pkg.letter}Hours`" class="mb-1 block text-sm font-semibold">
                      Package {{ pkg.letter }} Hours (per client/month)
                    </label>
                    <input
                      :id="`package${pkg.letter}Hours`"
                      v-model.number="pkg.hours"
                      type="number"
                      min="0"
                      class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div class="flex justify-center">
                  <button
                    type="button"
                    class="inline-flex items-center border border-transparent text-sm font-medium leading-4 text-orange-600 hover:text-orange-700"
                    @click="addPackage"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Add Another Package
                  </button>
                </div>

                <div class="pt-4">
                  <button
                    type="button"
                    class="text-[#00296B] border-2 border-[#00296B] rounded-full px-6 py-2 text-lg font-semibold hover:bg-[#00296B] hover:text-white transition-all"
                    @click="calculateCapacity"
                  >
                    Calculate Capacity
                  </button>
                </div>
              </form>
            </div>

            <div class="bg-stone-50/50 p-6 md:w-1/2">
              <h2 class="mb-6 text-xl font-semibold text-stone-800">Capacity Analysis</h2>
              <div class="space-y-5">
                <div class="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                  <h3 class="mb-1 text-sm font-semibold">Team Capacity</h3>
                  <p class="text-2xl font-bold text-stone-900">{{ metrics.teamCapacity.toLocaleString() }} hours/month</p>
                </div>

                <div class="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                  <h3 class="mb-1 text-sm font-semibold">Current Utilization</h3>
                  <p class="text-2xl font-bold" :class="utilizationColorClass">
                    {{ Math.round(metrics.currentUsedHours).toLocaleString() }} hours ({{ metrics.utilizationDisplay }}%)
                  </p>
                </div>

                <div class="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                  <h3 class="mb-1 text-sm font-semibold">Available Capacity</h3>
                  <p class="text-2xl font-bold" :class="availableColorClass">
                    {{ Math.round(metrics.availableHours).toLocaleString() }} hours
                  </p>
                </div>

                <div class="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                  <h3 class="mb-1 text-sm font-semibold">Maximum Delivery Capacity</h3>
                  <div class="mt-2 space-y-2">
                    <div v-for="row in perPackage" :key="'max-' + row.letter" class="flex items-center justify-between">
                      <span class="font-medium">Package {{ row.letter }}:</span>
                      <span class="font-bold">{{ row.maxClients.toLocaleString() }} clients</span>
                    </div>
                  </div>
                </div>

                <div class="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                  <h3 class="mb-1 text-sm font-semibold">Additional Capacity</h3>
                  <div class="mt-2 space-y-2">
                    <div v-for="row in perPackage" :key="'add-' + row.letter" class="flex items-center justify-between">
                      <span class="font-medium">Package {{ row.letter }}:</span>
                      <span class="font-bold">{{ row.additionalClients.toLocaleString() }} more clients</span>
                    </div>
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
import { computed, h, reactive, ref } from 'vue'

type Pkg = { letter: string; hours: number }

const specialists = ref(5)
const productiveHours = ref(120)
const utilization = ref(85)

const packages = ref<Pkg[]>([
  { letter: 'A', hours: 25 },
  { letter: 'B', hours: 15 },
])

let nextCharCode = 67

function isCoreLetter(letter: string) {
  return letter === 'A' || letter === 'B'
}

function addPackage() {
  const letter = String.fromCharCode(nextCharCode++)
  packages.value.push({ letter, hours: 20 })
}

function removePackage(letter: string) {
  if (isCoreLetter(letter)) return
  packages.value = packages.value.filter((p) => p.letter !== letter)
}

const metrics = computed(() => {
  const spec = specialists.value || 0
  const prod = productiveHours.value || 0
  const util = utilization.value || 0
  const teamCapacity = spec * prod
  const currentUsedHours = teamCapacity * (util / 100)
  const availableHours = teamCapacity - currentUsedHours
  return {
    teamCapacity,
    currentUsedHours,
    availableHours,
    utilizationDisplay: util.toFixed(1),
  }
})

const perPackage = computed(() => {
  const { teamCapacity, availableHours } = metrics.value
  return packages.value.map((pkg) => {
    const h = pkg.hours || 0
    const maxClients = h > 0 ? Math.floor(teamCapacity / h) : 0
    const additionalClients = h > 0 ? Math.floor(availableHours / h) : 0
    return { letter: pkg.letter, maxClients, additionalClients }
  })
})

const utilizationColorClass = computed(() => {
  const u = utilization.value || 0
  if (u > 95) return 'text-red-600'
  if (u > 85) return 'text-yellow-600'
  return 'text-rose-600'
})

const availableColorClass = computed(() => {
  const { teamCapacity, availableHours } = metrics.value
  if (teamCapacity <= 0) return 'text-emerald-600'
  const pct = (availableHours / teamCapacity) * 100
  if (pct < 5) return 'text-red-600'
  if (pct < 15) return 'text-yellow-600'
  return 'text-emerald-600'
})

function calculateCapacity() {
  /* reactive; no-op — kept for parity with original button */
}

const Chevron = () =>
  h('svg', { class: 'mx-2 size-4', xmlns: 'http://www.w3.org/2000/svg', height: '18', width: '18', viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('polyline', { points: '7.5 16.5 14 10 7.5 3.5', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ])
</script>
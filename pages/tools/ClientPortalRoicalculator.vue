<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
      <section class="mx-auto max-w-5xl px-5 pb-16">
        <!-- Your Agency -->
           <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Client Portal ROI <br>Calculator for Agencies</h1>
        <p class="mt-4 text-lg text-stone-600">See what a portal could save your agency in time, cash flow, and client retention.</p>
      </div>
        <div class="mb-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-bold text-[#233267]">Your Agency</h2>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label for="team-size" class="mb-2 block text-sm font-semibold">Team size</label>
              <input
                id="team-size"
                v-model.number="form.teamSize"
                type="number"
                min="1"
                max="200"
                class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                @input="autoSelectPlan"
              />
            </div>
            <div>
              <label for="num-clients" class="mb-2 block text-sm font-semibold">Active clients</label>
              <input
                id="num-clients"
                v-model.number="form.numClients"
                type="number"
                min="1"
                max="500"
                class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              />
            </div>
            <div>
              <label for="avg-client-value" class="mb-2 block text-sm font-semibold">Avg client value/year</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                <input
                  id="avg-client-value"
                  v-model.number="form.avgClientValue"
                  type="number"
                  min="500"
                  class="w-full rounded-lg border border-stone-300 py-2 pl-7 pr-3 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label for="hourly-rate" class="mb-2 block text-sm font-semibold">Hourly rate (loaded)</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                <input
                  id="hourly-rate"
                  v-model.number="form.hourlyRate"
                  type="number"
                  min="15"
                  max="300"
                  class="w-full rounded-lg border border-stone-300 py-2 pl-7 pr-3 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
              </div>
              <p class="mt-1 text-xs text-stone-500">
                Include salary, benefits, overhead.
                <a href="" class="text-[#233267] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Not sure?</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Current situation -->
        <div class="mb-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-bold text-[#233267]">Your Current Situation</h2>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label for="status-updates" class="mb-2 block text-sm font-semibold">How often do clients ask for status updates?</label>
              <select
                id="status-updates"
                v-model="form.statusUpdates"
                class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              >
                <option value="multiple-daily">Multiple times daily</option>
                <option value="daily">Daily</option>
                <option value="few-weekly">A few times per week</option>
                <option value="rarely">Rarely</option>
              </select>
            </div>
            <div>
              <label for="support-questions" class="mb-2 block text-sm font-semibold">How often do clients ask questions a portal FAQ could answer?</label>
              <select
                id="support-questions"
                v-model="form.supportQuestions"
                class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              >
                <option value="constantly">Constantly — it's a huge time sink</option>
                <option value="often">Often — several per week</option>
                <option value="sometimes">Sometimes — a few per month</option>
                <option value="rarely">Rarely — clients are self-sufficient</option>
              </select>
            </div>
            <div>
              <label for="payment-speed" class="mb-2 block text-sm font-semibold">How long do clients typically take to pay invoices?</label>
              <select
                id="payment-speed"
                v-model="form.paymentSpeed"
                class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                @change="handlePaymentSpeedChange"
              >
                <option value="under-30">Under 30 days</option>
                <option value="30-45">30-45 days</option>
                <option value="45-60">45-60 days</option>
                <option value="60-plus">60+ days</option>
              </select>
              <p v-show="showPaymentCaveat" class="mt-1 text-xs text-amber-600">
                Note: A portal won't fix clients with rigid AP policies, but it removes friction for those who'd pay faster with clarity.
              </p>
            </div>
            <div>
              <label for="clients-lost" class="mb-2 block text-sm font-semibold">Clients lost in the past 12 months</label>
              <input
                id="clients-lost"
                v-model.number="form.clientsLost"
                type="number"
                min="0"
                class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Portal costs -->
        <div class="mb-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-bold text-[#233267]">Portal Costs</h2>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label for="spp-plan" class="mb-2 block text-sm font-semibold">Which plan fits your team?</label>
              <select
                id="spp-plan"
                v-model="form.plan"
                class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                @change="handlePlanChange"
              >
                <option value="129">Basic ($129/mo) - Up to 5</option>
                <option value="299">Pro ($299/mo) - Up to 10</option>
                <option value="1500">Plus ($1,500/mo) - Up to 50</option>
                <option value="custom">Custom pricing</option>
              </select>
              <p v-show="planNote" class="mt-1 text-xs text-stone-500">{{ planNote }}</p>
            </div>
            <div v-show="isCustomPlan">
              <label for="custom-plan-cost" class="mb-2 block text-sm font-semibold">Monthly cost</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                <input
                  id="custom-plan-cost"
                  v-model.number="form.customPlanCost"
                  type="number"
                  min="100"
                  class="w-full rounded-lg border border-stone-300 py-2 pl-7 pr-3 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label for="implementation-hours" class="mb-2 block text-sm font-semibold">Estimated hours for setup and training</label>
              <input
                id="implementation-hours"
                v-model.number="form.implementationHours"
                type="number"
                min="5"
                max="100"
                class="w-full rounded-lg border border-stone-300 px-3 py-2 shadow-sm focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              />
              <p class="mt-1 text-xs text-stone-500">
                Most agencies spend 10-20 hours on initial setup, branding, and team training.
              </p>
            </div>
          </div>
        </div>

        <div class="mb-12 text-center">
          <button
            type="button"
            class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#fff] hover:text-[#233267] hover:border-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267] focus:ring-offset-[#233267]"
            @click="calculateROI"
          >
            Calculate ROI
          </button>
        </div>

        <!-- Results -->
        <div v-show="showResults" ref="resultsEl" class="mb-16">
          <div class="mb-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 class="mb-6 text-center text-2xl font-bold text-[#233267]">Your Estimated Client Portal ROI</h2>

            <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div class="rounded-xl border border-stone-200 bg-stone-50 p-5 text-center shadow-sm">
                <h3 class="text-sm font-medium uppercase text-stone-500">Time Savings</h3>
                <p class="mt-2 text-2xl font-bold text-orange-600">{{ formatCurrency(r.timeLow) }} - {{ formatCurrency(r.timeHigh) }}</p>
                <p class="text-xs text-stone-500">/year</p>
              </div>
              <div class="rounded-xl border border-stone-200 bg-stone-50 p-5 text-center shadow-sm">
                <h3 class="text-sm font-medium uppercase text-stone-500">Cash Flow Improvement</h3>
                <p class="mt-2 text-2xl font-bold text-emerald-600">{{ formatCurrency(r.cashLow) }} - {{ formatCurrency(r.cashHigh) }}</p>
                <p class="text-xs text-stone-500">/year</p>
              </div>
              <div class="rounded-xl border border-stone-200 bg-stone-50 p-5 text-center shadow-sm">
                <h3 class="text-sm font-medium uppercase text-stone-500">Portal Cost (Year 1)</h3>
                <p class="mt-2 text-2xl font-bold text-stone-700">{{ formatCurrency(r.totalYear1Cost) }}</p>
                <p class="text-xs text-stone-500">total</p>
              </div>
              <div class="rounded-xl border border-stone-200 bg-stone-50 p-5 text-center shadow-sm">
                <h3 class="text-sm font-medium uppercase text-stone-500">Estimated ROI</h3>
                <p class="mt-2 text-2xl font-bold text-rose-600">{{ Math.round(r.roiLow) }} - {{ Math.round(r.roiHigh) }}%</p>
                <p class="text-xs text-stone-500">first year</p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div class="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <h3 class="mb-4 flex items-center text-lg font-semibold text-stone-800">
                  <svg class="mr-2 size-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Time Savings
                </h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-[#233267]">Hours recovered</span>
                    <span class="font-medium">{{ formatNumber(r.hoursLow) }} - {{ formatNumber(r.hoursHigh) }} hrs/year</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-[#233267]">Value at your rate</span>
                    <span class="font-medium text-orange-600">{{ formatCurrency(r.timeLow) }} - {{ formatCurrency(r.timeHigh) }}</span>
                  </div>
                </div>
              </div>

              <div class="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <h3 class="mb-4 flex items-center text-lg font-semibold text-[#233267]">
                  <svg class="mr-2 size-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cash Flow Improvement
                </h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-stone-600">Potential DSO reduction</span>
                    <span class="font-medium">{{ r.dsoLow }} - {{ r.dsoHigh }} days</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-stone-600">Working capital freed</span>
                    <span class="font-medium text-emerald-600">{{ formatCurrency(r.cashLow) }} - {{ formatCurrency(r.cashHigh) }}</span>
                  </div>
                </div>
              </div>

              <div v-if="form.clientsLost > 0" class="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <h3 class="mb-4 flex items-center text-lg font-semibold text-[#233267]">
                  <svg class="mr-2 size-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Retention Upside
                </h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-stone-600">Clients lost last year</span>
                    <span class="font-medium">{{ form.clientsLost }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-stone-600">Lost revenue</span>
                    <span class="font-medium text-red-600">{{ formatCurrency(r.churnedRevenue) }}</span>
                  </div>
                  <div class="mt-2 rounded border border-stone-200 bg-white p-2 text-stone-700">
                    If the portal helps retain just 1 client:
                    <strong>+{{ formatCurrency(r.retentionPerClient) }}/year</strong>
                  </div>
                </div>
              </div>

              <div v-else class="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <h3 class="mb-4 flex items-center text-lg font-semibold text-stone-800">
                  <svg class="mr-2 size-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Retention
                </h3>
                <p class="text-sm text-stone-600">
                  You reported no client losses last year — great retention! A portal can help keep it that way.
                </p>
              </div>

              <div class="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <h3 class="mb-4 flex items-center text-lg font-semibold text-[#233267]">
                  <svg class="mr-2 size-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Portal Costs (Year 1)
                </h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-stone-600">Subscription (12 months)</span>
                    <span class="font-medium">{{ formatCurrency(r.subscriptionAnnual) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-stone-600">Implementation</span>
                    <span class="font-medium">{{ formatCurrency(r.implementationCost) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-stone-600">Ongoing management</span>
                    <span class="font-medium">{{ formatCurrency(r.ongoingManagement) }}</span>
                  </div>
                  <div class="flex justify-between border-t border-stone-200 pt-2">
                    <span class="font-medium text-stone-800">Total</span>
                    <span class="font-bold">{{ formatCurrency(r.totalYear1Cost) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
              <div class="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
                <div>
                  <p class="text-sm font-medium uppercase text-stone-500">Total Potential Value</p>
                  <p class="mt-1 text-3xl font-bold text-orange-600">{{ formatCurrency(r.totalValueLow) }} - {{ formatCurrency(r.totalValueHigh) }}</p>
                  <p class="text-sm text-stone-500">/year</p>
                </div>
                <div>
                  <p class="text-sm font-medium uppercase text-stone-500">Estimated ROI</p>
                  <p class="mt-1 text-3xl font-bold text-rose-600">{{ Math.round(r.roiLow) }} - {{ Math.round(r.roiHigh) }}%</p>
                  <p class="text-sm text-stone-500">first year</p>
                </div>
                <div>
                  <p class="text-sm font-medium uppercase text-stone-500">Breakeven</p>
                  <p class="mt-1 text-3xl font-bold text-emerald-600">~{{ r.breakevenMonths.toFixed(1) }} months</p>
                  <p class="text-sm text-stone-500">estimated</p>
                </div>
              </div>
              <div class="mt-6 rounded-lg bg-white p-4 text-center text-stone-700 shadow-inner">{{ roiMessage }}</div>
            </div>

            <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                class="inline-flex items-center rounded-lg border border-[#233267] bg-white px-6 py-3 font-semibold text-[#233267] shadow-sm transition hover:-translate-y-px hover:shadow-md"
                @click="copyShareLink"
              >
                <svg class="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Link
              </button>
              <a
                href=""
                class="inline-flex items-center rounded-lg border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the Full Guide
                <svg class="ml-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    <!-- Toast -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="toast"
          class="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-[#233267] px-5 py-3 font-medium text-white shadow-lg"
        >
          <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ toast }}
        </div>
      </Transition>
    </Teleport>
  </div>
   <Faqs/>
</template>

<script setup lang="ts">
import Faqs from '~/components/Sections/Faqs.vue'
import breadcrumb from '~/components/Sections/breadcrumb.vue'
definePageMeta({ layout: 'tools' })

import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()

const resultsEl = ref<HTMLElement | null>(null)
const showResults = ref(false)
const toast = ref('')

const statusUpdateMapping: Record<string, { low: number; high: number }> = {
  'multiple-daily': { low: 8, high: 10 },
  daily: { low: 5, high: 7 },
  'few-weekly': { low: 3, high: 5 },
  rarely: { low: 1, high: 2 },
}

const supportQuestionMapping: Record<string, { low: number; high: number }> = {
  constantly: { low: 15, high: 20 },
  often: { low: 8, high: 12 },
  sometimes: { low: 4, high: 6 },
  rarely: { low: 1, high: 3 },
}

const paymentSpeedMapping: Record<string, { low: number; high: number }> = {
  'under-30': { low: 1, high: 2 },
  '30-45': { low: 3, high: 5 },
  '45-60': { low: 5, high: 7 },
  '60-plus': { low: 5, high: 10 },
}

const form = reactive({
  teamSize: 10,
  numClients: 20,
  avgClientValue: 12000,
  hourlyRate: 60,
  statusUpdates: 'few-weekly' as keyof typeof statusUpdateMapping,
  supportQuestions: 'often' as keyof typeof supportQuestionMapping,
  paymentSpeed: '30-45' as keyof typeof paymentSpeedMapping,
  clientsLost: 3,
  plan: '299' as '129' | '299' | '1500' | 'custom',
  customPlanCost: 2000,
  implementationHours: 15,
})

const planNote = ref('')
const isCustomPlan = computed(() => form.plan === 'custom')
const showPaymentCaveat = computed(() => form.paymentSpeed === '60-plus')

const r = reactive({
  timeLow: 0,
  timeHigh: 0,
  cashLow: 0,
  cashHigh: 0,
  totalYear1Cost: 0,
  roiLow: 0,
  roiHigh: 0,
  hoursLow: 0,
  hoursHigh: 0,
  dsoLow: 0,
  dsoHigh: 0,
  churnedRevenue: 0,
  retentionPerClient: 0,
  subscriptionAnnual: 0,
  implementationCost: 0,
  ongoingManagement: 0,
  totalValueLow: 0,
  totalValueHigh: 0,
  breakevenMonths: 0,
})

const roiMessage = ref('')

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)
}

function autoSelectPlan() {
  const teamSize = form.teamSize || 10
  if (teamSize <= 5) {
    form.plan = '129'
    planNote.value = ''
  } else if (teamSize <= 10) {
    form.plan = '299'
    planNote.value = ''
  } else if (teamSize <= 50) {
    form.plan = '1500'
    planNote.value = ''
  } else {
    form.plan = '1500'
    planNote.value = 'For teams over 50, contact us for custom pricing.'
  }
}

function handlePlanChange() {
  /* v-model handles plan; custom fields shown via isCustomPlan */
}

function handlePaymentSpeedChange() {
  /* caveat is derived from showPaymentCaveat */
}

function monthlyPlanCost(): number {
  if (form.plan === 'custom') return form.customPlanCost || 2000
  return parseFloat(form.plan) || 299
}

function getROIMessage(roiLow: number, roiHigh: number) {
  const avgRoi = (roiLow + roiHigh) / 2
  if (avgRoi > 500) {
    return 'These numbers look strong. Even at the conservative end, the portal pays for itself quickly.'
  }
  if (avgRoi > 200) {
    return 'Solid ROI potential. Most agencies in your situation see breakeven within 3-4 months.'
  }
  if (avgRoi > 100) {
    return 'Moderate ROI. The portal will likely pay for itself within the first year, with gains compounding in year 2.'
  }
  return 'Based on your inputs, ROI may take longer to materialize. Consider whether your current workflow has enough friction to justify the switch.'
}

function calculateROI() {
  const teamSize = form.teamSize || 10
  const numClients = form.numClients || 20
  const avgClientValue = form.avgClientValue || 12000
  const hourlyRate = form.hourlyRate || 60
  const clientsLost = form.clientsLost || 0
  const implementationHours = form.implementationHours || 15

  const statusMapping = statusUpdateMapping[form.statusUpdates]
  const supportMapping = supportQuestionMapping[form.supportQuestions]
  const dsoMapping = paymentSpeedMapping[form.paymentSpeed]

  const mPlan = monthlyPlanCost()

  const adminHoursSavedLow = statusMapping.low * 52
  const adminHoursSavedHigh = statusMapping.high * 52
  const supportHoursSavedLow = supportMapping.low * 12
  const supportHoursSavedHigh = supportMapping.high * 12
  const totalHoursSavedLow = adminHoursSavedLow + supportHoursSavedLow
  const totalHoursSavedHigh = adminHoursSavedHigh + supportHoursSavedHigh
  const timeSavingsValueLow = totalHoursSavedLow * hourlyRate
  const timeSavingsValueHigh = totalHoursSavedHigh * hourlyRate

  const monthlyRevenue = (numClients * avgClientValue) / 12
  const dailyRevenue = monthlyRevenue / 30
  const dsoImprovementLow = dsoMapping.low
  const dsoImprovementHigh = dsoMapping.high
  const cashFlowValueLow = dailyRevenue * dsoImprovementLow
  const cashFlowValueHigh = dailyRevenue * dsoImprovementHigh

  const churnedRevenue = clientsLost * avgClientValue
  const retentionUpsidePerClient = avgClientValue

  const subscriptionAnnual = mPlan * 12
  const implementationCost = implementationHours * hourlyRate
  const ongoingManagement = 2.5 * 12 * hourlyRate
  const totalYear1Cost = subscriptionAnnual + implementationCost + ongoingManagement

  const totalValueLow = timeSavingsValueLow + cashFlowValueLow
  const totalValueHigh = timeSavingsValueHigh + cashFlowValueHigh + retentionUpsidePerClient
  const roiLow = ((totalValueLow - totalYear1Cost) / totalYear1Cost) * 100
  const roiHigh = ((totalValueHigh - totalYear1Cost) / totalYear1Cost) * 100

  const monthlyValueAvg = (timeSavingsValueLow + timeSavingsValueHigh) / 2 / 12
  const breakevenMonths = monthlyValueAvg > 0 ? totalYear1Cost / monthlyValueAvg : 99

  r.timeLow = timeSavingsValueLow
  r.timeHigh = timeSavingsValueHigh
  r.cashLow = cashFlowValueLow
  r.cashHigh = cashFlowValueHigh
  r.totalYear1Cost = totalYear1Cost
  r.roiLow = roiLow
  r.roiHigh = roiHigh
  r.hoursLow = totalHoursSavedLow
  r.hoursHigh = totalHoursSavedHigh
  r.dsoLow = dsoImprovementLow
  r.dsoHigh = dsoImprovementHigh
  r.churnedRevenue = churnedRevenue
  r.retentionPerClient = retentionUpsidePerClient
  r.subscriptionAnnual = subscriptionAnnual
  r.implementationCost = implementationCost
  r.ongoingManagement = ongoingManagement
  r.totalValueLow = totalValueLow
  r.totalValueHigh = totalValueHigh
  r.breakevenMonths = breakevenMonths

  roiMessage.value = getROIMessage(roiLow, roiHigh)

  showResults.value = true
  nextTick(() => {
    resultsEl.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

function buildQuery() {
  const q: Record<string, string> = {
    team: String(form.teamSize),
    clients: String(form.numClients),
    value: String(form.avgClientValue),
    rate: String(form.hourlyRate),
    status: form.statusUpdates,
    support: form.supportQuestions,
    payment: form.paymentSpeed,
    churn: String(form.clientsLost),
    plan: form.plan,
    hours: String(form.implementationHours),
  }
  if (form.plan === 'custom') q.customCost = String(form.customPlanCost)
  return q
}

function generateShareLink() {
  if (import.meta.client) {
    const params = new URLSearchParams(buildQuery() as Record<string, string>)
    return `${window.location.origin}${route.path}?${params.toString()}`
  }
  return ''
}

async function copyShareLink() {
  const link = generateShareLink()
  try {
    await navigator.clipboard.writeText(link)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = link
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  toast.value = 'Link copied to clipboard!'
  setTimeout(() => {
    toast.value = ''
  }, 2700)
}

function loadFromUrl() {
  const q = route.query
  if (!q.team) return

  form.teamSize = Number(q.team) || form.teamSize
  form.numClients = Number(q.clients) || form.numClients
  form.avgClientValue = Number(q.value) || form.avgClientValue
  form.hourlyRate = Number(q.rate) || form.hourlyRate
  if (typeof q.status === 'string') form.statusUpdates = q.status as typeof form.statusUpdates
  if (typeof q.support === 'string') form.supportQuestions = q.support as typeof form.supportQuestions
  if (typeof q.payment === 'string') form.paymentSpeed = q.payment as typeof form.paymentSpeed
  form.clientsLost = Number(q.churn) ?? form.clientsLost
  if (typeof q.plan === 'string' && ['129', '299', '1500', 'custom'].includes(q.plan)) {
    form.plan = q.plan as typeof form.plan
  }
  form.implementationHours = Number(q.hours) || form.implementationHours
  if (q.plan === 'custom' && q.customCost) {
    form.customPlanCost = Number(q.customCost) || form.customPlanCost
  }

  setTimeout(() => calculateROI(), 100)
}

onMounted(() => {
  loadFromUrl()
})

watch(
  () => ({ ...route.query }),
  () => loadFromUrl(),
  { deep: true },
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
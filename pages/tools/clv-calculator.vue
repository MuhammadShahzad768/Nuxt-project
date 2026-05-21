<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
   <breadcrumb/>
      <div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Client Lifetime Value Calculator for Agencies</h1>
        <p class="mt-4 text-lg text-neutral-600">Determine the true value of your clients over the entire relationship</p>
      </div>
        <div class="mx-auto max-w-7xl px-5">
          <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-[#233267]">Client Revenue Information</h2>

              <div class="space-y-4">
                <div>
                  <label class="mb-3 block text-sm font-semibold">Client Type</label>
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <label
                      class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm"
                      :class="clientType === 'retainer' ? 'ring-2 ring-[#233267]' : ''"
                    >
                      <input v-model="clientType" type="radio" value="retainer" class="peer sr-only" />
                      <span class="flex flex-1">
                        <span class="flex flex-col">
                          <span class="mb-1 flex items-center text-sm font-semibold">
                            <svg class="mr-2 flex-none" xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20">
                              <g fill="currentColor">
                                <path
                                  d="m5.101,15c1.263,1.237,2.992,2,4.899,2,3.866,0,7-3.134,7-7"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                />
                                <polygon
                                  points="15.633 3.044 16.229 6.798 12.484 6.145 15.633 3.044"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  fill="currentColor"
                                />
                                <path
                                  d="m14.899,5c-1.263-1.237-2.992-2-4.899-2-3.866,0-7,3.134-7,7"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                />
                                <polygon
                                  points="4.367 16.956 3.771 13.202 7.516 13.855 4.367 16.956"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                />
                              </g>
                            </svg>
                            Retainer
                          </span>
                          <span class="mt-1 flex items-center text-sm">Monthly recurring revenue</span>
                        </span>
                      </span>
                      <span
                        class="pointer-events-none absolute -inset-px rounded-lg border border-[#233267] opacity-0 peer-checked:opacity-100"
                        aria-hidden="true"
                      />
                    </label>

                    <label
                      class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm"
                      :class="clientType === 'project' ? 'ring-2 ring-[#233267]' : ''"
                    >
                      <input v-model="clientType" type="radio" value="project" class="peer sr-only" />
                      <span class="flex flex-1">
                        <span class="flex flex-col">
                          <span class="mb-1 flex items-center text-sm font-semibold">
                            <svg class="mr-2 flex-none" xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 18 18">
                              <g fill="currentColor">
                                <path
                                  opacity="0.4"
                                  d="M5.0001 7.74994C5.0001 6.23334 6.2335 4.99994 7.7501 4.99994H13.6393L13.3988 3.35199C13.1791 1.85199 11.7767 0.812986 10.2806 1.02839L3.35379 2.03901C2.62629 2.14541 1.9847 2.52783 1.5452 3.11713C1.1067 3.70603 0.923106 4.43116 1.02961 5.15766L2.04032 12.0839C2.14582 12.811 2.52861 13.453 3.11841 13.892C3.59791 14.2494 4.1672 14.4374 4.7551 14.4374C4.8363 14.4374 4.9182 14.4268 5 14.4199L5.0001 7.74994Z"
                                />
                                <path
                                  d="M14.2501 4.5H7.25012C5.73352 4.5 4.50012 5.7334 4.50012 7.25V14.25C4.50012 15.7666 5.73352 17 7.25012 17H14.2501C15.7667 17 17.0001 15.7666 17.0001 14.25V7.25C17.0001 5.7334 15.7667 4.5 14.2501 4.5ZM13.8517 8.95166L10.4552 13.4517C10.3273 13.6216 10.1329 13.7286 9.92203 13.7471C9.89953 13.7491 9.87813 13.75 9.85663 13.75C9.66713 13.75 9.48454 13.6787 9.34494 13.5488L7.73553 12.0488C7.43283 11.7661 7.41623 11.2914 7.69843 10.9886C7.98063 10.6849 8.45724 10.6698 8.75894 10.951L9.75894 11.8837L12.6544 8.04834C12.9034 7.71724 13.3732 7.65075 13.7052 7.90125C14.0353 8.15075 14.1017 8.62106 13.8517 8.95166Z"
                                />
                              </g>
                            </svg>
                            Projects
                          </span>
                          <span class="mt-1 flex items-center text-sm">Individual project engagements</span>
                        </span>
                      </span>
                      <span
                        class="pointer-events-none absolute -inset-px rounded-lg border border-[#233267] opacity-0 peer-checked:opacity-100"
                        aria-hidden="true"
                      />
                    </label>

                    <label
                      class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm"
                      :class="clientType === 'hybrid' ? 'ring-2 ring-[#233267]' : ''"
                    >
                      <input v-model="clientType" type="radio" value="hybrid" class="peer sr-only" />
                      <span class="flex flex-1">
                        <span class="flex flex-col">
                          <span class="mb-1 flex items-center text-sm font-semibold">
                            <svg class="mr-2 flex-none" xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20">
                              <g fill="currentColor">
                                <line x1="14" y1="3" x2="6" y2="3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                <line x1="14" y1="17" x2="6" y2="17" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                <path
                                  d="m15,6H5c-1.654,0-3,1.346-3,3v2c0,1.654,1.346,3,3,3h10c1.654,0,3-1.346,3-3v-2c0-1.654-1.346-3-3-3Zm-1,5H6c-.553,0-1-.448-1-1s.447-1,1-1h8c.553,0,1,.448,1,1s-.447,1-1,1Z"
                                  stroke-width="0"
                                  fill="currentColor"
                                />
                              </g>
                            </svg>
                            Hybrid
                          </span>
                          <span class="mt-1 flex items-center text-sm">Projects + Retainer</span>
                        </span>
                      </span>
                      <span
                        class="pointer-events-none absolute -inset-px rounded-lg border border-indigo-500 opacity-0 peer-checked:opacity-100"
                        aria-hidden="true"
                      />
                    </label>
                  </div>
                </div>

                <div v-show="clientType === 'retainer'">
                  <label for="monthly-retainer" class="mb-1 block text-sm font-semibold">Monthly Retainer Value ($)</label>
                  <input
                    id="monthly-retainer"
                    v-model.number="monthlyRetainer"
                    type="number"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                </div>

                <div v-show="clientType === 'project'">
                  <div>
                    <label for="avg-project-value" class="mb-1 block text-sm font-semibold">Average Project Value ($)</label>
                    <input
                      id="avg-project-value"
                      v-model.number="avgProjectValue"
                      type="number"
                      class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    />
                  </div>
                  <div class="mt-3">
                    <label for="projects-per-year" class="mb-1 block text-sm font-semibold">Average Projects Per Year</label>
                    <input
                      id="projects-per-year"
                      v-model.number="projectsPerYear"
                      type="number"
                      min="0"
                      step="0.5"
                      class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div v-show="clientType === 'hybrid'">
                  <div>
                    <label for="hybrid-retainer" class="mb-1 block text-sm font-semibold">Monthly Retainer Value ($)</label>
                    <input
                      id="hybrid-retainer"
                      v-model.number="hybridRetainer"
                      type="number"
                      class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    />
                  </div>
                  <div class="mt-3">
                    <label for="hybrid-project-value" class="mb-1 block text-sm font-semibold">Average Project Value ($)</label>
                    <input
                      id="hybrid-project-value"
                      v-model.number="hybridProjectValue"
                      type="number"
                      class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    />
                  </div>
                  <div class="mt-3">
                    <label for="hybrid-projects-per-year" class="mb-1 block text-sm font-semibold">Average Projects Per Year</label>
                    <input
                      id="hybrid-projects-per-year"
                      v-model.number="hybridProjectsPerYear"
                      type="number"
                      min="0"
                      step="0.5"
                      class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label for="relationship-length" class="mb-1 block text-sm font-semibold">Expected Relationship Length (months)</label>
                  <input
                    id="relationship-length"
                    v-model.number="relationshipLength"
                    type="number"
                    min="1"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label for="upsell-value" class="mb-1 block text-sm font-semibold">Average Annual Upsell/Cross-sell ($)</label>
                  <input
                    id="upsell-value"
                    v-model.number="upsellValue"
                    type="number"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-[#233267]">Service &amp; Acquisition Costs</h2>

              <div class="space-y-4">
                <div>
                  <label for="profit-margin" class="mb-1 block text-sm font-semibold">Average Profit Margin (%)</label>
                  <input
                    id="profit-margin"
                    v-model.number="profitMargin"
                    type="number"
                    min="0"
                    max="100"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                  <p class="mt-1 text-xs text-stone-600">Or enter specific costs below</p>
                </div>

                <div>
                  <label for="service-delivery-costs" class="mb-1 block text-sm font-semibold">Monthly Service Delivery Costs ($)</label>
                  <input
                    id="service-delivery-costs"
                    v-model.number="serviceDeliveryCosts"
                    type="number"
                    placeholder="Enter to override profit margin"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label for="acquisition-cost" class="mb-1 block text-sm font-semibold">Client Acquisition Cost ($)</label>
                  <input
                    id="acquisition-cost"
                    v-model.number="acquisitionCost"
                    type="number"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label for="onboarding-cost" class="mb-1 block text-sm font-semibold">Client Onboarding Cost ($)</label>
                  <input
                    id="onboarding-cost"
                    v-model.number="onboardingCost"
                    type="number"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label for="retention-cost-percent" class="mb-1 block text-sm font-semibold">Monthly Retention Costs (% of Revenue)</label>
                  <input
                    id="retention-cost-percent"
                    v-model.number="retentionCostPercent"
                    type="number"
                    min="0"
                    max="100"
                    class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-bold text-[#233267]">Additional Value Factors</h2>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label for="referral-probability" class="mb-1 block text-sm font-semibold">Referral Probability (%)</label>
                <input
                  id="referral-probability"
                  v-model.number="referralProbability"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label for="referral-value" class="mb-1 block text-sm font-semibold">Average Value of a Referral ($)</label>
                <input
                  id="referral-value"
                  v-model.number="referralValue"
                  type="number"
                  class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label for="churn-probability" class="mb-1 block text-sm font-semibold">Annual Churn Probability (%)</label>
                <input
                  id="churn-probability"
                  v-model.number="churnProbability"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label for="discount-rate" class="mb-1 block text-sm font-semibold">Annual Discount Rate (%)</label>
                <input
                  id="discount-rate"
                  v-model.number="discountRate"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
                <p class="mt-1 text-xs text-stone-600">For time value of money calculations</p>
              </div>
            </div>
          </div>

          <div class="mb-8 flex justify-center py-8">
            <button
              type="button"
              class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#fff] hover:text-[#233267] hover:border-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]  focus:ring-offset-[#233267]"
              @click="onCalculate"
            >
              Calculate Client Lifetime Value
            </button>
          </div>

          <div v-show="showResults" ref="resultsSection">
            <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h3 class="text-sm font-medium uppercase tracking-wide text-stone-600">Client Lifetime Value</h3>
                <div class="mt-2 flex items-baseline">
                  <span class="text-3xl font-semibold">{{ formatCurrency(out.lifeTimeValue) }}</span>
                </div>
              </div>

              <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h3 class="text-sm font-medium uppercase tracking-wide text-stone-600">Total Lifetime Profit</h3>
                <div class="mt-2 flex items-baseline">
                  <span class="text-3xl font-semibold text-emerald-600">{{ formatCurrency(out.totalProfit) }}</span>
                </div>
              </div>

              <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h3 class="text-sm font-medium uppercase tracking-wide text-stone-600">CAC Payback Period</h3>
                <div class="mt-2 flex items-baseline">
                  <span class="text-3xl font-semibold text-orange-600">{{ out.cacPaybackPeriod }}</span>
                  <span class="ml-1 text-xl font-medium">months</span>
                </div>
              </div>

              <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h3 class="text-sm font-medium uppercase tracking-wide text-stone-600">Max Viable Acquisition Cost</h3>
                <div class="mt-2 flex items-baseline">
                  <span class="text-3xl font-semibold text-orange-600">{{ formatCurrency(out.maxViableCAC) }}</span>
                </div>
              </div>
            </div>

            <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h3 class="mb-4 text-xl font-bold text-[#233267]">Revenue &amp; Cost Breakdown</h3>
                <div class="h-64">
                  <canvas ref="revenueCostCanvas" />
                </div>
                <div class="mt-4 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Total Lifetime Revenue:</span>
                    <span class="text-sm font-semibold">{{ formatCurrency(out.totalRevenue) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Total Service Costs:</span>
                    <span class="text-sm font-semibold">{{ formatCurrency(out.totalCosts) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Acquisition &amp; Onboarding:</span>
                    <span class="text-sm font-semibold">{{ formatCurrency(out.totalAcquisition) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Overall Profit Margin:</span>
                    <span class="text-sm font-semibold">{{ formatPercent(out.overallMargin) }}</span>
                  </div>
                </div>
              </div>

              <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h3 class="mb-4 text-lg font-bold text-[#233267]">Value Over Time</h3>
                <div class="h-64">
                  <canvas ref="valueProjectionCanvas" />
                </div>
                <div class="mt-4 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Average Monthly Revenue:</span>
                    <span class="text-sm font-semibold">{{ formatCurrency(out.avgMonthlyRevenue) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Average Monthly Profit:</span>
                    <span class="text-sm font-semibold">{{ formatCurrency(out.avgMonthlyProfit) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">LTV:CAC Ratio:</span>
                    <span class="text-sm font-semibold">{{ out.ltvCacRatioText }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Referral Value Included:</span>
                    <span class="text-sm font-semibold">{{ formatCurrency(out.totalReferralValue) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 class="mb-4 text-lg font-bold text-[#233267]">Strategic Insights</h3>
              <div class="space-y-4">
                <div
                  v-for="(insight, idx) in insights"
                  :key="idx"
                  class="flex items-start rounded-xl border border-stone-200 p-3"
                >
                  <div :class="insightTextClass(insight.type)">{{ insight.message }}</div>
                </div>
                <div class="mt-4 flex items-start rounded-xl border border-stone-200 p-3">
                  <div>
                    <p class="font-semibold">Top Recommendation:</p>
                    <p>{{ recommendation }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 class="mb-4 text-lg font-bold text-[#233267]">Impact of Variable Changes</h3>
              <div class="h-80">
                <canvas ref="sensitivityCanvas" />
              </div>
              <p class="mt-4 text-sm text-stone-600">
                This chart shows how changes to key variables would impact the total Client Lifetime Value.
              </p>
            </div>
          </div>
        </div>
   
  </div>
   <Faqs/>
</template>

<script setup lang="ts">
import Faqs from '~/components/Sections/Faqs.vue'
import breadcrumb from '~/components/Sections/breadcrumb.vue'
import { nextTick, ref } from 'vue'
import Chart from 'chart.js/auto'
definePageMeta({ layout: 'tools' })

type ClientType = 'retainer' | 'project' | 'hybrid'
type InsightType = 'critical' | 'warning' | 'positive' | 'info'

const clientType = ref<ClientType>('retainer')
const monthlyRetainer = ref(3000)
const avgProjectValue = ref(7500)
const projectsPerYear = ref(12)
const hybridRetainer = ref(3000)
const hybridProjectValue = ref(10000)
const hybridProjectsPerYear = ref(8)
const relationshipLength = ref(12)
const upsellValue = ref(2000)
const profitMargin = ref(40)
const serviceDeliveryCosts = ref<number | null>(null)
const acquisitionCost = ref(6000)
const onboardingCost = ref(2500)
const retentionCostPercent = ref(5)
const referralProbability = ref(15)
const referralValue = ref(15000)
const churnProbability = ref(20)
const discountRate = ref(5)

const showResults = ref(false)
const resultsSection = ref<HTMLElement | null>(null)
const revenueCostCanvas = ref<HTMLCanvasElement | null>(null)
const valueProjectionCanvas = ref<HTMLCanvasElement | null>(null)
const sensitivityCanvas = ref<HTMLCanvasElement | null>(null)

let revenueChart: Chart | null = null
let valueProjectionChart: Chart | null = null
let sensitivityChart: Chart | null = null

const out = ref({
  lifeTimeValue: 0,
  totalProfit: 0,
  cacPaybackPeriod: 0,
  maxViableCAC: 0,
  totalRevenue: 0,
  totalCosts: 0,
  totalAcquisition: 0,
  overallMargin: 0,
  avgMonthlyRevenue: 0,
  avgMonthlyProfit: 0,
  ltvCacRatioText: '0:1',
  totalReferralValue: 0,
  chartPayload: {
    totalRevenue: 0,
    totalCosts: 0,
    totalProfit: 0,
    acquisitionCosts: 0,
    months: [] as number[],
    clientValueByMonth: [] as number[],
    sensitivity: {
      baselineValue: 0,
      monthlyRevenue: 0,
      relationshipLength: 0,
      profitMargin: 0,
      churnProbability: 0,
    },
  },
})

const insights = ref<{ type: InsightType; message: string }[]>([])
const recommendation = ref('')

function formatCurrency(value: number) {
  return (
    '$' +
    value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  )
}

function formatPercent(value: number) {
  return value.toFixed(1) + '%'
}

function insightTextClass(type: InsightType) {
  switch (type) {
    case 'critical':
      return 'text-red-800'
    case 'warning':
      return 'text-yellow-800'
    case 'positive':
      return 'text-emerald-700'
    default:
      return 'text-amber-900'
  }
}

function calculateImpact(
  variable: string,
  changePercent: number,
  baselineValue: number,
  revenue: number,
  length: number,
  margin: number,
  churn: number
) {
  let newValue: number

  if (variable === 'revenue') {
    newValue = revenue * (1 + changePercent)
    return (newValue / revenue - 1) * baselineValue
  }
  if (variable === 'length') {
    return changePercent * baselineValue
  }
  if (variable === 'margin') {
    newValue = margin * (1 + changePercent)
    return (newValue / margin - 1) * baselineValue
  }
  if (variable === 'churn') {
    return -changePercent * baselineValue * 0.5
  }

  return 0
}

function buildInsights(
  _ltv: number,
  _totalProfit: number,
  ltvCacRatio: number,
  cacPayback: number,
  margin: number,
  churn: number,
  relLength: number
) {
  const list: { type: InsightType; message: string }[] = []

  if (ltvCacRatio < 3) {
    list.push({
      type: 'warning',
      message:
        'Your LTV:CAC ratio is below the recommended 3:1 threshold. Consider improving client retention, increasing prices, or finding more cost-effective acquisition channels.',
    })
  } else if (ltvCacRatio > 5) {
    list.push({
      type: 'positive',
      message:
        'Your LTV:CAC ratio is excellent at greater than 5:1. You may have room to invest more aggressively in client acquisition to accelerate growth.',
    })
  } else {
    list.push({
      type: 'info',
      message:
        'Your LTV:CAC ratio is healthy at around 3:1 to 5:1, indicating a sustainable client acquisition model.',
    })
  }

  if (cacPayback > 12) {
    list.push({
      type: 'warning',
      message: `Your CAC payback period of ${cacPayback} months is relatively long. Consider ways to accelerate value delivery or reduce acquisition costs.`,
    })
  } else if (cacPayback < 6) {
    list.push({
      type: 'positive',
      message: `Your CAC payback period of ${cacPayback} months is excellent, allowing for faster reinvestment in growth.`,
    })
  } else {
    list.push({
      type: 'info',
      message: `Your CAC payback period of ${cacPayback} months is reasonable, but look for opportunities to improve cash flow by shortening it further.`,
    })
  }

  if (churn > 30) {
    list.push({
      type: 'critical',
      message: `Your annual churn rate of ${churn}% is concerning. Focus on improving client retention as this has a significant impact on LTV.`,
    })
  } else if (churn < 15) {
    list.push({
      type: 'positive',
      message: `Your annual churn rate of ${churn}% is excellent. Your client retention strategies are working well.`,
    })
  } else {
    list.push({
      type: 'info',
      message: `Your annual churn rate of ${churn}% is within industry norms, but reducing it further would significantly impact LTV.`,
    })
  }

  if (relLength < 12) {
    list.push({
      type: 'warning',
      message:
        'Your expected client relationship length is less than one year. Consider developing long-term retainer offerings to extend client lifetime.',
    })
  } else if (relLength > 36) {
    list.push({
      type: 'positive',
      message:
        'Your long client relationship length is a significant advantage, providing stable revenue and reducing acquisition pressure.',
    })
  }

  if (margin < 30) {
    list.push({
      type: 'warning',
      message: `Your profit margin of ${margin.toFixed(1)}% is relatively low. Consider ways to improve pricing or operational efficiency.`,
    })
  } else if (margin > 50) {
    list.push({
      type: 'positive',
      message: `Your profit margin of ${margin.toFixed(1)}% is excellent, suggesting strong pricing power or operational efficiency.`,
    })
  }

  let rec = ''
  if (ltvCacRatio < 3) {
    rec =
      'Focus on improving your LTV:CAC ratio through better retention strategies, increased upsells, or more efficient acquisition channels.'
  } else if (churn > 30) {
    rec =
      'Prioritize reducing client churn by implementing a proactive client success program and regular business reviews.'
  } else if (cacPayback > 12) {
    rec =
      'Work on accelerating your CAC payback period by frontloading value delivery or adjusting your pricing structure.'
  } else if (margin < 30) {
    rec =
      'Improve your profit margins through operational efficiencies, automation, or strategic price increases where appropriate.'
  } else {
    rec =
      'Your client economics are solid. Consider investing in growth by increasing your marketing budget while maintaining your quality of service.'
  }

  insights.value = list
  recommendation.value = rec
}

function calculateLifetimeValue() {
  const ct = clientType.value
  const relLen = relationshipLength.value || 12
  const upsell = upsellValue.value || 0
  const marginPct = profitMargin.value || 40
  const svc = serviceDeliveryCosts.value
  const acq = acquisitionCost.value || 0
  const onboard = onboardingCost.value || 0
  const retentionPct = retentionCostPercent.value || 0
  const refProb = referralProbability.value || 0
  const refVal = referralValue.value || 0
  const churnPct = churnProbability.value || 0
  const discPct = discountRate.value || 0

  let monthlyRevenue = 0

  if (ct === 'retainer') {
    monthlyRevenue = monthlyRetainer.value || 0
  } else if (ct === 'project') {
    const y = (avgProjectValue.value || 0) * (projectsPerYear.value || 0)
    monthlyRevenue = y / 12
  } else {
    monthlyRevenue = hybridRetainer.value || 0
    const y = (hybridProjectValue.value || 0) * (hybridProjectsPerYear.value || 0)
    monthlyRevenue += y / 12
  }

  const monthlyUpsellValue = upsell / 12

  let monthlyServiceCosts: number
  if (svc != null && svc > 0) {
    monthlyServiceCosts = svc
  } else {
    monthlyServiceCosts = monthlyRevenue * (1 - marginPct / 100)
  }

  const monthlyRetentionCosts = monthlyRevenue * (retentionPct / 100)
  const totalMonthlyServiceCosts = monthlyServiceCosts + monthlyRetentionCosts

  const monthlyChurnRate = churnPct / 100 / 12
  const monthlyDiscountRate = discPct / 100 / 12

  const months = Array.from({ length: relLen }, (_, i) => i + 1)
  const revenueByMonth: number[] = []
  const costsbyMonth: number[] = []
  const profitByMonth: number[] = []
  const cumulativeProfitByMonth: number[] = []
  const discountedProfitByMonth: number[] = []
  const clientValueByMonth: number[] = []

  let remainingProbability = 1
  let totalRevenue = 0
  let totalCosts = 0
  let totalProfit = 0
  let cumulativeProfit = -acq - onboard
  let referralCount = 0

  for (let month = 1; month <= relLen; month++) {
    const adjustedRevenue =
      (monthlyRevenue + monthlyUpsellValue * Math.min(month / 12, Math.floor(month / 12))) * remainingProbability
    revenueByMonth.push(adjustedRevenue)

    const adjustedCosts = totalMonthlyServiceCosts * remainingProbability
    costsbyMonth.push(adjustedCosts)

    const monthlyProfit = adjustedRevenue - adjustedCosts
    profitByMonth.push(monthlyProfit)

    const discountFactor = Math.pow(1 + monthlyDiscountRate, month)
    const discountedProfit = monthlyProfit / discountFactor
    discountedProfitByMonth.push(discountedProfit)

    cumulativeProfit += monthlyProfit
    cumulativeProfitByMonth.push(cumulativeProfit)

    totalRevenue += adjustedRevenue
    totalCosts += adjustedCosts
    totalProfit += discountedProfit

    remainingProbability *= 1 - monthlyChurnRate

    if (month % 12 === 0) {
      const referralGenerated = Math.random() < refProb / 100
      if (referralGenerated) referralCount++
    }

    clientValueByMonth.push(cumulativeProfit)
  }

  const totalReferralValue = referralCount * refVal * (marginPct / 100)
  const lifeTimeValue = totalProfit + totalReferralValue

  const initialCosts = acq + onboard
  let cacPaybackPeriod = 0
  let runningProfit = 0

  for (let i = 0; i < profitByMonth.length; i++) {
    runningProfit += profitByMonth[i]
    if (runningProfit >= initialCosts && cacPaybackPeriod === 0) {
      cacPaybackPeriod = i + 1
      break
    }
  }

  if (cacPaybackPeriod === 0 && runningProfit >= initialCosts) {
    cacPaybackPeriod = profitByMonth.length
  }

  const ltvCacRatio = lifeTimeValue / (acq + onboard)
  const maxViableCAC = lifeTimeValue / 3
  const avgMonthlyRevenue = totalRevenue / relLen
  const avgMonthlyProfit = totalProfit / relLen
  const overallMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0

  out.value = {
    lifeTimeValue,
    totalProfit,
    cacPaybackPeriod,
    maxViableCAC,
    totalRevenue,
    totalCosts,
    totalAcquisition: acq + onboard,
    overallMargin,
    avgMonthlyRevenue,
    avgMonthlyProfit,
    ltvCacRatioText: `${ltvCacRatio.toFixed(1)}:1`,
    totalReferralValue,
    chartPayload: {
      totalRevenue,
      totalCosts,
      totalProfit,
      acquisitionCosts: acq + onboard,
      months,
      clientValueByMonth,
      sensitivity: {
        baselineValue: lifeTimeValue,
        monthlyRevenue,
        relationshipLength: relLen,
        profitMargin: marginPct,
        churnProbability: churnPct,
      },
    },
  }

  buildInsights(lifeTimeValue, totalProfit, ltvCacRatio, cacPaybackPeriod, overallMargin, churnPct, relLen)
}

function renderCharts() {
  const p = out.value.chartPayload

  if (revenueCostCanvas.value) {
    revenueChart?.destroy()
    revenueChart = new Chart(revenueCostCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Revenue', 'Service Costs', 'Profit', 'Acquisition'],
        datasets: [
          {
            label: 'Amount ($)',
            data: [p.totalRevenue, p.totalCosts, p.totalProfit, p.acquisitionCosts],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(239, 68, 68, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(107, 114, 128, 0.7)',
            ],
            borderColor: ['rgb(59, 130, 246)', 'rgb(239, 68, 68)', 'rgb(16, 185, 129)', 'rgb(107, 114, 128)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label(ctx) {
                return formatCurrency(ctx.raw as number)
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback(value) {
                return '$' + Number(value).toLocaleString()
              },
            },
          },
        },
      },
    })
  }

  if (valueProjectionCanvas.value) {
    const ctx = valueProjectionCanvas.value.getContext('2d')
    valueProjectionChart?.destroy()
    const gradient = ctx!.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)')
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0)')

    valueProjectionChart = new Chart(valueProjectionCanvas.value, {
      type: 'line',
      data: {
        labels: p.months,
        datasets: [
          {
            label: 'Cumulative Client Value',
            data: p.clientValueByMonth,
            borderColor: 'rgba(79, 70, 229, 1)',
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label(ctx) {
                return 'Value: ' + formatCurrency(ctx.raw as number)
              },
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Month' },
          },
          y: {
            ticks: {
              callback(value) {
                return '$' + Number(value).toLocaleString()
              },
            },
          },
        },
      },
    })
  }

  if (sensitivityCanvas.value) {
    const s = p.sensitivity
    const revenueImpact = calculateImpact('revenue', 0.1, s.baselineValue, s.monthlyRevenue, s.relationshipLength, s.profitMargin, s.churnProbability)
    const lengthImpact = calculateImpact('length', 0.1, s.baselineValue, s.monthlyRevenue, s.relationshipLength, s.profitMargin, s.churnProbability)
    const marginImpact = calculateImpact('margin', 0.1, s.baselineValue, s.monthlyRevenue, s.relationshipLength, s.profitMargin, s.churnProbability)
    const churnImpact = calculateImpact('churn', -0.1, s.baselineValue, s.monthlyRevenue, s.relationshipLength, s.profitMargin, s.churnProbability)

    sensitivityChart?.destroy()
    sensitivityChart = new Chart(sensitivityCanvas.value, {
      type: 'bar',
      data: {
        labels: ['10% Higher Revenue', '10% Longer Relationship', '10% Higher Margin', '10% Lower Churn'],
        datasets: [
          {
            label: 'Impact on LTV',
            data: [revenueImpact, lengthImpact, marginImpact, churnImpact],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(236, 72, 153, 0.7)',
              'rgba(245, 158, 11, 0.7)',
            ],
            borderColor: ['rgb(59, 130, 246)', 'rgb(16, 185, 129)', 'rgb(236, 72, 153)', 'rgb(245, 158, 11)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label(ctx) {
                return 'Impact: ' + formatCurrency(ctx.raw as number)
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              callback(value) {
                return '$' + Number(value).toLocaleString()
              },
            },
          },
        },
      },
    })
  }
}

async function onCalculate() {
  calculateLifetimeValue()
  showResults.value = true
  await nextTick()
  renderCharts()
  resultsSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

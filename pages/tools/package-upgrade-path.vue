<script setup lang="ts">
import Faqs from '~/components/Sections/Faqs.vue'
import Ready from '~/components/Sections/Ready.vue'

import breadcrumb from '~/components/Sections/breadcrumb.vue'
definePageMeta({ layout: 'tools' })
import { computed, ref } from 'vue'

const currentPackage = ref(1000)
const targetPackage = ref(1500)
const currentMargin = ref(30)
const targetMargin = ref(35)
const currentRetention = ref(8)
const targetRetention = ref(12)
const clientBase = ref(50)
const conversionRate = ref(15)
const hoursPerAttempt = ref(2)
const hourlyRate = ref(75)

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const metrics = computed(() => {
  const cp = Number(currentPackage.value) || 0
  const tp = Number(targetPackage.value) || 0
  const cm = Number(currentMargin.value) || 0
  const tm = Number(targetMargin.value) || 0
  const cr = Number(currentRetention.value) || 0
  const tr = Number(targetRetention.value) || 0
  const conv = Number(conversionRate.value) || 0
  const base = Number(clientBase.value) || 0
  const hours = Number(hoursPerAttempt.value) || 0
  const rate = Number(hourlyRate.value) || 0

  if (
    cp <= 0 ||
    tp <= 0 ||
    conv <= 0 ||
    base <= 0 ||
    cr <= 0 ||
    tr <= 0
  ) {
    return null
  }

  const priceDifference = tp - cp
  const expectedUpgrades = (base * conv) / 100
  const currentProfit = cp * (cm / 100)
  const targetProfit = tp * (tm / 100)
  const profitDifference = targetProfit - currentProfit

  const q1ClientUpgrades = expectedUpgrades
  const q2ClientUpgrades = expectedUpgrades * 2
  const q3ClientUpgrades = expectedUpgrades * 3
  const q4ClientUpgrades = expectedUpgrades * 4

  const q1Revenue = q1ClientUpgrades * priceDifference
  const q2Revenue = q2ClientUpgrades * priceDifference
  const q3Revenue = q3ClientUpgrades * priceDifference
  const q4Revenue = q4ClientUpgrades * priceDifference

  const q1Profit = q1ClientUpgrades * profitDifference
  const q2Profit = q2ClientUpgrades * profitDifference
  const q3Profit = q3ClientUpgrades * profitDifference
  const q4Profit = q4ClientUpgrades * profitDifference

  const annualRevenue = q1Revenue + q2Revenue + q3Revenue + q4Revenue
  const annualProfit = q1Profit + q2Profit + q3Profit + q4Profit

  const costPerAttempt = hours * rate
  const totalAttempts = base
  const totalInvestment = costPerAttempt * totalAttempts
  const roi =
    totalInvestment > 0 ? (annualProfit / totalInvestment) * 100 : 0
  const monthlyProfit = annualProfit / 12
  const paybackMonths =
    monthlyProfit > 0 ? totalInvestment / monthlyProfit : 0

  const currentLifetimeRevenue = cp * cr
  const currentLifetimeProfit = currentLifetimeRevenue * (cm / 100)
  const targetLifetimeRevenue = tp * tr
  const targetLifetimeProfit = targetLifetimeRevenue * (tm / 100)
  const lifetimeRevenueIncrease = targetLifetimeRevenue - currentLifetimeRevenue
  const lifetimeProfitIncrease = targetLifetimeProfit - currentLifetimeProfit
  const revenueMultiplier =
    currentLifetimeRevenue > 0
      ? targetLifetimeRevenue / currentLifetimeRevenue
      : 0
  const profitMultiplier =
    currentLifetimeProfit > 0
      ? targetLifetimeProfit / currentLifetimeProfit
      : 0

  const revCum = [q1Revenue, q1Revenue + q2Revenue, q1Revenue + q2Revenue + q3Revenue, annualRevenue]
  const profCum = [q1Profit, q1Profit + q2Profit, q1Profit + q2Profit + q3Profit, annualProfit]

  return {
    priceDifference,
    profitDifference,
    expectedUpgrades,
    q1Revenue,
    q2Revenue,
    q3Revenue,
    q4Revenue,
    q1Profit,
    q2Profit,
    q3Profit,
    q4Profit,
    annualRevenue,
    annualProfit,
    costPerAttempt,
    totalAttempts,
    totalInvestment,
    roi,
    paybackMonths,
    currentLifetimeRevenue,
    currentLifetimeProfit,
    targetLifetimeRevenue,
    targetLifetimeProfit,
    lifetimeRevenueIncrease,
    lifetimeProfitIncrease,
    revenueMultiplier,
    profitMultiplier,
    revCum,
    profCum,
    hours,
    rate,
    cp,
    tp,
    cr,
    tr,
    cm,
    tm,
  }
})

function calculate() {
  const conv = Number(conversionRate.value)
  if (conv > 100) conversionRate.value = 100
  const cm = Number(currentMargin.value)
  const tm = Number(targetMargin.value)
  if (cm > 100) currentMargin.value = 100
  if (tm > 100) targetMargin.value = 100
  const m = metrics.value
  if (!m) {
    window.alert('Please enter valid positive values for all fields.')
    return
  }
  if (conv > 100) {
    window.alert('Conversion rate cannot exceed 100%.')
    return
  }
  if (cm > 100 || tm > 100) {
    window.alert('Profit margins cannot exceed 100%.')
    return
  }
}
</script>

<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">   
        <section>
       <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Service Standardization ROI Calculator for productized Agencies</h1>
        <p class="mt-4 text-lg text-stone-600">Determine whether investing in systems, templates, and processes is worth the cost by calculating the ROI of standardization investments over time.</p>
      </div>
          <div class="mx-auto mb-16 max-w-7xl p-4">
            <div class="overflow-hidden rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <div class="mb-6">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div class="rounded-xl border border-stone-200 p-3">
                    <h3 class="mb-8 text-lg font-bold text-[#233267]">Package Pricing</h3>
                    <div class="space-y-6">
                      <div>
                        <label for="currentPackage" class="mb-1 block text-sm font-semibold">
                          Current Package Price ($/month)
                        </label>
                        <div class="relative">
                          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                          <input
                            id="currentPackage"
                            v-model.number="currentPackage"
                            type="number"
                            class="w-full rounded-md border border-stone-300 py-2 pr-3 pl-7 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                            placeholder="1000"
                          >
                        </div>
                      </div>
                      <div>
                        <label for="targetPackage" class="mb-1 block text-sm font-semibold">
                          Target Package Price ($/month)
                        </label>
                        <div class="relative">
                          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                          <input
                            id="targetPackage"
                            v-model.number="targetPackage"
                            type="number"
                            class="w-full rounded-md border border-stone-300 py-2 pr-3 pl-7 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                            placeholder="1500"
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-xl border border-stone-200 p-3">
                    <h3 class="mb-8 text-lg font-bold text-[#233267]">Profit Margins</h3>
                    <div class="space-y-6">
                      <div>
                        <label for="currentMargin" class="mb-1 block text-sm font-semibold">
                          Current Package Margin (%)
                        </label>
                        <div class="relative">
                          <input
                            id="currentMargin"
                            v-model.number="currentMargin"
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            class="w-full rounded-md border border-stone-300 py-2 pr-8 pl-3 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                            placeholder="30"
                          >
                          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-stone-500">%</span>
                        </div>
                      </div>
                      <div>
                        <label for="targetMargin" class="mb-1 block text-sm font-semibold">
                          Target Package Margin (%)
                        </label>
                        <div class="relative">
                          <input
                            id="targetMargin"
                            v-model.number="targetMargin"
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            class="w-full rounded-md border border-stone-300 py-2 pr-8 pl-3 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                            placeholder="35"
                          >
                          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-stone-500">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-xl border border-stone-200 p-3">
                    <h3 class="mb-8 text-lg font-bold text-[#233267]">Retention Rates</h3>
                    <div class="space-y-6">
                      <div>
                        <label for="currentRetention" class="mb-1 block text-sm font-semibold">
                          Current Avg. Retention (months)
                        </label>
                        <input
                          id="currentRetention"
                          v-model.number="currentRetention"
                          type="number"
                          min="1"
                          step="0.5"
                          class="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                          placeholder="8"
                        >
                      </div>
                      <div>
                        <label for="targetRetention" class="mb-1 block text-sm font-semibold">
                          Target Avg. Retention (months)
                        </label>
                        <input
                          id="targetRetention"
                          v-model.number="targetRetention"
                          type="number"
                          min="1"
                          step="0.5"
                          class="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                          placeholder="12"
                        >
                      </div>
                    </div>
                  </div>

                  <div class="rounded-xl border border-stone-200 p-3">
                    <h3 class="mb-8 text-lg font-bold text-[#233267]">Client Data</h3>
                    <div class="space-y-6">
                      <div>
                        <label for="clientBase" class="mb-1 block text-sm font-semibold">Current Client Base</label>
                        <input
                          id="clientBase"
                          v-model.number="clientBase"
                          type="number"
                          min="1"
                          class="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                          placeholder="50"
                        >
                      </div>
                      <div>
                        <label for="conversionRate" class="mb-1 block text-sm font-semibold">
                          Upgrade Conversion Rate (%)
                        </label>
                        <div class="relative">
                          <input
                            id="conversionRate"
                            v-model.number="conversionRate"
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            class="w-full rounded-md border border-stone-300 py-2 pr-8 pl-3 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                            placeholder="15"
                          >
                          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-stone-500">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="rounded-xl border border-stone-200 p-3">
                    <h3 class="mb-2 text-lg font-bold text-[#233267]">Upgrade Efforts</h3>
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label for="hoursPerAttempt" class="mb-1 block text-sm font-semibold">
                          Hours Per Upgrade Attempt
                        </label>
                        <input
                          id="hoursPerAttempt"
                          v-model.number="hoursPerAttempt"
                          type="number"
                          min="0.1"
                          step="0.1"
                          class="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                          placeholder="2"
                        >
                      </div>
                      <div>
                        <label for="hourlyRate" class="mb-1 block text-sm font-semibold">Average Hourly Rate ($)</label>
                        <div class="relative">
                          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">$</span>
                          <input
                            id="hourlyRate"
                            v-model.number="hourlyRate"
                            type="number"
                            min="1"
                            class="w-full rounded-md border border-stone-300 py-2 pr-3 pl-7 focus:border-stone-500 focus:ring-1 focus:ring-stone-500 focus:outline-none"
                            placeholder="75"
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-center p-3">
                    <button
                      type="button"
                      class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
                      @click="calculate"
                    >
                      Calculate Upgrade Path
                    </button>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <h2 class="mb-4 text-lg font-bold text-[#233267]">Results</h2>

                <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div class="rounded-xl border border-stone-200 p-4">
                    <h3 class="mb-8 text-sm font-semibold">Package Difference</h3>
                    <div class="flex flex-col space-y-3">
                      <div>
                        <p class="text-xs text-stone-500">Price Difference</p>
                        <p class="mt-1 text-lg font-bold text-stone-900">
                          {{ metrics ? `${formatCurrency(metrics.priceDifference)}/month` : '—' }}
                        </p>
                      </div>
                      <div>
                        <p class="text-xs text-stone-500">Profit Difference</p>
                        <p class="mt-1 text-lg font-bold text-stone-900">
                          {{ metrics ? `${formatCurrency(metrics.profitDifference)}/month` : '—' }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-xl border border-stone-200 p-4">
                    <h3 class="mb-8 text-sm font-semibold">Annual Impact</h3>
                    <div class="flex flex-col space-y-3">
                      <div>
                        <p class="text-xs text-stone-500">Revenue Increase</p>
                        <p class="mt-1 text-lg font-bold text-stone-900">
                          {{ metrics ? formatCurrency(metrics.annualRevenue) : '—' }}
                        </p>
                      </div>
                      <div>
                        <p class="text-xs text-stone-500">Profit Increase</p>
                        <p class="mt-1 text-lg font-bold text-stone-900">
                          {{ metrics ? formatCurrency(metrics.annualProfit) : '—' }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-xl border border-stone-200 p-4">
                    <h3 class="mb-8 text-sm font-semibold">Client Upgrades</h3>
                    <div class="flex h-16 flex-col justify-center">
                      <div>
                        <p class="text-xs text-stone-500">Expected Quarterly Upgrades</p>
                        <p class="mt-1 text-lg font-bold text-stone-900">
                          {{ metrics ? `${metrics.expectedUpgrades.toFixed(1)} clients` : '—' }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-xl border border-stone-200 p-4">
                    <h3 class="mb-8 text-sm font-semibold">ROI on Efforts</h3>
                    <div class="flex flex-col space-y-3">
                      <div>
                        <p class="text-xs text-stone-500">Investment</p>
                        <p class="mt-1 text-lg font-bold text-stone-900">
                          {{ metrics ? formatCurrency(metrics.totalInvestment) : '—' }}
                        </p>
                      </div>
                      <div>
                        <p class="text-xs text-stone-500">ROI</p>
                        <p class="mt-1 text-lg font-bold text-stone-900">
                          {{ metrics ? `${metrics.roi.toFixed(0)}%` : '—' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div class="overflow-hidden rounded-xl border border-stone-200">
                    <div class="border-b border-stone-200 bg-stone-50 px-4 py-3">
                      <h3 class="text-sm font-semibold">Revenue Impact by Quarter</h3>
                    </div>
                    <div class="p-4">
                      <table class="min-w-full divide-y divide-stone-200">
                        <thead>
                          <tr>
                            <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">Quarter</th>
                            <th class="px-3 py-2 text-right text-xs font-medium tracking-wider text-stone-500 uppercase">Revenue</th>
                            <th class="px-3 py-2 text-right text-xs font-medium tracking-wider text-stone-500 uppercase">Cumulative</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-200">
                          <tr>
                            <td class="px-3 py-2 text-sm text-stone-900">Q1</td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.q1Revenue) : '—' }}
                            </td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.revCum[0]) : '—' }}
                            </td>
                          </tr>
                          <tr class="bg-stone-50">
                            <td class="px-3 py-2 text-sm text-stone-900">Q2</td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.q2Revenue) : '—' }}
                            </td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.revCum[1]) : '—' }}
                            </td>
                          </tr>
                          <tr>
                            <td class="px-3 py-2 text-sm text-stone-900">Q3</td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.q3Revenue) : '—' }}
                            </td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.revCum[2]) : '—' }}
                            </td>
                          </tr>
                          <tr class="bg-stone-50">
                            <td class="px-3 py-2 text-sm text-stone-900">Q4</td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.q4Revenue) : '—' }}
                            </td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.revCum[3]) : '—' }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="overflow-hidden rounded-xl border border-stone-200">
                    <div class="border-b border-stone-200 bg-stone-50 px-4 py-3">
                      <h3 class="text-sm font-semibold">Profit Impact by Quarter</h3>
                    </div>
                    <div class="p-4">
                      <table class="min-w-full divide-y divide-stone-200">
                        <thead>
                          <tr>
                            <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">Quarter</th>
                            <th class="px-3 py-2 text-right text-xs font-medium tracking-wider text-stone-500 uppercase">Profit</th>
                            <th class="px-3 py-2 text-right text-xs font-medium tracking-wider text-stone-500 uppercase">Cumulative</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-200">
                          <tr>
                            <td class="px-3 py-2 text-sm text-stone-900">Q1</td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.q1Profit) : '—' }}
                            </td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.profCum[0]) : '—' }}
                            </td>
                          </tr>
                          <tr class="bg-stone-50">
                            <td class="px-3 py-2 text-sm text-stone-900">Q2</td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.q2Profit) : '—' }}
                            </td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.profCum[1]) : '—' }}
                            </td>
                          </tr>
                          <tr>
                            <td class="px-3 py-2 text-sm text-stone-900">Q3</td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.q3Profit) : '—' }}
                            </td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.profCum[2]) : '—' }}
                            </td>
                          </tr>
                          <tr class="bg-stone-50">
                            <td class="px-3 py-2 text-sm text-stone-900">Q4</td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.q4Profit) : '—' }}
                            </td>
                            <td class="px-3 py-2 text-right text-sm text-stone-900">
                              {{ metrics ? formatCurrency(metrics.profCum[3]) : '—' }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="mb-6 overflow-hidden rounded-xl border border-stone-200">
                  <div class="border-b border-stone-200 bg-stone-50 px-4 py-3">
                    <h3 class="text-sm font-bold text-[#233267]">Retention Comparison</h3>
                  </div>
                  <div class="p-4">
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div>
                        <h4 class="mb-2 text-sm font-semibold">Current Package Value</h4>
                        <table class="w-full text-sm">
                          <tbody>
                            <tr>
                              <td class="py-1 text-stone-600">Monthly revenue:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.cp) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Avg. retention:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? `${metrics.cr.toFixed(1)} months` : '—' }}
                              </td>
                            </tr>
                            <tr class="border-t border-stone-200">
                              <td class="py-2 text-stone-700">Lifetime revenue:</td>
                              <td class="py-2 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.currentLifetimeRevenue) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Lifetime profit:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.currentLifetimeProfit) : '—' }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <h4 class="mb-2 text-sm font-semibold">Target Package Value</h4>
                        <table class="w-full text-sm">
                          <tbody>
                            <tr>
                              <td class="py-1 text-stone-600">Monthly revenue:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.tp) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Avg. retention:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? `${metrics.tr.toFixed(1)} months` : '—' }}
                              </td>
                            </tr>
                            <tr class="border-t border-stone-200">
                              <td class="py-2 text-stone-700">Lifetime revenue:</td>
                              <td class="py-2 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.targetLifetimeRevenue) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Lifetime profit:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.targetLifetimeProfit) : '—' }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <h4 class="mb-2 text-sm font-semibold">Lifetime Value Increase</h4>
                        <table class="w-full text-sm">
                          <tbody>
                            <tr>
                              <td class="py-1 text-stone-600">Revenue increase:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.lifetimeRevenueIncrease) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Revenue multiplier:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? `${metrics.revenueMultiplier.toFixed(2)}x` : '—' }}
                              </td>
                            </tr>
                            <tr class="border-t border-stone-200">
                              <td class="py-2 text-stone-700">Profit increase:</td>
                              <td class="py-2 text-right font-medium text-stone-900">
                                {{ metrics ? formatCurrency(metrics.lifetimeProfitIncrease) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Profit multiplier:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? `${metrics.profitMultiplier.toFixed(2)}x` : '—' }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-6 overflow-hidden rounded-xl border border-stone-200">
                  <div class="border-b border-stone-200 bg-stone-50 px-4 py-3">
                    <h3 class="text-sm font-bold text-[#233267]">ROI Analysis</h3>
                  </div>
                  <div class="p-4">
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div>
                        <h4 class="mb-2 text-sm font-semibold">Upgrade Effort Costs</h4>
                        <table class="w-full text-sm">
                          <tbody>
                            <tr>
                              <td class="py-1 text-stone-600">Hours per attempt:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? metrics.hours.toFixed(1) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Hourly rate:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.rate) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Cost per attempt:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.costPerAttempt) : '—' }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <h4 class="mb-2 text-sm font-semibold">Total Investment</h4>
                        <table class="w-full text-sm">
                          <tbody>
                            <tr>
                              <td class="py-1 text-stone-600">Total attempts:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? metrics.totalAttempts.toFixed(0) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Successful upgrades:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? metrics.expectedUpgrades.toFixed(1) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Total cost:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.totalInvestment) : '—' }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <h4 class="mb-2 text-sm font-semibold">Return on Investment</h4>
                        <table class="w-full text-sm">
                          <tbody>
                            <tr>
                              <td class="py-1 text-stone-600">Annual profit gain:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.annualProfit) : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Total investment:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? formatCurrency(metrics.totalInvestment) : '—' }}
                              </td>
                            </tr>
                            <tr class="border-t border-stone-200">
                              <td class="py-2 font-semibold">ROI:</td>
                              <td class="py-2 text-right font-medium text-stone-900">
                                {{ metrics ? `${metrics.roi.toFixed(0)}%` : '—' }}
                              </td>
                            </tr>
                            <tr>
                              <td class="py-1 text-stone-600">Payback Period:</td>
                              <td class="py-1 text-right font-medium text-stone-800">
                                {{ metrics ? `${metrics.paybackMonths.toFixed(1)} months` : '—' }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 rounded-xl border border-stone-200 p-4">
                  <div class="flex gap-3">
                    <div class="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fill="#212121"
                          d="m10,2C5.589,2,2,5.589,2,10s3.589,8,8,8,8-3.589,8-8S14.411,2,10,2Zm1,12c0,.552-.447,1-1,1s-1-.448-1-1v-4.5c0-.552.447-1,1-1s1,.448,1,1v4.5Zm-1-6.5c-.689,0-1.25-.561-1.25-1.25s.561-1.25,1.25-1.25,1.25.561,1.25,1.25-.561,1.25-1.25,1.25Z"
                        />
                      </svg>
                    </div>
                    <p class="text-sm text-stone-600">
                      This calculator assumes that upgraded clients remain upgraded and shows cumulative impact over 4 quarters.
                      Each quarter, we expect to upgrade an additional set of clients based on the conversion rate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
    <Faqs/>
        <Ready/>

</template>
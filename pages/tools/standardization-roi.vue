
<script setup lang="ts">
import Faqs from '~/components/Sections/Faqs.vue'
import breadcrumb from '~/components/Sections/breadcrumb.vue'
definePageMeta({ layout: 'tools' })
import { reactive, ref } from 'vue'

const defaults = {
  currentTime: 25,
  estimatedTime: 18,
  standardizationCost: 10000,
  monthlyVolume: 40,
  hourlyRate: 40,
  implementationPeriod: 3,
  implementationCurve: 's-curve' as 'linear' | 's-curve' | 'fast-start',
  currentRevisionRate: 30,
  revisionHours: 4,
  expectedRevisionRate: 15,
  clientValuePerRevision: 250,
}

const form = reactive({ ...defaults })

const resultsVisible = ref(false)

type MonthlyRow = {
  month: number
  efficiency: number
  timeSaved: number
  revisionReduction: number
  qualityValue: number
  totalValue: number
  cumulativeSavings: number
  isBreakEven: boolean
}

type RunResult = {
  timeSavingsPerUnit: number
  monthlyTimeSavings: number
  monthlyValueSaved: number
  annualValueSaved: number
  paybackDaysRounded: number
  firstYearROI: number
  revisionRateReductionPercent: number
  monthlyRevisionsAvoided: number
  monthlyRevisionTimeSaved: number
  monthlyRevisionValueSaved: number
  monthlyClientSatisfactionValue: number
  totalMonthlyQualityImpact: number
  totalMonthlySavings: number
  totalAnnualImpact: number
  decisionText: string
  decisionClass: string
  breakEvenMessage: string
  monthlyRows: MonthlyRow[]
  standardizationCost: number
  implementationPeriod: number
  progressBarWidthPct: number
  breakEvenLabelLeftPct: number
  breakEvenLabelTransform: string
}

const run = ref<RunResult | null>(null)

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function reset() {
  Object.assign(form, defaults)
  resultsVisible.value = false
  run.value = null
}

function calculateROI() {
  const currentTime = Number(form.currentTime)
  const estimatedTime = Number(form.estimatedTime)
  const standardizationCost = Number(form.standardizationCost)
  const monthlyVolume = Number(form.monthlyVolume)
  const hourlyRate = Number(form.hourlyRate)
  const implementationPeriod = Math.floor(Number(form.implementationPeriod))
  const implementationCurve = form.implementationCurve

  const currentRevisionRate = Number(form.currentRevisionRate) / 100
  const expectedRevisionRate = Number(form.expectedRevisionRate) / 100
  const revisionHours = Number(form.revisionHours)
  const clientValuePerRevision = Number(form.clientValuePerRevision)

  if (
    [currentTime, estimatedTime, standardizationCost, monthlyVolume, hourlyRate, implementationPeriod, revisionHours, clientValuePerRevision].some(
      (n) => Number.isNaN(n),
    ) ||
    Number.isNaN(currentRevisionRate) ||
    Number.isNaN(expectedRevisionRate)
  ) {
    window.alert('Please fill in all fields with valid numbers.')
    return
  }

  if (
    currentTime <= 0 ||
    estimatedTime < 0 ||
    standardizationCost <= 0 ||
    monthlyVolume <= 0 ||
    hourlyRate <= 0 ||
    implementationPeriod <= 0 ||
    currentRevisionRate < 0 ||
    expectedRevisionRate < 0 ||
    revisionHours < 0 ||
    clientValuePerRevision < 0
  ) {
    window.alert('Please enter positive values for all fields.')
    return
  }

  if (estimatedTime >= currentTime) {
    window.alert(
      'Estimated time after standardization should be less than current delivery time.',
    )
    return
  }

  if (expectedRevisionRate > currentRevisionRate) {
    window.alert(
      'Expected revision rate should be less than or equal to current revision rate.',
    )
    return
  }

  const timeSavingsPerUnit = currentTime - estimatedTime
  const monthlyTimeSavings = timeSavingsPerUnit * monthlyVolume
  const monthlyValueSaved = monthlyTimeSavings * hourlyRate
  const annualValueSaved = monthlyValueSaved * 12

  const revisionRateReduction = currentRevisionRate - expectedRevisionRate
  const revisionRateReductionPercent = revisionRateReduction * 100
  const monthlyRevisionsAvoided = monthlyVolume * revisionRateReduction
  const monthlyRevisionTimeSaved = monthlyRevisionsAvoided * revisionHours
  const monthlyRevisionValueSaved = monthlyRevisionTimeSaved * hourlyRate
  const monthlyClientSatisfactionValue = monthlyRevisionsAvoided * clientValuePerRevision
  const totalMonthlyQualityImpact = monthlyRevisionValueSaved + monthlyClientSatisfactionValue

  const totalMonthlySavings = monthlyValueSaved + totalMonthlyQualityImpact
  const totalAnnualImpact = totalMonthlySavings * 12

  const monthlyEfficiency: number[] = []
  for (let month = 1; month <= Math.max(implementationPeriod, 12); month++) {
    let efficiencyPercentage: number
    if (month > implementationPeriod) {
      efficiencyPercentage = 1
    } else {
      const progress = month / implementationPeriod
      switch (implementationCurve) {
        case 'linear':
          efficiencyPercentage = progress
          break
        case 's-curve':
          efficiencyPercentage = 1 / (1 + Math.exp(-10 * (progress - 0.5)))
          break
        case 'fast-start':
          efficiencyPercentage = Math.sqrt(progress)
          break
        default:
          efficiencyPercentage = progress
      }
    }
    monthlyEfficiency.push(efficiencyPercentage)
  }

  const monthlyBenefits = monthlyEfficiency.map((efficiency) => {
    const monthlyTimeSaved = monthlyTimeSavings * efficiency
    const monthlyEfficiencyValue = monthlyTimeSaved * hourlyRate
    const monthlyQualityEfficiency = efficiency
    const currentMonthRevisionReduction = revisionRateReduction * monthlyQualityEfficiency
    const currentMonthRevisionsAvoided = monthlyVolume * currentMonthRevisionReduction
    const currentMonthRevisionTimeSaved = currentMonthRevisionsAvoided * revisionHours
    const currentMonthRevisionValueSaved = currentMonthRevisionTimeSaved * hourlyRate
    const currentMonthClientSatisfactionValue =
      currentMonthRevisionsAvoided * clientValuePerRevision
    const currentMonthQualityImpact =
      currentMonthRevisionValueSaved + currentMonthClientSatisfactionValue
    const totalMonthValue = monthlyEfficiencyValue + currentMonthQualityImpact

    return {
      efficiency: efficiency * 100,
      timeSaved: monthlyTimeSaved,
      revisionReduction: currentMonthRevisionReduction * 100,
      qualityValue: currentMonthQualityImpact,
      totalValue: totalMonthValue,
    }
  })

  let cumulativeSavings = 0
  let breakEvenMonth: number | null = null

  const monthlyData: MonthlyRow[] = monthlyBenefits.map((benefit, index) => {
    cumulativeSavings += benefit.totalValue
    if (breakEvenMonth === null && cumulativeSavings >= standardizationCost) {
      breakEvenMonth = index + 1
    }
    return {
      month: index + 1,
      efficiency: benefit.efficiency,
      timeSaved: benefit.timeSaved,
      revisionReduction: benefit.revisionReduction,
      qualityValue: benefit.qualityValue,
      totalValue: benefit.totalValue,
      cumulativeSavings,
      isBreakEven: false,
    }
  })

  for (const row of monthlyData) {
    row.isBreakEven = breakEvenMonth !== null && row.month === breakEvenMonth
  }

  let breakEvenDays: number | null = null
  if (breakEvenMonth !== null) {
    const monthBeforeBreakEven = breakEvenMonth - 1
    const remainingCost =
      monthBeforeBreakEven === 0
        ? standardizationCost
        : standardizationCost - monthlyData[monthBeforeBreakEven - 1].cumulativeSavings
    const monthRow = monthlyData[breakEvenMonth - 1]
    const daysInBreakEvenMonth =
      monthRow.totalValue > 0 ? (remainingCost / monthRow.totalValue) * 30 : 0
    breakEvenDays = monthBeforeBreakEven * 30 + daysInBreakEvenMonth
  } else if (monthlyData.length > 0) {
    const lastMonthSavings = monthlyData[monthlyData.length - 1].cumulativeSavings
    const remainingCost = standardizationCost - lastMonthSavings
    const monthsRemaining =
      totalMonthlySavings > 0 ? remainingCost / totalMonthlySavings : Number.POSITIVE_INFINITY
    breakEvenDays = (monthlyData.length + monthsRemaining) * 30
  } else {
    breakEvenDays =
      totalMonthlySavings > 0 ? (standardizationCost / totalMonthlySavings) * 30 : Number.POSITIVE_INFINITY
  }

  const breakEvenDaysRounded = Number.isFinite(breakEvenDays!) ? Math.round(breakEvenDays!) : 0

  let firstYearSavings = 0
  for (let i = 0; i < Math.min(monthlyData.length, 12); i++) {
    firstYearSavings += monthlyData[i].totalValue
  }
  const firstYearROI = ((firstYearSavings - standardizationCost) / standardizationCost) * 100

  let decisionText = ''
  let decisionClass = ''
  if (breakEvenDays !== null && Number.isFinite(breakEvenDays) && breakEvenDays <= 30) {
    decisionText =
      'Excellent investment! Payback in less than a month with high ROI.'
    decisionClass = 'rounded-lg border border-emerald-200 bg-emerald-50 p-4 font-medium text-emerald-800'
  } else if (breakEvenDays !== null && Number.isFinite(breakEvenDays) && breakEvenDays <= 90) {
    decisionText = 'Good investment with reasonable payback period.'
    decisionClass = 'rounded-lg border border-[#233267] bg-[#233267] p-4 font-medium text-[#fff]'
  } else if (breakEvenDays !== null && Number.isFinite(breakEvenDays) && breakEvenDays <= 180) {
    decisionText = 'Moderate investment with medium-term payback.'
    decisionClass = 'rounded-lg border border-yellow-200 bg-yellow-50 p-4 font-medium text-yellow-900'
  } else {
    decisionText = 'Long payback period. Consider if there are more immediate priorities.'
    decisionClass = 'rounded-lg border border-red-200 bg-red-50 p-4 font-medium text-red-800'
  }

  const breakEvenMessage =
    breakEvenMonth === null
      ? `Projected to reach break-even after ${Math.ceil(breakEvenDaysRounded / 30)} months (${breakEvenDaysRounded} days) based on your implementation curve.`
      : `Project reaches break-even in month ${breakEvenMonth} (approximately ${breakEvenDaysRounded} days) based on your implementation curve.`

 const timelineDays = implementationPeriod * 30

let progressBarWidthPct = 100
let breakEvenLabelLeftPct = 100
let breakEvenLabelTransform = 'translateX(-100%)'

if (Number.isFinite(breakEvenDays!) && implementationPeriod > 0) {
  const pct = Math.min(100, Math.max(0, (breakEvenDays! / timelineDays) * 100))
  progressBarWidthPct = pct
  breakEvenLabelLeftPct = Math.min(95, Math.max(5, pct))
  breakEvenLabelTransform = 'translateX(-50%)'
}

  run.value = {
    timeSavingsPerUnit: timeSavingsPerUnit,
    monthlyTimeSavings,
    monthlyValueSaved,
    annualValueSaved,
    paybackDaysRounded: breakEvenDaysRounded,
    firstYearROI,
    revisionRateReductionPercent,
    monthlyRevisionsAvoided,
    monthlyRevisionTimeSaved,
    monthlyRevisionValueSaved,
    monthlyClientSatisfactionValue,
    totalMonthlyQualityImpact,
    totalMonthlySavings,
    totalAnnualImpact,
    decisionText,
    decisionClass,
    breakEvenMessage,
    monthlyRows: monthlyData,
    standardizationCost,
    implementationPeriod,
    progressBarWidthPct,
    breakEvenLabelLeftPct,
    breakEvenLabelTransform,
  }
  resultsVisible.value = true
}

function roiStatusClass(row: MonthlyRow, cost: number) {
  if (row.cumulativeSavings < cost) return 'text-orange-600'
  if (row.isBreakEven) return 'font-bold text-red-600'
  return 'text-emerald-600'
}

function roiStatusText(row: MonthlyRow, cost: number) {
  if (row.cumulativeSavings < cost) {
    const percentage = ((row.cumulativeSavings / cost) * 100).toFixed(1)
    return `${percentage}% to breakeven`
  }
  if (row.isBreakEven) return 'BREAKEVEN POINT'
  const profit = (((row.cumulativeSavings - cost) / cost) * 100).toFixed(1)
  return `${profit}% profit`
}
</script>

<template>
    <div class="min-h-screen  py-12 mt-[80px] custom_family">
        <section >
           <breadcrumb/>
<div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Service Standardization ROI Calculator for productized Agencies</h1>
        <p class="mt-4 text-lg text-stone-600">Determine whether investing in systems, templates, and processes is worth the cost by calculating the ROI of standardization investments over time.</p>
      </div>
          <div class="mx-auto max-w-5xl overflow-hidden p-6 md:p-8">
            <div class="mb-8 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
              <form class="space-y-4" @submit.prevent>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label for="currentTime" class="block text-sm font-semibold text-stone-900">
                      Current delivery time (hours per deliverable)
                    </label>
                    <input
                      id="currentTime"
                      v-model.number="form.currentTime"
                      type="number"
                      min="0.1"
                      step="0.1"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">
                      The average time it currently takes to complete one deliverable
                    </p>
                  </div>
                  <div>
                    <label for="estimatedTime" class="block text-sm font-semibold text-stone-900">
                      Estimated time after standardization (hours)
                    </label>
                    <input
                      id="estimatedTime"
                      v-model.number="form.estimatedTime"
                      type="number"
                      min="0.1"
                      step="0.1"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">
                      The projected time it will take after implementing standardized processes
                    </p>
                  </div>
                  <div>
                    <label for="standardizationCost" class="block text-sm font-semibold text-stone-900">
                      Cost of standardization ($)
                    </label>
                    <input
                      id="standardizationCost"
                      v-model.number="form.standardizationCost"
                      type="number"
                      min="1"
                      step="1"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">
                      One-time investment for documentation, templates, training, etc.
                    </p>
                  </div>
                  <div>
                    <label for="monthlyVolume" class="block text-sm font-semibold text-stone-900">
                      Monthly deliverable volume (units)
                    </label>
                    <input
                      id="monthlyVolume"
                      v-model.number="form.monthlyVolume"
                      type="number"
                      min="1"
                      step="1"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">How many deliverables your team completes each month</p>
                  </div>
                  <div>
                    <label for="hourlyRate" class="block text-sm font-semibold text-stone-900">Hourly rate ($)</label>
                    <input
                      id="hourlyRate"
                      v-model.number="form.hourlyRate"
                      type="number"
                      min="1"
                      step="0.1"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">The value of an hour of work (cost or billable rate)</p>
                  </div>

                  <div class="border-t border-stone-200 pt-4 md:col-span-2">
                    <h3 class="mb-2 text-lg font-bold text-[#233267]">Phased Implementation</h3>
                    <p class="mb-3 text-xs text-stone-500">
                      Most standardization projects don't yield results immediately. Configure how the efficiency gains will be
                      realized over time.
                    </p>
                  </div>

                  <div>
                    <label for="implementationPeriod" class="block text-sm font-semibold text-stone-900">
                      Implementation period (months)
                    </label>
                    <input
                      id="implementationPeriod"
                      v-model.number="form.implementationPeriod"
                      type="number"
                      min="1"
                      max="24"
                      step="1"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">How long until full efficiency is achieved</p>
                  </div>

                  <div>
                    <label for="implementationCurve" class="block text-sm font-semibold text-stone-900">
                      Implementation curve
                    </label>
                    <select
                      id="implementationCurve"
                      v-model="form.implementationCurve"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                      <option value="linear">Linear (steady progress)</option>
                      <option value="s-curve">S-curve (slow start, rapid middle, plateau)</option>
                      <option value="fast-start">Fast-start (quick gains, then plateau)</option>
                    </select>
                    <p class="mt-1 text-xs text-stone-500">The pattern of efficiency gains over time</p>
                  </div>

                  <div class="border-t border-stone-200 pt-4 md:col-span-2">
                    <h3 class="mb-2 text-lg font-bold text-[#233267]">Quality Impact Metrics</h3>
                    <p class="mb-3 text-xs text-stone-500">
                      Standardization typically reduces errors and revisions, which are major profit killers for agencies.
                    </p>
                  </div>

                  <div>
                    <label for="currentRevisionRate" class="block text-sm font-semibold text-stone-900">
                      Current revision rate (%)
                    </label>
                    <input
                      id="currentRevisionRate"
                      v-model.number="form.currentRevisionRate"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">Percentage of deliverables needing revisions</p>
                  </div>

                  <div>
                    <label for="revisionHours" class="block text-sm font-semibold text-stone-900">Hours per revision</label>
                    <input
                      id="revisionHours"
                      v-model.number="form.revisionHours"
                      type="number"
                      min="0.1"
                      step="0.1"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">Average time spent on each revision</p>
                  </div>

                  <div>
                    <label for="expectedRevisionRate" class="block text-sm font-semibold text-stone-900">
                      Expected revision rate after standardization (%)
                    </label>
                    <input
                      id="expectedRevisionRate"
                      v-model.number="form.expectedRevisionRate"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">Anticipated revision rate after implementation</p>
                  </div>

                  <div>
                    <label for="clientValuePerRevision" class="block text-sm font-semibold text-stone-900">
                      Client satisfaction value per avoided revision ($)
                    </label>
                    <input
                      id="clientValuePerRevision"
                      v-model.number="form.clientValuePerRevision"
                      type="number"
                      min="0"
                      step="10"
                      required
                      class="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    >
                    <p class="mt-1 text-xs text-stone-500">
                      Estimated value of improved client satisfaction (retention, referrals)
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-center gap-6 pt-4">
                  <button
                    type="button"
                    class="text-sm text-stone-500 transition duration-150 hover:text-stone-800"
                    @click="reset"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
                    @click="calculateROI"
                  >
                    Calculate ROI
                  </button>
                </div>
              </form>

              <div v-if="resultsVisible && run" class="mt-8">
                <div class="overflow-hidden rounded-xl border border-stone-200">
                  <div class="border-b border-stone-200 bg-stone-50 px-6 py-4">
                    <h2 class="text-xl font-bold text-[#233267]">Results</h2>
                  </div>

                  <div class="bg-white px-6 py-5">
                    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div class="space-y-5">
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Time saved per deliverable (at full efficiency)</p>
                          <p class="text-lg font-medium text-stone-900">{{ run.timeSavingsPerUnit.toFixed(1) }} hours</p>
                        </div>
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Monthly time savings (at full efficiency)</p>
                          <p class="text-lg font-medium text-stone-900">{{ run.monthlyTimeSavings.toFixed(1) }} hours</p>
                        </div>
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Value of time saved (at full efficiency)</p>
                          <p class="text-lg font-medium text-stone-900">{{ formatCurrency(run.monthlyValueSaved) }}/month</p>
                        </div>
                      </div>

                      <div class="space-y-5">
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Annual value saved (after full implementation)</p>
                          <p class="text-lg font-medium text-stone-900">{{ formatCurrency(run.annualValueSaved) }}/year</p>
                        </div>
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Payback period (with phased implementation)</p>
                          <p class="text-lg font-medium text-stone-900">{{ run.paybackDaysRounded }} days</p>
                        </div>
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Return on Investment (ROI) - Year 1</p>
                          <p class="text-lg font-medium text-stone-900">{{ run.firstYearROI.toFixed(1) }}%</p>
                        </div>
                      </div>
                    </div>

                    <div class="mt-8 border-t border-stone-200 pt-6">
                      <h3 class="mb-4 text-lg font-medium text-stone-800">Quality Impact</h3>
                      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Reduction in revision rate</p>
                          <p class="text-lg font-medium text-stone-900">
                            {{ run.revisionRateReductionPercent.toFixed(1) }}%
                          </p>
                        </div>
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Monthly revisions avoided</p>
                          <p class="text-lg font-medium text-stone-900">{{ run.monthlyRevisionsAvoided.toFixed(1) }}</p>
                        </div>
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Monthly time saved from fewer revisions</p>
                          <p class="text-lg font-medium text-stone-900">{{ run.monthlyRevisionTimeSaved.toFixed(1) }} hours</p>
                        </div>
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Monthly value from fewer revisions</p>
                          <p class="text-lg font-medium text-stone-900">{{ formatCurrency(run.monthlyRevisionValueSaved) }}</p>
                        </div>
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Monthly client satisfaction value</p>
                          <p class="text-lg font-medium text-stone-900">
                            {{ formatCurrency(run.monthlyClientSatisfactionValue) }}
                          </p>
                        </div>
                        <div class="rounded-lg border border-stone-200 p-4">
                          <p class="mb-1 text-sm text-stone-500">Total quality impact (monthly)</p>
                          <p class="text-lg font-medium text-stone-900">{{ formatCurrency(run.totalMonthlyQualityImpact) }}</p>
                        </div>
                      </div>
                    </div>

                    <div class="mt-8 border-t border-stone-200 pt-6">
                      <h3 class="mb-4 text-lg font-bold text-[#233267]">Total Impact</h3>
                      <div class="rounded-xl border border-stone-200 p-5">
                        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <div>
                            <p class="mb-1 text-sm text-stone-500">Total monthly savings at full implementation</p>
                            <p class="text-xl font-semibold text-stone-900">{{ formatCurrency(run.totalMonthlySavings) }}/month</p>
                          </div>
                          <div>
                            <p class="mb-1 text-sm text-stone-500">Total annual impact</p>
                            <p class="text-xl font-semibold text-stone-900">{{ formatCurrency(run.totalAnnualImpact) }}/year</p>
                          </div>
                          <div>
                            <p class="mb-1 text-sm text-stone-500">True payback period (including quality impact)</p>
                            <p class="text-xl font-semibold text-stone-900">{{ run.paybackDaysRounded }} days</p>
                          </div>
                          <div>
                            <p class="mb-1 text-sm text-stone-500">True ROI - Year 1</p>
                            <p class="text-xl font-semibold text-stone-900">{{ run.firstYearROI.toFixed(1) }}%</p>
                          </div>
                        </div>
                      </div>

                      <div class="mt-5">
                        <div :class="run.decisionClass">
                          {{ run.decisionText }}
                        </div>
                      </div>
                    </div>

                    <div class="mt-8 border-t border-stone-200 pt-6">
                      <h3 class="mb-4 text-lg font-bold text-[#233267]">Phased Implementation Analysis</h3>

                      <div class="mb-5 overflow-hidden rounded-lg border border-stone-200">
                        <div class="max-h-64 overflow-auto">
                          <table class="min-w-full divide-y divide-stone-200">
                            <thead>
                              <tr class="bg-stone-50">
                                <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                                  Month
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                                  Efficiency %
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                                  Hours Saved
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                                  Revision Red.
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                                  Quality Value
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                                  Total Value
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                                  Cumul. Savings
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                                  ROI Status
                                </th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-stone-200 bg-white">
                              <tr
                                v-for="(row, index) in run.monthlyRows"
                                :key="row.month"
                                :class="
                                  row.isBreakEven
                                    ? 'bg-[#E7E5E4]'
                                    : index % 2 === 0
                                      ? 'bg-white'
                                      : 'bg-stone-50'
                                "
                              >
                                <td class="whitespace-nowrap px-3 py-2 text-sm text-stone-900">{{ row.month }}</td>
                                <td class="whitespace-nowrap px-3 py-2 text-sm text-stone-900">
                                  {{ row.efficiency.toFixed(1) }}%
                                </td>
                                <td class="whitespace-nowrap px-3 py-2 text-sm text-stone-900">{{ row.timeSaved.toFixed(1) }}</td>
                                <td class="whitespace-nowrap px-3 py-2 text-sm text-stone-900">
                                  {{ row.revisionReduction.toFixed(1) }}%
                                </td>
                                <td class="whitespace-nowrap px-3 py-2 text-sm text-stone-900">
                                  {{ formatCurrency(row.qualityValue) }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-2 text-sm text-stone-900">
                                  {{ formatCurrency(row.totalValue) }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-2 text-sm text-stone-900">
                                  {{ formatCurrency(row.cumulativeSavings) }}
                                </td>
                                <td
                                  class="whitespace-nowrap px-3 py-2 text-sm"
                                  :class="roiStatusClass(row, run.standardizationCost)"
                                >
                                  {{ roiStatusText(row, run.standardizationCost) }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="mb-5 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
                        {{ run.breakEvenMessage }}
                      </div>

                     <div class="space-y-2 text-neutral-800">
  <div
    class="relative h-8 overflow-hidden rounded-xl border border-[#E7E5E4] bg-[#E7E5E4]"
    aria-hidden="true"
  >
    <div
      class="absolute inset-y-0 left-0 bg-[#233267] transition-[width] duration-500"
      :style="{ width: `${run.progressBarWidthPct}%` }"
    />
  </div>
  <div class="relative flex justify-between text-xs font-medium">
    <span class="text-neutral-700">Implementation Start</span>
    <div
      class="absolute z-10 text-neutral-900"
      :style="{
        left: `${run.breakEvenLabelLeftPct}%`,
        transform: run.breakEvenLabelTransform,
      }"
    >
      Break-even
    </div>
    <span class="text-neutral-700">Full Efficiency</span>
  </div>
</div>
                    </div>

                    <div class="mt-8 border-t border-stone-200 pt-6">
                      <div class="rounded-lg border border-stone-200 bg-stone-50 p-4">
                        <p class="text-sm text-stone-600">
                          <span class="font-medium text-stone-800">What this means:</span>
                          The Service Standardization ROI Calculator helps you determine whether investing in standardization efforts
                          is worth the cost. The analysis accounts for both efficiency gains and quality improvements, showing you
                          the full financial impact of standardization across your agency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
    <Faqs/>
</template>
<style scoped>
*{

}
</style>
<template>
  <div class="min-h-screen  py-12 mt-[80px] custom_family">
    <div class="mx-auto max-w-4xl px-5">
      <breadcrumb/>
      <div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Agency Valuation Calculator for Service Providers</h1>
        <p class="mt-4 text-lg text-neutral-600">Calculate your agency's estimated market value and get actionable recommendations to increase your business worth</p></div>
      
      <!-- Financial Information Section -->
      <div class="mb-6 rounded-xl border border-[#233267] bg-[#fff] p-6">
        <h2 class="mb-4 text-xl font-bold text-[#233267]">
          Financial Information
        </h2>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label for="annual-revenue" class="mb-1 block text-sm font-semibold ">
              Annual Revenue ($)
            </label>
            <input
              id="annual-revenue"
              v-model.number="formData.annualRevenue"
              type="number"
              class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              min="0"
              step="1000"
            >
            <p class="mt-1 text-xs text-stone-400">
              Last 12 months gross revenue
            </p>
          </div>

          <div>
            <label for="annual-profit" class="mb-1 block text-sm font-semibold ">
              Annual Profit ($)
            </label>
            <input
              id="annual-profit"
              v-model.number="formData.annualProfit"
              type="number"
              class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              min="0"
              step="1000"
            >
            <p class="mt-1 text-xs text-stone-400">
              Before owner salary & taxes (EBITDA)
            </p>
          </div>

          <div>
            <label for="recurring-revenue" class="mb-1 block text-sm font-semibold ">
              Recurring Revenue (%)
            </label>
            <input
              id="recurring-revenue"
              v-model.number="formData.recurringRevenue"
              type="number"
              class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              min="0"
              max="100"
              step="5"
            >
            <p class="mt-1 text-xs text-stone-400">
              Percentage from retainers & subscriptions
            </p>
          </div>

          <div>
            <label for="top-client-revenue" class="mb-1 block text-sm font-semibold ">
              Top Client Revenue (%)
            </label>
            <input
              id="top-client-revenue"
              v-model.number="formData.topClientRevenue"
              type="number"
              class="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
              min="0"
              max="100"
              step="1"
            >
            <p class="mt-1 text-xs text-stone-400">
              Revenue percentage from your biggest client
            </p>
          </div>
        </div>
      </div>

      <!-- Business Profile Section -->
      <div class="mb-6 rounded-xl border border-[#233267] bg-[#fff] p-6">
        <h2 class="mb-4 text-xl font-semibold text-[#233267]">
          Business Profile
        </h2>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label for="primary-service" class="mb-1 block text-sm font-semibold ">
              Primary Service
            </label>
            <select
              id="primary-service"
              v-model="formData.primaryService"
              class="w-full rounded-md border border-neutral-300 bg-white py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
            >
              <option value="seo_marketing">SEO & Digital Marketing</option>
              <option value="web_development">Web Development</option>
              <option value="business_consulting">Business Consulting</option>
              <option value="social_media">Social Media Management</option>
              <option value="ppc_advertising">PPC & Advertising</option>
              <option value="content_creation">Content Creation</option>
              <option value="other">Other</option>
            </select>
            <p class="mt-1 text-xs text-stone-400">
              Your agency's main service offering
            </p>
          </div>

          <div>
            <label for="owner-dependency" class="mb-1 block text-sm font-semibold ">
              Owner Dependency
            </label>
            <select
              id="owner-dependency"
              v-model="formData.ownerDependency"
              class="w-full rounded-md border border-neutral-300 bg-white py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
            >
              <option value="low">Business runs without me</option>
              <option value="medium">I'm involved but not essential</option>
              <option value="high">Business needs me daily</option>
            </select>
            <p class="mt-1 text-xs text-stone-400">
              How dependent is the business on your involvement
            </p>
          </div>

          <div>
            <label for="years-in-business" class="mb-1 block text-sm font-semibold ">
              Years in Business
            </label>
            <select
              id="years-in-business"
              v-model="formData.yearsInBusiness"
              class="w-full rounded-md border border-neutral-300 bg-white py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
            >
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
            <p class="mt-1 text-xs text-stone-400">
              How long has the business been operating
            </p>
          </div>

          <div>
            <label for="team-size" class="mb-1 block text-sm font-semibold ">
              Team Size
            </label>
            <select
              id="team-size"
              v-model="formData.teamSize"
              class="w-full rounded-md border border-neutral-300 bg-white py-2 pl-2 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
            >
              <option value="solo">Just me</option>
              <option value="small">2-5 people</option>
              <option value="medium">6-15 people</option>
              <option value="large">16+ people</option>
            </select>
            <p class="mt-1 text-xs text-stone-400">
              Total team members including contractors
            </p>
          </div>
        </div>
      </div>

      <!-- Calculate Button -->
      <div class="mb-8 flex justify-center">
        <button
          @click="calculateValuation"
          class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#fff] hover:text-[#233267] hover:border-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]  focus:ring-offset-[#233267]"
        >
          Calculate Agency Value
        </button>
      </div>

      <!-- Results Section -->
      <div v-if="showResults" class="mb-6 rounded-xl border border-[#233267] bg-[#fff] p-6">
        <h2 class="mb-6 text-center text-2xl font-bold text-[#233267]">
          Your Agency Valuation
        </h2>

        <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <!-- Estimated Value -->
          <div class="relative overflow-hidden rounded-xl border border-orange-200 bg-orange-100 p-6">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 opacity-50"></div>
            <div class="relative">
              <h3 class="text-sm font-medium uppercase tracking-wide text-orange-800">
                Estimated Value
              </h3>
              <div class="mt-3">
                <span class="block text-xl font-bold text-orange-900">
                  {{ formatCurrency(results.lowValuation) }} - {{ formatCurrency(results.highValuation) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Revenue Multiple -->
          <div class="relative overflow-hidden rounded-xl border border-green-400/30 bg-green-400/10 p-6">
            <div class="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-400/15 opacity-50"></div>
            <div class="relative">
              <h3 class="text-sm font-medium uppercase tracking-wide text-green-600">
                Revenue Multiple
              </h3>
              <div class="mt-3">
                <span class="block text-xl font-bold text-green-600">
                  {{ results.finalMultiple.toFixed(1) }}x
                </span>
              </div>
            </div>
          </div>

          <!-- Risk Level -->
          <div :class="riskCardClasses" class="relative overflow-hidden rounded-xl border p-6">
            <div :class="riskGradientClasses" class="absolute inset-0 bg-gradient-to-br opacity-50"></div>
            <div class="relative">
              <h3 :class="riskHeaderClasses" class="text-sm font-medium uppercase tracking-wide">
                Risk Level
              </h3>
              <div class="mt-3">
                <span :class="riskValueClasses" class="block text-xl font-bold">
                  {{ results.riskLevel }}
                </span>
              </div>
            </div>
          </div>

          <!-- Industry Benchmark -->
          <div class="relative overflow-hidden rounded-xl border border-purple-200 bg-purple-100 p-6">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-50"></div>
            <div class="relative">
              <h3 class="text-sm font-medium uppercase tracking-wide text-purple-800">
                Industry Benchmark
              </h3>
              <div class="mt-3">
                <span class="block text-xl font-bold text-purple-900">
                  {{ results.benchmark }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Analysis Text -->
        <div class="rounded-xl border border-[#233267] bg-[#DFDFDF] p-6">
          <h3 class="mb-4 text-lg font-semibold text-[#233267]">
            Valuation Analysis
          </h3>
          <p class="leading-relaxed ">
            {{ results.analysisText }}
          </p>
        </div>

        <!-- Generate Recommendations Button -->
        <div class="mt-8 flex justify-center">
          <button
            @click="generateRecommendations"
            class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
          >
            Get Improvement Recommendations
          </button>
        </div>
      </div>

      <!-- Recommendations Section -->
      <div v-if="showRecommendations" class="mb-6">
        <h2 class="mb-4 text-center text-2xl font-bold text-[#233267]">
          Increase Your Agency's Valuation
        </h2>
        <p class="mb-6 pb-8 text-center">
          Actionable recommendations to improve your business worth and reduce acquisition risk
        </p>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Risk Reduction -->
          <div class="transform overflow-hidden rounded-xl border border-stone-700 bg-[#fff] transition-transform hover:scale-105">
            <div class="border-b border-[#233267] bg-[#fff] p-6">
              <h3 class="text-center text-lg font-bold text-[#233267]">
                Risk Reduction
              </h3>
            </div>
            <div class="p-6">
              <ul class="space-y-3">
                <li v-for="(rec, index) in recommendations.risk" :key="index" class="flex items-start">
                  <svg class="mr-2 size-5 shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="">{{ rec }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Growth Opportunities -->
          <div class="transform overflow-hidden rounded-xl border border-stone-700 bg-[#fff] transition-transform hover:scale-105">
            <div class="border-b border-stone-700 bg-[#fff] p-6">
              <h3 class="text-center text-lg font-bold text-[#233267]">
                Growth Opportunities
              </h3>
            </div>
            <div class="p-6">
              <ul class="space-y-3">
                <li v-for="(rec, index) in recommendations.growth" :key="index" class="flex items-start">
                  <svg class="mr-2 size-5 shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="">{{ rec }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumb from '~/components/Sections/breadcrumb.vue'
import { ref, computed } from 'vue'
definePageMeta({ layout: 'tools' })

// Form data with default values
const formData = ref({
  annualRevenue: 500000,
  annualProfit: 100000,
  recurringRevenue: 70,
  topClientRevenue: 25,
  primaryService: 'seo_marketing',
  ownerDependency: 'medium',
  yearsInBusiness: '3-5',
  teamSize: 'small'
})

// Results state
const showResults = ref(false)
const showRecommendations = ref(false)
const results = ref({})
const recommendations = ref({
  risk: [],
  growth: []
})

// Service multiples mapping
const serviceMultiples = {
  seo_marketing: 4.0,
  web_development: 5.0,
  business_consulting: 3.0,
  social_media: 3.0,
  ppc_advertising: 4.0,
  content_creation: 3.5,
  other: 3.5
}

// Calculate risk adjustment
const calculateRiskAdjustment = (data) => {
  let adjustment = 0
  const profitMargin = (data.annualProfit / data.annualRevenue) * 100

  // Recurring revenue impact
  if (data.recurringRevenue >= 80) adjustment += 0.8
  else if (data.recurringRevenue >= 60) adjustment += 0.5
  else if (data.recurringRevenue >= 40) adjustment += 0.2
  else if (data.recurringRevenue < 20) adjustment -= 0.5

  // Client concentration risk
  if (data.topClientRevenue <= 15) adjustment += 0.5
  else if (data.topClientRevenue <= 25) adjustment += 0.2
  else if (data.topClientRevenue >= 50) adjustment -= 0.8
  else if (data.topClientRevenue >= 35) adjustment -= 0.5

  // Owner dependency risk
  if (data.ownerDependency === 'low') adjustment += 0.6
  else if (data.ownerDependency === 'medium') adjustment += 0.2
  else adjustment -= 1.0

  // Business maturity
  if (data.yearsInBusiness === '10+') adjustment += 0.3
  else if (data.yearsInBusiness === '6-10') adjustment += 0.2
  else if (data.yearsInBusiness === '3-5') adjustment += 0.1
  else adjustment -= 0.2

  // Team size
  if (data.teamSize === 'large') adjustment += 0.3
  else if (data.teamSize === 'medium') adjustment += 0.2
  else if (data.teamSize === 'small') adjustment += 0.1
  else adjustment -= 0.2

  // Profit margin
  if (profitMargin >= 30) adjustment += 0.3
  else if (profitMargin >= 20) adjustment += 0.2
  else if (profitMargin >= 15) adjustment += 0.1
  else if (profitMargin < 10) adjustment -= 0.3

  return adjustment
}

// Calculate valuation
const calculateValuation = () => {
  if (formData.value.annualRevenue <= 0) {
    alert('Please enter a valid annual revenue amount')
    return
  }

  const baseMultiple = serviceMultiples[formData.value.primaryService] || 3.5
  const riskAdjustment = calculateRiskAdjustment(formData.value)
  const finalMultiple = Math.max(1.5, Math.min(8.0, baseMultiple + riskAdjustment))

  const lowValuation = formData.value.annualRevenue * (finalMultiple - 0.5)
  const highValuation = formData.value.annualRevenue * (finalMultiple + 0.5)

  // Determine risk level
  let riskLevel = 'Medium'
  if (riskAdjustment >= 0.5) riskLevel = 'Low'
  else if (riskAdjustment <= -0.5) riskLevel = 'High'

  // Determine benchmark
  let benchmark = 'Average'
  if (finalMultiple >= 5.5) benchmark = 'Excellent'
  else if (finalMultiple >= 4.5) benchmark = 'Above Average'
  else if (finalMultiple <= 2.5) benchmark = 'Below Average'

  // Create analysis text
  const serviceName = formData.value.primaryService.replace('_', ' ')
  const analysisText = `Your agency is valued at ${finalMultiple.toFixed(1)}x annual revenue, which is ${benchmark.toLowerCase()} for the industry. This valuation is based on your ${serviceName} service offering, ${formData.value.recurringRevenue}% recurring revenue, and ${riskLevel.toLowerCase()} risk profile.`

  results.value = {
    lowValuation,
    highValuation,
    finalMultiple,
    riskAdjustment,
    riskLevel,
    benchmark,
    analysisText
  }

  showResults.value = true
  showRecommendations.value = false

  // Scroll to results
  setTimeout(() => {
    const resultsEl = document.querySelector('#results-section')
    if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// Generate recommendations
const generateRecommendations = () => {
  const riskRecs = []
  const growthRecs = []

  if (formData.value.recurringRevenue < 60) {
    riskRecs.push('Convert project clients to monthly retainers to increase predictable revenue')
  }

  if (formData.value.topClientRevenue > 25) {
    riskRecs.push('Diversify client base - aim for no client representing more than 15% of revenue')
  }

  if (formData.value.ownerDependency !== 'low') {
    riskRecs.push('Document key processes and train team members to reduce owner dependency')
  }

  if (formData.value.teamSize === 'solo') {
    riskRecs.push('Build a team to handle client work and reduce single-person risk')
  }

  if (formData.value.recurringRevenue < 80) {
    growthRecs.push('Develop more subscription-based service offerings')
  }

  growthRecs.push('Implement professional business management tools')
  growthRecs.push('Track key metrics monthly to monitor progress and valuation improvements')

  if (formData.value.yearsInBusiness === '0-2' || formData.value.yearsInBusiness === '3-5') {
    growthRecs.push('Build case studies and testimonials to demonstrate proven results')
  }

  growthRecs.push('Focus on profitable growth rather than revenue growth alone')

  recommendations.value = {
    risk: riskRecs,
    growth: growthRecs
  }

  showRecommendations.value = true

  setTimeout(() => {
    const recsEl = document.querySelector('#recommendations-section')
    if (recsEl) recsEl.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Computed risk card classes
const riskCardClasses = computed(() => {
  if (!results.value.riskLevel) return 'border-amber-200 bg-amber-50'
  
  if (results.value.riskLevel === 'Low') {
    return 'border-green-400/30 bg-green-400/10'
  } else if (results.value.riskLevel === 'High') {
    return 'border-red-200 bg-red-50'
  }
  return 'border-amber-200 bg-amber-50'
})

const riskGradientClasses = computed(() => {
  if (!results.value.riskLevel) return 'from-amber-50 to-amber-100'
  
  if (results.value.riskLevel === 'Low') {
    return 'from-green-400/10 to-green-400/15'
  } else if (results.value.riskLevel === 'High') {
    return 'from-red-50 to-red-100'
  }
  return 'from-amber-50 to-amber-100'
})

const riskHeaderClasses = computed(() => {
  if (!results.value.riskLevel) return 'text-amber-700'
  
  if (results.value.riskLevel === 'Low') {
    return 'text-green-600'
  } else if (results.value.riskLevel === 'High') {
    return 'text-red-700'
  }
  return 'text-amber-700'
})

const riskValueClasses = computed(() => {
  if (!results.value.riskLevel) return 'text-amber-900'
  
  if (results.value.riskLevel === 'Low') {
    return 'text-green-600'
  } else if (results.value.riskLevel === 'High') {
    return 'text-red-900'
  }
  return 'text-amber-900'
})
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
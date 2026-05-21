<template>
  <div class="min-h-screen p-6 md:p-8 mt-[80px] custom_family">
    <div class="mx-auto max-w-6xl">
      <breadcrumb/>
      <div class="mx-auto mb-12 max-w-4xl px-4 text-center md:mb-12">
        <h1 class="text-3xl font-bold text-[#233267] tracking-tight md:text-4xl">Pricing Model Decision Matrix for agencies</h1>
        <p class="mt-4 text-lg text-neutral-600">Determine the optimal pricing strategy based on your specific business priorities.</p></div>
      <!-- Business Priorities Input -->
      <div class="mb-8 rounded-xl border p-5 sm:p-6 bg-white">
        <h2 class="mb-5 border-b border-stone-100 pb-2 text-xl font-bold text-[#233267]">
          Your Business Priorities
        </h2>
        <p class="mb-4 text-sm text-stone-700">
          Rate each factor on a scale of 1-5 based on its importance
          to your business. The matrix will calculate which pricing
          model might work best for you.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-white">
                <th class="border-b border-stone-100/70 p-4 text-left whitespace-nowrap text-[#233267]">
                  Business Factor
                </th>
                <th class="border-b border-stone-100/70 p-4 whitespace-nowrap text-[#233267]">
                  Importance (1-5)
                </th>
                <th class="border-b border-stone-100/70 p-4 whitespace-nowrap text-[#233267]">
                  Time &amp; Overhead
                </th>
                <th class="border-b border-stone-100/70 p-4 whitespace-nowrap text-[#233267]">
                  Project-Based
                </th>
                <th class="border-b border-stone-100/70 p-4 whitespace-nowrap text-[#233267]">
                  Subscription
                </th>
                <th class="border-b border-stone-100/70 p-4 whitespace-nowrap text-[#233267]">
                  Retainer
                </th>
                <th class="border-b border-stone-100/70 p-4 whitespace-nowrap text-[#233267]">
                  Value-Based
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(factor, index) in businessFactors" :key="index">
                <td class="px-2 py-1 text-left">{{ factor.name }}</td>
                <td class="px-2 py-1 text-center">
                  <select 
                 
                    v-model.number="importanceRatings[index]" 
                    class="w-16 border border-[#233267] rounded px-2 py-1 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    @change="updateCalculations"
                  >
                    <option v-for="i in 5" :key="i" :value="i">{{ i }}</option>
                  </select>
                </td>
                <td class="px-2 py-1 text-center">
                  <span 
                    :class="factor.compatibility.timeOverhead >= 4 ? 'font-bold text-[#233267]' : ''"
                  >
                    {{ factor.compatibility.timeOverhead }}
                  </span>
                </td>
                <td class="px-2 py-1 text-center">
                  <span 
                    :class="factor.compatibility.projectBased >= 4 ? 'font-bold text-[#233267]' : ''"
                  >
                    {{ factor.compatibility.projectBased }}
                  </span>
                </td>
                <td class="px-2 py-1 text-center">
                  <span 
                    :class="factor.compatibility.subscription >= 4 ? 'font-bold text-[#233267]' : ''"
                  >
                    {{ factor.compatibility.subscription }}
                  </span>
                </td>
                <td class="px-2 py-1 text-center">
                  <span 
                    :class="factor.compatibility.retainer >= 4 ? 'font-bold text-[#233267]' : ''"
                  >
                    {{ factor.compatibility.retainer }}
                  </span>
                </td>
                <td class="px-2 py-1 text-center">
                  <span 
                    :class="factor.compatibility.valueBased >= 4 ? 'font-bold text-[#233267]' : ''"
                  >
                    {{ factor.compatibility.valueBased }}
                  </span>
                </td>
              </tr>
              <tr class="font-semibold bg-white border-t-2 border-stone-200 text-[#233267]">
                <td class="py-2 px-2">TOTAL SCORE</td>
                <td></td>
                <td class="text-center">{{ totals.timeOverhead }}</td>
                <td class="text-center">{{ totals.projectBased }}</td>
                <td class="text-center">{{ totals.subscription }}</td>
                <td class="text-center">{{ totals.retainer }}</td>
                <td class="text-center">{{ totals.valueBased }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-end">
          <button 
            @click="resetRatings" 
            class="hover:text-accent text-sm text-stone-500 transition duration-300"
          >
            Reset to default values
          </button>
        </div>
      </div>

      <!-- Results Section -->
      <div 
        v-if="recommendedModel" 
        class="border-[#233267] mb-8 rounded-xl border-l-4 bg-[#fff] p-5 shadow-lg sm:p-6"
      >
        <h2 class="mb-4 text-xl font-bold text-[#233267]">
          Recommended Pricing Model
        </h2>
        <p class="mb-4 text-lg">
          Based on your priorities, the
          <span class="text-[#233267] font-bold">{{ modelInfo[recommendedModel].name }}</span>
          pricing model might be the best fit for your business.
        </p>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-3 text-lg font-medium text-stone-800">
              Model Advantages
            </h3>
            <ul class="list-disc space-y-2 pl-5 text-base text-stone-600">
              <li v-for="(advantage, index) in modelInfo[recommendedModel].advantages" :key="index">
                {{ advantage }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-3 text-lg font-medium text-stone-800">
              Best For
            </h3>
            <p class="text-base text-stone-600">
              {{ modelInfo[recommendedModel].bestFor }}
            </p>
          </div>
        </div>
        <div class="mt-6">
          <a 
          
            class="rounded-lg bg-[#233267] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#233267] hover:ring-2 hover:ring-[#233267] focus:outline-none focus:ring-2 focus:ring-[#233267]"
          >
            Learn more about {{ modelInfo[recommendedModel].name }} pricing
          </a>
        </div>
      </div>

      <!-- Comparison Chart -->
      <div class="mb-8 rounded-xl border p-5 sm:p-6 bg-white">
        <h2 class="mb-5 border-b border-stone-100 pb-2 text-xl font-semibold text-[#233267]">
          Model Comparison
        </h2>
        <div class="h-72">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
    </div>
  </div>
   <Faqs/>
</template>

<script setup>
import Faqs from '~/components/Sections/Faqs.vue'
import breadcrumb from '~/components/Sections/breadcrumb.vue'
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
definePageMeta({ layout: 'tools' })

// Register Chart.js components
Chart.register(...registerables)

// Business factors data
const businessFactors = ref([
  {
    name: 'Predictable revenue',
    compatibility: {
      timeOverhead: 2,
      projectBased: 3,
      subscription: 5,
      retainer: 5,
      valueBased: 3,
    },
  },
  {
    name: 'Client budget certainty',
    compatibility: {
      timeOverhead: 2,
      projectBased: 4,
      subscription: 5,
      retainer: 5,
      valueBased: 2,
    },
  },
  {
    name: 'Profitability potential',
    compatibility: {
      timeOverhead: 3,
      projectBased: 4,
      subscription: 4,
      retainer: 4,
      valueBased: 5,
    },
  },
  {
    name: 'Implementation ease',
    compatibility: {
      timeOverhead: 5,
      projectBased: 4,
      subscription: 3,
      retainer: 3,
      valueBased: 2,
    },
  },
  {
    name: 'Suitable for complex work',
    compatibility: {
      timeOverhead: 4,
      projectBased: 3,
      subscription: 2,
      retainer: 3,
      valueBased: 5,
    },
  },
  {
    name: 'Client relationship building',
    compatibility: {
      timeOverhead: 2,
      projectBased: 3,
      subscription: 5,
      retainer: 5,
      valueBased: 4,
    },
  },
  {
    name: 'Scalability',
    compatibility: {
      timeOverhead: 2,
      projectBased: 3,
      subscription: 5,
      retainer: 4,
      valueBased: 4,
    },
  },
])

// Model information
const modelInfo = {
  timeOverhead: {
    name: 'Time and Overhead',
    advantages: [
      'Simplest model to implement and understand',
      'No risk of underestimating project costs',
      'Works well for complex projects with uncertain scope',
      'Clients only pay for actual time spent',
    ],
    bestFor:
      'New agencies or freelancers working on complex, unpredictable projects where scope is difficult to estimate upfront and implementation simplicity is a priority.',
    learnMoreUrl: '/blog/billable-hours-tracker',
  },
  projectBased: {
    name: 'Project-Based',
    advantages: [
      'Clients know exact costs upfront',
      'Incentivizes efficiency in delivery',
      'Easier to communicate value than hourly rates',
      'Good balance of predictability and simplicity',
    ],
    bestFor:
      'Growing agencies that want to balance client budget certainty with profitability and have enough experience to accurately scope projects.',
    learnMoreUrl: '/blog/project-based-pricing',
  },
  subscription: {
    name: 'Subscription',
    advantages: [
      'Highly predictable recurring revenue',
      'Excellent for client budget planning',
      'Builds long-term client relationships',
      'Superior business scalability',
    ],
    bestFor:
      'Established agencies seeking predictable revenue and long-term client relationships that offer ongoing services with consistent delivery requirements.',
    learnMoreUrl: '/blog/recurring-service',
  },
  retainer: {
    name: 'Retainer',
    advantages: [
      'Consistent revenue with flexibility',
      'Builds strategic client partnerships',
      'Clients appreciate reserved capacity',
      'Works well for variable monthly needs',
    ],
    bestFor:
      'Consultative agencies that provide ongoing strategic services with more customization than subscription models and need both stability and flexibility.',
    learnMoreUrl: '/tools/retainer-calculator',
  },
  valueBased: {
    name: 'Value-Based',
    advantages: [
      'Highest profit potential',
      'Aligns agency success with client results',
      'Ideal for high-impact specialized services',
      'Positions you as a strategic partner',
    ],
    bestFor:
      'Specialized, high-impact agencies that create substantial client value and have confidence in their ability to deliver measurable results.',
    learnMoreUrl: '/blog/value-based-pricing',
  },
}

// Importance ratings (default to 3)
const importanceRatings = ref(businessFactors.value.map(() => 3))

// Chart reference
const chartCanvas = ref(null)
let chartInstance = null

// Chart colors
const CHART_COLORS = [
  'rgba(59, 130, 246, 0.7)', // Blue
  'rgba(16, 185, 129, 0.7)', // Green
  'rgba(99, 87, 245, 0.7)', // Indigo
  'rgba(245, 158, 11, 0.7)', // Amber
  'rgba(239, 68, 68, 0.7)', // Red
]

// Calculate totals
const totals = computed(() => {
  const result = {
    timeOverhead: 0,
    projectBased: 0,
    subscription: 0,
    retainer: 0,
    valueBased: 0,
  }

  businessFactors.value.forEach((factor, index) => {
    const importance = importanceRatings.value[index]
    result.timeOverhead += importance * factor.compatibility.timeOverhead
    result.projectBased += importance * factor.compatibility.projectBased
    result.subscription += importance * factor.compatibility.subscription
    result.retainer += importance * factor.compatibility.retainer
    result.valueBased += importance * factor.compatibility.valueBased
  })

  return result
})

// Get recommended model
const recommendedModel = computed(() => {
  let highestScore = 0
  let highestModel = ''

  Object.entries(totals.value).forEach(([model, score]) => {
    if (score > highestScore) {
      highestScore = score
      highestModel = model
    }
  })

  return highestModel
})

// Update chart
const updateChart = () => {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')

  // Destroy previous chart if it exists
  if (chartInstance) {
    chartInstance.destroy()
  }

  // Prepare data
  const labels = [
    'Time & Overhead',
    'Project-Based',
    'Subscription',
    'Retainer',
    'Value-Based',
  ]

  const data = [
    totals.value.timeOverhead,
    totals.value.projectBased,
    totals.value.subscription,
    totals.value.retainer,
    totals.value.valueBased,
  ]

  // Create chart
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Compatibility Score',
          data: data,
          backgroundColor: CHART_COLORS,
          borderColor: 'rgba(255, 255, 255, 0.8)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Score: ${context.raw}`
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Compatibility Score',
          },
        },
      },
    },
  })
}

// Update calculations
const updateCalculations = () => {
  nextTick(() => {
    updateChart()
  })
}

// Reset ratings
const resetRatings = () => {
  importanceRatings.value = businessFactors.value.map(() => 3)
  updateCalculations()
}

// Watch for changes in totals
watch(totals, () => {
  updateChart()
})

// Initialize on mount
onMounted(() => {
  updateChart()
})
</script>

<style scoped>
.bg-cream-100 {
  background-color: #faf8f5;
}

.text-accent {
  color: #d97706;
}

.border-accent {
  border-color: #d97706;
}

.btn-primary {
  background-color: #d97706;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #b45309;
}

select {
  cursor: pointer;
}

select:focus {
  outline: 2px solid#233267;
  outline-offset: 2px;
}
</style>

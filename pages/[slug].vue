<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'
import { useHead, useServerSeoMeta, useAsyncData, useRouter, useRoute, createError } from '#imports'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Loader from "@/components/Sections/Loader.vue"

import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const route = useRoute()
const showLoader = ref(true)

/* =========================
   1. FAQ State
========================= */
const activeQuestion = ref<string | null>(null)

/* =========================
   2. SEO + CSS holders
========================= */
let seoRaw: any = {}
let dynamicCss = ''

/* =========================
   3. Calculator cleanup tracker  ← FIX: declared at module level
========================= */
let calculatorListeners: Array<() => void> = []

/* =========================
   4. Fetch Data
========================= */
const { data: pageData } = await useAsyncData(
  `page-content-${route.params.slug}`,
  async () => {
    try {
      const wpPage: any = await $fetch(
        'https://admin.dspcrm.com/wp-json/wp/v2/pages',
        { params: { slug: route.params.slug } }
      )

      if (!wpPage || wpPage.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
      }

      const id = wpPage[0].id

      const res = await $fetch<any>(`https://admin.dspcrm.com/wp-json/custom/v1/page-${id}`, {
        responseType: 'text'
      })

      let customData: any = null
      try {
        customData = typeof res === 'string' ? JSON.parse(res) : res
      } catch (err) {
        console.error('Invalid JSON:', res)
        throw createError({ statusCode: 500, statusMessage: 'Invalid API Response' })
      }

      if (import.meta.server) {
        seoRaw = customData?.seo_data || {}
        dynamicCss = (customData?.Author_page_custom_css || '')
          .replace(/<\/?style[^>]*>/gi, '')
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          .trim()
      }

      const { seo_data, Author_page_custom_css, ...rest } = customData
      return { ...rest, wp_id: id }

    } catch (err) {
      console.error('Fetch Error:', err)
      throw err
    }
  },
  { server: true }
)

/* =========================
   5. CALCULATOR
========================= */
const parseNumber = (val: string): number =>
  parseFloat(val.replace(/[^0-9.-]+/g, '')) || 0

const parsePercent = (val: string): number =>
  (parseFloat(val.replace('%', '').replace(/[^0-9.-]+/g, '')) || 0) / 100

const getVal = (id: string): string | undefined => {
  const elements = document.querySelectorAll(`[id="${id}"]`)
  if (elements.length === 0) return undefined

  let targetEl = elements[elements.length - 1]
  for (let i = elements.length - 1; i >= 0; i--) {
    if ((elements[i] as HTMLElement).offsetParent !== null) {
      targetEl = elements[i]
      break
    }
  }

  if (targetEl.tagName === 'INPUT' || targetEl.tagName === 'SELECT') {
    return (targetEl as HTMLInputElement | HTMLSelectElement).value
  }

  const child = targetEl.querySelector('input, select') as HTMLInputElement | HTMLSelectElement | null
  return child ? child.value : undefined
}

const getFormData = () => ({
  profit: parseNumber(getVal('profit') || '0'),
  recurringRevenue: parsePercent(getVal('recurring') || '0'),
  topClientRevenue: parsePercent(getVal('topClient') || '0'),
  service: getVal('service') || 'SEO & Digital Marketing',
  ownerDependency: getVal('owner') || "I'm involved but not essential",
  years: getVal('years') || '3-5 years',
  teamSize: getVal('team') || '2-5 people'
})

const generateRecommendations = (data: ReturnType<typeof getFormData>) => {
  const risks: string[] = []
  const growth: string[] = []

  if (data.ownerDependency !== 'Not involved')
    risks.push('Document key processes and train team members to reduce owner dependency.')
  if (data.topClientRevenue > 0.25)
    risks.push('Diversify your client base. High concentration in one client significantly lowers your multiple.')
  if (data.teamSize === '2-5 people')
    risks.push('Build out your middle management or key contractors to distribute risk.')
  if (risks.length === 0)
    risks.push('Consistently review client contracts and service agreements to lock in your current low-risk profile.')

  if (data.recurringRevenue < 0.6)
    growth.push('Develop more subscription-based or retainer service offerings.')
  else
    growth.push('Increase pricing on your highly-demanded recurring services.')

  if (data.service === 'Web Development' || data.service === 'Design')
    growth.push('Add automated maintenance plans to convert one-off projects into recurring monthly revenue.')

  growth.push('Implement professional business management tools like Wayfront to track margins and capacity.')
  growth.push('Track key metrics monthly to monitor progress and valuation improvements.')

  return { risks, growth }
}

const calculateValuation = (data: ReturnType<typeof getFormData>) => {
  let multiple = 3

  if (data.recurringRevenue >= 0.8) multiple += 1
  else if (data.recurringRevenue >= 0.5) multiple += 0.5

  let riskLevel = 'Low'
  if (data.topClientRevenue > 0.4) { multiple -= 1; riskLevel = 'High' }
  else if (data.topClientRevenue > 0.25) { multiple -= 0.5; riskLevel = 'Medium' }

  const serviceMap: Record<string, number> = {
    'SEO & Digital Marketing': 0.5,
    'Paid Advertising': 0.4,
    'Web Development': 0.2,
    'Design': 0.1
  }
  const ownerMap: Record<string, number> = {
    'Not involved': 1,
    "I'm involved but not essential": 0.5,
    'Highly dependent': -1
  }
  const yearsMap: Record<string, number> = {
    '0-2 years': -0.5,
    '3-5 years': 0.3,
    '5+ years': 0.7
  }
  const teamMap: Record<string, number> = {
    '2-5 people': 0.2,
    '6-10 people': 0.5,
    '10+ people': 1
  }

  multiple += serviceMap[data.service] ?? 0
  multiple += ownerMap[data.ownerDependency] ?? 0
  multiple += yearsMap[data.years] ?? 0
  multiple += teamMap[data.teamSize] ?? 0
  multiple = Math.min(Math.max(multiple, 1), 6)

  const valuation = Math.round(data.profit * multiple)
  const valLow    = Math.round(valuation * 0.9)
  const valHigh   = Math.round(valuation * 1.1)

  let benchmark = 'Average'
  if (multiple >= 4.5) benchmark = 'Above Average'
  else if (multiple <= 3.0) benchmark = 'Below Average'

  return {
    valuation, valLow, valHigh,
    multiple: multiple.toFixed(1),
    riskLevel, benchmark,
    service: data.service,
    recurring: Math.round(data.recurringRevenue * 100)
  }
}

const updateUI = (result: ReturnType<typeof calculateValuation>, data: ReturnType<typeof getFormData>) => {
  const set = (id: string, text: string) => {
    const el = document.getElementById(id)
    if (el) el.innerText = text
  }
  const setHTML = (id: string, html: string) => {
    const el = document.getElementById(id)
    if (el) el.innerHTML = html
  }

  set('valuation', `$${result.valuation.toLocaleString()}`)
  set('multiple', `${result.multiple}x Multiple`)
  setHTML('val-range', `$${result.valLow.toLocaleString()} - <br>$${result.valHigh.toLocaleString()}`)
  set('val-multiple', `${result.multiple}x`)
  set('val-risk', result.riskLevel)
  set('val-benchmark', result.benchmark)
  set('val-analysis',
    `Your agency is valued at ${result.multiple}x annual profit, which is ${result.benchmark.toLowerCase()} ` +
    `for the industry. This valuation is based on your ${result.service.toLowerCase()} service offering, ` +
    `${result.recurring}% recurring revenue, and ${result.riskLevel.toLowerCase()} risk profile.`
  )

  const iconSVG = `<svg class="w-5 h-5 text-[#FA461E] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
  const toItem = (r: string) =>
    `<li class="flex items-start gap-3 mb-3">${iconSVG}<span class="text-gray-600 text-sm xl:text-base leading-relaxed">${r}</span></li>`

  const recs = generateRecommendations(data)
  setHTML('risk-list', recs.risks.map(toItem).join(''))
  setHTML('growth-list', recs.growth.map(toItem).join(''))

  document.getElementById('result-container')?.classList.remove('hidden')
  document.getElementById('recommendations-container')?.classList.add('hidden')
}

const initCalculator = () => {
  // Cleanup previous listeners before re-attaching
  calculatorListeners.forEach(fn => fn())
  calculatorListeners = []

  const btn = document.getElementById('calculateBtn') as HTMLButtonElement | null
  if (!btn) return

  const handleCalculate = (e?: Event) => {
    e?.preventDefault()
    const data = getFormData()
    const result = calculateValuation(data)
    updateUI(result, data)
  }

  btn.addEventListener('click', handleCalculate)
  calculatorListeners.push(() => btn.removeEventListener('click', handleCalculate))

  const recBtn = document.getElementById('getRecommendationsBtn')
  const recContainer = document.getElementById('recommendations-container')
  if (recBtn && recContainer) {
    const showRecs = (e: Event) => {
      e.preventDefault()
      recContainer.classList.remove('hidden')
      setTimeout(() => recContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    }
    recBtn.addEventListener('click', showRecs)
    calculatorListeners.push(() => recBtn.removeEventListener('click', showRecs))
  }
}

/* =========================
   6. Sections
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}
  const excludeKeys = ['id', 'title', 'link', 'wp_id']
  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = (pageData.value as any)[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
   7. SEO
========================= */
useServerSeoMeta({
  title: seoRaw.meta_title || 'DSP CRM',
  description: seoRaw.meta_description || '',
  keywords: seoRaw.meta_keywords || '',
  robots: seoRaw.robots || 'index, follow',
  ogTitle: seoRaw.og_title || '',
  ogDescription: seoRaw.og_description || '',
  ogImage: seoRaw.og_image || '',
  ogType: seoRaw.og_type || 'website',
  twitterCard: seoRaw.twitter_card || 'summary_large_image',
  twitterTitle: seoRaw.twitter_title || '',
  twitterDescription: seoRaw.twitter_description || '',
  twitterImage: seoRaw.twitter_image || '',
})

useHead({
  link: [{ rel: 'canonical', href: seoRaw.canonical_url || `https://dspcrm.com${route.path}` }],
  ...(dynamicCss ? { style: [{ id: 'dynamic-page-css', innerHTML: dynamicCss }] } : {})
})

/* =========================
   8. Swiper + AOS
========================= */
function initializeScripts() {
  const selectors = ['.testimonialSwiper', '.mySwiper']
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((slider: any) => {
      if (slider.swiper) return
      new Swiper(slider, {
        modules: [Autoplay, Pagination],
        loop: slider.dataset.loop === 'true',
        speed: Number(slider.dataset.speed) || 800,
        autoplay: { delay: Number(slider.dataset.delay) || 3000 },
        pagination: { el: slider.querySelector('.swiper-pagination'), clickable: true }
      })
    })
  })
  AOS.init({ duration: 1000, once: true, offset: 120 })
}

/* =========================
   9. Filters
========================= */
function initFilters() {
  const categoryItems = document.querySelectorAll('.toogle_sidebar li')
  const typeItems = document.querySelectorAll('.type_sidebar li')
  const toolBoxes = document.querySelectorAll('.tool_box')
  if (!toolBoxes.length) return

  const applyFilters = () => {
    const activeCategory = document.querySelector('.toogle_sidebar li.active')
      ?.getAttribute('data-filter')?.toLowerCase() || 'all'
    const activeType = document.querySelector('.type_sidebar li.active')
      ?.getAttribute('data-type')?.toLowerCase() || 'all'

    toolBoxes.forEach((box: any) => {
      const categories = (box.dataset.category || '').toLowerCase().split(' ').map((c: string) => c.trim()).filter(Boolean)
      const type = (box.dataset.type || '').toLowerCase()
      const show =
        (activeCategory === 'all' || categories.includes(activeCategory)) &&
        (activeType === 'all' || type === activeType)
      box.classList.toggle('show', show)
      box.classList.toggle('hide', !show)
    })
  }

  categoryItems.forEach((item: any) => {
    item.addEventListener('click', () => {
      categoryItems.forEach((li: any) => li.classList.remove('active'))
      item.classList.add('active')
      applyFilters()
    })
  })

  typeItems.forEach((item: any) => {
    item.addEventListener('click', () => {
      typeItems.forEach((li: any) => li.classList.remove('active'))
      item.classList.add('active')
      applyFilters()
    })
  })

  categoryItems[0]?.classList.add('active')
  typeItems[0]?.classList.add('active')
  applyFilters()
}

/* =========================
   10. FAQ Handler
========================= */
function handleFaqClick(id: string) {
  activeQuestion.value = id
  document.querySelectorAll('.faq-btn').forEach((btn: any) => {
    btn.classList.remove('active', 'bg-white', 'shadow-[0_4px_4px_rgba(0,0,0,0.25)]', 'rounded-l-lg')
  })
  const activeBtn = document.querySelector(`.faq-btn[data-id="${id}"]`) as HTMLElement | null
  activeBtn?.classList.add('active', 'bg-white', 'shadow-[0_4px_4px_rgba(0,0,0,0.25)]', 'rounded-l-lg')

  nextTick(() => {
    document.getElementById('Faqs')?.scrollIntoView({ behavior: 'smooth' })
  })
}

/* =========================
   11. Global Click Handler
========================= */
const handleWpClick = (event: MouseEvent) => {
  const blogTarget = (event.target as HTMLElement).closest('.blog_box')
  if (blogTarget) {
    const slug = blogTarget.getAttribute('data-slug')
    if (slug) router.push(`/blog/${slug}`)
    return
  }

  const faqTarget = (event.target as HTMLElement).closest('.faq-btn')
  if (faqTarget) {
    const id = faqTarget.getAttribute('data-id')
    if (id) handleFaqClick(id)
  }
}

/* =========================
   12. Watch pageData → init calculator
========================= */
watch(
  () => pageData.value,
  (newVal) => {
    if (newVal) {
      nextTick(() => setTimeout(initCalculator, 100))
    }
  },
  { immediate: true }
)

/* =========================
   13. Mounted
========================= */
onMounted(() => {
  setTimeout(() => {
    showLoader.value = false
    nextTick(() => {
      initializeScripts()
      initFilters()
    })
  }, 300)
})

/* =========================
   14. Cleanup on Unmount
========================= */
onUnmounted(() => {
  calculatorListeners.forEach(fn => fn())
  calculatorListeners = []
})
</script>

<template>
  <div>
    <Loader v-if="showLoader" />

    <div
      class="wp-content"
      :class="{ 'content-hidden': showLoader }"
      @click="handleWpClick"
    >
      <div v-if="pageData">
        <div
          v-for="(sectionContent, key) in apiSections"
          :key="key"
          v-html="sectionContent"
        />
      </div>

      <div v-else-if="!showLoader" class="error">
        <h1 class="text-3xl font-bold">Page Not Found</h1>
        <p>We couldn't find the content for /{{ $route.params.slug }}</p>
        <button @click="router.push('/')" class="mt-4 underline">Go Home</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wp-content {
  width: 100%;
  min-height: 80vh;
}

.content-hidden {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}

.error {
  color: #333;
  text-align: center;
  padding: 5rem 2rem;
}

:deep(.mySwiper .swiper-wrapper) {
  padding-top: 0;
}

:deep(.tool_box) {
  transition: all 0.4s ease;
}

:deep(.tool_box.hide) {
  opacity: 0;
  transform: scale(0.9);
  pointer-events: none;
  position: absolute;
}

:deep(.tool_box.show) {
  opacity: 1;
  transform: scale(1);
  position: relative;
}
</style>
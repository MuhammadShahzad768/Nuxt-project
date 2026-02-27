<template>
  <div>
    <Loader v-if="loading" />

    <div v-else class="wp-content">
      <div v-if="pageData">
        <div
          v-for="(sectionContent, sectionKey) in apiSections"
          :key="sectionKey"
          v-html="sectionContent"
        ></div>
      </div>

      <div v-if="error" class="error">
        Error loading page content.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useHead, useAsyncData } from '#imports'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Your Loader Component
import Loader from "@/components/Sections/Loader.vue"

// Swiper Imports
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const pageId = 'terms'
const loading = ref(true) // Start as true

/* =========================
   1. Fetch Page Data
========================= */
const { data: pageData, error } = await useAsyncData(
  `wp-page-${pageId}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/terms`)
)

/* =========================
   2. Extract HTML Sections
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}
  const excludeKeys = ['seo_data', 'custom_css', 'id', 'title', 'link']
  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = pageData.value[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})
/* =========================
   3. SEO Handling
========================= */
const seo = computed(() => pageData.value?.seo_data || {})

useHead({
  title: () => seo.value.meta_title || 'DSP CRM',

  meta: [
    { name: 'description', content: seo.value.meta_description || '' },
    { name: 'keywords', content: seo.value.meta_keywords || '' },
    { name: 'robots', content: seo.value.robots || '' },

    // Open Graph
    { property: 'og:title', content: seo.value.og_title || '' },
    { property: 'og:description', content: seo.value.og_description || '' },
    { property: 'og:image', content: seo.value.og_image || '' },
    { property: 'og:type', content: 'website' },

    // Twitter
    { name: 'twitter:card', content: seo.value.twitter_card || '' },
    { name: 'twitter:title', content: seo.value.og_title || '' },
    { name: 'twitter:description', content: seo.value.og_description || '' },
    { name: 'twitter:image', content: seo.value.og_image || '' }
  ],

  link: [
    { rel: 'canonical', href: seo.value.canonical_url || '' }
  ],

  style: [
    {
      id: 'dynamic-page-css',
      innerHTML:
        pageData.value?.custom_css
          ?.replace(/<\/?style[^>]*>/gi, '')
          .trim() || ''
    }
  ]
})

/* =========================
   3. Initialization Logic
========================= */
function initializeScripts() {
  // Swiper Init
  const sliders = document.querySelectorAll('.testimonialSwiper')
  sliders.forEach((slider: any) => {
    if (slider.swiper) return
    new Swiper(slider, {
      modules: [Autoplay, Pagination],
      loop: slider.dataset.loop === 'true',
      speed: Number(slider.dataset.speed) || 800,
      autoplay: slider.dataset.delay ? { delay: Number(slider.dataset.delay) } : false,
      pagination: { el: slider.querySelector('.swiper-pagination'), clickable: true }
    })
  })

  // AOS Init (Matches your old code's timing)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  })
}

onMounted(async () => {
  try {
    // If data exists, wait for render, then initialize
    if (pageData.value) {
      await nextTick()
      
      // Simulate a small delay for smooth transition like your old code
      setTimeout(() => {
        initializeScripts()
        loading.value = false // Hide Preloader
      }, 300)
    } else {
      loading.value = false
    }
  } catch (err) {
    console.error("Initialization Error:", err)
    loading.value = false
  }
})

/* SEO logic remains same... */
</script>
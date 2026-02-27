<template>
  <div>
    <!-- Loader -->
    <Loader v-if="loading" />

    <!-- Page Content -->
    <div v-else class="wp-content">
      <div v-if="storyContent" v-html="storyContent"></div>
      <div v-else class="error">
        Error loading story content.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useHead, useAsyncData } from '#imports'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Loader Component
import Loader from "@/components/Sections/Loader.vue"

// Swiper
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Page ID
const pageId = 706
const loading = ref(true)

// =========================
// 1. Fetch Page Data
// =========================
const { data: pageData, error } = await useAsyncData(
  `wp-page-${pageId}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/page-706`)
)

// =========================
// 2. Story Section
// =========================
const storyContent = computed(() => pageData.value?.story_section?.story_content || '')

// =========================
// 3. SEO Handling
// =========================
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
    { property: 'og:type', content: seo.value.og_type || 'website' },

    // Twitter
    { name: 'twitter:card', content: seo.value.twitter_card || 'summary_large_image' },
    { name: 'twitter:title', content: seo.value.twitter_title || seo.value.og_title || '' },
    { name: 'twitter:description', content: seo.value.twitter_description || seo.value.og_description || '' },
    { name: 'twitter:image', content: seo.value.twitter_image || seo.value.og_image || '' }
  ],
  link: [
    { rel: 'canonical', href: seo.value.canonical_url || '' }
  ],
  style: [
    {
      id: 'dynamic-page-css',
      innerHTML: pageData.value?.custom_css?.replace(/<\/?style[^>]*>/gi, '').trim() || ''
    }
  ]
})

// =========================
// 4. Initialize Scripts
// =========================
function initializeScripts() {
  // Swiper
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

  // AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  })
}

// =========================
// 5. Mounted Hook
// =========================
onMounted(async () => {
  try {
    if (pageData.value) {
      await nextTick()
      setTimeout(() => {
        initializeScripts()
        loading.value = false
      }, 300)
    } else {
      loading.value = false
    }
  } catch (err) {
    console.error("Initialization Error:", err)
    loading.value = false
  }
})
</script>
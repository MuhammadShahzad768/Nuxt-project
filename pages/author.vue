<template>
  <div>
    <Loader v-if="loading" />

    <div 
      v-show="!loading" 
      class="wp-content"
      @click="handleWpClick"
    >
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
import { useHead, useAsyncData, useRouter } from '#imports'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Your Loader Component
import Loader from "@/components/Sections/Loader.vue"



// Swiper Imports
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
const router = useRouter()
const pageId = 'author-and-articles'
const loading = ref(true)

/* =========================
   1. Fetch Page Data
========================= */
const { data: pageData, error } = await useAsyncData(
  `wp-page-${pageId}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/author-and-articles?t=${Date.now()}`),
  {
    server: true,   // 👈 IMPORTANT
    lazy: false
  }
)

/* =========================
   2. Extract HTML Sections
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}
  
  const excludeKeys = ['seo_data', 'Author_page_custom_css', 'id', 'title', 'link']
  
  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = pageData.value[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
   3. SEO & Fixed CSS Handling
========================= */
const seo = computed(() => pageData.value?.seo_data || {})

useHead({
  title: () => seo.value.meta_title || 'DSP CRM',
  meta: [
    { name: 'description', content: seo.value.meta_description || '' },
    { name: 'keywords', content: seo.value.meta_keywords || '' },
    { name: 'robots', content: seo.value.robots || '' },
    { property: 'og:title', content: seo.value.og_title || '' },
    { property: 'og:description', content: seo.value.og_description || '' },
    { property: 'og:image', content: seo.value.og_image || '' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: seo.value.twitter_card || '' },
  ],
  link: [
    { rel: 'canonical', href: seo.value.canonical_url || '' }
  ],
  style: [
    {
      id: 'dynamic-page-css',
      innerHTML: computed(() => {
        let css = pageData.value?.Author_page_custom_css || ''
        
        // Clean and Escape the CSS
        return css
          .replace(/<\/?style[^>]*>/gi, '') // Remove <style> tags
          .replace(/&gt;/g, '>')           // Decode HTML entities
          .replace(/&lt;/g, '<')
          /* IMPORTANT: Tailwind-style classes like .w-[70px] 
             must be escaped as .w-\[70px\] in standard CSS.
          */
          .replace(/\.([\w\d\-\[\]%]+)/g, (match) => {
             return match.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
          })
          .trim()
      })
    }
  ]
})

/* =========================
   4. Initialization Logic
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

  // AOS Init
  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  })
}
/* =========================
   BLOG NAVIGATION (IMPORTANT)
========================= */
const handleWpClick = (event: MouseEvent) => {
  const target = (event.target as HTMLElement).closest('.blog_box')

  if (target) {
    const slug = target.getAttribute('data-slug')
    if (slug) {
      router.push(`/blog/${slug}`)
    }
  }
}
onMounted(async () => {
  if (pageData.value) {
    // Wait for the next DOM update cycle
    await nextTick()
    
    // Give the browser a moment to parse the v-html and apply useHead styles
    setTimeout(() => {
      initializeScripts()
      loading.value = false
    }, 200)
  } else {
    loading.value = false
  }
})
</script>

<style scoped>
.wp-content {
  width: 100%;
  overflow-x: hidden;
}
.error {
  color: red;
  text-align: center;
  padding: 2rem;
}

/* Ensure the injected v-html respects layout */
:deep(.wp-content) section {
  display: block;
}
</style>
<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useHead, useAsyncData, useRouter, useRoute } from '#imports'
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
   1. Fetch Page ID from Slug
========================= */
// Pehle WordPress ki default API se ID fetch karte hain
const { data: wpPage } = await useAsyncData(
  `wp-id-${route.params.slug}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/wp/v2/pages?slug=${route.params.slug}`),
  { server: true }
)

// ID ko extract karein
const pageId = computed(() => {
  return wpPage.value && wpPage.value.length > 0 ? wpPage.value[0].id : null
})

/* =========================
   2. Fetch Custom Page Data
========================= */
// Jab ID mil jaye to aapka custom endpoint call hoga
const { data: pageData, error } = await useAsyncData(
  `custom-data-${route.params.slug}`,
  async () => {
    if (!pageId.value) return null
    return $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/page-${pageId.value}`)
  },
  {
    watch: [pageId], // ID change hote hi dobara fetch karega
    server: true
  }
)

/* =========================
   3. Extract HTML Sections
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}

  const excludeKeys = ['seo_data', 'Author_page_custom_css', 'id', 'title', 'link']

  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = (pageData.value as Record<string, any>)[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
   4. SEO Handling
========================= */
const seo = computed(() => (pageData.value as any)?.seo_data || {})

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
  link: [{ rel: 'canonical', href: seo.value.canonical_url || '' }],
  style: [
    {
      id: 'dynamic-page-css',
      innerHTML: computed(() => {
        let css = (pageData.value as any)?.Author_page_custom_css || ''
        return css
          .replace(/<\/?style[^>]*>/gi, '')
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          .replace(/\.([\w\d\-\[\]%]+)/g, (match: string) => match.replace(/\[/g, '\\[').replace(/\]/g, '\\]'))
          .trim()
      })
    }
  ]
})

/* =========================
   5. Scripts Initialization
========================= */
function initializeScripts() {
  const selectors = ['.testimonialSwiper', '.mySwiper']
  selectors.forEach(selector => {
    const sliders = document.querySelectorAll(selector)
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
  })

  AOS.init({ duration: 1000, once: true, offset: 120 })
}

const handleWpClick = (event: MouseEvent) => {
  const target = (event.target as HTMLElement).closest('.blog_box')
  if (target) {
    const slug = target.getAttribute('data-slug')
    if (slug) router.push(`/blog/${slug}`)
  }
}

onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    showLoader.value = false
    nextTick(() => { initializeScripts() })
  }, 200)
})
</script>

<template>
  <div>
    <Loader v-if="showLoader" />

    <div class="wp-content" :class="{ 'content-hidden': showLoader }" @click="handleWpClick">
      <div v-if="pageData">
        <div v-for="(sectionContent, sectionKey) in apiSections" :key="sectionKey" v-html="sectionContent"></div>
      </div>

      <div v-else-if="!showLoader && !pageId" class="error">
        <h1 class="text-3xl font-bold">404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>

      <div v-else-if="error" class="error">
        Error loading page content. Please try again later.
      </div>
    </div>
  </div>
</template>

<style scoped>
.wp-content { width: 100%; min-height: 80vh; }
.content-hidden { visibility: hidden; height: 0; overflow: hidden; }
.error { color: #333; text-align: center; padding: 5rem 2rem; }
:deep(.wp-content) section { display: block; }
:deep(.mySwiper .swiper-wrapper) { padding-top: 0; }
</style>
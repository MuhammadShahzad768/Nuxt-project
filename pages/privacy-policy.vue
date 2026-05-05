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
import { useHead, useAsyncData, useRoute } from '#imports'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Loader from "@/components/Sections/Loader.vue"

// Swiper Imports
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const pageId = 'privacy'
const loading = ref(true)
const route = useRoute()

/* =========================
   1. Fetch Data
========================= */
const { data: pageData, error } = await useAsyncData(
  `wp-page-${pageId}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/privacy`)
)

/* =========================
   2. Extract HTML Sections
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}
  const excludeKeys = ['seo_data', 'SEO', 'custom_css', 'id', 'title', 'link']
  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = pageData.value[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
   3. SEO Parser (Regex)
========================= */
function parseSeoHtml(html: string) {
  if (!html) return { title: '', meta: [] }

  let title = ''
  const meta: any[] = []

  const titleMatch = html.match(/<title>(.*?)<\/title>/i)
  if (titleMatch) title = titleMatch[1]

  const metaTags = html.match(/<meta[^>]+>/gi) || []
  metaTags.forEach((tag) => {
    const attrs: any = {}
    const attrMatches = tag.match(/([\w:-]+)="([^"]*)"/g) || []
    attrMatches.forEach((attr) => {
      const [key, value] = attr.split('=')
      attrs[key] = value.replace(/"/g, '')
    })

    // Normalize for useHead
    if (attrs.name) {
      meta.push({ name: attrs.name, content: attrs.content || '' })
    } else if (attrs.property) {
      meta.push({ property: attrs.property, content: attrs.content || '' })
    }
  })

  return { title, meta }
}

/* =========================
   4. SEO Injection
========================= */
const rawSeoHtml = computed(() =>
  pageData.value?.SEO?.description || pageData.value?.seo_data || ''
)

useHead(() => {
  const parsed = parseSeoHtml(rawSeoHtml.value)

  return {
    title: parsed.title || 'DSPCRM - Page',
    meta: parsed.meta,
    link: [
      {
        rel: 'canonical',
        href: pageData.value?.SEO?.canonical_url ||
              pageData.value?.seo_data?.canonical_url ||
              `https://dspcrm.com${route.path}`
      }
    ],
    style: pageData.value?.custom_css
      ? [{
          id: 'dynamic-page-css',
          innerHTML: pageData.value?.custom_css
            .replace(/<\/?style[^>]*>/gi, '')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .trim()
        }]
      : []
  }
})

/* =========================
   5. Initialization Logic
========================= */
function initializeScripts() {
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

  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  })
}

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

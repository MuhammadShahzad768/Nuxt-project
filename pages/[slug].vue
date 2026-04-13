<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
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
   3. Fetch Data
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

      const res = await fetch(`https://admin.dspcrm.com/wp-json/custom/v1/page-${id}`)
      const text = await res.text()

      let customData: any = null
      try {
        customData = JSON.parse(text)
      } catch (err) {
        console.error('Invalid JSON:', text)
        throw createError({ statusCode: 500, statusMessage: 'Invalid API Response' })
      }

      if (import.meta.server) {
        seoRaw = customData?.seo_data || {}
        dynamicCss = (customData?.Author_page_custom_css || '')
          .replace(/<\/?style[^>]*>/gi, '')
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          .replace(/\.([\w\d\-\[\]%]+)/g, (m: string) =>
            m.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
          )
          .trim()
      }

      const { seo_data, Author_page_custom_css, ...rest } = customData
      return { ...rest, wp_id: id }

    } catch (err) {
      console.error('Fetch Error:', err)
      throw err
    }
  },
  {
    server: true,
    watch: [() => route.params.slug]
  }
)

/* =========================
   4. Sections
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
   ✅ NEW: Page ID Class
========================= */
const wpClass = computed(() => {
  return pageData.value?.wp_id ? `page-id-${pageData.value.wp_id}` : ''
})

/* =========================
   5. SEO
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
  link: [
    {
      rel: 'canonical',
      href: seoRaw.canonical_url || `https://dspcrm.com${route.path}`
    }
  ],
  ...(dynamicCss ? {
    style: [{ id: 'dynamic-page-css', innerHTML: dynamicCss }]
  } : {})
})

/* =========================
   6. Swiper + AOS
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

        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true
        },

        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 15 },
          1024: { slidesPerView: 1, spaceBetween: 20 },
          1280: { slidesPerView: 1, spaceBetween: 32 }
        }
      })
    })
  })

  AOS.init({ duration: 1000, once: true, offset: 120 })
}

/* =========================
   7. Mounted
========================= */
onMounted(() => {
  setTimeout(() => {
    showLoader.value = false
    nextTick(() => {
      initializeScripts()
    })
  }, 300)
})
</script>

<template>
  <div>
    <Loader v-if="showLoader" />

    <div
      class="wp-content"
      :class="[
        { 'content-hidden': showLoader },
        wpClass
      ]"
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
        <button @click="router.push('/')" class="mt-4 underline">
          Go Home
        </button>
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
@media screen and (min-width:320px) and (max-width:768px){
:deep(.page-id-659 .left_right) {
     padding-top: 20px;
    padding-bottom: 20px;
}
:deep(.page-id-649 .left_right) {
     padding-top: 20px;
    padding-bottom: 20px;
}
:deep(.page-id-662 .left_right) {
     padding-top: 30px;
    padding-bottom: 30px;
}
:deep(.page-id-662 .local-seo_button) {
    padding-bottom: 40px;
}
}
</style>
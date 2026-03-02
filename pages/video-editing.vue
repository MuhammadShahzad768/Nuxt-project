<template>
  <div>
    <!-- Loader overlays on top -->
    <Loader v-if="showLoader" />

    <!-- Content always exists in DOM (for SSR), just invisible until ready -->
    <div
      class="wp-content"
      :class="{ 'content-hidden': showLoader }"
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

import Loader from "@/components/Sections/Loader.vue"

import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const pageId = '662'
const showLoader = ref(true)

/* =========================
   1. Fetch Page Data
========================= */
const { data: pageData, error } = await useAsyncData(
  `wp-page-${pageId}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/page-${pageId}`),
  {
    server: true,
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
    const value = (pageData.value as Record<string, any>)[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
   3. SEO & Fixed CSS Handling
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
  link: [
    { rel: 'canonical', href: seo.value.canonical_url || '' }
  ],
  style: [
    {
      id: 'dynamic-page-css',
      innerHTML: computed(() => {
        let css = (pageData.value as any)?.Author_page_custom_css || ''
        return css
          .replace(/<\/?style[^>]*>/gi, '')
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          .replace(/\.([\w\d\-\[\]%]+)/g, (match: string) => {
            return match.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
          })
          .trim()
      })
    }
  ]
})

/* =========================
   4. Initialize Scripts
========================= */
function initializeScripts() {
  const sliders = document.querySelectorAll('.testimonialSwiper')
  sliders.forEach((slider: any) => {
    if (slider.swiper) return
    new Swiper(slider, {
      modules: [Autoplay, Pagination],
      loop: slider.dataset.loop === 'true',
      speed: Number(slider.dataset.speed) || 800,
      autoplay: slider.dataset.delay
        ? { delay: Number(slider.dataset.delay) }
        : false,
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true
      }
    })
  })

  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  })
}

/* =========================
   5. Blog Navigation
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

/* =========================
   6. Mounted
========================= */
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    showLoader.value = false       // Hide loader
    nextTick(() => {
      initializeScripts()          // Init AOS & Swiper
    })
  }, 200)
})
</script>

<style scoped>
.wp-content {
  width: 100%;
  overflow-x: hidden;
}

/* 👇 Visually hidden but still in DOM — SSR content renders, AOS can scan it */
.content-hidden {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}

.error {
  color: red;
  text-align: center;
  padding: 2rem;
}

:deep(.wp-content) section {
  display: block;
}
</style>
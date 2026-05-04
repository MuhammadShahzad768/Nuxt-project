<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import {
  useHead,
  useSeoMeta,
  useAsyncData,
  useRouter,
  useRoute,
  createError,
  navigateTo
} from '#imports'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Loader from '@/components/Sections/Loader.vue'

import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const route = useRoute()
const showLoader = ref(true)

/* ============================================
   HTML Sanitizer
============================================ */
function sanitizeHtml(html: string): string {
  if (!html) return html

  if (typeof window === 'undefined') {
    return html.replace(/https:\/\/admin\.dspcrm\.com/g, '')
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  doc.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href')
    if (href?.includes('https://admin.dspcrm.com')) {
      link.setAttribute(
        'href',
        href.replace('https://admin.dspcrm.com', '')
      )
    }
  })

  doc.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src')
    if (src?.includes('https://admin.dspcrm.com')) {
      img.setAttribute(
        'src',
        src.replace('https://admin.dspcrm.com', '')
      )
    }
  })

  return doc.body.innerHTML
}

/* ============================================
   Fetch Data
============================================ */
const { data: pageData, pending } = await useAsyncData(
  `page-content-${route.params.slug}`,
  async () => {
    const wpPage: any = await $fetch(
      'https://admin.dspcrm.com/wp-json/wp/v2/pages',
      {
        params: { slug: route.params.slug }
      }
    )

    if (!wpPage?.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
      })
    }

    const id = wpPage[0].id

    const customData: any = await $fetch(
      `https://admin.dspcrm.com/wp-json/custom/v1/page-${id}`
    )

    return {
      ...customData,
      wp_id: id
    }
  },
  {
    server: true,
    lazy: false
  }
)

/* ============================================
   Sections
============================================ */
const apiSections = computed(() => {
  if (!pageData.value) return {}

  const excludeKeys = [
    'id',
    'title',
    'link',
    'wp_id',
    'seo_data',
    'Author_page_custom_css',
    'SEO'
  ]

  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = pageData.value[key]

    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = sanitizeHtml(value)
    }

    return acc
  }, {} as Record<string, string>)
})

/* ============================================
   Page Class
============================================ */
const wpClass = computed(() =>
  pageData.value?.wp_id
    ? `page-id-${pageData.value.wp_id}`
    : ''
)

/* ============================================
   CUSTOM CSS
============================================ */
const customCss = computed(() =>
  (pageData.value?.Author_page_custom_css || '')
    .replace(/<\/?style[^>]*>/gi, '')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .trim()
)

/* ============================================
   SEO PARSER (Regex-based for SSR)
============================================ */
function extractSeoData(html: string) {
  if (!html) return null

  const data: any = {
    title: '',
    description: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    keywords: ''
  }

  // Extract title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
  if (titleMatch) {
    data.title = titleMatch[1].trim()
  }

  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
  if (descMatch) {
    data.description = descMatch[1]
  }

  // Extract keywords
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i)
  if (keywordsMatch) {
    data.keywords = keywordsMatch[1]
  }

  // Extract OG tags
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i)
  if (ogTitleMatch) {
    data.ogTitle = ogTitleMatch[1]
  }

  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i)
  if (ogDescMatch) {
    data.ogDescription = ogDescMatch[1]
  }

  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i)
  if (ogImageMatch) {
    data.ogImage = ogImageMatch[1]
  }

  // Extract Twitter tags
  const twitterCardMatch = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)["']/i)
  if (twitterCardMatch) {
    data.twitterCard = twitterCardMatch[1]
  }

  const twitterTitleMatch = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']*)["']/i)
  if (twitterTitleMatch) {
    data.twitterTitle = twitterTitleMatch[1]
  }

  const twitterDescMatch = html.match(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']*)["']/i)
  if (twitterDescMatch) {
    data.twitterDescription = twitterDescMatch[1]
  }

  const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']*)["']/i)
  if (twitterImageMatch) {
    data.twitterImage = twitterImageMatch[1]
  }

  return data
}

/* ============================================
   SEO SETUP - Using useSeoMeta (More Reliable)
============================================ */
const seoHtml = computed(() => pageData.value?.SEO?.description || '')
const seoInfo = computed(() => extractSeoData(seoHtml.value))

// Use both useHead and useSeoMeta for maximum compatibility
useHead(() => {
  return {
    title: seoInfo.value?.title || pageData.value?.title || 'DSP CRM',
    htmlAttrs: {
      lang: 'en'
    }
  }
})

useSeoMeta({
  title: () => seoInfo.value?.title ,
  description: () => seoInfo.value?.description || 'DSP CRM - Customer Relationship Management',
  ogTitle: () => seoInfo.value?.ogTitle || seoInfo.value?.title || pageData.value?.title || 'DSP CRM',
  ogDescription: () => seoInfo.value?.ogDescription || seoInfo.value?.description || 'DSP CRM',
  ogImage: () => seoInfo.value?.ogImage || '',
  twitterCard: () => seoInfo.value?.twitterCard || 'summary_large_image',
  twitterTitle: () => seoInfo.value?.twitterTitle || seoInfo.value?.title || pageData.value?.title || 'DSP CRM',
  twitterDescription: () => seoInfo.value?.twitterDescription || seoInfo.value?.description || 'DSP CRM',
  twitterImage: () => seoInfo.value?.twitterImage || seoInfo.value?.ogImage || ''
})

/* ============================================
   Sliders + AOS
============================================ */
function initializeScripts() {
  document
    .querySelectorAll('.testimonialSwiper, .mySwiper')
    .forEach((slider: any) => {
      if (slider.swiper) return

      new Swiper(slider, {
        modules: [Autoplay, Pagination],
        loop: true,
        autoplay: { delay: 4000 },
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true
        }
      })
    })

  AOS.init({
    duration: 1000,
    once: true
  })
}

/* ============================================
   Filters
============================================ */
function initFilters() {
  const categoryItems = document.querySelectorAll('.toogle_sidebar li')
  const typeItems = document.querySelectorAll('.type_sidebar li')
  const toolBoxes = document.querySelectorAll('.tool_box')

  if (!toolBoxes.length) return

  const applyFilters = () => {
    const activeCategory =
      (document.querySelector('.toogle_sidebar li.active')?.getAttribute('data-filter') || 'all').toLowerCase()

    const activeType =
      (document.querySelector('.type_sidebar li.active')?.getAttribute('data-type') || 'all').toLowerCase()

    toolBoxes.forEach((box: any) => {
      const category = box.getAttribute('data-category')?.toLowerCase() || ''
      const type = box.getAttribute('data-type')?.toLowerCase() || ''

      const show =
        (activeCategory === 'all' || category === activeCategory) &&
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

  if (!document.querySelector('.toogle_sidebar li.active') && categoryItems[0]) {
    categoryItems[0].classList.add('active')
  }

  if (!document.querySelector('.type_sidebar li.active') && typeItems[0]) {
    typeItems[0].classList.add('active')
  }

  applyFilters()
}

/* ============================================
   Mounted
============================================ */
onMounted(() => {
  document.addEventListener('click', (e: any) => {
    const link = e.target.closest('a')
    if (!link) return

    const url = link.getAttribute('href')
    if (!url) return

    if (url.startsWith('/')) {
      e.preventDefault()
      navigateTo(url)
    }
  })

  setTimeout(() => {
    showLoader.value = false

    nextTick(() => {
      const BASE_URL = 'https://admin.dspcrm.com'

      document.querySelectorAll('.success img').forEach((img: HTMLImageElement) => {
        let src = img.getAttribute('src') || img.src
        if (src && !src.startsWith('http')) {
          img.src = `${BASE_URL}${src}`
        }
      })

      initializeScripts()
      initFilters()
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
      <template v-if="pageData">
        <div
          v-for="(sectionContent, key) in apiSections"
          :key="key"
          v-html="sectionContent"
        />
      </template>

      <div
        v-else-if="!showLoader"
        class="error text-center py-20"
      >
        <h1 class="text-4xl font-bold mb-4">
          Page Not Found
        </h1>

        <p class="mb-6">
          We couldn't find
          <strong>
            {{ route.params.slug }}
          </strong>
        </p>

        <button
          class="underline"
          @click="router.push('/')"
        >
          Go Home
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.content-img-section) {
  padding-top: 150px !important;
}

.wp-content {
  width: 100%;
  min-height: 80vh;
}

.content-hidden {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}
</style>
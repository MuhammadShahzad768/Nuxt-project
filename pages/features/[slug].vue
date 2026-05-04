<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import {
  useHead,
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
const { data: pageData } = await useAsyncData(
  `page-content-${route.params.slug}`,
  async () => {
    try {
      const wpPage: any = await $fetch(
        'https://admin.dspcrm.com/wp-json/wp/v2/pages',
        {
          params: { slug: route.params.slug }
        }
      )

      console.log('WP Page Response:', wpPage) // Debug

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

      console.log('Custom Data:', customData) // Debug
      console.log('SEO Data:', customData?.SEO) // Debug

      return {
        ...customData,
        wp_id: id
      }
    } catch (error) {
      console.error('Fetch Error:', error)
      throw error
    }
  },
  {
    server: true,
    lazy: false,
    watch: [() => route.params.slug]
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
   SEO (SERVER-SAFE PARSER)
============================================ */
function parseSeoHtml(html: string) {
  if (!html) {
    console.log('No SEO HTML received')
    return { title: '', meta: [] as any[] }
  }

  console.log('Parsing SEO HTML:', html.substring(0, 200)) // Debug

  let title = ''
  const meta: any[] = []

  // Title extraction
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
  if (titleMatch) {
    title = titleMatch[1].trim()
    console.log('Extracted Title:', title)
  }

  // Meta tags extraction
  const metaTags = html.match(/<meta[^>]+>/gi) || []
  console.log('Found meta tags:', metaTags.length)

  metaTags.forEach((tag) => {
    const attrs: any = {}

    // name or property
    const nameMatch = tag.match(/\s(?:name|property)=["']([^"']+)["']/i)
    if (nameMatch) {
      const key = tag.toLowerCase().includes('property=') ? 'property' : 'name'
      attrs[key] = nameMatch[1]
    }

    // content
    const contentMatch = tag.match(/\scontent=["']([^"']*)["']/i)
    if (contentMatch) {
      attrs.content = contentMatch[1]
    }

    // charset
    const charsetMatch = tag.match(/\scharset=["']?([^"'\s>]+)["']?/i)
    if (charsetMatch) {
      attrs.charset = charsetMatch[1]
    }

    if (Object.keys(attrs).length > 0) {
      meta.push(attrs)
      console.log('Added meta:', attrs)
    }
  })

  return { title, meta }
}

/* ============================================
   SEO COMPUTED
============================================ */
const seoData = computed(() => {
  const rawSeo = pageData.value?.SEO?.description || ''
  console.log('Raw SEO Data:', rawSeo ? 'exists' : 'missing')
  return parseSeoHtml(rawSeo)
})

/* ============================================
   USE HEAD
============================================ */
useHead(() => {
  const parsed = seoData.value
  
  console.log('useHead called with:', {
    title: parsed.title,
    metaCount: parsed.meta.length,
    pageTitle: pageData.value?.title
  })

  const headConfig = {
    title: parsed.title || pageData.value?.title || 'DSP CRM',
    meta: parsed.meta.length > 0 ? parsed.meta : [
      { name: 'description', content: 'Default DSP CRM Description' }
    ]
  }

  console.log('Head Config:', headConfig)
  
  return headConfig
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
  // Check SEO in browser
  console.log('OnMounted - Page Data:', pageData.value)
  console.log('OnMounted - SEO:', pageData.value?.SEO)
  console.log('Document Title:', document.title)
  console.log('Meta Tags:', document.querySelectorAll('meta'))

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
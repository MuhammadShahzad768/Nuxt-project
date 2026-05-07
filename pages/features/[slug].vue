<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import {
  useAsyncData,
  useRouter,
  useRoute,
  createError,
  navigateTo,
  useHead 
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
   Fetch Data (reactive for slug changes)
============================================ */
const { data: pageData } = await useAsyncData(
  () => `page-content-${route.params.slug}`,   // 👈 function form
  async () => {
    const wpPage: any = await $fetch(
      'https://admin.dspcrm.com/wp-json/wp/v2/pages',
      { params: { slug: route.params.slug } }
    )
    if (!wpPage?.length) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
    const id = wpPage[0].id
    const customData: any = await $fetch(
      `https://admin.dspcrm.com/wp-json/custom/v1/page-${id}`
    )
    return { ...customData, wp_id: id }
  },
  {
    server: true,
    lazy: false,
    watch: [() => route.params.slug]   // 👈 important for client navigation
  }
)

/* ============================================
   SEO Injection
============================================ */
const seoHtml = computed(() => pageData.value?.SEO?.description || '')

const seoTitle = computed(() => {
  const match = seoHtml.value.match(/<title>(.*?)<\/title>/i)
  return match ? match[1] : 'DSPCRM - Page'
})

const seoMeta = computed(() => {
  const metaArray: any[] = []
  const regex = /<meta\s+([^>]+)>/gi
  let match
  while ((match = regex.exec(seoHtml.value)) !== null) {
    const attrs: Record<string, string> = {}
    match[1].replace(/([\w:-]+)="([^"]*)"/g, (_, name, value) => {
      attrs[name] = value
      return ''
    })
    metaArray.push(attrs)
  }
  return metaArray
})

useHead({
  title: seoTitle,
  meta: seoMeta
})

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
      link.setAttribute('href', href.replace('https://admin.dspcrm.com', ''))
    }
  })
  doc.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src')
    if (src?.includes('https://admin.dspcrm.com')) {
      img.setAttribute('src', src.replace('https://admin.dspcrm.com', ''))
    }
  })
  return doc.body.innerHTML
}

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
    'Author_page_custom_css'
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
  pageData.value?.wp_id ? `page-id-${pageData.value.wp_id}` : ''
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
   Sliders + AOS
============================================ */
function initializeScripts() {
  document.querySelectorAll('.testimonialSwiper, .mySwiper').forEach((slider: any) => {
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
  AOS.init({ duration: 1000, once: true })
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
      if (customCss.value) {
        const styleTag = document.createElement('style')
        styleTag.innerHTML = customCss.value
        document.head.appendChild(styleTag)
      }
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
      :class="[{ 'content-hidden': showLoader }, wpClass]"
    >
      <template v-if="pageData">
        <div
          v-for="(sectionContent, key) in apiSections"
          :key="key"
          v-html="sectionContent"
        />
      </template>

      <div v-else-if="!showLoader" class="error text-center py-20">
        <h1 class="text-4xl font-bold mb-4">Page Not Found</h1>
        <p class="mb-6">
          We couldn't find <strong>{{ route.params.slug }}</strong>
        </p>
        <button class="underline" @click="router.push('/')">Go Home</button>
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
@media screen and (min-width:768px) and (max-width:1024px){
:deep(.upper_boxes){
max-width:48%;
}

}
</style>

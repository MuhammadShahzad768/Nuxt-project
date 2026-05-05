<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
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
import Loader from "@/components/Sections/Loader.vue"
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const route = useRoute()
const showLoader = ref(true)

/* =========================
  FETCH DATA
========================= */
const { data: pageData } = await useAsyncData(
  `page-content-${route.params.slug}`,
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
  { server: true, lazy: false }
)

/* =========================
  SEO PARSER (Regex based)
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
    meta.push(attrs)
  })

  return { title, meta }
}

/* =========================
  SEO INJECTION
========================= */
const rawSeoHtml = computed(() => pageData.value?.SEO?.description || '')

useHead(() => {
  const parsed = parseSeoHtml(rawSeoHtml.value)
  return {
    title: parsed.title || 'DSPCRM - Page',
    meta: parsed.meta,
    link: [
      {
        rel: 'canonical',
        href: pageData.value?.SEO?.canonical_url || `https://dspcrm.com${route.path}`
      }
    ],
    ...(pageData.value?.Author_page_custom_css
      ? {
          style: [
            {
              id: 'dynamic-page-css',
              innerHTML: (pageData.value?.Author_page_custom_css || '')
                .replace(/<\/?style[^>]*>/gi, '')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .trim()
            }
          ]
        }
      : {})
  }
})

/* =========================
  SECTIONS
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}
  const excludeKeys = ['id', 'title', 'link', 'wp_id', 'SEO', 'Author_page_custom_css']
  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = (pageData.value as any)[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
  PAGE CLASS
========================= */
const wpClass = computed(() => {
  return pageData.value?.wp_id ? `page-id-${pageData.value.wp_id}` : ''
})

/* =========================
  SCRIPTS
========================= */
function initializeScripts() {
  document.querySelectorAll('.testimonialSwiper, .mySwiper').forEach((slider: any) => {
    if (slider.swiper) return
    new Swiper(slider, {
      modules: [Autoplay, Pagination],
      loop: true,
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true
      }
    })
  })
  AOS.init({ duration: 1000, once: true })
}

/* =========================
  FILTERS
========================= */
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
  applyFilters()
}

/* =========================
  MOUNTED
========================= */
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
    <div class="wp-content" :class="[{ 'content-hidden': showLoader }, wpClass]">
      <div v-if="pageData">
        <div v-for="(sectionContent, key) in apiSections" :key="key" v-html="sectionContent" />
      </div>
      <div v-else-if="!showLoader" class="error">
        <h1 class="text-3xl font-bold">Page Not Found</h1>
        <button @click="router.push('/')" class="mt-4 underline">Go Home</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.max-w-8xl){
  max-width: 90rem;
  margin: 0 auto;
}
.content-hidden {
  visibility: hidden;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
:deep(.tool_box) {
  transition: all 0.4s ease;
}

:deep(.tool_box.hide) {
  opacity: 0;
  transform: scale(0.9);
  pointer-events: none;
  position: absolute;
}

:deep(.tool_box.show) {
  opacity: 1;
  transform: scale(1);
  position: relative;
  max-width: 31.5%;
    width: 100%;
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
:deep(.page-id-1159 .head.text-center ){
    max-width: 700px;
    margin: auto;
}

:deep(.page-id-1159 .head.text-center h2) {
    margin-bottom: 40px;
    line-height: 110%;
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
:deep(.page-id-1154 .reday) {
    padding-top: 0;
}
}
</style>
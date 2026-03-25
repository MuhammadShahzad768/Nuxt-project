<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useHead, useAsyncData, useRouter, useRoute, createError } from '#imports'
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
   1. Unified Data Fetching
========================= */
const { data: pageData, error } = await useAsyncData(
  `page-content-${route.params.slug}`,
  async () => {
    try {

      /* Step A: Get WordPress Page ID from slug */
      const wpPage: any = await $fetch(
        'https://admin.dspcrm.com/wp-json/wp/v2/pages',
        {
          params: { slug: route.params.slug }
        }
      )

      if (!wpPage || wpPage.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Page Not Found'
        })
      }

      const id = wpPage[0].id

      /* Step B: Fetch Custom Page Data safely */
      const response = await fetch(`https://admin.dspcrm.com/wp-json/custom/v1/page-${id}`)
      const text = await response.text()

      let customData = null

      try {
        customData = JSON.parse(text)
      } catch (parseError) {
        console.error('Invalid JSON returned from API:', text)
        throw createError({
          statusCode: 500,
          statusMessage: 'Invalid API Response'
        })
      }

      return { ...customData, wp_id: id }

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
   2. Extract HTML Sections
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}

  const excludeKeys = [
    'seo_data',
    'Author_page_custom_css',
    'id',
    'title',
    'link',
    'wp_id'
  ]

  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = (pageData.value as Record<string, any>)[key]

    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }

    return acc
  }, {} as Record<string, string>)
})

/* =========================
   3. SEO & Dynamic CSS
========================= */
const seo = computed(() => (pageData.value as any)?.seo_data || {})

useHead({
  title: () => seo.value.meta_title || 'DSP CRM',
  meta: [
    { name: 'description', content: () => seo.value.meta_description || '' },
    { name: 'keywords', content: () => seo.value.meta_keywords || '' },
    { property: 'og:image', content: () => seo.value.og_image || '' }
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
          .replace(/\.([\w\d\-\[\]%]+)/g, (match: string) =>
            match.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
          )
          .trim()
      })
    }
  ]
})

/* =========================
   4. Swiper & AOS
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
        autoplay: slider.dataset.delay
          ? { delay: Number(slider.dataset.delay) }
          : { delay: 3000 },
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true
        }
      })
    })
  })

  AOS.init({
    duration: 1000,
    once: true,
    offset: 120
  })
}
/* =========================
   4. Initialize Scripts
========================= */
function initFilters() {
  const categoryItems = document.querySelectorAll('.toogle_sidebar li')
  // "Type" filter set: expected markup: <div class="type_sidebar"> <li data-type="native|portal|all">
  const typeItems = document.querySelectorAll('.type_sidebar li')
  const toolBoxes = document.querySelectorAll('.tool_box')

  if (!toolBoxes.length) return
  if (!categoryItems.length && !typeItems.length) return

  const applyFilters = () => {
    const activeCategoryEl = document.querySelector('.toogle_sidebar li.active') as HTMLElement | null
    const activeTypeEl = document.querySelector('.type_sidebar li.active') as HTMLElement | null

    const activeCategory = (activeCategoryEl?.getAttribute('data-filter') || 'all').toLowerCase()
    const activeType = (activeTypeEl?.getAttribute('data-type') || 'all').toLowerCase()

    toolBoxes.forEach((box: any) => {
      const category = box.getAttribute('data-category')?.toLowerCase() || ''
      // If a box doesn't have data-type, it will only match when activeType === 'all'
      const type = box.getAttribute('data-type')?.toLowerCase() || ''

      const categoryMatch = activeCategory === 'all' || category === activeCategory
      const typeMatch = activeType === 'all' || type === activeType

      if (categoryMatch && typeMatch) {
        box.classList.remove('hide')
        box.classList.add('show')
      } else {
        box.classList.remove('show')
        box.classList.add('hide')
      }
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

  // Ensure we always have active defaults, then apply once.
  const activeCategoryEl = document.querySelector('.toogle_sidebar li.active') as HTMLElement | null
  if (!activeCategoryEl && categoryItems[0]) categoryItems[0].classList.add('active')

  const activeTypeEl = document.querySelector('.type_sidebar li.active') as HTMLElement | null
  if (!activeTypeEl && typeItems[0]) typeItems[0].classList.add('active')

  applyFilters()
}
/* =========================
   5. Blog Click Handler
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
onMounted(() => {

  setTimeout(() => {

    showLoader.value = false

    nextTick(() => {
      initializeScripts();
        initFilters();
    })

  }, 300)

})
</script>


<template>
  <div>

    <Loader v-if="showLoader" />

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

      <div v-else-if="!showLoader" class="error">
        <h1 class="text-3xl font-bold">Page Not Found</h1>
        <p>We couldn't find the content for /{{ $route.params.slug }}</p>

        <button
          @click="router.push('/')"
          class="mt-4 underline"
        >
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

.error {
  color: #333;
  text-align: center;
  padding: 5rem 2rem;
}

/* dynamic content fix */

:deep(.wp-content) section {
  display: block;
}

:deep(.mySwiper .swiper-wrapper) {
  padding-top: 0;
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
}
</style>
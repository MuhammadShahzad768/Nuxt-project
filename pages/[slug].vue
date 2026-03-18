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

</style>
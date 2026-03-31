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
const showLoader = ref(true);

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

      // Step A: Get WP Page ID by slug
      const wpPage: any = await $fetch(
        'https://admin.dspcrm.com/wp-json/wp/v2/pages',
        { params: { slug: route.params.slug } }
      )

      if (!wpPage || wpPage.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
      }

      const id = wpPage[0].id

      // Step B: Fetch custom API data
      const res = await fetch(`https://admin.dspcrm.com/wp-json/custom/v1/page-${id}`)
      const text = await res.text()

      let customData: any = null
      try {
        customData = JSON.parse(text)
      } catch (err) {
        console.error('Invalid JSON:', text)
        throw createError({ statusCode: 500, statusMessage: 'Invalid API Response' })
      }

      // ✅ Extract SEO & CSS on server BEFORE stripping from payload
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

      // ✅ Strip seo_data + CSS so they never appear in __NUXT_DATA__
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
   5. SEO — inject into <head> server-side only
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
        autoplay: { delay: Number(slider.dataset.delay) || 3000 },
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true
        }
      })
    })
  })

  AOS.init({ duration: 1000, once: true, offset: 120 })
}

/* =========================
   7. Filters
========================= */
function initFilters() {
  const categoryItems = document.querySelectorAll('.toogle_sidebar li')
  const typeItems = document.querySelectorAll('.type_sidebar li')
  const toolBoxes = document.querySelectorAll('.tool_box')

  if (!toolBoxes.length) return

  const applyFilters = () => {
    const activeCategory = document.querySelector('.toogle_sidebar li.active')
      ?.getAttribute('data-filter')?.toLowerCase() || 'all'
    const activeType = document.querySelector('.type_sidebar li.active')
      ?.getAttribute('data-type')?.toLowerCase() || 'all'

    toolBoxes.forEach((box: any) => {
      const categories = (box.dataset.category || '').toLowerCase().split(' ').map((c: string) => c.trim()).filter(Boolean)
      const type = (box.dataset.type || '').toLowerCase()
      const show = (activeCategory === 'all' || categories.includes(activeCategory)) &&
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

  // ✅ Fixed: was missing addEventListener
  typeItems.forEach((item: any) => {
    item.addEventListener('click', () => {
      typeItems.forEach((li: any) => li.classList.remove('active'))
      item.classList.add('active')
      applyFilters()
    })
  })

  categoryItems[0]?.classList.add('active')
  typeItems[0]?.classList.add('active')

  applyFilters()
}

/* =========================
   8. FAQ Handler
========================= */
function handleFaqClick(id: string) {
  setActiveQuestion(id)
  scrollToFaq()
}

function setActiveQuestion(id: string) {
  activeQuestion.value = id

  document.querySelectorAll('.faq-btn').forEach((btn: any) => {
    btn.classList.remove('active', 'bg-white', 'shadow-[0_4px_4px_rgba(0,0,0,0.25)]', 'rounded-l-lg')
  })

  const activeBtn = document.querySelector(`.faq-btn[data-id="${id}"]`) as HTMLElement | null
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-white', 'shadow-[0_4px_4px_rgba(0,0,0,0.25)]', 'rounded-l-lg')
  }
}

function scrollToFaq() {
  nextTick(() => {
    const el = document.getElementById('Faqs')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  })
}

/* =========================
   9. Global Click Handler
========================= */
const handleWpClick = (event: MouseEvent) => {

  // Blog click
  const blogTarget = (event.target as HTMLElement).closest('.blog_box')
  if (blogTarget) {
    const slug = blogTarget.getAttribute('data-slug') // ✅ Fixed: was 'data-sluga'
    if (slug) router.push(`/blog/${slug}`)
    return
  }

  // FAQ click
  const faqTarget = (event.target as HTMLElement).closest('.faq-btn')
  if (faqTarget) {
    const id = faqTarget.getAttribute('data-id')
    if (id) handleFaqClick(id)
    return
  }
}

/* =========================
   10. Mounted
========================= */
onMounted(() => {
  setTimeout(() => {
    showLoader.value = false
    nextTick(() => {
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
      :class="{ 'content-hidden': showLoader }"
      @click="handleWpClick"
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

.error {
  color: #333;
  text-align: center;
  padding: 5rem 2rem;
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
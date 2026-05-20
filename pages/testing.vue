<template>
  <header class="header-wrapper">
    <!-- <Loader v-if="showLoader" /> -->

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

      <div v-if="error" class="error-msg">
        Failed to load navigation.
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import { useHead, useAsyncData, useRouter, useRoute } from '#imports'
import AOS from 'aos'
import 'aos/dist/aos.css'

// import Loader from "@/components/Sections/Loader.vue"

// Swiper
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const route = useRoute()
const pageId = 'Header'
const showLoader = ref(true)

/* =========================
   1. FETCH DATA
========================= */
const { data: pageData, error, refresh } = await useAsyncData(
  `wp-page-${pageId}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/Header`),
  { server: true, lazy: false }
)

/* =========================
   2. PARSE API HTML
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}

  const excludeKeys = ['seo_data', 'Author_page_custom_css', 'id', 'title', 'link']
  const adminUrlPattern = /href="https:\/\/admin\.dspcrm\.com/g

  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = (pageData.value as Record<string, any>)[key]

    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value.replace(adminUrlPattern, 'href="')
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
   3. MENU TOGGLE
========================= */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu')
  if (!menu) return

  const isHidden = menu.classList.contains('menu-hidden')

  if (isHidden) {
    menu.classList.remove(
      'menu-hidden',
      'opacity-0',
      '-translate-x-full',
      'pointer-events-none'
    )
    menu.classList.add('opacity-100', 'translate-x-0')
    document.body.style.overflow = 'hidden'
  } else {
    menu.classList.add(
      'menu-hidden',
      'opacity-0',
      '-translate-x-full',
      'pointer-events-none'
    )
    menu.classList.remove('opacity-100', 'translate-x-0')
    document.body.style.overflow = ''
  }
}

/* =========================
   4. CLOSE MENU
========================= */
function closeMegaMenu() {
  document.body.classList.add('menu-closed')

  const mobileMenu = document.querySelector('#mobileMenu') as HTMLElement
  if (mobileMenu) {
    mobileMenu.classList.remove(
      'is-active',
      'mega-menu-open',
      'mega-toggle-on',
      'mega-menu-visible'
    )
    mobileMenu.setAttribute('aria-expanded', 'false')
    mobileMenu.classList.add('menu-hidden')
  }

  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''

  setTimeout(() => {
    document.body.classList.remove('menu-closed')
  }, 500)
}

/* =========================
   5. CLEAN LINKS
========================= */
function cleanAllLinks() {
  const container = document.querySelector('.wp-content')
  if (!container) return

  const adminBase = 'https://admin.dspcrm.com'
  const localBase = 'http://localhost/dsplocal'

  container.querySelectorAll('a').forEach((anchor: any) => {
    let href = anchor.getAttribute('href')
    if (href) {
      href = href.replace(localBase, '')
      href = href.replace(adminBase, '')
      anchor.setAttribute('href', href === '' ? '/' : href)
    }
  })
}

/* =========================
   6. INIT SCRIPTS
========================= */
function initializeScripts() {
  cleanAllLinks()

  document.querySelectorAll('.testimonialSwiper').forEach((slider: any) => {
    if (slider.swiper) return

    new Swiper(slider, {
      modules: [Autoplay, Pagination],
      loop: slider.dataset.loop === 'true',
      autoplay: slider.dataset.delay
        ? { delay: Number(slider.dataset.delay) }
        : false,
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true
      }
    })
  })

  AOS.init({ duration: 1000, once: true })
}

/* =========================
   7. CLICK HANDLER (MAIN FIX)
========================= */
const handleWpClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  // ✅ MENU BUTTON (from API)
  const toggleBtn = target.closest('.mobile-menu-btn')
  if (toggleBtn) {
    event.preventDefault()
    toggleMenu()
    return
  }

  // ✅ LINKS (SPA)
  const anchor = target.closest('a')
  if (!anchor || anchor.target === '_blank' || event.ctrlKey || event.metaKey) return

  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return

  try {
    const url = new URL(href, window.location.origin)
    if (url.origin === window.location.origin) {
      event.preventDefault()
      closeMegaMenu()
      router.push(url.pathname + url.search + url.hash)
    }
  } catch (e) {
    if (href.startsWith('/')) {
      event.preventDefault()
      closeMegaMenu()
      router.push(href)
    }
  }
}

/* =========================
   8. LIFECYCLE
========================= */
const runSetup = async () => {
  await nextTick()

  setTimeout(() => {
    showLoader.value = false
    nextTick(() => initializeScripts())
  }, 400)
}

onMounted(() => runSetup())

watch(() => route.fullPath, () => {
  closeMegaMenu()
  if (!pageData.value) refresh()
  runSetup()
})

/* =========================
   9. HEAD
========================= */
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://admin.dspcrm.com/wp-content/plugins/mega-main-menu/css/mega-main-menu.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://admin.dspcrm.com/wp-includes/css/dashicons.min.css',
      media: 'print',
      onload: "this.media='all'"
    }
  ],
  style: [
    {
      id: 'dynamic-header-css',
      innerHTML: computed(() => {
        const css = (pageData.value as any)?.Author_page_custom_css || ''
        return css
          .replace(/<\/?style[^>]*>/gi, '')
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          .trim()
      })
    }
  ]
})
</script>


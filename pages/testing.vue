<template>
  <header class="header-wrapper">
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

import Loader from "@/components/Sections/Loader.vue"

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

<style>
/* Custom class to hide mobile menu */
#mobileMenu.menu-hidden {
  transform: translateX(-100%);
  display: none;
}

/* Force close menu via CSS when helper class is present */
body.menu-closed .mega-sub-menu,
body.menu-closed .mega-menu-wrap .mega-sub-menu {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  display: none !important; /* Forces mobile collapse */
}

/* Ensure mobile menu wrapper itself hides if it uses a specific container */
body.menu-closed .mega-menu-toggle.mega-menu-open + .mega-menu-nav {
    display: none !important;
}

.header {
    position: absolute;
    z-index: 1;
}
.content-hidden {
  visibility: hidden;
  pointer-events: none;
}
.mobile {
  will-change: transform, opacity;
}

@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

header {
  font-family: "Inter", sans-serif !important;
}

.custom-logo-link img {
  width: 75%;
}

/* Base Mega Menu Styles */
#mega-menu-menu-1 {
  display: flex !important;
  align-items: center !important;
  list-style: none !important;
}

#mega-menu-menu-1 .mega-menu-item {
  position: relative;
  list-style: none !important;
}

/* Header Link Styling */
#mega-menu-menu-1 > li.mega-menu-item > a.mega-menu-link {
  color: #00296b !important;
  padding: 0.5rem 0.5rem !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  border-radius: 9999px !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center;
  gap: 6px;
}

#mega-menu-menu-1 > li.mega-menu-item > a.mega-menu-link:hover {
  background-color: rgba(0, 41, 107, 0.1) !important;
}

/* Chevron Indicators */
.mega-menu .mega-indicator,
.mega-menu-toggle,
.mega-close {
  display: none !important;
}

#mega-menu-menu-1 .mega-menu-item-has-children > a.mega-menu-link::after,
#mobileMenu .mega-menu-item-has-children a.mega-menu-link::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid currentColor;
  transition: transform 0.5s ease;
  margin-top: 2px;
}

#mega-menu-menu-1 .mega-menu-item-has-children:hover > a.mega-menu-link::after,
#mobileMenu .mega-menu-item.is-active > a.mega-menu-link::after {
  transform: rotate(180deg);
}

/* Mobile Layout Adjustments */
#mobileMenu a.mega-menu-link {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 20px;
}

/* Desktop Nav Bar */
@media (min-width: 1280px) {
  #mega-menu-menu-1 > li.mega-menu-item > a.mega-menu-link {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    font-size: 1.125rem !important;
  }
}
@media screen and (max-width:768px) {
  .banner_wrapper {
    padding-top: 100px !important;
}
}
/* Desktop Dropdown Behavior */
@media (min-width: 1024px) {
  #mega-menu-menu-1 .mega-sub-menu {
    opacity: 0;
    position: fixed;
    left: 0;
    right: 0;
    width: 100vw;
    padding-top: 24px;
    z-index: 999;
    transition: all 0.5s ease;
    transform: translateY(20px);
    margin: 0 !important;
  }
  #mega-menu-menu-1 .mega-menu-item:hover > .mega-sub-menu {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
  }
}

/* Mobile Dropdown Behavior (Fixes overlapping) */
@media (max-width: 1023px) {
  #mobileMenu {
    overflow-x: hidden;
  }

  /* Sub Menu */
  #mobileMenu .mega-sub-menu {
    display: block !important;
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    min-height: 100vh;
    z-index: 100;
    background: #fafafa !important;
    margin: 0 !important;
    padding: 0 !important;
    visibility: hidden;
    opacity: 0;
    transform: translateX(-100%);
    transition:
      transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.5s ease;
  }

  /* Active state */
  #mobileMenu .mega-menu-item.is-active > .mega-sub-menu {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }

  /* Colors */
  #mobileMenu .mega-sub-menu h4,
  #mobileMenu .mega-sub-menu h5 {
    color: #233267 !important;
  }
  #mobileMenu .mega-sub-menu p {
    color: #4b5563 !important;
  }

  #mobileMenu a.mega-menu-link {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center;
    width: 100%;
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 20px;
    color: white !important;
  }
}
.mega-sub-menu{
    width: 1060px;
    position: absolute;
    display: block;
    top: 120px;
    left: 50%;
}
li{
  position:static;
}
header li:before{
  content:none;
}
header li::marker{
  content:none;
}
.mega-menu-item {
  position: static; 
}

/* Desktop Hover Trigger */
@media (min-width: 1024px) {
  .mega-menu-item:hover > .mega-sub-menu {
    opacity: 1 !important;
    pointer-events: all !important;
    visibility: visible;
  }

  .mega-sub-menu {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    visibility: hidden;
    transform: translate(-50%, 10px); 
  }
}

.sub-menu-items-wrapper a {
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
}

.sub-menu-items-wrapper a:hover {
  background-color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
  border-color: #e5e7eb;
}

.sub-menu-items-wrapper a:hover img {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
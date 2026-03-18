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

// Swiper imports
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const route = useRoute()
const pageId = 'Header'
const showLoader = ref(true)

/* =========================
   1. Fetch Page Data
========================= */
const { data: pageData, error, refresh } = await useAsyncData(
  `wp-page-${pageId}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/Header`),
  {
    server: true,
    lazy: false
  }
)

/* =========================
   2. Extract HTML Sections & Clean ONLY Links
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}
  const excludeKeys = ['seo_data', 'Author_page_custom_css', 'id', 'title', 'link']
  
  // Highlighting Change: Targeting only href attributes
  const adminUrlPattern = /href="https:\/\/admin\.dspcrm\.com/g;

  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = (pageData.value as Record<string, any>)[key]
    
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      // Sirf links ko relative banaya ja raha hai
      acc[key] = value.replace(adminUrlPattern, 'href="')
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
   3. SEO & Head
========================= */
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://admin.dspcrm.com/wp-content/plugins/mega-main-menu/css/mega-main-menu.css' },
    { rel: 'stylesheet', href: 'https://admin.dspcrm.com/wp-includes/css/dashicons.min.css' }
  ],
  script: [
    { src: 'https://admin.dspcrm.com/wp-includes/js/jquery/jquery.min.js', defer: false },
    { src: 'https://admin.dspcrm.com/wp-content/plugins/mega-main-menu/js/mega-main-menu.js', defer: true }
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

/* =========================
   4. DOM Fixes (Only for Anchor Tags)
========================= */
function cleanAllLinks() {
  const container = document.querySelector('.wp-content')
  if (!container) return

  const adminBase = 'https://admin.dspcrm.com'
  const localBase = 'http://localhost/dsplocal'

  // Highlighting Change: Loops ONLY through 'a' tags, images ignored
  container.querySelectorAll('a').forEach((anchor: any) => {
    let href = anchor.getAttribute('href')
    if (href) {
      href = href.replace(localBase, '')
      href = href.replace(adminBase, '')
      anchor.setAttribute('href', href === '' ? '/' : href)
    }
  })
}

function initializeScripts() {
  cleanAllLinks()

  // Init Swiper
  document.querySelectorAll('.testimonialSwiper').forEach((slider: any) => {
    if (slider.swiper) return
    new Swiper(slider, {
      modules: [Autoplay, Pagination],
      loop: slider.dataset.loop === 'true',
      autoplay: slider.dataset.delay ? { delay: Number(slider.dataset.delay) } : false,
      pagination: { el: slider.querySelector('.swiper-pagination'), clickable: true }
    })
  })

  AOS.init({ duration: 1000, once: true })
}

/* =========================
   5. SPA Navigation Handler
========================= */
const handleWpClick = (event: MouseEvent) => {
  const anchor = (event.target as HTMLElement).closest('a')
  if (!anchor || anchor.target === '_blank' || event.ctrlKey || event.metaKey) return

  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return

  try {
    const url = new URL(href, window.location.origin)
    if (url.origin === window.location.origin) {
      event.preventDefault()
      router.push(url.pathname + url.search + url.hash)
    }
  } catch (e) {
    if (href.startsWith('/')) {
      event.preventDefault()
      router.push(href)
    }
  }
}

/* =========================
   6. Lifecycle & Route Watcher
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
  if (!pageData.value) refresh()
  runSetup()
})
</script>

<style>
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
    /* transform: translate(-50%); */
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
/* Ensure the parent li can trigger the hover */
.mega-menu-item {
  position: static; /* Required for full-width mega menus */
}

/* Desktop Hover Trigger */
@media (min-width: 1024px) {
  /* Show the menu when the parent LI is hovered */
  .mega-menu-item:hover > .mega-sub-menu {
    opacity: 1 !important;
    pointer-events: all !important;
    /* transform: translate(-50%, 0) !important; */
    visibility: visible;
  }

  /* Transition for the sub-menu */
  .mega-sub-menu {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    visibility: hidden;
    /* Keeps the menu centered based on your existing style */
    transform: translate(-50%, 10px); 
  }
}

/* Hover effect for individual items inside the mega menu */
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

/* Subtle icon bounce on hover */
.sub-menu-items-wrapper a:hover img {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
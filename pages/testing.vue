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
      <div v-if="error" class="error">
        Error loading page content.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useHead, useAsyncData, useRouter } from '#imports'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Loader from "@/components/Sections/Loader.vue"

import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const pageId = 'Header'
const showLoader = ref(true)

/* =========================
   1. Fetch Page Data
========================= */
const { data: pageData, error } = await useAsyncData(
  `wp-page-${pageId}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/Header`),
  {
    server: true,
    lazy: false
  }
)

/* =========================
   2. Extract HTML Sections
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}

  const excludeKeys = ['seo_data', 'Author_page_custom_css', 'id', 'title', 'link']

  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = (pageData.value as Record<string, any>)[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
   3. SEO & CSS Handling
========================= */
const seo = computed(() => (pageData.value as any)?.seo_data || {})

useHead({
  title: () => seo.value.meta_title || 'DSP CRM',
  meta: [
    { name: 'description', content: seo.value.meta_description || '' },
    { name: 'keywords', content: seo.value.meta_keywords || '' },
    { name: 'robots', content: seo.value.robots || '' },
    { property: 'og:title', content: seo.value.og_title || '' },
    { property: 'og:description', content: seo.value.og_description || '' },
    { property: 'og:image', content: seo.value.og_image || '' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: seo.value.twitter_card || '' },
  ],
  link: [
    { rel: 'canonical', href: seo.value.canonical_url || '' },
    {
      rel: 'stylesheet',
      href: 'https://admin.dspcrm.com/wp-content/plugins/mega-main-menu/css/mega-main-menu.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://admin.dspcrm.com/wp-includes/css/dashicons.min.css'
    }
  ],
  script: [
    {
      src: 'https://admin.dspcrm.com/wp-includes/js/jquery/jquery.min.js',
      defer: false
    },
    {
      src: 'https://admin.dspcrm.com/wp-content/plugins/mega-main-menu/js/mega-main-menu.js',
      defer: true
    }
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
          .replace(/\.([\w\d\-\[\]%]+)/g, (match: string) => {
            return match.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
          })
          .trim()
      })
    }
  ]
})

/* =========================
   4. Fix localhost URLs
========================= */
function fixLocalhostUrls() {
  // Fix all img src pointing to localhost
  document.querySelectorAll('.wp-content img').forEach((img: any) => {
    if (img.src && img.src.includes('localhost')) {
      img.src = img.src.replace(
        'http://localhost/dsplocal',
        'https://admin.dspcrm.com'
      )
    }
  })

  // Fix background-image inline styles
  document.querySelectorAll('.wp-content [style]').forEach((el: any) => {
    if (el.style.backgroundImage && el.style.backgroundImage.includes('localhost')) {
      el.style.backgroundImage = el.style.backgroundImage.replace(
        'http://localhost/dsplocal',
        'https://admin.dspcrm.com'
      )
    }
  })

  // Fix anchor href pointing to localhost
  document.querySelectorAll('.wp-content a').forEach((anchor: any) => {
    if (anchor.href && anchor.href.includes('localhost')) {
      anchor.href = anchor.href.replace(
        'http://localhost/dsplocal',
        'https://admin.dspcrm.com'
      )
    }
  })
}

/* =========================
   5. Execute Injected Scripts
========================= */
function executeInjectedScripts() {
  document.querySelectorAll('.wp-content script').forEach((oldScript) => {
    const newScript = document.createElement('script')

    // Copy attributes
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value)
    })

    // Copy inline content
    newScript.textContent = oldScript.textContent
    document.body.appendChild(newScript)
    oldScript.remove()
  })
}

/* =========================
   6. Initialize All Scripts
========================= */
function initializeScripts() {
  // 1. Re-execute blocked scripts from v-html
  executeInjectedScripts()

  // 2. Fix all localhost URLs
  fixLocalhostUrls()

  // 3. Init Swiper sliders
  const sliders = document.querySelectorAll('.testimonialSwiper')
  sliders.forEach((slider: any) => {
    if (slider.swiper) return
    new Swiper(slider, {
      modules: [Autoplay, Pagination],
      loop: slider.dataset.loop === 'true',
      speed: Number(slider.dataset.speed) || 800,
      autoplay: slider.dataset.delay
        ? { delay: Number(slider.dataset.delay) }
        : false,
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true
      }
    })
  })

  // 4. Init AOS animations
  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  })
}

/* =========================
   7. Blog Navigation
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
   8. Mounted
========================= */
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    showLoader.value = false
    nextTick(() => {
      initializeScripts()
    })
  }, 200)
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
    pointer-events: none;
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
li:before{
  content:none;
}
li::marker{
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
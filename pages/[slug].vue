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
// import Loader from "@/components/Sections/Loader.vue"
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const route = useRoute()
const showLoader = ref(true)
const contentRef = ref(null)


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

    toolBoxes.forEach((box: HTMLElement) => {
      const category = box.getAttribute('data-category')?.toLowerCase() || ''
      const type = box.getAttribute('data-type')?.toLowerCase() || ''
      const show =
        (activeCategory === 'all' || category === activeCategory) &&
        (activeType === 'all' || type === activeType)
      box.classList.toggle('show', show)
      box.classList.toggle('hide', !show)
    })

    // 🔑 Hide headings if all their boxes are hidden
    const headings = document.querySelectorAll('.content_side h2')
    headings.forEach((heading: HTMLElement) => {
      const container = heading.nextElementSibling // the div with tool_box children
      if (!container) return
      const boxes = container.querySelectorAll('.tool_box')
      const allHidden = Array.from(boxes).every(box => box.classList.contains('hide'))
      heading.style.display = allHidden ? 'none' : ''
      container.setAttribute("style", allHidden ? "display:none" : "") // optional: hide container too
    
     if (allHidden) {
      heading.classList.add('hide')
      heading.classList.remove('mt-16') // remove margin classes
      container.classList.add('hide')
    } else {
      heading.classList.remove('hide')
      container.classList.remove('hide')
      // optional: restore margin classes if needed
      if (!heading.classList.contains('mb-6') && !heading.classList.contains('mt-16')) {
        heading.classList.add('mb-6') // or whichever margin you want as default
      }
    }
    })
  }

  categoryItems.forEach((item: HTMLElement) => {
    item.addEventListener('click', () => {
      categoryItems.forEach(li => li.classList.remove('active'))
      item.classList.add('active')
      applyFilters()
    })
  })

  typeItems.forEach((item: HTMLElement) => {
    item.addEventListener('click', () => {
      typeItems.forEach(li => li.classList.remove('active'))
      item.classList.add('active')
      applyFilters()
    })
  })

  applyFilters()
}
/**
 * =========================
 * FORM HANDLER (MAIN PART 🔥)
 * =========================
 */

let captchaToken = ''
let captchaWidgetId: number | null = null

const initFormHandler = () => {
  if (!contentRef.value) return

  const form = contentRef.value.querySelector('#contactForm')

  if (!form) {
    console.log('Form not found ❌')
    return
  }

  console.log('Form found ✅')

  form.removeEventListener('submit', handleSubmit)
  form.addEventListener('submit', handleSubmit)
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const form = e.target
  const btn = form.querySelector('button')

  // ❗ CAPTCHA VALIDATION ADDED
  if (!captchaToken) {
    alert('Please complete CAPTCHA first ❗')
    return
  }

  if (btn) btn.innerText = 'Sending...'

  const data = {
    contact_first_name: document.getElementById('first_name')?.value,
    contact_last_name: document.getElementById('last_name')?.value,
    contact_email: document.getElementById('email')?.value,
    contact_subject: document.getElementById('subject')?.value,
    contact_message: document.getElementById('message')?.value,

    // ✅ CAPTCHA TOKEN ADDED
    recaptcha_token: captchaToken
  }

  console.log("FORM DATA:", data)

  try {
    const res = await fetch(
      'https://admin.dspcrm.com/wp-json/custom/v1/submit-contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    )

    const result = await res.json()
    console.log("API RESPONSE:", result)

    if (result.status === 'success') {
      alert('Form submitted successfully ✅')
      form.reset()

      // reset captcha
      captchaToken = ''

      if ((window as any).grecaptcha && captchaWidgetId !== null) {
        (window as any).grecaptcha.reset(captchaWidgetId)
      }

    } else {
      alert('Error: ' + result.message)
    }

  } catch (err) {
    console.error(err)
    alert('Something went wrong ❌')
  }

  btn.innerText = 'Send message'
}
// --- SCROLL & LIFECYCLE ---
const showTopBtn = ref(false);
const handleScroll = () => { showTopBtn.value = window.scrollY > 300; };
const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

onMounted(() => {
   window.addEventListener("scroll", handleScroll);
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

      document.querySelectorAll('.success img').forEach((el) => {
  if (el instanceof HTMLImageElement) {
    let src = el.getAttribute('src') || ''

    if (src && !src.startsWith('http')) {
      src = `${BASE_URL}${src}`
    }

    el.src = src
    el.loading = 'lazy'
    el.decoding = 'async'
  }

  if (el instanceof HTMLAnchorElement) {
    let href = el.getAttribute('href') || ''

    if (href && !href.startsWith('http')) {
      el.href = `${BASE_URL}${href}`
    }
  }
})
document.querySelectorAll('.success a').forEach((link) => {
  const href = link.getAttribute('href');
  if (!href) return;

  let newHref = href.replace(
    /^https?:\/\/admin\.dspcrm\.com/i,
    window.location.origin
  );

  const url = new URL(newHref);

  // If "/blog" is missing, prepend it
  if (!url.pathname.startsWith('/blog')) {
    url.pathname = '/blog' + (url.pathname.startsWith('/') ? '' : '/') + url.pathname;
  }

  link.href = url.toString();

  link.addEventListener('click', (e) => {
    if (url.origin === window.location.origin) {
      e.preventDefault();
      router.push(url.pathname + url.search + url.hash);
    }
  });
});
      // =========================
      // ✅ CAPTCHA INJECTION (UPDATED)
      // =========================
      const form = document.querySelector('#contactForm')

      if (form) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]')

        const captchaWrapper = document.createElement('div')
        captchaWrapper.className = 'g-recaptcha'

        if (submitBtn) {
          form.insertBefore(captchaWrapper, submitBtn)
        } else {
          form.appendChild(captchaWrapper)
        }

        // ✅ FIXED CAPTCHA RENDER WITH CALLBACK
        if ((window as any).grecaptcha?.render) {
          captchaWidgetId = (window as any).grecaptcha.render(captchaWrapper, {
            sitekey: '6Ldspt0sAAAAAPkbuf5w8IqH_lR3tULW4ckX9GSb',

            callback: (token: string) => {
              captchaToken = token
              console.log('CAPTCHA VERIFIED ✅')
            },

            'expired-callback': () => {
              captchaToken = ''
              console.log('CAPTCHA EXPIRED ❌')
            },

            'error-callback': () => {
              captchaToken = ''
              console.log('CAPTCHA ERROR ❌')
            }
          })
        }
      }

      // existing functions
      initializeScripts()
      initFilters()
      initFormHandler()
    })
  }, 300)
})
</script>

<template>
  <div    ref="contentRef">
    <!-- <Loader v-if="showLoader" /> -->
    <div class="wp-content" :class="[{ 'content-hidden': showLoader }, wpClass]">
      <div v-if="pageData">
         <transition name="fade">
        <button
          v-if="showTopBtn"
          @click="scrollToTop"
          class="back-to-top"
          aria-label="Back to top" >
<i class="fa-solid fa-arrow-up"></i>
        </button>
      </transition>
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
@media screen and (min-width:768px) and (max-width:1023px) {
}
@media screen and (min-width:1024px) and (max-width:1200px) {
  :deep(h1),:deep(h2){
font-size:35px !important;
line-height:40px !important;

}
}
</style>
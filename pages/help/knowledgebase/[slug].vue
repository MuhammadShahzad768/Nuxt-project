<template>
  <div class="flex">

    <!-- MAIN CONTENT -->
    <main class="flex-1 min-w-0 py-7 px-5 md:px-0 sm:px-8 lg:max-w-[660px] md:max-w-[350px] lg:pr-[50px]">

      <div 
        v-if="post" 
        ref="contentRef"
        v-html="post.content" 
        class="dynamic-content">
      </div>

      <div v-else>Loading...</div>

    </main>

    <!-- TOC -->
    <aside 
      class="md:hidden sticky top-0 pt-[20px] h-screen overflow-y-auto border-l border-gray-200 py-[18px] px-4 toc-aside lg:hidden xl:block"
      v-if="toc.length > 0">

      <div class="toc-wrap">
        <p class="toc-title">On this page</p>

        <ul class="toc-list">
          <li v-for="(item, index) in toc" :key="index">
            <a 
              :href="'#' + item.id"
              class="toc-link"
              :class="{ active: activeId === item.id }"
              @click.prevent="scrollTo(item.id)"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>

      </div>

    </aside>

  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'

definePageMeta({ layout: 'doc' })

const route = useRoute()

/* =========================
   FETCH POST
========================= */
const { data: post } = await useFetch(
  `https://admin.dspcrm.com/wp-json/custom/v1/docs/${route.params.slug}`
)

/* =========================
   REFS
========================= */
const contentRef = ref(null)
const toc = ref([])
const activeId = ref(null)

/* =========================
   RECAPTCHA LOAD
========================= */
useHead({
  script: [
    {
      src: 'https://www.google.com/recaptcha/api.js?render=6Ldspt0sAAAAAPkbuf5w8IqH_lR3tULW4ckX9GSb',
      async: true,
      defer: true
    }
  ]
})

/* =========================
   RECAPTCHA TOKEN
========================= */
const getRecaptchaToken = () => {
  return new Promise((resolve) => {
    if (!window.grecaptcha) {
      console.log('reCAPTCHA not loaded ❌')
      resolve(null)
      return
    }

    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute('6Ldspt0sAAAAAPkbuf5w8IqH_lR3tULW4ckX9GSb', {
        action: 'submit'
      })
      resolve(token)
    })
  })
}

/* =========================
   TOC GENERATION
========================= */
const generateTOC = () => {
  if (!contentRef.value) return

  const headings = contentRef.value.querySelectorAll('h2')

  toc.value = Array.from(headings).map((el) => {

    if (!el.id) {
      el.id = el.innerText
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
    }

    return {
      id: el.id,
      text: el.innerText
    }
  })
}

/* =========================
   SCROLL TO SECTION
========================= */
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/* =========================
   SEO (your existing logic)
========================= */
const seoHtml = computed(() => post.value?.SEO?.description || '')

const seoTitle = computed(() => {
  const match = seoHtml.value.match(/<title>(.*?)<\/title>/i)
  return match ? match[1] : 'DSPCRM - Page'
})

const seoMeta = computed(() => {
  const metaArray = []
  const regex = /<meta\s+([^>]+)>/gi
  let match

  while ((match = regex.exec(seoHtml.value)) !== null) {
    const attrs = {}
    match[1].replace(/([\w:-]+)="([^"]*)"/g, (_, name, value) => {
      attrs[name] = value
    })
    metaArray.push(attrs)
  }

  return metaArray
})

useHead({
  title: seoTitle,
  meta: seoMeta
})

/* =========================
   SCROLL SPY
========================= */
const handleScroll = () => {
  const sections = toc.value.map(item => document.getElementById(item.id))

  let current = null

  sections.forEach((sec) => {
    if (sec) {
      const rect = sec.getBoundingClientRect()
      if (rect.top <= 150) {
        current = sec.id
      }
    }
  })

  activeId.value = current
}

/* =========================
   FORM HANDLER (CAPTCHA ADDED)
========================= */
const initFormHandler = () => {
  if (!contentRef.value) return

  const form = contentRef.value.querySelector('#contactForm')

  if (!form) return

  form.removeEventListener('submit', handleSubmit)
  form.addEventListener('submit', handleSubmit)
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const form = e.target
  const btn = form.querySelector('button')

  if (btn) btn.innerText = 'Sending...'

  try {
    const recaptchaToken = await getRecaptchaToken()

    // ⚠️ BLOCK if no token
    if (!recaptchaToken) {
      alert('reCAPTCHA failed ❌ Try again')
      if (btn) btn.innerText = 'Send message'
      return
    }

    const data = {
      contact_first_name: document.getElementById('first_name')?.value,
      contact_last_name: document.getElementById('last_name')?.value,
      contact_email: document.getElementById('email')?.value,
      contact_subject: document.getElementById('subject')?.value,
      contact_message: document.getElementById('message')?.value,
      recaptcha_token: recaptchaToken
    }

    const res = await fetch(
      'https://admin.dspcrm.com/wp-json/custom/v1/submit-contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    )

    const result = await res.json()

    if (result.status === 'success') {
      alert('Form submitted successfully ✅')
      form.reset()
    } else {
      alert(result.message || 'Captcha failed ❌')
    }

  } catch (err) {
    console.error(err)
    alert('Something went wrong ❌')
  }

  if (btn) btn.innerText = 'Send message'
}

/* =========================
   WATCH POST RENDER
========================= */
watch(post, async (val) => {
  if (val) {
    await nextTick()

    setTimeout(() => {
      generateTOC()
      initFormHandler()
    }, 100)
  }
}, { immediate: true })

/* =========================
   LIFECYCLE
========================= */
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>

.flex.min-h-screen.lg\:px-20 {
  position: relative;
  margin-top: 150px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 50px;
}

/* Content styling */
.wp-block-heading {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin-top: 30px;
  letter-spacing: -0.2px;
}

.dynamic-content p {
  font-size: 18px;
  color: #4a5568;
  line-height: 2;
  padding-block: 20px;
}

/* TOC styling */
.toc-aside {
    padding-top:30px;
  width: 300px;
}

.toc-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.toc-list {
  list-style: none;
  padding: 0;
}

.toc-link {
  display: block;
  padding: 6px 0;
  text-decoration: none;
  color: #4a5568;
  cursor: pointer;
}

.toc-link.active {
    color: #233267 !important;
    font-weight: 800 !important;
}
.bg-button{
  background-color:#233267;
}
</style>
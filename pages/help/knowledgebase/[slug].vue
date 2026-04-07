<template>
  <div class="flex ">

    <!-- MAIN CONTENT -->
    <main class="flex-1 min-w-0 py-7 px-5 sm:px-8 ">
      
      <div 
        v-if="post" 
        ref="contentRef"
        v-html="post.content" 
        class="dynamic-content">
      </div>

      <div v-else>Loading...</div>

    </main>

    <!-- TOC SIDEBAR -->
    <aside class="hidden md:block sticky top-0 pt-[20px] h-screen overflow-y-auto border-l border-gray-200 py-[18px] px-4 toc-aside" v-if="toc.length > 0">

     <div class="toc-wrap" >
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
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

definePageMeta({ layout: 'doc' })

const route = useRoute()

/**
 * ✅ Fetch API
 */
const { data: post } = await useFetch(
  `https://admin.dspcrm.com/wp-json/custom/v1/docs/${route.params.slug}`
)

/**
 * Refs
 */
const contentRef = ref(null)
const toc = ref([])
const activeId = ref(null)

/**
 * Generate TOC
 */
const generateTOC = () => {
  if (!contentRef.value) return

  const headings = contentRef.value.querySelectorAll('h2')

  console.log("HEADINGS FOUND:", headings.length)

  toc.value = Array.from(headings).map((el) => {

    // Ensure ID exists
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

/**
 * Scroll to section
 */
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

/**
 * Scroll spy
 */
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
/**
 * ✅ FORM HANDLER (MAIN PART 🔥)
 */
const initFormHandler = () => {
  if (!contentRef.value) return

  const form = contentRef.value.querySelector('#contactForm')

  if (!form) {
    console.log('Form not found ❌')
    return
  }

  console.log('Form found ✅')

  // prevent duplicate binding
  form.removeEventListener('submit', handleSubmit)
  form.addEventListener('submit', handleSubmit)
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const form = e.target
  const btn = form.querySelector('button')
  btn.innerText = 'Sending...'

  const data = {
    contact_first_name: document.getElementById('first_name')?.value,
    contact_last_name: document.getElementById('last_name')?.value,
    contact_email: document.getElementById('email')?.value,
    contact_subject: document.getElementById('subject')?.value,
    contact_message: document.getElementById('message')?.value
  }

  console.log("FORM DATA:", data)

  try {
    const res = await fetch('https://admin.dspcrm.com/wp-json/custom/v1/submit-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const result = await res.json()
    console.log("API RESPONSE:", result)

    if (result.status === 'success') {
      alert('Form submitted successfully ✅')
      form.reset()
    } else {
      alert('Error: ' + result.message)
    }

  } catch (err) {
    console.error(err)
    alert('Something went wrong ❌')
  }

  btn.innerText = 'Send message'
}

/**
 * ✅ WATCH + DELAY (CRITICAL FIX)
 */
watch(post, async (newVal) => {
  if (newVal) {
    await nextTick()

    // Delay ensures v-html is fully rendered
    setTimeout(() => {
      generateTOC()
      initFormHandler()
    }, 100)
  }
}, { immediate: true })

/**
 * Lifecycle
 */
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
  padding:0 40px;
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
  color: #000;
  font-weight: bold;
}
.bg-button{
  background-color:#233267;
}
</style>
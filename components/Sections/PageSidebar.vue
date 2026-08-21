<template>
  <div class="sticky top-12 z-10 custom_family">
    <button
      v-show="isButtonVisible"
      type="button"
      @click="handleToggle"
      class="dsp-toggle-btn fixed top-12 right-4 z-40 hidden xl:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
      :class="isDarkBackground ? 'dsp-toggle-on-dark' : 'dsp-toggle-on-light'"
      :aria-expanded="isNavOpen"
      aria-label="Toggle section navigation"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 transition-transform duration-300"
        :class="isNavOpen ? 'rotate-90' : ''"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
      </svg>
    </button>

    <div
      v-show="isButtonVisible"
      class="3xl:right-auto 3xl:right-[calc(50vw+40rem+1.5rem)] fixed top-12 right-16 z-30 hidden xl:block transition-all duration-300 bg-white"
      :class="isNavOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-3 pointer-events-none'"
    >
      <nav
        aria-label="Page sections"
        class="group/sectionnav transition-all duration-300 dsp-sectionnav"
        :class="[isDarkBackground ? 'sectionnav-on-dark' : 'sectionnav-on-light']"
        :inert="!isNavOpen"
        :aria-hidden="!isNavOpen"
      >
        <div class="relative">
          <ul class="space-y-0 py-4 pr-6 pl-3">
            <li
              v-for="(section, index) in sections"
              :key="section.id"
              class="relative"
            >
              <div class="dsp-track absolute top-0 bottom-0 right-0 w-px"></div>

              <div
                class="dsp-progress absolute top-0 bottom-0 right-0 w-px origin-top transition-transform duration-100"
                :style="{ transform: `scaleY(${(sectionProgress[section.id] || 0) / 100})` }"
              ></div>

              <div
                class="absolute top-1/2 right-0 h-px w-2 -translate-y-1/2 transition-colors duration-200"
                :class="activeSection === section.id ? 'dsp-dot-active' : 'dsp-dot'"
              ></div>

              <button
                type="button"
                @click="handleClick(section)"
                class="group flex items-center gap-1.5 py-2 pr-2 pl-4 text-left  transition-colors duration-200"
                :class="{
                  'dsp-text-active-light': !isDarkBackground && activeSection === section.id,
                  'dsp-text-active-dark': isDarkBackground && activeSection === section.id,
                  'dsp-text-inactive-light': !isDarkBackground && activeSection !== section.id,
                  'dsp-text-inactive-dark': isDarkBackground && activeSection !== section.id,
                }"
              >
                <span class="dsp-index text-[10px] tabular-nums">{{ formatNumber(index) }}</span>
                <span class="text-[10px] tracking-widest uppercase">{{ truncateLabel(section.label) }}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick, watch } from 'vue'
// '#app' se import karo (plain 'vue-router' se NAHI) — ye Nuxt 3 ka
// guaranteed alias hai, auto-import config pe depend nahi karta aur
// hamesha Nuxt ke apne router instance se connected rahega.
import { useRoute } from '#app'

// Props: container scope karne ke liye. Default 'main' rakha hai,
// apne content wrapper ka selector/id pass kar dena (e.g. '#post-content')
const props = defineProps({
  containerSelector: {
    type: String,
    default: 'main',
  },
})

const route = useRoute()

const sections = ref([])
const activeSection = ref('')
const sectionProgress = reactive({})
const isDarkBackground = ref(true)
const isNavOpen = ref(false)
const isButtonVisible = ref(false)

let observer = null
let mutationObserver = null
let retryTimer = null

function formatNumber(index) {
  return String(index + 1).padStart(2, '0')
}

function truncateLabel(text) {
  const words = text.trim().split(/\s+/)
  if (words.length <= 5) return text
  return words.slice(0, 5).join(' ') + '…'
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleClick(section) {
  scrollToSection(section.id)
  window.$track?.('walkthrough_step_click', { step: section.id, step_label: section.label })
}

// Toggle button click hote hi (jab nav open ho raha ho), headings
// dobara fetch kar lo — taake agar content dynamically change hua ho
// (e.g. tabs, accordions, lazy-loaded WP content) to latest h2 list mile
function handleToggle() {
  isNavOpen.value = !isNavOpen.value

  if (isNavOpen.value) {
    GetHeading()
    updateProgress()
  }
}

// Sirf container ke andar wale h2 uthao, poore page ke nahi
function getContainer() {
  return document.querySelector(props.containerSelector) || document
}

function GetHeading() {
  const container = getContainer()
  const headings = Array.from(container.querySelectorAll('h2')).filter(
    (h) => h.offsetWidth > 0 || h.offsetHeight > 0
  )

  // agar abhi tak koi heading nahi mili (async WP content late aaya),
  // thodi der baad phir try karo — max kuch retries tak
  if (headings.length === 0) {
    return false
  }

  const seen = {}

  sections.value = headings.map((h) => {
    let id = h.id && h.id.trim() ? h.id.trim() : slugify(h.innerText)

    if (seen[id] !== undefined) {
      seen[id]++
      id = `${id}-${seen[id]}`
    } else {
      seen[id] = 0
    }

    h.id = id
    sectionProgress[id] = 0

    return { id, label: h.innerText }
  })

  activeSection.value = sections.value[0].id
  setupObserver()
  return true
}

// Content async aata hai to kuch retries + MutationObserver dono laga do,
// taake chahe timing kuch bhi ho, headings mil hi jayein
function detectHeadingsWithRetry(maxRetries = 10, delay = 300) {
  let attempts = 0

  const tryOnce = () => {
    attempts++
    const found = GetHeading()
    if (!found && attempts < maxRetries) {
      retryTimer = setTimeout(tryOnce, delay)
    }
  }

  tryOnce()

  // Extra safety: agar content DOM mutation se baad me inject ho
  // (e.g. v-html se WP HTML render hone ke baad), usko bhi pakdo
  const container = getContainer()
  if (container && container !== document) {
    mutationObserver = new MutationObserver(() => {
      if (sections.value.length === 0) {
        GetHeading()
      }
    })
    mutationObserver.observe(container, { childList: true, subtree: true })
  }
}

// --- Robust active-section detection using IntersectionObserver ---
function setupObserver() {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible.length > 0) {
        activeSection.value = visible[0].target.id
      }
    },
    {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0,
    }
  )

  sections.value.forEach((section) => {
    const el = document.getElementById(section.id)
    if (el) observer.observe(el)
  })
}

function updateProgress() {
  isButtonVisible.value = window.scrollY > 500

  // Scroll top (0) pe wapas aaye to nav khud band ho jaye
  if (window.scrollY <= 0 && isNavOpen.value) {
    isNavOpen.value = false
  }

  if (!sections.value.length) return

  sections.value.forEach((section) => {
    const el = document.getElementById(section.id)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    const total = rect.height + viewportHeight
    const scrolled = viewportHeight - rect.top
    let progress = (scrolled / total) * 100
    progress = Math.max(0, Math.min(100, progress))
    sectionProgress[section.id] = progress
  })

  isDarkBackground.value = detectDarkBackground()
}

// Hardcoded (20,130) point ki jagah toggle button ke actual position
// se hi check karo, taake different screen sizes pe bhi sahi kaam kare
function detectDarkBackground() {
  const btn = document.querySelector('.dsp-toggle-btn')
  const rect = btn?.getBoundingClientRect()
  const x = rect ? rect.left + rect.width / 2 : 20
  const y = rect ? rect.top + rect.height / 2 : 130

  const el = document.elementFromPoint(x, y)
  return el?.closest('[data-theme="dark"]') != null
}

let ticking = false
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateProgress()
      ticking = false
    })
    ticking = true
  }
}

function resetSections() {
  sections.value = []
  activeSection.value = ''
  Object.keys(sectionProgress).forEach((k) => delete sectionProgress[k])
  if (observer) observer.disconnect()
  if (mutationObserver) mutationObserver.disconnect()
  if (retryTimer) clearTimeout(retryTimer)
}

async function init() {
  resetSections()
  await nextTick()
  detectHeadingsWithRetry()
  updateProgress()
}

// Route change pe re-init karo, warna SPA navigation pe purane
// sections hi dikhte rehte hain
watch(
  () => route.fullPath,
  () => {
    init()
  }
)

onMounted(() => {
  init()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (observer) observer.disconnect()
  if (mutationObserver) mutationObserver.disconnect()
  if (retryTimer) clearTimeout(retryTimer)
})
</script>

<style scoped>
.dsp-sectionnav {
  --dsp-primary: #2f6fed;
  --dsp-primary-dim: rgba(47, 111, 237, 0.2);
  --dsp-primary-faint: rgba(47, 111, 237, 0.3);
  --dsp-white: #ffffff;
  --dsp-ink: #0f172a;
  --dsp-muted: #94a3b8;
  --dsp-muted-hover-light: #475569;
  --dsp-muted-hover-dark: #cbd5e1;
}

.dsp-toggle-btn {
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
  cursor: pointer;
}

.dsp-toggle-on-light {
  background-color: #0f172a;
  color: #ffffff;
  border-color: rgba(15, 23, 42, 0.1);
}
.dsp-toggle-on-light:hover {
  background-color: #00296b;
}

.dsp-toggle-on-dark {
  background-color: #ffffff;
  color: #0f172a;
  border-color: rgba(255, 255, 255, 0.2);
}
.dsp-toggle-on-dark:hover {
  background-color: #00296b;
  color: #ffffff;
}

.dsp-track {
  background-color: var(--dsp-primary-dim);
}
.dsp-progress {
  background-color: #00296b;
}
.dsp-dot {
  background-color: #00296b;
}
.dsp-dot-active {
  background-color:#00296b
}
.dsp-index {
  color: var(--dsp-primary-faint);
}
.dsp-text-active-light {
  color: var(--dsp-ink);
}
.dsp-text-active-dark {
  color: var(--dsp-white);
}
.dsp-text-inactive-light {
  color: rgb(131, 131, 131);
}
.dsp-text-inactive-light:hover {
  color: var(--dsp-muted-hover-light);
}
.dsp-text-inactive-dark {
  color: var(--dsp-muted);
}
.dsp-text-inactive-dark:hover {
  color: var(--dsp-muted-hover-dark);
}
</style>
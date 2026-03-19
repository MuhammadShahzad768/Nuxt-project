<template>
  <div>
    <!-- Loader overlays on top -->
    <Loader v-if="showLoader" />

    <!-- Content always exists in DOM (for SSR), just invisible until ready -->
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
import 'aos/dist/aos.css'
import Loader from "@/components/Sections/Loader.vue"


const router = useRouter()
const pageId = '939'
const showLoader = ref(true)

/* =========================
   1. Fetch Page Data
========================= */
const { data: pageData, error } = await useAsyncData(
  `wp-page-${pageId}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/page-${pageId}`),
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

  const excludeKeys = [ 'Author_page_custom_css', 'id', 'title', 'link']

  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = (pageData.value as Record<string, any>)[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
   3. SEO & Fixed CSS Handling
========================= */

useHead({
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
   6. Mounted
========================= */
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    showLoader.value = false       // Hide loader
    nextTick(() => {
      initializeScripts()          // Init AOS & Swiper
    })
  }, 200)
})
const handleWpClick = (event: Event) => {
  const target = event.target as HTMLElement

  // Find closest anchor tag
  const anchor = target.closest('a')

  if (anchor && anchor.href) {
    const url = new URL(anchor.href)

    // Only handle internal links
    if (url.origin === window.location.origin) {
      event.preventDefault()

      const path = url.pathname

      // Navigate using Nuxt router (no reload)
      router.push(path)
    }
  }
}
</script>
<style scoped>
h1{
    color:red
}
</style>
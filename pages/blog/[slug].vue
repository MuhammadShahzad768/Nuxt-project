<template>
  <div>
    <Loader v-if="pending" />

    <div v-else>
      <div v-if="data?.html" v-html="data.html"></div>
      <div v-else class="text-center py-20">Post not found.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useAsyncData, useHead, createError } from '#imports'

const route = useRoute()
const slug = route.params.slug as string

const { data, error, pending } = await useAsyncData(
  () => `post-${slug}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/blog-html/${slug}`, {
    // Live server ke network verification issues ko bypass karne ke liye
    onRequestError({ error }) {
      console.error('Request Error on Server:', error)
    },
    onResponseError({ response }) {
      console.error('Response Error on Server:', response._data)
    }
  }),
  { 
    server: true,
    // Taaki Nuxt strictly server ke data ka wait kare aur source khali na bheje
    lazy: false 
  }
)

// Agar live server par data nahi mila, toh yahin crash karein taaki aapko logs mein dikhe
if (error.value) {
  throw createError({ 
    statusCode: error.value.statusCode || 500, 
    statusMessage: error.value.message || 'SSR Fetch Failed on Live Server' 
  })
}
/* ============================================
   Parse raw SEO HTML string → JSON
============================================ */
function parseSeoString(seoString: string) {
  if (!seoString) return { title: 'DSPCRM - Page', meta: [] }

  const titleMatch = seoString.match(/<title>(.*?)<\/title>/i)
  const metaDescMatch = seoString.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']\s*\/?>/i)

  return {
    title: titleMatch ? titleMatch[1] : 'DSPCRM - Page',
    meta: metaDescMatch
      ? [{ name: 'description', content: metaDescMatch[1] }]
      : []
  }
}

/* ============================================
   Inject into <head> (SSR-safe)
============================================ */
useHead(() => {
  const seoString = data.value?.SEO?.description || ''
  const parsed = parseSeoString(seoString)

  return {
    title: parsed.title,
    meta: parsed.meta
  }
})
</script>
<style>
.blog-content :deep(h2) {
  font-size: 36px;
  font-weight: 700;
  margin: 48px 0 24px;
  color: #1a1a1a;
  line-height: 1.2;
  scroll-margin-top: 130px; /* Offset for smooth scroll landing */
}
.gap-10{
  gap:40px;
}
.blog-content :deep(h3) {
  font-size: 24px;
  font-weight: 600;
  margin: 32px 0 16px;
}

.blog-content :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: #374151;
  font-size: 18px;
}

.blog-content :deep(img) {
  border-radius: 1rem;
  width: 100%;
  margin: 2.5rem 0;
}

/* TOC Styling cleanup */
#table-of-contents li::before {
  content: none !important;
}

:deep(li) {
  padding-left: 0;
}

/* Global browser smooth scrolling */
:global(html) {
  scroll-behavior: smooth;
}
:deep(.btn-primary){
      color: #233267;
    border-radius: 6px;
    border: 2px solid #233267;
}
.blog_sidebar{
  max-width:300px;
}
</style>
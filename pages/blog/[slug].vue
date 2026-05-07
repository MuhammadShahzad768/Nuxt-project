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
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/blog-html/${slug}`),
  { server: true }
)

if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
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
.blog_sidebar{
  max-width:300px;
}
</style>
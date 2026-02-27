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
import { useRoute, useAsyncData, useHead, navigateTo } from '#imports'
import Loader from "@/components/Sections/Loader.vue"

const route = useRoute()
const slug = route.params.slug as string

// Fetch
const { data, error, pending } = await useAsyncData(
  () => `post-${slug}`,
  () =>
    $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/blog-html/${slug}`)
)

// 404 handling
if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
}

// SEO + Static CSS
useHead(() => ({
  title: data.value?.seo?.meta_title || 'Blog',

  meta: [
    { name: 'description', content: data.value?.seo?.meta_description || '' }
  ],

  style: data.value?.static_css
    ? [
        {
          id: 'dynamic-css',
          innerHTML: data.value.static_css
        }
      ]
    : []
}))

// SPA navigation for internal links
onMounted(() => {
  document.addEventListener('click', (e: any) => {
    const link = e.target.closest('a')
    if (!link) return

    const url = link.getAttribute('href')
    if (!url) return

    if (url.startsWith('/') && !url.startsWith('//')) {
      e.preventDefault()
      navigateTo(url)
    }
  })
})
</script>
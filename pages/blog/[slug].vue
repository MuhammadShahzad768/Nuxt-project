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

/* ============================================
   SEO Injection
============================================ */
const seoHtml = computed(() => data.value?.SEO?.description || '')

const seoTitle = computed(() => {
  const match = seoHtml.value.match(/<title>(.*?)<\/title>/i)
  return match ? match[1] : data.value?.title || 'DSPCRM - Page'
})

const seoMeta = computed(() => {
  const metaArray: any[] = []
  const regex = /<meta\s+([^>]+)>/gi
  let match
  while ((match = regex.exec(seoHtml.value)) !== null) {
    const attrs: Record<string, string> = {}
    match[1].replace(/([\w:-]+)="([^"]*)"/g, (_, name, value) => {
      attrs[name] = value
      return ''
    })
    metaArray.push(attrs)
  }
  return metaArray
})

useHead(() => ({
  title: seoTitle.value,
  meta: seoMeta.value
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
watch(data, (newVal) => {
  if (newVal?.title) {
    useHead({
      title: newVal.title,
      meta: [
        { name: 'description', content: newVal.seo?.meta_description || '' }
      ]
    })
  }
})
</script>
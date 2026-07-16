<template>
  <div class="bg-stone-50 min-h-screen mt-20 custom_family">

    <!-- Breadcrumb -->
    <nav class="max-w-5xl mx-auto px-6 pt-20 pb-4">
      <ol class="flex items-center space-x-1 text-sm text-gray-600">
        <li><NuxtLink to="/">Home</NuxtLink> ›</li>
      
        <li><NuxtLink to="/glossary">Glossary</NuxtLink> ›</li>
        
        <li class="text-gray-900">
          {{ item?.title?.rendered }}
        </li>
      </ol>
    </nav>

    <!-- Content -->
    <main class="max-w-5xl mx-auto px-6 py-8">

      <!-- Title -->
      <h1 class="text-5xl font-bold mb-6">
        {{ item?.title?.rendered }}
      </h1>

      <!-- Short Description -->
      <p class="text-lg mb-6">
        {{ item?.short_description }}
      </p>

      <!-- Full Content -->
      <div
        v-html="item?.content?.rendered"
        class="mb-10 prose max-w-none"
      ></div>

      <!-- Example -->
      <div class="mb-10" v-if="item?.example">
        <h2 class="font-semibold mb-2">Example</h2>
        <p>{{ item.example }}</p>
      </div>

      <hr class="my-10 " />
<div class="flex gap-20">
      <!-- =========================
           RELATED TERMS
      ========================= -->
      <div class="mb-10 max-w-[400px] w-full" v-if="relatedTerms.length">
        <h3 class="font-bold mb-4">Related Terms</h3>

        <ul class="space-y-2">
          <li
            v-for="term in relatedTerms" class="pl-0"
            :key="term.id"
          >
            <NuxtLink
              :to="`/glossary/${term.slug}`"
              class="text-[#24386D] hover:underline"
            >
              {{ term.title.rendered }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- =========================
           RELATED ARTICLES
      ========================= -->
      <div v-if="relatedArticles.length" class="max-w-[400px]">
        <h3 class="font-bold mb-4">Related Articles</h3>

        <ul class="space-y-2">
          <li
            v-for="article in relatedArticles" class="pl-0"
            :key="article.id"
          >
            <NuxtLink
              :to="`/blog/${article.slug}`"
              class="text-[#24386D] hover:underline"
            >
              {{ article.title.rendered }}
            </NuxtLink>
          </li>
        </ul>
      </div>
</div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()

// =========================
// FETCH SINGLE GLOSSARY
// =========================
const { data } = await useAsyncData(
  () => `glossary-${route.params.slug}`,
  () =>
    $fetch(
      `https://admin.dspcrm.com/wp-json/wp/v2/glossary?slug=${route.params.slug}`
    ),
  {
    watch: [() => route.params.slug]
  }
)

const item = computed(() => data.value?.[0] || {})


// =========================
// RELATED TERMS
// =========================
const relatedTerms = ref([])

const fetchRelatedTerms = async () => {

  if (!item.value?.related_terms?.length) {
    relatedTerms.value = []
    return
  }

  relatedTerms.value = await Promise.all(
    item.value.related_terms.map(id =>
      $fetch(
        `https://admin.dspcrm.com/wp-json/wp/v2/glossary/${id}`
      )
    )
  )
}


// =========================
// RELATED ARTICLES
// =========================
const relatedArticles = ref([])

const fetchRelatedArticles = async () => {

  if (!item.value?.related_articles?.length) {
    relatedArticles.value = []
    return
  }

  relatedArticles.value = await Promise.all(
    item.value.related_articles.map(id =>
      $fetch(
        `https://admin.dspcrm.com/wp-json/wp/v2/posts/${id}`
      )
    )
  )
}


// =========================
// RUN WHEN DATA CHANGES
// =========================
watch(
  item,
  async () => {
    await fetchRelatedTerms()
    await fetchRelatedArticles()
  },
  {
    immediate: true
  }
)


// =========================
// SEO
// =========================
useHead({
  title: () => item.value?.title?.rendered || 'Glossary'
})

</script>
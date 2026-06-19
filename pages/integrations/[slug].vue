<template>
  <main class="min-h-screen ">
    <div v-if="pending" class="flex justify-center items-center h-screen">
      <p>Loading Integration...</p>
    </div>

    <div v-else-if="integration" class="container mx-auto">
    
      <div class="max-w-2xl mx-auto py-20 px-6">
        <NuxtLink to="/integrations" class="breadcrumb pt-20">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
          Integrations
        </NuxtLink>

        <div v-html="integration.html_layout"></div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <h1>404 - Integration Not Found</h1>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const slug = route.params.slug; // Ye 'paypal' pick karega

// Fetch data using the custom endpoint
const { data: integration, pending } = await useFetch(`https://admin.dspcrm.com/wp-json/custom/v1/integration/${slug}`);

// Dynamic SEO
if (integration.value) {
  const seo = integration.value.Seo;
  useHead({
    title: seo?.meta_title || integration.value.title,
    meta: [
      { name: 'description', content: seo?.meta_description },
      { property: 'og:image', content: integration.value.screenshot_url }
    ]
  });
}
</script>

<style>
/* CSS scoped nahi rakhni taake v-html par apply ho sake */
.breadcrumb {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: none;
  margin-bottom: 2rem;
}

/* Yahan apni baki designs ki CSS paste karein */
</style>
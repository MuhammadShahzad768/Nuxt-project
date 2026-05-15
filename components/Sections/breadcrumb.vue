<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean)

  return pathArray.map((item, index) => {
    return {
      name: item.replace(/-/g, ' '),
      path: '/' + pathArray.slice(0, index + 1).join('/')
    }
  })
})
</script>

<template>
    <div class="mx-auto max-w-4xl px-4 pb-8 pt-10">
  <nav class="flex items-center justify-center text-sm text-neutral-600">
    <NuxtLink to="/">Home</NuxtLink>

    <template
      v-for="(crumb, index) in breadcrumbs"
      :key="crumb.path"
    >
      <span><svg class="mx-2 size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><g fill="currentColor"><polyline points="7.5 16.5 14 10 7.5 3.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></g></svg></span>

      <NuxtLink :to="crumb.path">
        {{ crumb.name }}
      </NuxtLink>
    </template>
  </nav>
  </div>
</template>
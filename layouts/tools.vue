<script setup lang="ts">
import testing from '~/pages/testing.vue';
</script>

<template>
  <div class="layout-wrapper overflow-x-hidden">
    <testing />

    <main class="content bg-[#DFDFDF]">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
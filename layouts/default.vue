<script setup lang="ts">
import Testing from '~/pages/testing.vue';

</script>



<template>
  <div class="layout-wrapper">
    <Testing/>

    <main class="content">
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
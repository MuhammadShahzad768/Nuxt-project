<script setup lang="ts">
import Testing from '~/pages/testing.vue';
import DemoBanner from "~/components/Sections/DemoBanner.vue";
import Header from "~/components/header.vue";

</script>



<template>
  <div class="layout-wrapper overflow-x-hidden">
    <!-- <Testing/> -->
    <Header/>

    <main class="content">
      <DemoBanner/>
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
<script setup lang="ts">
import Testing from '~/pages/testing.vue';
import Sidebar from '~/components/Sections/Sidebar.vue';

</script>



<template>
  <div class="layout-wrapper">
    <Testing/>

    <div class="flex min-h-screen lg:px-20 xl:flex-nowrap flex-wrap md:px-0 md:pl-5 md:w-full">
        <Sidebar/>
      <slot /> 
    </div>

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
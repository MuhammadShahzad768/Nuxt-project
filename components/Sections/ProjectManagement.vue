<template>
  <section class=" py-16 custom_family">
      <div class="container max-w-screen-xl m-auto">
        <div class="head text-center">
        <h2 class="xl:text-[45px]	lg:text-4xl md:text-2xl text-2xl text-[var(--text-color)] text-center  font-medium  leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight" data-aos="fade-up">Project Management Seamlessly <br><span class="font-bold">Connected to Your Billing</span></h2>
          <p class="mt-4 text-base md:text-lg text-[var(--text-custom)] max-w-3xl mx-auto">An end-to-end workflow — from signup to final delivery — all in one platform.</p>
        </div>
        <div class="flex pages pt-20 flex-wrap gap-3 justify-center max-w-[96%] m-auto overflow-x-hidden">
 <Pages
  v-for="(page, index) in pages"
  :key="index"
  :title="page.title"
  :description="page.description"
  :points="page.points"
  :image="page.image"
  :index="index"
/>
          </div>
        </div>
      
    </section>
</template>
<script>
import { ref } from "vue";

export default {
    
}
</script>
<template>
  <section class="demo-button-section pt-2 pb-6 bg-[#FAFAFA] custom_family px-4 " :class="sectionId" >
    <div 
      class="m-auto max-w-[500px] flex items-center gap-5 justify-center"
      data-aos="fade-up"
    >
      <a 
         
        target="_blank" 
        class="max-w-[170px] transition-all duration-300 ease-in-out hidden md:block border-4 hover:bg-[#00296B] hover:border-1 hover:text-white rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 text-[#00296B] font-medium md:px-4 md:py-2 text-center"
      >
        Book A Demo
      </a>

      <p class="text-xl hidden md:block text-[var(--text-custom)]">
        Ready<br>
        <span class="font-bold">
          <a target="_blank"  class="hover:underline">
           Try It Free
          </a>
        </span>
      </p>
    </div>
  </section>
</template>
<script setup>
defineProps({
sectionId: {
    type: String,
    required: true,
    default: ''
  }
})
</script>
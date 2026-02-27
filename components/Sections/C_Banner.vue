<template>
  <section
  class="content-img-section px-4 custom_family bg-[#DFDFDF]" :class="sectionId">
     <div class="max-w-7xl mx-auto  rounded-3xl p-6 md:p-0 seo-agency inner_banner" data-aos="fade-up">
      <div class="text-center ">
    <h1 class=" text-[var(--bg-custom-color)] font-bold text-center m-auto xl:text-[42px] text-[28px] xl:leading-[55px] leading-[35px] max-w-4xl px-4">
      <span class="font-medium">{{ banner.title_1 }}</span><br> 
      {{ banner.title_2 }} 
    </h1>
   
 <p v-if="banner.description" class=" text-center mt-6 text-[#494949] text-[16px] max-w-lg mx-auto px-4" data-aos="fade-up">
         {{ banner.description }}
        </p>

    
    <img v-if="banner.image" :src="banner.image" :alt="banner.image"
          class="xl:mt-12 xl:max-w-[85%] max-w-[95%] mt-12 relative m-auto rounded-2xl drop-shadow-2xl"
          data-aos="zoom-in" />
</div>
          <!-- Demo Button Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pb-10">
      <div
  v-for="(row, rowIndex) in banner.repeater"
  :key="rowIndex"
  :class="['flex items-start gap-4', rowIndex > 0 ? 'mt-0' : ''] " data-aos="fade-up"
          :data-aos-delay="rowIndex * 150"
>
  <!-- Image -->
  <div class="flex-shrink-0 mt-1">
    <img
      v-if="row.sub_image"
      :src="row.sub_image"
      :alt="row.sub_title"
      class="w-10 h-10 object-contain"
    />
  </div>

  <!-- Text Content -->
  <div>
    <h3 class="text-lg md:text-[20px] font-bold text-black mb-2 leading-tight">
      {{ row.sub_title }}
    </h3>
    <p class="text-[#494949] text-base leading-relaxed italic">
      {{ row.sub_quote }}
    </p>
  </div>
</div>
</div>


       <div v-if="banner.show_demo " class="m-auto max-w-[500px] flex items-center gap-5 justify-center pb-16 pt-0"
        data-aos="fade-up">
        <a :href="banner.demo_link" target="_blank"
          class="max-w-[170px] transition-all duration-300 ease-in-out hidden md:block border-4 hover:bg-[#00296B] hover:border-1 hover:text-white rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 text-[#00296B] font-medium md:px-4 md:py-2 text-center">
           {{ banner.button }}
        </a>

        <p class="text-xl hidden md:block text-[var(--text-custom)] leading-tight">
         Ready<br>
          <span class="font-bold">
            <a target="_blank" :href="banner.button_link" class="hover:underline">
              {{ banner.try }}
            </a>
          </span>
        </p>
      </div>
      </div>
  </section>
</template>

<script setup>
defineProps({
  banner: {
    type: Object,
    required: true,
    default: () => ({})
  },
   sectionId: {
    type: String,
    required: false,
    default: ''
  }
});
</script>
<style scoped>
#page-root .hero:first-child {
  padding-top: 150px;
}

#page-root .hero h1 {
  margin-top: 0;
}
</style>

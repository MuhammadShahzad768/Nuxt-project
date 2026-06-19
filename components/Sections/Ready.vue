<template>
 <section class="bg-white py-16 custom_family" :class="sectionId">
      <div class="container m-auto xl:max-w-[90%] max-w-[90%]">
        <div class="head text-center">
        <h2 class="xl:text-[45px]	lg:text-4xl md:text-2xl text-2xl text-[var(--text-color)] text-center  font-bold leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight" data-aos="fade-up">{{ banner?.title_1 || "Ready to give it a try?" }}</h2>
        <p class="hidden md:block text-md text-[var(--text-custom)]  font-medium  mb-14">
          {{ banner?.description  || "You’re in a preferred company. Join the many agencies we’ve helped sell over $500M+ in services."}}</p>
       <img
      :src="banner?.image || 'https://admin.dspcrm.com/wp-content/uploads/2026/03/image-68-1.png'"
     
      class="m-auto"
    />
        <a href='https://calendly.com/dspcrm-info/30min'  class="max-w-[185px] text-center transition-all duration-300 ease-in-out hidden md:block  border-4	m-auto mt-7 rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 mb-4 text-[#00296B]  font-medium md:px-4 md:py-2 hover:bg-[#00296B] hover:border-1 hover:text-white" target="_blank">
         {{ banner?.button || "Book a Demo" }}</a>
          <p class="text-xl hidden md:block">
              Ready?<span class=" font-bold  text-[var(--text-custom)] text-xl"><a href='https://calendly.com/dspcrm-info/30min' target='_blank'> Try it Free</a></span>
          </p>
      </div>
    </div>
    </section>
</template>
<script setup>
defineProps({
  banner: {
    type: Object,
    required: true
  },
   sectionId: {
    type: String,
    required: false,
    default: ''
  },
  default: () => ({})
});
</script>
<style>
[data-aos="fade-up"] {
  transform: translateY(100px); /* default is 100px */
}

</style>
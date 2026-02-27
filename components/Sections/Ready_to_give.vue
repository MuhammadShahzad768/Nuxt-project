<template>
 <section class="bg-white py-16 custom_family" :data-id="props.Last?.section_display"
    :class="{ hidden: !props.Last?.section_display }">
      <div class="container m-auto xl:max-w-[90%] max-w-[90%]">
        <div class="head text-center">
        <h2 class="xl:text-[45px]	lg:text-4xl md:text-2xl text-2xl text-[var(--text-color)] text-center  font-bold leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight" data-aos="fade-up">{{Last?.last_section_title}}</h2>
        <p class="hidden md:block text-md text-[var(--text-custom)]  font-medium  mb-14">{{Last?.last_section_description}}</p>
        <img :src="Last.last_section_image.url" alt="" class="m-auto">
        <a href='https://calendly.com/dspcrm-info/30min'  class="max-w-[185px] text-center transition-all duration-300 ease-in-out hidden md:block  border-4	m-auto mt-7 rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 mb-4 text-[#00296B]  font-medium md:px-4 md:py-2 hover:bg-[#00296B] hover:border-1 hover:text-white" target="_blank">
          {{Last?.last_section_button_text}}</a>
          <p class="text-xl hidden md:block">
              Ready?<span class=" font-bold  text-[var(--text-custom)] text-xl"><a href='https://calendly.com/dspcrm-info/30min' target='_blank'> Try it Free</a></span>
          </p>
      </div>
    </div>
    </section>
</template>
<script setup>
const props = defineProps({
   Last: Object,
})
</script>
<style>
[data-aos="fade-up"] {
  transform: translateY(100px); /* default is 100px */
}
</style>
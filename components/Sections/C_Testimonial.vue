<template>
  <section 
    class="testimonial-section pb-12 bg-[#DFDFDF] custom_family px-4"
    :class="sectionId"
  >
    <div class="max-w-6xl mx-auto relative" data-aos="fade-up" 
    data-aos-duration="1000">
      <swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        class="testimonialSwiper"
      >
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-32 relative pt-10 pb-16">
            
            <div class="flex-shrink-0" data-aos="zoom-in" data-aos-delay="200">
              <img 
                :src="item.image" 
                :alt="item.image" 
                class="w-[180px] h-[180px] rounded-full object-cover shadow-lg"
              />
            </div>

            <div class="flex-grow relative pt-2">
              <div class="text-[#233267] text-9xl font-serif absolute -top-10 -left-16 opacity-90 select-none">“</div>
              
              <p class="text-xl md:text-[22px] text-[var(--text-custom)] italic mb-10 relative z-10" data-aos="fade-left" data-aos-delay="300">
                {{ item.description }}
              </p>

              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div class="space-y-6" data-aos="fade-up" data-aos-delay="400">
                  <a 
                    :href="item.button_url" 
                    class="text-[#233267] text-[18px] font-medium flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    {{ item.button_text }} 
                    <span class="text-xl">&rarr;</span>
                  </a>

                  <div class="author-info text-[#000]">
                    <h4 class="text-[20px] font-bold leading-tight">{{ item.name }}</h4>
                    <p class="text-[18px] font-normal opacity-80">{{ item.role }}</p>
                  </div>
                </div>

                <div class="flex-shrink-0" data-aos="fade-up" data-aos-delay="500">
                  <img 
                    :src="item.logo" 
                    alt="Company Logo" 
                    class="w-[150px] h-auto object-contain"
                  />
                </div>
              </div>
            </div>

          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

defineProps({
  banner: {
    type: Array, // Changed from Object to Array
    required: true
  },
   sectionId: {
    type: String,
    required: false,
    default: ''
  }
});
</script>

<style>
/* ... keep your existing styles ... */
.testimonialSwiper .swiper-pagination-bullet-active {
  background: #233267 !important;
}
.testimonialSwiper .swiper-pagination {
  bottom: 0px !important;
}
</style>
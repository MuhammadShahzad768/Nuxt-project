<template>
  <section class="bg-[#F4F4F4] pt-10 xl:px-8 px-4 custom_family">
    <div class="container max-w-screen-xl m-auto">
      <div class="bg-blue-900 text-white py-12 xl:px-5 px-0 rounded-lg">
        <div class="container mx-auto px-4 text-center">
          
          <!-- Title -->
          <h2 class="xl:text-2xl font-semibold mb-2 text-[15px]">
            {{ Integrate?.integrate_title }}
          </h2>

          <!-- Button -->
          <a
            v-if="Integrate?.integrate_button"
            href="https://calendly.com/dspcrm-info/30min"
            target="_blank"
            class="text-yellow-400 hover:text-yellow-500 underline">
            {{ Integrate.integrate_button }}
          </a>

          <!-- Logos Slider -->
          <Swiper
            :modules="[Autoplay]"
            :slides-per-view="2"
            :space-between="20"
            :loop="true"
            :autoplay="{ delay: 2000, disableOnInteraction: false }"
            :breakpoints="{
              300: {slidesPerView: 3},
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
              1280: { slidesPerView: 12 }
            }"
            class="xl:mt-8 mt-0"
          >
            <SwiperSlide
              v-for="(logo, index) in images"
              :key="index"
              class="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 flex items-center justify-center"
            >
              <img
                :src="logo.integrate_logo?.url"
                :alt="logo.integrate_logo?.alt || 'Integration Logo'"
                class="h-12 object-contain"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Props
const props = defineProps({
  Integrate: {
    type: Object,
    default: () => ({}),
  },
});

// Computed array
const images = computed(() => props.Integrate?.integrate_logos || []);
</script>

<style scoped>
.swiper {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>

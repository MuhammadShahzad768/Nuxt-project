<template>
  <section
    class="hero pb-20 pt-[170px] relative custom_family bg-[#D9D9D975] bg-bottom bg-cover"
  >
    <div class="max-w-screen-xl m-auto flex mt-0 flex-wrap px-4 md:px-8 md:items-center lg:items-start">
      <div class="hero_left max-w-[100%] md:max-w-[45%] w-full">
        <Swiper
          :modules="[Autoplay, EffectFade]"
          effect="fade"
          :fadeEffect="{ crossFade: true }"
          :autoplay="{ delay: 3000 }"
          :loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          class="w-full"
        >
          <!-- Dynamic Slides -->
          <SwiperSlide v-for="(slide, index) in banner?.slider || []" :key="index">
            <h3 class="text-[var(--text-custom)] text-center lg:text-base md:text-left md:text-xs sm:text-sm mb-4 font-bold capitalize">
              {{ slide.slider_heading }}
            </h3>
            <h2
              class="xl:text-[50px] lg:text-4xl md:text-2xl text-2xl text-[var(--text-color)] text-center md:text-left font-bold leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight"
              v-html="slide.slider_title"
            ></h2>
            <h6 class="hidden md:block text-[15px] text-text-color font-medium mb-4">
              {{ slide.slider_text }}
            </h6>
            <a :href='slide.slider_button_url'
              class="max-w-[150px] transition-all duration-300 ease-in-out hidden md:block border-4 hover:bg-[#00296B] hover:border-1 hover:text-white rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 mb-4 text-[#00296B] font-medium md:px-4 md:py-2"
            >
              {{ slide.slider_button }}
            </a>
            <p class="text-xl text-base hidden md:block text-[var(--text-custom)]" v-html="slide.try_free"></p>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Right Side Image -->
      <div class="hero_right md:max-w-[55%] max-w-[100%] w-full">
        <div class="image lg:absolute md:relative sm:relative xxl:relative h-[500px] max-w-[750px]">
          <img :src="banner?.image?.url" alt="" class="w-full" />
        </div>
      </div>
    </div>

    <!-- Custom Pagination -->
    <div class="flex items-center justify-left max-w-screen-xl px-8 m-auto py-4">
      <div class="flex space-x-2">
        <div
          v-for="(dot, index) in totalSlides"
          :key="index"
          @click="goToSlide(index)"
          class="h-4 w-4 rounded-full cursor-pointer transition-colors"
          :class="activeIndex === index ? 'bg-gray-700' : 'bg-gray-300'"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade } from "swiper/modules";

// Props
const props = defineProps({
  banner: Object
});

// Swiper
const swiperRef = ref(null);
const activeIndex = ref(0);

// Event Handlers
const onSwiper = (swiper) => {
  swiperRef.value = swiper;
};

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex;
};

const goToSlide = (index) => {
  if (swiperRef.value) swiperRef.value.slideToLoop(index);
};

// Total slides dynamically
const totalSlides = computed(() => props.banner?.slider?.length || 0);

// Watch banner to log slider headings
watch(
  () => props.banner,
  (newVal) => {
    if (newVal && newVal.slider) {
      newVal.slider.forEach((slide, index) => {
        // console.log(`Slide ${index + 1} Heading:`, slide.slider_heading);
      });
      if (newVal.image) {
        // console.log("Banner Image URL:", newVal.image.url);
      }
    }
  },
  { immediate: true }
);
</script>

<style>
.swiper-wrapper {
  padding: 0;
}
</style>

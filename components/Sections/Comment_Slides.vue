<template>
  <section class="py-16 bg-[#F4F4F4] custom_family" :data-id="props.CommentsData?.section_display"
    :class="{ hidden: !props.CommentsData?.section_display }">
    <div class="container max-w-screen-xl mx-auto px-4">
      <!-- Title -->
      <div class="text-center mb-12 md:mb-16">
        <h2
          class="xl:text-[45px] lg:text-4xl md:text-2xl text-2xl text-[var(--text-color)] text-center font-medium leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight"
          data-aos="fade-up"
        >
          <span data-aos="fade-up" class="font-bold">{{ CommentsData?.comments_bold }}</span><br />
          {{ CommentsData?.comments_title }}
        </h2>
        <p class="mt-4 text-base md:text-lg text-[var(--text-custom)] max-w-3xl mx-auto">
          {{ CommentsData?.comments_description }}
        </p>
      </div>

      <!-- Swiper -->
      <div class="flex items-center justify-center space-x-2 md:space-x-6">
        <swiper
          :modules="[Navigation, Autoplay]"
          :slides-per-view="Number(slides_show)"
          :loop="true"
          navigation
          :space-between="Number(space_between)"
          class="mySwiper xl:pt-20 "
        >
          <swiper-slide
            v-for="(comment, index) in Comments_Slides"
            :key="index"
            class="pt-[42px]"
          >
            <div class="bg-white m-auto rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-[480px]">
              <div class="flex flex-col items-center text-center relative">
                <!-- Profile Image -->
                <img
                  class="w-20 h-20 rounded-full object-cover mb-6 absolute"
                  :src="comment.comments_slides_images.url"
                  alt="Profile photo"
                  style="top: -82px;"
                />

                <!-- Dynamic Comment -->
                <blockquote
                  class="min-h-[98px] text-lg text-left mt-10 text-[#5E6282] leading-snug"
                >
                  <p>{{ comment.comments_slides_text }}</p>
                </blockquote>

                <!-- Dynamic Name + Location -->
                <figcaption
                  class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
                >
                  <div class="text-center sm:text-left">
                    <p class="font-bold text-lg text-[#5E6282]" v-html='comment.comments_slides_name'>
                      
                     
                    </p>
                    <p class="text-sm text-[#5E6282]">
                      {{ comment.comments_slides_location }}
                    </p>
                  </div>

                  <!-- Logo -->
                  <img class="h-10 max-w-[160px]" :src="comment.comments_slides_logo.url" alt="GMB Gorilla Logo" />
                </figcaption>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Bottom Logos -->
      <div class="xl:mt-16 md:mt-24 mt-5">
        <div class="flex flex-wrap items-center gap-x-10 gap-y-8 md:gap-x-16">
          <img 
  v-for="(l, i) in Logos" 
  :key="i" 
  class="h-10 xl:max-w-[260px] max-w-[40%] w-full" 
  :src="l.logos.url" 
  :alt="l.logos.alt || 'Logo'" 
/>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { computed } from "vue";

// ✅ Images
// ✅ Props
const props = defineProps({
  slides_show: {
    type: [Number, String],
    default: 1,
  },
  CommentsData: Object,
  space_between: {
    type: [Number, String],
    default: 1,
  },
});

// ✅ Computed for comments
const Comments_Slides = computed(
  () => props.CommentsData?.comments_slides || []
);
const Logos = computed(
  () => props.CommentsData?.logos_images || []
);
</script>

<style setup>
.mySwiper {
  width: 612px;
  height: 400px !important;
  padding-bottom:30px;
}
.swiper-button-prev,
.swiper-button-next {
  color: rgb(148 163 184 / var(--tw-text-opacity, 1));
  height: 1.75rem;
  width: 1.75rem;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  width: 1.75rem;
  font-size: 28px;
  height: 1.75rem;
}
.swiper-button-next {
  right: -5px;
}
@media screen and (min-width:300px) and (max-width:768px){
  .mySwiper .swiper-wrapper{
    padding:0;
  }
}
</style>

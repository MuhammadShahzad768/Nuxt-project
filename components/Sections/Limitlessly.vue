<template>
  <section
    :data-id="props.Limitless?.section_display"
    :class="{ hidden: !props.Limitless?.section_display }"
  >
    <div class="bg-white py-16 custom_family">
      <div class="container mx-auto xl:px-8 max-w-screen-xl px-4">
        <!-- Heading -->
        <div class="text-center mb-12">
          <h2
            class="xl:text-[45px] lg:text-4xl md:text-2xl text-2xl text-[var(--text-color)] font-medium leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight"
            data-aos="fade-up"
          >
            {{ props.Limitless?.limitlessly_flexible_title }}
          </h2>
          <p class="text-[var(--text-custom)]">
            {{ props.Limitless?.limitlessly_flexible_description }}
          </p>
        </div>

        <!-- Content -->
        <div class="flex flex-wrap">
          <!-- Left Boxes -->
          <div class="xl:max-w-[36%] max-w-[100%] w-full">
            <div class="flex gap-4 h-full flex-wrap">
              <div
                v-for="(a, b) in LimitlessBoxes"
                :key="b"
                class="flex items-start xl:max-w-[48%] max-w-[100%] bg-gray-100 p-3 pl-4 pt-4 flex-col rounded-md max-h-[226px] hover:shadow-xl"
                data-aos="zoom-in"
              >
                <div class="bg-gray-100 rounded-lg mr-4">
                  <span v-html="a.limitlessly_flexible_boxes_svg" class='fil'></span>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-blue-900 mt-1">
                    {{ a.limitlessly_flexible_boxes_title }}
                  </h3>
                  <p class="text-gray-600 mt-1 text-[14px]">
                    {{ a.limitlessly_flexible_boxes_descr }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="xl:max-w-[62%] max-w-[100%] w-full ml-auto xl:mt-0 mt-4">
            <div class="p-0 rounded-lg">
              <img
                :src="props.Limitless?.limitlessly_flexible_image?.url"
                :alt="props.Limitless?.limitlessly_flexible_image?.alt || 'Client portal screenshot'"
                class="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  Limitless: Object,
});

const LimitlessBoxes = computed(
  () => props.Limitless?.limitlessly_flexible_boxes || []
);
</script>

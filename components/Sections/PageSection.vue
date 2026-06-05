<template>
  <section
    class="py-16 custom_family bg-[#FAFAFA]"
    :data-id="project_management?.section_display"
    :class="{ hidden: !project_management?.section_display }"
  >
    <div class="container max-w-screen-xl m-auto md:w-[100%] md:px-6 xl:w-[90%]">
      <!-- Header -->
      <div class="head text-center">
        <h2
          class="xl:text-[45px] lg:text-4xl md:text-2xl text-2xl text-[var(--text-color)] text-center font-medium leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight"
          data-aos="fade-up"
        >
          {{ project_management?.project_management_title }}
          <br />
          <span class="font-bold">{{ project_management?.project_management_title_bold }}</span>
        </h2>
        <p class="mt-4 text-base md:text-lg text-[var(--text-color)] max-w-3xl mx-auto">
          {{ project_management?.project_management_description }}
        </p>
      </div>

      <!-- Cards -->
      <div
        class="flex pages pt-5 xl:pt-20 flex-wrap gap-x-4 gap-y-6 justify-center md:max-w-[100%] xl:max-w-[96%] m-auto xl:overflow-x-hidden"
      >
        <div
          v-for="(client, index) in P_boxes"
          :key="index"
          :data-aos="getAosEffect(index)"
          class="xl:max-w-[32.2%] md:max-w-[48%] max-w-[100%] w-full flex flex-col gap-4 group bg-white rounded-2xl xl:px-10 px-5 box-border py-5 hover:shadow-xl"
        >
          <!-- Card Title -->
          <h4 class="text-[#00296B] font-normal text-2xl">
            {{ client?.project_management_boxes_title }}
          </h4>

          <!-- Card Description -->
          <p class="font-semibold text-sm">
            {{ client?.project_management_boxes_desc }}
          </p>

          <!-- Bullet Points -->
          <div class="flex flex-col mt-2 text-[#838383] text-sm mb-4">
            <span
              v-for="(point, idx) in client?.project_management_boxes_points"
              :key="idx"
              class="block group-hover:font-bold"
            >
              {{ point?.project_management_boxes_point }}
            </span>
          </div>

          <!-- Card Image -->
          <img
            :src="client?.project_management_boxes_image?.url"
            :alt="client?.project_management_boxes_title || ''"
            width="800"
            height="500"
            class="w-full h-auto rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  project_management: Object,
});

// ✅ Safe fallback to empty array if prop is undefined
const P_boxes = computed(
  () => props.project_management?.project_management_boxes || []
);

// AOS animation based on column position (3-column grid)
function getAosEffect(index) {
  const col = index % 3;
  if (col === 0) return "fade-right";
  if (col === 1) return "fade-up";
  return "fade-left";
}
</script>
<template>
       <section class=" py-16 custom_family bg-[#FAFAFA]" :data-id="project_management?.section_display"  :class="{ hidden: !project_management?.section_display }">
      <div class="container max-w-screen-xl m-auto w-[90%]">
        <div class="head text-center">
        <h2 class="xl:text-[45px]	lg:text-4xl md:text-2xl text-2xl text-[var(--text-color)] text-center  font-medium  leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight" data-aos="fade-up">{{project_management.project_management_title}} <br><span class="font-bold">{{project_management.project_management_title_bold}}</span></h2>
          <p class="mt-4 text-base md:text-lg text-[var(--text-custom)] max-w-3xl mx-auto">{{project_management.project_management_description}}</p>
        </div>
        <div class="flex pages pt-5 xl:pt-20 flex-wrap gap-x-4 gap-y-6 justify-center max-w-[96%] m-auto xl:overflow-x-hidden">
  <div
    class="xl:max-w-[32.2%] max-w-[100%] w-full flex flex-col gap-4 group bg-white rounded-2xl xl:px-10  px-5 box-border py-5 hover:shadow-xl"
    :data-aos="getAosEffect(index) "   v-for="(client, index) in P_boxes" :key="index">
    <h4 class="text-[#00296B] font-base text-2xl">{{ client.project_management_boxes_title }}</h4>
    <p class="font-semibold text-sm">{{ client.project_management_boxes_desc }}</p>

    <div class="flex flex-col mt-2 text-[#838383] text-sm mb-4">
      <span
      v-for="(point, idx) in client.project_management_boxes_points"
      :key="idx"
      class="block group-hover:font-bold"
    >
      {{ point.project_management_boxes_point }}
    </span>

    </div>

    <img  alt="" :src="client.project_management_boxes_image.url">
  </div>
   </div>
        </div>
      
    </section>
</template>

<script setup>
import { ref, computed  } from "vue";
const props = defineProps({ project_management: Object });
console.log(props)
const P_boxes = computed(
  () => props.project_management?.project_management_boxes || "");
  const P_points = computed(
  () => props.project_management?.project_management_boxes.project_management_boxes_desc_points || "");
 function getAosEffect(index) {
  const col = index % 3;
  if (col === 0) return "fade-right"; // left column
  if (col === 1) return "fade-up";    // middle column
  return "fade-left";                 // right column
}

</script>

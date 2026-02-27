<template>
 <section class="bg-[#FAFAFA] xl:py-14 py-0  bg-top custom_family xl:pt-[300px] pt-[40px] pb-[40px]" :data-id="clients?.section_display"  :class="{ hidden: !clients?.section_display }">
      <div class="container max-w-screen-xl m-auto xl:px-8 px-4 custom_family">
        <div class="head ">
          <div class="flex items-center flex-col">
            <div class="flex flex-col xl:max-w-[52%] w-full">
            <h2 class="xl:text-[45px]	 text-center text-[20px] text-[var(--bg-custom-color)]   font-bold  leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[70px] tracking-tight mb-0" data-aos="fade-up">          {{ clients?.title }}
</h2>
            <h4 class="text-[var(--bg-custom-color)]  text-center font-medium text-[20px] leading-[20px] xl:text-5xl">{{ clients?.title2 }}</h4>
          </div>
          <p class="mt-[20px] xl:mt-[40px] max-w-[100%] xl:max-w-[36%] text-center text-[#999999] font-semibold text-base">{{ clients?.description }}</p>
          </div>
        </div>
        <div class=" flex mt-8 xl:mt-16 flex-wrap gap-[2%] gap-y-[20px] xl:gap-y-[30px] overflow-hidden">
   <div 
   v-for="(client, index) in clientsBoxes" :key="index"
  class=" w-full group  max-w-[100%] xl:max-w-[31%]  box-border bg-white  overflow-hidden border border-[#999999] rounded-3xl"
  :data-aos="getAosEffect(index)"
>
<div class='clients_box pl-6 pr-6 pt-8 pb-4'>
  <div class="flex items-baseline">
    <div class="relative h-[40px] w-[50px] " >

      <div 
        class="relative h-[40px] w-[40px] group-hover:text-red-500" 
        v-html="client.box_svg"
      ></div>
    </div>
    <p class="text-[#00296B] text-lg font-semibold group-hover:text-white">
      {{ client.box_title }}
    </p>
  </div>

  <p class="text-[#999999] text-sm mt-2 mb-16 max-w-[85%] font-medium group-hover:text-white">
    {{ client.box }}
  </p>

  <!-- large image -->
  <img :src="client.box_image.url" alt="" class="rounded-xl w-full h-auto transition-all duration-300 min-h-[214px] max-h-[250px]" />
</div>
</div>
  </div>
      </div>
    </section>
</template>

<script setup>

import { ref, computed  } from "vue";

// Props
const props = defineProps({ clients: Object });
const showClients = computed(() => props.clients?.show_clients_section);
const clientsBoxes = computed(() => props.clients?.clients_boxes || []);
function getAosEffect(index) {
  const col = index % 3;
  if (col === 0) return "fade-right"; // left column
  if (col === 1) return "fade-up";    // middle column
  return "fade-left";                 // right column
}
</script>


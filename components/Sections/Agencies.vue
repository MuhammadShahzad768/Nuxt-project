<template>
 <section class="bg-[#FAFAFA] py-14 custom_family overflow-hidden" :data-id="Services?.section_display"  :class="{ hidden: !Services?.section_display }">
      <div class="container max-w-screen-xl m-auto xl:px-8 px-4">
        <div class="head text-center">
        <h2 class="xl:text-[45px]	text-[20px] text-[var(--text-color)] text-center  font-medium  leading-[20px]  lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight" >{{ServicesTitle}}<br><span data-aos="fade-up" class="font-bold">{{ServicesTitleBold}}</span></h2>
       <p class="mt-4 text-base md:text-lg text-[var(--text-custom)] max-w-4xl mx-auto">{{ServicesDescription}}</p>
      </div>
      <div class="flex flex-col mt-[40px] xl:mt-[120px] max-w-[1210px] m-auto w-full xl:space-y-[140px] space-y-[80px]">
  <div v-for="(service, index) in ServicesBoxes" :key="index" class="digital_boxes group relative xl:pt-[25px] pb-[25px] pt-[0]">
    <template v-if="index % 2 === 0">
      <!-- Left text, right image -->
      <div class="max-w-[970px] bg-[#E5E8F1]  mobile" data-aos="fade-right">
        <div class='inner_box py-8  pl-[0%] xl:w-full w-[90%] m-auto xl:pl-[19%] group-hover:bg-[#00296B]'>
        <h3 class="text-[#00296B] xl:text-left text-center text-[20px] xl:text-[30px] group-hover:text-white font-semibold">
          {{ service.service_agencies_box_title }}
        </h3>
        <p class="max-w-[330px] xl:text-left text-center mt-[10px] text-[var(--text-custom)] group-hover:text-white text-lg">
          {{ service.service_agencies_box_description }}
        </p>
        </div>
      </div>
      <img :src="service.service_agencies_boxes_images.url" alt="" data-aos="fade-left" class="absolute right-0 h-[300px] w-[600px]" />
    </template>

    <template v-else>
      <!-- Right text, left image -->
      <div class="max-w-[970px] bg-[#E5E8F1]  ml-auto mobile" data-aos="fade-left">
      <div class='group-hover:bg-[#00296B] inner_box py-8 xl:pl-[45%] pl-[0] xl:w-full w-[90%] m-auto'>
        <h3 class="text-[#00296B] xl:text-left text-center text-[20px] xl:text-[30px] font-semibold group-hover:text-white transition-colors duration-500 ease-in-out">
          {{ service.service_agencies_box_title }}
        </h3>
        <p class="max-w-[350px] xl:text-left text-center  mt-[10px] text-[var(--text-custom)] text-xl group-hover:text-white transition-colors duration-500 ease-in-out">
          {{ service.service_agencies_box_description }}
        </p>
        </div>
      </div>
      <img :src="service.service_agencies_boxes_images.url" alt="" data-aos="fade-right" class="absolute top-[-50%] left-0 h-[300px] w-[600px]" />
    </template>
  </div>
     
      </div>
      </div>
    </section>
</template>


<script setup>
import { computed } from "vue";

const props = defineProps({ Services: Object });
const ServicesBoxes = computed(() => props.Services?.service_agencies_boxes || []);
const ServicesTitle = computed(() => props.Services?.services_title || []);
const showClients = computed(() => props.Services?.show_clients_section);
const ServicesTitleBold = computed(() => props.Services?.services_title_bold || []);
const ServicesDescription = computed(() => props.Services?.services_description || []);
</script>

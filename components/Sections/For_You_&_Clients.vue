<template>
   <section class="py-14 font-poppins bg-[#FAFAFA]  " :data-id="For?.section_display"  :class="{ hidden: !For?.section_display }">
      <div class="container m-auto bg-white py-10 max-w-[90%] xl:max-w-[1210px] rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div class="head text-center">
          <h2 class="xl:text-[45px]	lg:text-4xl md:text-2xl text-2xl text-[#00296B] text-center font-poppins font-bold font-poppins leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight" data-aos="fade-up">{{For_title}}</h2>
          <p class="xl:max-w-[60%] max-w-[100%] m-auto">{{For_description}}</p>
        </div>
        <div v-for="(box, index) in For_Boxes" :key="index" class="clients_boxes flex max-w-[90%] m-auto xl:mt-20 flex-wrap mt-6">
         <template v-if="index % 2 === 0">
          <div class="clients_boxs relative xl:h-[360px] h-[360px] w-full" >
            <div class="inner_boxs w-[90%] m-auto xl:w-full bg-[#E5E8F1] xl:py-20 pt-10 pb-14 xl:px-10 px-2 rounded-xl ">
              <h3 class="xl:text-[30px] xl:text-left text-center lg:text-2xl md:text-2xl text-2xl text-[#00296B] font-poppins font-medium font-poppins leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px]  tracking-tight">{{box.for_client_title}}</h3>
              <p class="max-w-[400px] xl:text-left text-center xl:pt-[0] pt-[10px] font-semibold">{{box.for_client_descri}}</p>
              <img data-aos="fade-left"  :src="box.for_client_image.url" alt="" class="absolute xl:right-[2.5rem] xl:top-[-16%] bottom-[0px] right-[0] top-[140px]">
            </div>
        </div>
        </template>
        <template v-else>
        <div class="clients_boxs relative xl:h-[360px] h-[360px] w-full xl:mt-10 mt-1">
            <div class="inner_boxs w-[90%] m-auto xl:m-0 xl:w-full bg-[#E5E8F1] xl:py-20 pt-10 pb-14  xl:px-10 px-2 rounded-xl ">
              <h3 class="xl:text-[30px]	lg:text-2xl md:text-2xl text-2xl text-[#00296B] font-poppins font-medium font-poppins leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px]  tracking-tight xl:max-w-[38%] text-center xl:ml-auto">{{box.for_client_title}}</h3>
              <p class=" font-semibold xl:max-w-[38%] xl:ml-auto text-center">{{box.for_client_descri}}</p>
              <img data-aos="fade-right" :src="box.for_client_image.url" alt="" class="absolute xl:left-[2.5rem] xl:top-[-16%] bottom-[0px] left-0 top-[140px]">
            </div>
          </div>
          </template>
        </div>
      <div class="max-w-[90%] m-auto mt-10 xl:mt-5 flex flex-wrap justify-between">
  <div
    v-for="(SvgBoxes, index) in Svg_Boxes"
    :key="index"
    class="xl:max-w-[28%] max-w-[90%] xl:text-left text-center m-auto flex flex-col space-y-[15px] xl:p-4 p-2"
    data-aos="zoom-in"
    :data-aos-delay="index * 200"  
  >
    <img :src="SvgBoxes.svg_box_icon.url" alt="" class="xl:m-0 m-auto max-w-[70px]" />
    <h2 class="text-[#00296B] text-lg font-medium xl:text-[20px]">
      {{ SvgBoxes.svg_box_title }}
    </h2>
    <p>{{ SvgBoxes.svg_box_descri }}</p>
  </div>
</div>


          <a href='https://calendly.com/dspcrm-info/30min' target='_blank' class="max-w-[185px] text-center transition-all duration-300 ease-in-out hidden md:block text-xl  border-4 m-auto mt-20	rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 mb-4 text-[#00296B] font-poppins font-medium md:px-4 md:py-2 hover:bg-[#00296B] hover:border-1 hover:text-white">
            {{For?.button_text}}</a>
            <p class="text-xl  hidden md:block text-center font-medium">
              Ready? <span class="font-poppins font-bold text-base text-black "><a target='_blank' href="https://calendly.com/dspcrm-info/30min"> Try it Free</a></span>
          </p>
      </div>
    </section>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({ For: Object });
const For_title = computed(() => props.For?.title ?? "");
const For_description = computed(() => props.For?.description ?? "");
const For_Boxes = computed(() => props.For?.for_boxes ?? []);
const Svg_Boxes = computed(() => props.For?.svg_boxes ?? []);


</script>
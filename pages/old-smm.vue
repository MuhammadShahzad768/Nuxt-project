<template>
  <div>
    <Loader v-if="loading" />

    <div v-else id="page-root">
      <template v-for="(section, index) in sections" :key="index">
        <component :is="section.comp" v-bind="section.props" />
        <div
          v-if="html && index === insertAfter - 1"
          v-html="html"></div>
      </template>
      <div v-html="`<style>${custom_css}</style>`"></div>
    </div>

    <BackToTop />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Loader from "@/components/Sections/Loader.vue";
import SmmClientsBanner from "@/components/Sections/C_Banner.vue";
import SmmTestimonial from "@/components/Sections/C_Testimonial.vue";
// import BackToTop from "@/components/Sections/BackToTop.vue";
import Ready from "~/components/Sections/Ready.vue";
import Logos from "~/components/Sections/Logos.vue";
const smmPageDatas = ref({});
// Data
import { smmPageData } from '../smmPageData.js';
import Left_Content_Right_Image from "@/components/Sections/Left_Content_Right_Image.vue";

const loading = ref(true);
const sections = ref([]); 
const custom_css = ref("");
const html = ref(null);
const insertAfter = ref(null);

onMounted(async () => {
  try {
     const res = await fetch("https://admin.dspcrm.com/wp-json/myapi/v1/page-data/644");
    smmPageDatas.value = await res.json();

    // We build the array using keys from smmPageData
    sections.value = [
      { 
       comp: SmmClientsBanner, 
    props: { banner: smmPageDatas.value.banner,
      sectionId: "section-0"
     }
      },
      { 
        comp: SmmClientsBanner, 
        props: { banner: smmPageDatas.value.form,
           sectionId: "section-1"
         } 
      },
      { 
        comp: SmmTestimonial, 
        props: { banner: smmPageDatas.value.team,
           sectionId: "testimonal-0"
         } 
      },
      { 
        comp: Left_Content_Right_Image, 
        props: { banner: smmPageDatas.value.left_without,
          sectionId: "left_1"
         } 
      },
      {
        comp:SmmClientsBanner,
        props: { banner: smmPageDatas.value.Team_member,
           sectionId: "section-3"
         } 
      },
      { 
        comp: SmmClientsBanner, 
        props: { banner: smmPageDatas.value.Client_Portal,
           sectionId: "section-4"
         } 
      },
      { 
        comp: Left_Content_Right_Image, 
        props: { banner: smmPageDatas.value.left_right,
          sectionId: "left_2"
         } 
      },
      { 
        comp: Logos, 
        props: { banner: smmPageDatas.value.logos,
          sectionId: "logos-0"
         } 
      },
      {
        comp: Ready, 
         props: { banner: smmPageDatas.value.Ready } 
      },
    ];

    await nextTick();
    AOS.init({ duration: 1000, once: true });
  } catch (err) {
    console.error("Layout Error:", err);
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped>
#page-root section:first-child{
  padding-top: 190px;
  padding-bottom: 3rem;
}

#page-root section:nth-child(1) > div{
  border: none !important;
}
:deep(.section-1){
  background-color:white;
  padding-top:40px;
}
:deep(.testimonal-0){
   background-color:white;
   padding-top:0;
}
:deep(.left_1){
   background-color:white;
}
:deep(.left_2){
   background-color:white;
}
:deep(.section-3){
  padding-top: 40px;
}
:deep(.section-4){
    padding-top: 40px;
  background-color:white;
}
:deep(.logos-0){
  background-color:white;
 
}
:deep(.inner_logs){
  padding-top:30px;
}
</style>
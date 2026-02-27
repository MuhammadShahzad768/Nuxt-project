<template>
    <div>
        <Loader v-if="loading" />

        <div v-else id="page-root" class="seo-agency-page">
            <template v-for="(section, index) in sections" :key="index">
                <component :is="section.comp" v-bind="section.props" />

                <div v-if="html && index === insertAfter - 1" v-html="html"></div>
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
import Cart_Order_Section from "~/components/Sections/Cart_Order_Section.vue";
import Left_Content_Right_Image from "@/components/Sections/Left_Content_Right_Image.vue";
import SmmTestimonial from "@/components/Sections/C_Testimonial.vue";
import Ready from "~/components/Sections/Ready.vue";
import Logos from "~/components/Sections/Logos.vue";
import CTA from "~/components/Sections/CTA.vue";
const loading = ref(true);
const sections = ref([]);
const custom_css = ref("");
const html = ref(null);
const insertAfter = ref(null);
const smmPageDatas = ref({});
const emit = defineEmits(["page-loaded"]);


onMounted(async () => {
    try {
        const res = await fetch("https://admin.dspcrm.com/wp-json/myapi/v1/page-data/659");
    smmPageDatas.value = await res.json();
    console.log("My Data:", smmPageDatas.value);
        sections.value = [
             {
                comp: SmmClientsBanner,
                props: { banner: smmPageDatas.value.Team_member,
                sectionId: "section-0"
                  }
            },
 
     {
                comp: Cart_Order_Section,
                props: { banner: smmPageDatas.value.advanced_banner,
               
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
          sectionId: "left_4"
         } 
      },
       {
    comp : CTA,

      },
       { 
        comp: Left_Content_Right_Image, 
        props: { banner: smmPageDatas.value.left_right,
          sectionId: "left_4"
         } 
      },
     
      { 
                comp: Ready, 
                 props: { banner: smmPageDatas.value.ready_2,
                     sectionId: "ready-1"
                  } 
            },
             { 
        comp: Left_Content_Right_Image, 
        props: { banner: smmPageDatas.value.left_right_without_3,
          sectionId: "left_4"
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
        loading.value = false;
        emit('page-loaded');

        nextTick(() => {
            setTimeout(() => {
                AOS.init({
                    duration: 1000,
                    once: true,
                    mirror: false,
                    offset: 120,
                    delay: 50,
                });
                AOS.refresh();
            }, 100);
        });
    } catch (err) {
        console.error("Layout Error:", err);
        loading.value = false;
        emit('page-loaded');
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
.left_right{
    padding-top: 0;
}
:deep(.section-1 ) {
    padding: 50px;
}
:deep(.section-1 .inner_banner) {
    border: 1px solid #ACB2BE;
    box-shadow: 0px 4px 9px 4px #00000040;
padding: 30px;
}
:deep(.left_1 *){
    background-color: white;
}
:deep(.left_1){
    background-color: white;
    margin-top: 48px;
    
}
:deep(.left_4){
    background-color: #FAFAFA;
    padding-top: 48px;
    
}
:deep(.left_2){
    background-color: #FAFAFA;
    padding-top: 48px;
    
    
}
:deep(.inner_left ){
     border: 1px solid #ACB2BE;
    box-shadow: 0px 4px 9px 4px #00000040;
}
:deep(.testimonal-0) {
    background-color: white;
}
:deep(.logos-0 .inner_logs){
    padding-top:30px;
}
:deep(.ready-1){
background-color: #E4E2E2;
}
</style>
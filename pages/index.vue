<template>
  <div>
    <transition name="fade-out">
      <div v-if="showLoader" class="loader-container">
        <img 
          src="https://admin.dspcrm.com/wp-content/uploads/2025/09/DSP-final-logo-4-cropped.svg" 
          alt="Logo" 
          class="loader-logo" 
        />
      </div>
    </transition>

    <div v-show="!showLoader" id="page-root">
      <template v-for="(section, index) in organizedSections" :key="index">
        <component :is="section.comp" v-bind="section.props" />

        <div
          v-if="dynamicHtml && index === insertAfterIndex - 1"
          v-html="dynamicHtml"
        ></div>
      </template>

      <div v-if="data?.css_" v-html="`<style>${data.css_}</style>`"></div>
      
      <transition name="fade">
        <button
          v-if="showTopBtn"
          @click="scrollToTop"
          class="back-to-top"
          aria-label="Back to top" >
<i class="fa-solid fa-arrow-up"></i>
        </button>
      </transition>
    </div>

    <div v-if="error" class="error-msg">
      <p>Unable to load content. Please check your connection.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Import All Section Components
import NewBanner from '@/components/Sections/NewBanner.vue'
import ReadyToGive from "@/components/Sections/Ready_to_give.vue";
import CommentSlides from "@/components/Sections/Comment_Slides.vue";
import ClientsBoxes from "@/components/Sections/Clients_boxes.vue";
import Agencies from "@/components/Sections/Agencies.vue";
import PageSection from "@/components/Sections/PageSection.vue";

import Limitlessly from "@/components/Sections/Limitlessly.vue";
import Integration from "@/components/Sections/Integration.vue";

const emit = defineEmits(["page-loaded"]);

// --- DATA FETCHING (SSR) ---
const { data, pending, error } = await useAsyncData('wpPageData', () => 
  $fetch("https://admin.dspcrm.com/wp-json/myapi/v1/page/7", {
    params: { timestamp: Date.now() }
  })
);

// --- LOADER LOGIC ---
const forceTimer = ref(true);
const showLoader = computed(() => pending.value || forceTimer.value);

// --- SECTIONS CONFIGURATION ---
const organizedSections = computed(() => {
  if (!data.value) return [];
  return [
    { comp: NewBanner, props: { banner: data.value.banner } },
    { comp: ClientsBoxes, props: { clients: data.value.clients } },
    { comp: Agencies, props: { Services: data.value.service_agencies } },

    { comp: PageSection, props: { project_management: data.value.project_management } },
    { comp: Limitlessly, props: { Limitless: data.value.limitlessly_flexible } },
    { comp: Integration, props: { Integrate: data.value.integrate } },
    { comp: CommentSlides, props: { slides_show: "1", CommentsData: data.value.comments } },
    { comp: ReadyToGive, props: { Last: data.value.last_section } },
  ];
});

const dynamicHtml = computed(() => data.value?.html_section?.display ? data.value.html_section.section : null);
const insertAfterIndex = computed(() => {
  const pos = data.value?.html_section?.postion;
  if (pos === "last") return organizedSections.value.length;
  return Number(pos) || 1;
});

// --- SCROLL & LIFECYCLE ---
const showTopBtn = ref(false);
const handleScroll = () => { showTopBtn.value = window.scrollY > 300; };
const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // Ensure loader stays for 1.5s so animation is visible
  setTimeout(() => {
    forceTimer.value = false;
    
    // Initialize animations after loader starts fading
    nextTick(() => {
      AOS.init({ duration: 1000, once: true });
      emit("page-loaded");
    });
  }, 1500); 
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* LOADER OVERLAY */
.loader-container {
  position: fixed;
  inset: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999999;
}

.loader-logo {
  width: 300px;
  animation: pulse 2s infinite ease-in-out;
}

/* ANIMATIONS */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}


.error-msg {
  text-align: center;
  padding: 100px;
}
</style>
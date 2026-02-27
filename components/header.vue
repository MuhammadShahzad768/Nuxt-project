<template>
  <header class="w-full py-5 pt-11 absolute top-0 z-50">
    <div class="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-8">
      
      <div class="flex justify-start xl:max-w-[25rem] md:max-w-sm lg:max-w-[20rem] w-full">
        <NuxtLink to="/" class="flex items-center gap-2 logo">
          <img src="http://admin.dspcrm.com/wp-content/uploads/2026/02/DSP-final-logo-4-cropped.svg" alt="DSP Logo" class="w-[75%] md:w-full"/>
        </NuxtLink>
      </div>

      <div 
        :class="[
          'mobile fixed top-0 left-0 w-full h-full bg-[#00296B] text-white z-50 px-8 py-10 transition-all duration-300 ease-in-out transform lg:hidden',
          isMenuOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-full pointer-events-none'
        ]"
      >
        <div class="flex items-start flex-col space-y-8 overflow-auto h-full text-left">
          <button @click="isMenuOpen = false" class="absolute right-[10%] focus:outline-none">
            <svg class="h-8 w-8" fill="white" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav class="flex flex-col space-y-6 w-full mt-10">
            <NuxtLink to="/" @click="isMenuOpen = false" class="text-xl font-semibold">Features</NuxtLink>
            <NuxtLink to="/" @click="isMenuOpen = false" class="text-xl font-semibold">Use Cases</NuxtLink>
            <NuxtLink to="/" @click="isMenuOpen = false" class="text-xl font-semibold">Resources</NuxtLink>
            <NuxtLink to="/" @click="isMenuOpen = false" class="text-xl font-semibold">Pricing</NuxtLink>
            
            <hr class="border-white/20 w-full">

            <a href="#" class="text-lg font-semibold">Free Trial</a>
            <a href="https://calendly.com/dspcrm-info/30min" target="_blank" class="border-2 border-white rounded-full px-5 py-3 text-lg font-semibold text-center hover:bg-white hover:text-[#00296B] transition-all">
              Sign up
            </a>
          </nav>
        </div>
      </div>

      <nav class="hidden lg:block text-white rounded-full px-6 py-4 ml-3">
        <div class="flex items-center space-x-1 text-[#00296B]">
          <NuxtLink to="/" class="xl:px-4 px-2 xl:text-lg text-[14px] font-semibold rounded-full hover:bg-[#00296B]/10 py-2">Features</NuxtLink>
          <NuxtLink to="/" class="xl:px-4 px-2 xl:text-lg text-[14px] font-semibold rounded-full hover:bg-[#00296B]/10 py-2">Use Cases</NuxtLink>
          <NuxtLink to="/" class="xl:px-4 px-2 xl:text-lg text-[14px] font-semibold rounded-full hover:bg-[#00296B]/10 py-2">Resources</NuxtLink>
          <NuxtLink to="/pricing" class="xl:px-4 px-2 xl:text-lg text-[14px] font-semibold rounded-full hover:bg-[#00296B]/10 py-2">Pricing</NuxtLink>
        </div>
      </nav>

      <div class="lg:hidden flex items-center">
        <button @click="isMenuOpen = true" class="focus:outline-none">
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      <div class="hidden lg:flex flex-1 justify-end items-center">
        <div class="flex items-center space-x-8">
          <a href="#" class="text-[#00296B] font-semibold text-lg">Free Trial</a>
          <a href="https://calendly.com/dspcrm-info/30min" target="_blank" class="text-[#00296B] border-2 border-[#00296B] rounded-full px-6 py-2 text-lg font-semibold hover:bg-[#00296B] hover:text-white transition-all">
            Sign up
          </a>
        </div>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)

/* 1. Fetch SEO Data (SSR Friendly) */

  

/* 3. Handle Dynamic Assets (Styles/Links from API) */
onMounted(async () => {
  try {
    const res = await fetch(`https://admin.dspcrm.com/wp-json/myapi/v1/page/491?timestamp=${Date.now()}`);
    const data = await res.json();

    const htmlContent = data?.html_section?.section || "";
    if (!htmlContent) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const head = document.head;

    tempDiv.querySelectorAll("link, style").forEach((el) => {
      // Avoid duplicating tags
      const identifier = el.tagName === 'LINK' ? `[href="${el.href}"]` : '';
      if (!identifier || !head.querySelector(identifier)) {
        head.appendChild(el);
      }
    });
  } catch (err) {
    console.error("Asset Injection Error:", err);
  }
})
</script>

<style scoped>
.mobile {
  will-change: transform, opacity;
}
</style>
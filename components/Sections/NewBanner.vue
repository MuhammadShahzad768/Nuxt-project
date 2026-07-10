<template>
  <div>
    <section
      v-if="hero && hero[0]"
      class="hero xl:pb-[300px] pt-[190px] pb-[50px] relative custom_family bg-[#DFDFDF] bg-bottom bg-cover"
    >
      <h2 class="text-[#999999] font-bold xl:text-[20px] text-[15px] text-center uppercase">
        {{ hero[0].subheadline }}
      </h2>
      <h1 class="mt-7 text-[var(--bg-custom-color)] font-medium text-center m-auto xl:text-[50px] text-[30px] xl:leading-[55px] leading-[30px]" v-html="hero[0].headline"></h1>

      <p class="text-center mt-7 text-[#999999] text-[15px]">{{ hero[0].tagline }}</p>
      <div class="m-auto max-w-[500px] mt-7 flex items-center gap-5 justify-center">
        <router-link to="/book-a-demo" class="max-w-[170px] transition-all duration-300 ease-in-out hidden md:block border-4 hover:bg-[#00296B] hover:border-1 hover:text-white rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 text-[#00296B] font-medium md:px-4 md:py-2">
          {{ hero[0].button_text }}
        </router-link>
        <p class="text-xl hidden md:block text-[var(--text-custom)]">
          Ready? <span class="font-bold"><router-link to="/book-a-demo">Try It Free</router-link></span>
        </p>
      </div>

      <!-- Floating Images -->
      <img src="https://admin.dspcrm.com/wp-content/uploads/2026/02/Group-143-Cf659UdD.svg" width="100" height="100" class="xl:w-[100px] w-[80px] absolute xl:top-[26%] top-[17%] left-[5%] xl:left-[17%]">
      <img src="https://admin.dspcrm.com/wp-content/uploads/2026/02/Group-144-CbSq2YSC.svg" width="100" height="100" class="xl:w-[100px] w-[80px] absolute xl:top-[26%] xl:right-[24%] top-[14%] right-[0%]">
      <img src="https://admin.dspcrm.com/wp-content/uploads/2026/02/Group-145-DgSMHD_y.svg" width="100" height="100" class="xl:w-[100px] w-[80px] absolute xl:bottom-[38%] xl:left-[26%] bottom-[30%] left-[10%] md:hidden xl:block">
      <img src="https://admin.dspcrm.com/wp-content/uploads/2026/02/Group-142-BLUaaRaE.svg" width="100" height="100" class="xl:w-[100px] w-[80px] absolute xl:bottom-[38%] bottom-[28%] right-[10%] xl:right-[17%] md:hidden xl:block">
      
      <!-- CASE 1: Agar link MP4 ya direct video file hai -->
      <video 
        v-if="hero[0].banner_image && isDirectVideo"
        autoplay
        muted
        loop
        playsinline
        style="max-width: 1050px; height: 600px; width: 1200px;"
        
        class="video-element xl:absolute xl:mt-0 xl:max-w-[100%] max-w-[800px] mt-20 relative xl:bottom-[-37%] left-0 right-0 m-auto  w-full  shadow-[10px_35px_35px_20px_rgba(0,0,0,0.25)] object-contain"
      >
        <source :src="hero[0].banner_image" type="video/mp4">
      </video>

      <!-- CASE 2: Agar link YouTube/Vimeo ya koi Iframe Embed hai -->
      <iframe 
        v-else-if="videoSrc && !isDirectVideo"
        style="max-width: 900px;"
        :style="{ transform: imageTransform }"
        class="video-element xl:absolute xl:mt-0 xl:max-w-[100%]  mt-20 relative xl:bottom-[-25%] left-0 right-0 m-auto "
        width="100%"
        height="460"
        :src="videoSrc"
        title="Banner video"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      ></iframe>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const imageTransform = ref('translate3d(0, 0, 0) rotateX(40deg)')
const isMobile = ref(false)

// Server-side data fetch
const { data: hero } = await useFetch('https://admin.dspcrm.com/wp-json/dsp/v1/hero/7', {
  key: 'hero-data-7'
})

// 1. Check karein ke link direct video file (.mp4, .webm, vagaira) hai ya nahi
const isDirectVideo = computed(() => {
  const url = hero.value?.[0]?.banner_image || ''
  return /\.(mp4|webm|ogg|mov)$/i.test(url)
})

// 2. Video URL process karne ka tarika (YouTube link auto convert karega)
const videoSrc = computed(() => {
  let url = hero.value?.[0]?.banner_image || ''
  if (!url) return ''

  // Agar YouTube ka normal watch link hai, toh use embed format mein badlein
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1])
    const videoId = urlParams.get('v')
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`
    }
  }
  
  // Agar short YouTube link hai (youtu.be)
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`
    }
  }

  // Baki links ke liye normal parameters append karein
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}autoplay=1&mute=1&loop=1`
})

const handleScroll = () => {
  if (isMobile.value) return 

  const scrollY = window.scrollY

  if (scrollY <= 150) {
    imageTransform.value = 'translate3d(0, 0, 0) rotateX(40deg)'
  } else {
    const adjustedScroll = scrollY - 150
    const rotateX = Math.max(40 - adjustedScroll / 8, 0)
    imageTransform.value = `translate3d(0, 0, 0) rotateX(${rotateX}deg)`
  }
}

onMounted(() => {
  isMobile.value = window.innerWidth < 768

  if (!isMobile.value) {
    window.addEventListener('scroll', handleScroll)
  } else {
    imageTransform.value = 'translate3d(0, 0, 0) rotateX(0deg)'
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* img, .video-element {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  transform-origin: center bottom;
} */
</style>
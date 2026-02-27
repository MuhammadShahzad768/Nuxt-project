<template>
<div class=''>
 <section
 v-if="hero"
      
    class="hero  xl:pb-[300px] pt-[190px] pb-[50px] relative custom_family bg-[#DFDFDF] bg-bottom bg-cover"
  >
  <h2 class='text-[#999999] font-bold xl:text-[20px] text-[15px] text-center uppercase '>  {{ hero
  [0].subheadline }}</h2>
  <h1 class='mt-7  text-[var(--bg-custom-color)] font-medium  text-center m-auto xl:text-[50px] text-[30px] xl:leading-[55px] leading-[30px]'  v-html="hero[0].headline"></h1>

<p class='text-center mt-7 text-[#999999] text-[15px] '> {{ hero[0].tagline }}</p>
<div class='m-auto max-w-[500px] mt-7 flex items-center gap-5 justify-center'>
 <a href='https://calendly.com/dspcrm-info/30min' target='_blank' class="max-w-[170px] transition-all duration-300 ease-in-out hidden md:block border-4 hover:bg-[#00296B] hover:border-1 hover:text-white rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 text-[#00296B] font-medium md:px-4 md:py-2"
            >
              {{ hero[0].button_text }}
            </a>
                        <p class="text-xl  hidden md:block text-[var(--text-custom)]" >Ready? <span class='font-bold'><a target='_blank' href="https://calendly.com/dspcrm-info/30min">Try it Free</a></span></p>
            </div>
            <img src='http://admin.dspcrm.com/wp-content/uploads/2026/02/Group-143-Cf659UdD.svg' class='xl:w-[100px] w-[80px] absolute xl:top-[26%] top-[17%] left-[5%] xl:left-[17%]'>
            <img src='http://admin.dspcrm.com/wp-content/uploads/2026/02/Group-144-CbSq2YSC.svg' class='xl:w-[100px] w-[80px] absolute xl:top-[26%]  xl:right-[24%] top-[14%] right-[0%]'>
            <img src='http://admin.dspcrm.com/wp-content/uploads/2026/02/Group-145-DgSMHD_y.svg' class='xl:w-[100px] w-[80px] absolute  xl:bottom-[38%] xl:left-[26%] bottom-[30%] left-[10%]'>
            <img src='http://admin.dspcrm.com/wp-content/uploads/2026/02/Group-142-BLUaaRaE.svg' class='xl:w-[100px] w-[80px] absolute xl:bottom-[38%] bottom-[28%] right-[10%] xl:right-[17%]'>
           <img
        ref="bannerImage"
        :src="hero[0].banner_image"
        alt="Animated Banner"
        class="xl:absolute xl:mt-0 xl:max-w-[100%] max-w-[90%] mt-20 relative xl:bottom-[-25%] left-0 right-0 m-auto max-h-[460px] shadow-[10px_35px_35px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out"
        :style="{ transform: imageTransform }"
      />
  </section>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const imageTransform = ref('translate3d(0, 0, 0) rotateX(40deg)')
const isMobile = ref(false)
const hero = ref(null)

const fetchHero = async () => {
  try {
    const res = await fetch('https://admin.dspcrm.com/wp-json/dsp/v1/hero/7')
    console.log('Response status:', res.status)
    console.log('Response ok:', res.ok)
    const data = await res.json()
    console.log('Fetched data:', data)
    hero.value = data
  } catch (err) {
    console.error('Hero API Error:', err)
  }
}


const handleScroll = () => {
  if (isMobile.value) return // ❌ Skip animation on mobile

  const scrollY = window.scrollY

  if (scrollY <= 150) {
    // Before 150px scroll → stay fixed at 40deg
    imageTransform.value = 'translate3d(0, 0, 0) rotateX(40deg)'
  } else {
    // After 150px → reduce gradually toward 0deg
    const adjustedScroll = scrollY - 150
    const rotateX = Math.max(40 - adjustedScroll / 8, 0)
    imageTransform.value = `translate3d(0, 0, 0) rotateX(${rotateX}deg)`
  }
}

onMounted(async () => {
   await fetchHero()
  // ✅ Detect mobile screen size
  isMobile.value = window.innerWidth < 768

  if (!isMobile.value) {
    window.addEventListener('scroll', handleScroll)
  } else {
    // Keep static transform for mobile
    imageTransform.value = 'translate3d(0, 0, 0) rotateX(0deg)'
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<style scoped>
img {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); /* 👈 slower + smoother */
  will-change: transform;
  transform-origin: center bottom; /* 👈 makes rotation more visible */
}
</style>






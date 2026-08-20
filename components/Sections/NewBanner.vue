<template>
  <div>
    <section
      v-if="hero && hero[0]"
      class="hero xl:pb-[50px] pt-[190px] pb-[50px] relative custom_family bg-[#DFDFDF] bg-bottom bg-cover"
    >
      <h2 class="text-[#999999] font-bold xl:text-[20px] text-[15px] text-center uppercase">
        {{ hero[0].subheadline }}
      </h2>
      <h1 class="mt-7 text-[var(--bg-custom-color)] font-medium text-center m-auto xl:text-[50px] text-[30px] xl:leading-[55px] leading-[30px]" v-html="hero[0].headline"></h1>

      <p class="text-center mt-7 text-[#999999] text-[15px]">{{ hero[0].tagline }}</p>
      <div class="m-auto max-w-[600px] mt-7 flex items-center gap-5 justify-center">
        <!-- Ab yeh button route nahi karega, video popup kholega -->
        <button
          type="button"
          @click="openVideoModal"
          class="max-w-[270px] transition-all duration-300 ease-in-out hidden md:block border-4 hover:bg-[#00296B] hover:border-1 hover:text-white rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-4 text-[#00296B] font-medium md:px-4 md:py-2"
        >
          Watch the 2-Minute Demo
        </button>
        <p class="text-xl hidden md:block text-[var(--text-custom)]">
          Ready? <span class="font-bold"><router-link to="/book-a-demo">Try It Free</router-link></span>
        </p>
      </div>

      <!-- Floating Images -->
      <img src="https://admin.dspcrm.com/wp-content/uploads/2026/02/Group-143-Cf659UdD.svg" width="100" height="100" class="xl:w-[100px] w-[80px] absolute xl:top-[26%] top-[17%] left-[5%] xl:left-[17%]">
      <img src="https://admin.dspcrm.com/wp-content/uploads/2026/02/Group-144-CbSq2YSC.svg" width="100" height="100" class="xl:w-[100px] w-[80px] absolute xl:top-[26%] xl:right-[24%] top-[14%] right-[0%]">
      <img src="https://admin.dspcrm.com/wp-content/uploads/2026/02/Group-145-DgSMHD_y.svg" width="100" height="100" class="xl:w-[100px] w-[80px] absolute xl:bottom-[20%] xl:left-[22%] bottom-[30%] left-[10%] md:hidden xl:block">
      <img src="https://admin.dspcrm.com/wp-content/uploads/2026/02/Group-142-BLUaaRaE.svg" width="100" height="100" class="xl:w-[100px] w-[80px] absolute xl:bottom-[20%] bottom-[28%] right-[10%] xl:right-[17%] md:hidden xl:block">

      <!-- Banner ki jagah click-to-play thumbnail (video ab neeche modal me khulega) -->
      <div
        v-if="hero[0].banner_image"
        class="banner_video video-element xl:absolute xl:mt-0 xl:max-w-[100%] max-w-[800px] mt-20 relative xl:bottom-[-37%] left-0 right-0 m-auto w-full cursor-pointer group"
        @click="openVideoModal"
      >
        <img
          v-if="hero[0].banner_thumbnail"
          :src="hero[0].banner_thumbnail"
          alt="Watch demo video"
          class="w-full shadow-[10px_35px_35px_20px_rgba(0,0,0,0.25)] object-contain rounded-lg"
        />
        <div v-else class="w-full h-[400px] bg-[#00296B]/10 rounded-lg shadow-[10px_35px_35px_20px_rgba(0,0,0,0.25)] hidden"></div>

        <!-- Play button overlay -->
        <div class="absolute inset-0 flex items-center justify-center hidden">
          <div class="flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" class="text-[#00296B] ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <ul class="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2" style="animation-delay: 320ms;">
        <li class="pl-0 flex items-center gap-2 text-[15px] text-[#999999]">
          <svg aria-hidden="true" class="h-4 w-4 text-[#00296B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
          No credit card required
        </li>
        <li class="pl-0 flex items-center gap-2 text-[15px] text-[#999999]">
          <svg aria-hidden="true" class="h-4 w-4 text-[#00296B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
          14-day free trial
        </li>
        <li class="pl-0 flex items-center gap-2 text-[15px] text-[#999999]">
          <svg aria-hidden="true" class="h-4 w-4 text-[#00296B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
          White-label ready
        </li>
      </ul>
    </section>

    <!-- Video Popup Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isVideoModalOpen"
          class="video-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          @click.self="closeVideoModal"
        >
          <div class="video-modal-content relative w-full max-w-4xl">
            <button
              class="absolute -top-10 right-0 md:-top-12 md:right-0 text-white text-3xl leading-none hover:opacity-70 transition-opacity"
              @click="closeVideoModal"
              aria-label="Close video"
            >
              &times;
            </button>

            <!-- Direct mp4/webm/mov video -->
            <video
              v-if="isDirectVideo"
              ref="videoRef"
              controls
              autoplay
              preload="metadata"
              class="w-full max-h-[80vh] rounded-lg shadow-2xl bg-black"
            >
              <source :src="hero[0].banner_image" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <!-- YouTube / Vimeo / other iframe embed -->
            <div v-else-if="videoSrc" class="relative w-full rounded-lg overflow-hidden shadow-2xl" style="padding-top: 56.25%;">
              <iframe
                :src="videoSrc"
                class="absolute top-0 left-0 w-full h-full"
                title="Banner video"
                frameborder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

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

  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1])
    const videoId = urlParams.get('v')
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    }
  }

  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    }
  }

  if (url.includes('vimeo.com')) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}autoplay=1`
  }

  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}autoplay=1`
})

// ---- Video Modal Logic ----
const isVideoModalOpen = ref(false)
const videoRef = ref(null)

function openVideoModal() {
  isVideoModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeVideoModal() {
  isVideoModalOpen.value = false
  document.body.style.overflow = ''
  if (videoRef.value) {
    videoRef.value.pause()
  }
}

function handleEsc(e) {
  if (e.key === 'Escape' && isVideoModalOpen.value) closeVideoModal()
}

watch(isVideoModalOpen, (val) => {
  if (val) {
    window.addEventListener('keydown', handleEsc)
  } else {
    window.removeEventListener('keydown', handleEsc)
  }
})

// ---- Scroll parallax logic (unchanged) ----
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
  window.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = ''
})
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 768px) {
  .banner_video {
    max-width: 1050px;
    height: 100% !important;
    max-width: 768px !important;
    width: 90% !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
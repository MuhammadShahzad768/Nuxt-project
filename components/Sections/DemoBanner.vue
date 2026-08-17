<template>
  <transition name="fade">
    <div v-if="visible" class="demo-banner custom_family">
      <div class="demo-banner__text">
        <p class="demo-banner__title">Curious how it all works?</p>
        <p class="demo-banner__subtitle">Free 20-min demo · see the platform &amp; get your questions answered</p>
      </div>

      <div class="demo-banner__actions">
        <NuxtLink to="/book-a-demo" class="demo-banner__cta">
          Book a demo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </NuxtLink>

        <button class="demo-banner__close" @click="close" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  demoLink: {
    type: String,
    default: '#'
  },
  scrollThreshold: {
    type: Number,
    default: 200
  }
})

const visible = ref(false)
const dismissed = ref(false)

function handleScroll() {
  if (dismissed.value) return
  visible.value = window.scrollY > props.scrollThreshold
}

function close() {
  visible.value = false
  dismissed.value = true
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.demo-banner {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background: #00296b;
    border-radius: 16px;
    padding: 14px 20px;
    color: #fff;
    max-width: 900px;
    width: calc(100% - 40px);
}

.demo-banner__title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}

.demo-banner__subtitle {
  margin: 4px 0 0;
  font-size: 13px;
  color: #a3a3a8;
}

.demo-banner__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.demo-banner__cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    color: #00296b;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 18px;
    border-radius: 999px;
    text-decoration: none;
    white-space: nowrap;
    transition: opacity 0.15s ease;
}

.demo-banner__cta:hover {
  opacity: 0.85;
}

.demo-banner__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s ease;
}
.demo-banner__close svg{
    color:#00296b;
    fill:#00296b;
}
.demo-banner__close:hover {
  background: #fff;
}
.demo-banner__close:hover svg{
    color:#00296b;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}

@media (max-width: 640px) {
  .demo-banner {
    flex-wrap: wrap;
    bottom: 12px;
  }
}
.fade-enter-active {
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 30px);
}
</style>
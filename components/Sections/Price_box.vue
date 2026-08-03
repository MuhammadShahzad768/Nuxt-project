<template>
  
    <div 
      v-for="(box, index) in props.Price_box" 
      :key="index"
      class="price border-black border-2 xl:py-16 py-10 px-4 xl:px-12 rounded-xl xl:max-w-[32.6%] xl:max-w-[100%] w-full lg:max-w-[45%]"
    >
      <div class="head text-center flex flex-col space-y-2">
        <h3 class="text-4xl text-[var(--text-color)] font-bold tracking-tighter">
          {{ box.box_title }}
        </h3>
        <p class="text-[var(--text-color)] text-lg">
          {{ box.box_descri }}
        </p>
      </div>

      <div class="middle text-center mt-5 flex flex-col space-y-2">
        <h3 class="text-5xl text-[var(--text-color)] font-bold tracking-tighter">
          {{ box.box_price }}
        </h3>
        <p class="text-[var(--text-color)] text-xl">
          {{ box.montly }}
        </p>
      </div>
<NuxtLink 
  :to="`/trial?plan=${box.slug}`"
  @click="handlePlanClick(box)"
  target="_blank"
  rel="noopener noreferrer"
  class="hover:bg-[#00296B] hover:text-white transition-colors duration-200 my-4 border-[var(--border-custom-color)] px-3 py-3 w-full rounded-lg border-2 text-center text-lg text-[var(--text-color)] tracking-tighter block"
 
>
  {{ box.box_button_text }}
</NuxtLink>
      <!-- <a 
        href="#"
        class="hover:bg-[#00296B] fill-white hover:text-white transition-colors duration-200 my-4 border-[var(--border-custom-color)] px-3 py-3 w-full rounded-lg border-2 text-left text-lg text-[var(--text-color)] tracking-tighter block"
      >
        {{ box.box_button_text }}
      </a> -->

      <p class="text-xl mt-7">{{ box.text_include }}</p>
      <ul class="mt-7 text-lg space-y-2">
        <li v-for="(feature, fIndex) in box.include_points" :key="fIndex">
          <span class="text-green-500 flex-shrink-0 pr-1">✅</span>
          {{ feature.points }}
        </li>
      </ul>
    </div>

</template>

<script setup>
const props = defineProps({
  Price_box: {
    type: Array,
    default: () => [],
  },
  activeTab: {
    type: String,
    default: 'monthly',
  },
});
function saveTab() {
  localStorage.setItem('cycle', props.activeTab)
}
function handlePlanClick(box) {
  saveTab()
  
  const cycle = props.activeTab // e.g. 'monthly' ya 'yearly'
  const eventName = `click_${box.slug.replace(/-/g, '_')}_${cycle}`
  
  console.log('gtag event:', eventName)
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName)
  } else {
    console.log('gtag not available')
  }
}
</script>

<template>
  <section :class="sectionId" class="bg-[#FAFAFA]">
  <div class="xl:pt-16 xl:pb-16 md:pt-24 mt-0 m-auto inner_logs">
    <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-16">
      <img 
        v-for="(l, i) in banner" 
        :key="i" 
        class="h-10 xl:max-w-[260px] max-w-[40%] w-full" 
        :src="l" 
        alt="Logo"
      />
    </div>
  </div>
  </section>
</template>

<script setup>
defineProps({
  banner: {
    type: Object,
    required: true
  },
  sectionId: {
    type: String,
    required: false,
    default: ''
  }
});
</script>

<template>
  <section class="hero py-12 relative custom_family bg-[#DFDFDF] bg-bottom bg-cover">
    <h1 class="text-[var(--bg-custom-color)] font-bold text-center m-auto xl:text-[42px] text-[28px] xl:leading-[55px] leading-[35px] max-w-4xl px-4">
      <span class="font-medium">{{ banner.name }}</span><br> 
      {{ banner.email }} 
    </h1>
    <p class="text-center mt-6 text-[#494949] text-[16px] max-w-lg mx-auto px-4">
      {{ banner.message }}
    </p>

    <img
      :src="banner.image"
      :alt="banner.title_main"
      class="xl:mt-6 xl:max-w-[68%] max-w-[90%] mt-12 relative m-auto rounded-2xl"
    />
  </section>
</template>

<script setup>
defineProps({
  banner: {
    type: Object,
    required: true
  }
});
</script>
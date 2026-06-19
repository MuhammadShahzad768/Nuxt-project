<template>
  <section class="content-img-section py-12 px-4 custom_family bg-[#DFDFDF]">
    <div class="max-w-7xl mx-auto border border-[#ACB2BE] rounded-3xl p-6 md:p-10" data-aos="fade-up">
      <div class="text-center mb-10">
        <!-- Heading -->
        <h2
          class="text-[var(--bg-custom-color)] font-bold m-auto xl:text-[42px] text-[28px] xl:leading-[55px] leading-[35px] max-w-4xl px-4"
          data-aos="fade-up">
          <span class="font-medium">{{ banner.title_span }}</span>
          {{ banner.title_main }}
        </h2>
        <!-- Text -->

        <p v-if="banner.description" class="mt-6 text-[#494949] text-[16px] max-w-lg mx-auto px-4" data-aos="fade-up">
          {{ banner.description }}
        </p>

        <!-- Image -->
        <img v-if="banner.main_image" :src="banner.main_image" :alt="banner.title_main"
          class="xl:mt-12 xl:max-w-[85%] max-w-[95%] mt-12 relative m-auto rounded-2xl drop-shadow-2xl"
          data-aos="zoom-in" />
      </div>

      <!-- Demo Button Section -->
      <div v-if="banner.show_demo" class="m-auto max-w-[500px] flex items-center gap-5 justify-center mb-16"
        data-aos="fade-up">
        <a :href="banner.demo_link" target="_blank"
          class="max-w-[170px] transition-all duration-300 ease-in-out hidden md:block border-4 hover:bg-[#00296B] hover:border-1 hover:text-white rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 text-[#00296B] font-medium md:px-4 md:py-2 text-center">
          {{ banner.demo_text }}
        </a>

        <p class="text-xl hidden md:block text-[var(--text-custom)] leading-tight">
          {{ banner.ready_text }} <br>
          <span class="font-bold">
            <a target="_blank" :href="banner.free_trial_link" class="hover:underline">
              {{ banner.free_trial_text }}
            </a>
          </span>
        </p>
      </div>

      <!-- 3d Layout -->
      <div v-for="(row, rowIndex) in banner.columns" :key="rowIndex" :class="[
        'grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-12',
        rowIndex > 0 ? 'mt-8' : ''
      ]">
        <div v-for="(col, colIndex) in row" :key="colIndex" class="flex items-start gap-4" data-aos="fade-up"
          :data-aos-delay="colIndex * 150">
          <div class="flex-shrink-0 mt-1">
            <img v-if="col.icon" :src="col.icon" :alt="col.title" class="w-5 h-5 object-contain" />
          </div>

          <div>
            <h3 class="text-lg md:text-[20px] font-bold text-black mb-2 leading-tight">
              {{ col.title }}
            </h3>
            <p class="text-[#494949] text-base leading-relaxed italic">
              {{ col.description }}
            </p>
          </div>
        </div>
      </div>

    </div>
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
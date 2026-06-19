<template>
  <section class="py-12 px-4  custom_family">
    <div 
      class="max-w-7xl mx-auto bg-[#E4E2E2] rounded-2xl p-8 md:p-12 shadow-[35px_35px_47.5px_22px_#00000040]"
      data-aos="fade-up"
    >
      <div class="text-center mb-12">
        <h2 class="text-[32px] md:text-[48px] font-bold text-[var(--bg-custom-color)] mb-4">
          <span class="font-light">{{ banner.title_light }}</span> {{ banner.title_bold }}
        </h2>
        <p class="text-[#4B5563] text-lg max-w-2xl mx-auto italic">
          {{ banner.description }}
        </p>
      </div>

      <div class="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 mb-16 justify-center ">
        <div 
          v-for="(card, index) in banner.cards" 
          :key="index"
          class="w-full md:w-1/2 bg-[#233267] rounded-3xl overflow-hidden flex flex-col"
          data-aos="zoom-in"
          :data-aos-delay="index * 200"
        >
          <div class="p-6 flex flex-col gap-4">
            <h3 class="text-2xl font-bold text-white mb2">{{ card.title }}</h3>
            <p class="text-white text-sm italic">{{ card.subtext }}</p>
          </div>
          <div class="">
            <img 
              :src="card.image" 
              :alt="card.title" 
              class="w-full h-auto rounded-xl shadow-2xl transform translate-y-4"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
        <div 
          v-for="(col, index) in banner.columns" 
          :key="index"
          class="flex items-start gap-4" 
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <div class="flex-shrink-0 mt-1">
            <img 
              v-if="col.icon" 
              :src="col.icon" 
              :alt="col.title" 
              class="w-5 h-5 object-contain"
            />
          </div>
          <div>
            <h4 class="text-lg md:text-[20px] font-bold text-black mb-2 leading-tight">
              {{ col.title }}
            </h4>
            <p class="text-[#494949] text-base leading-relaxed italic">
              {{ col.description }}
            </p>
          </div>
        </div>
      </div>

      <div 
        class="flex items-center gap-5 justify-center"
        data-aos="fade-up"
      >
        <a 
          :href="banner.demo_link" 
          target="_blank" 
          class="max-w-[170px] transition-all duration-300 ease-in-out hidden md:block border-4 hover:bg-[#00296B] hover:border-1 hover:text-white rounded-xl border-[#00296B] lg:py-4 lg:px-7 text-[#00296B] font-medium md:px-4 md:py-2 text-center"
        >
          {{ banner.demo_text }}
        </a>

        <p class="text-xl hidden md:block text-[#1E293B]">
          {{ banner.ready_text }} <br>
          <span class="font-bold">
            <a target="_blank" :href="banner.free_trial_link" class="hover:underline">
              {{ banner.free_trial_text }}
            </a>
          </span>
        </p>
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
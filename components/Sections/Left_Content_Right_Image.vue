<template>
  <section class="py-12 px-4 custom_family bg-[#DFDFDF] left_right" :class="sectionId" >
    <div class="max-w-7xl mx-auto  border border-[#ACB2BE] rounded-3xl p-6 md:p-10  flex flex-col lg:flex-row items-center gap-0 inner_left" data-aos="fade-up" data-aos-duration="800">
      
      <div class="w-full lg:w-2/5 order-2 lg:order-1">
        <h2 class="text-[32px] md:text-[40px] leading-tight text-[var(--bg-custom-color)] mb-4">
          <span class="font-nomral block">{{ banner.title_1 }}</span>
          <span class="font-bold block">{{ banner.title_2 }}</span>
        </h2>

        <p class="text-[#666666] text-lg mb-10 max-w-md">
          {{ banner.quote }}
        </p>

        <div v-if="banner.repeater && banner.repeater.length" class="space-y-8">
          <div v-for="(item, index) in banner.repeater" :key="index" class="flex gap-4" data-aos="fade-up"
            :data-aos-delay="300 + (index * 100)">
            <div class="flex-shrink-0 mt-1">
              <img :src="item.sub_image" :alt="item.title" class="w-6 h-6 object-contain" />
            </div>
            <div>
              <h4 class="text-[var(--bg-custom-color)] font-bold text-2xl mb-1">{{ item.sub_title }}</h4>
              <p class="text-[#494949] text-base leading-relaxed">
                {{ item.sub_quote }}
              </p>
            </div>
          </div>
        </div>
          <!-- Banner Icons  -->
    
        <div v-if="banner?.images_repeater?.length" class="flex flex-wrap gap-4 mt-8">
          <div  v-for="(iconPath, i) in banner.images_repeater"
    :key="i"
            class="bg-white p-2 rounded-xl border border-[#ACB2BE]/30 shadow-sm flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
            data-aos="zoom-in" :data-aos-delay="600 + (i * 100)">
            <img :src="iconPath" alt="Integration Icon" class="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <div class="w-full lg:w-3/5 order-1 lg:order-2" data-aos="fade-left" data-aos-delay="200">
        <img 
          :src="banner.image" 
          :alt="banner.title_bold" 
          class="w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  banner: {
    type: Object,
    required: true,
    default: () => ({})
  },
  sectionId: {
    type: String,
    required: false,
    default: ''
  }
});
</script>
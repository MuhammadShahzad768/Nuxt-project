<template>
  
    <div 
      v-for="(box, index) in props.Price_box" 
      :key="index"
      class="price border-black border-2 py-16 px-12 rounded-xl max-w-[32.6%] w-full"
    >
      <div class="head text-center flex flex-col space-y-2">
        <h3 class="text-4xl text-[var(--text-color)] font-bold tracking-tighter">
          {{ box.box_title }}
        </h3>
        <p class="text-[var(--text-color)] text-xl">
          {{ box.box_descri }}
        </p>
      </div>

      <div class="middle text-center mt-9 flex flex-col space-y-2">
        <h3 class="text-5xl text-[var(--text-color)] font-bold tracking-tighter">
          {{ box.box_price }}
        </h3>
        <p class="text-[var(--text-color)] text-xl">
          {{ box.montly }}
        </p>
      </div>

      <a 
        href="#"
        class="hover:bg-[#00296B] fill-white hover:text-white transition-colors duration-200 my-4 border-[var(--border-custom-color)] px-3 py-3 w-full rounded-lg border-2 text-left text-lg text-[var(--text-color)] tracking-tighter block"
      >
        {{ box.box_button_text }}
      </a>

      <p class="text-xl mt-7">{{ box.text_include }}</p>
      <ul class="mt-7 text-lg space-y-2">
        <li v-for="(feature, fIndex) in box.include_points" :key="fIndex">
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
});

console.log("🔄 Price_box (array):", props.Price_box);
</script>

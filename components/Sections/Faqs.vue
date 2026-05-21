<template>
  <section class="py-16 xl:pb-[92px] pb-[42px] bg-[#F4F4F4] custom_family">

    <div class="faqs container m-auto">

      <!-- TITLE -->
      <div class="head text-center">
        <h2
          class="xl:text-5xl lg:text-4xl md:text-2xl text-2xl text-[#00296B] font-poppins font-bold leading-tight mb-4 tracking-tight"
        >
          Frequently asked questions
        </h2>
      </div>

      <!-- FAQ WRAPPER -->
      <div
        class="flex mt-20 max-w-[1210px] m-auto px-3 flex-wrap lg:flex-nowrap"
        id="Faqs"
      >

        <!-- LEFT SIDE -->
        <div class="left_faqs w-full mt-7">

          <div
            v-for="(faq, index) in faqs"
            :key="index"
          >

            <button
              @click="activeFaq = index"
              class="faq-btn w-full text-left pl-5 py-4 text-lg xl:text-2xl transition-all"
              :class="activeFaq === index
                ? 'bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-l-lg font-bold text-[#00296B]'
                : ''"
            >
              {{ faq.question }}
            </button>

            <div class="divider bg-[#DCDCDC] w-[92%] h-[1px]"></div>

          </div>

        </div>

        <!-- RIGHT SIDE -->
        <div class="right_faqs max-w-[567px] w-full relative h-[300px]">

          <div class="h-full absolute w-full">

            <div
              class="faq-answer bg-white h-full py-12 px-14 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-lg"
            >

              <h3 class="text-2xl font-bold text-[#00296B]">
                {{ faqs[activeFaq]?.question }}
              </h3>

              <p class="text-base mt-3 text-gray-600 leading-7">
                {{ faqs[activeFaq]?.answer }}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref } from "vue";

const activeFaq = ref(0);

const faqs = ref([
  {
    question: "Who is DSP for?",
    answer:
      "We created DSP for digital marketing agencies that need a better way to sell and deliver their services at scale.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes! You can connect your own custom domain to your DSP workspace easily.",
  },
  {
    question: "Is support available?",
    answer:
      "Yes, our support team is available 24/7 to help you with any issues.",
  },
]);
</script>
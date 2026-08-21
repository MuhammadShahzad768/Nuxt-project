<template>
  <section
    id="checkout-to-delivery"
    aria-labelledby="how-heading"
    class="relative  bg-[#DFDFDF]/40 xl:py-20 sm:py-28 custom_family"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#00296B]">
          How It Works
        </p>
        <h2
          id="how-heading"
          class="mt-3 text-balance text-3xl font-bold tracking-tight text-[var(--bg-custom-color)] sm:text-4xl"
        >
          Checkout to Delivery, Without a Single Spreadsheet
        </h2>
      </div>

      <ol class="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
        <li
          v-for="(step, index) in steps"
          :key="step.number"
          class="relative "
        >
          <div
            v-if="index !== steps.length - 1"
            aria-hidden="true"
            class="  absolute left-full top-8 hidden h-px w-8 -translate-x-4 bg-gradient-to-r from-[#00296B]/40 to-transparent md:block"
          ></div>

          <div class="group h-full rounded-2xl border border-[#00296B]/10 bg-white p-6 shadow-sm transition-colors duration-300 hover:bg-[#00296b]">
            <span class="text-4xl font-extrabold tracking-tight text-[#00296B]/25 transition-colors duration-300 group-hover:text-white/40">
              {{ step.number }}
            </span>
            <h3 class="mt-4 text-lg font-semibold text-[var(--bg-custom-color)] transition-colors duration-300 group-hover:text-white">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed font-[500] text-[#999999] transition-colors duration-300 group-hover:text-white/80">
              {{ step.description }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    number: '01',
    title: 'Client Checks Out',
    description:
      'A prospect lands on your branded checkout page, picks a package, and pays instantly synced with Stripe. No manual invoice, no pricing back-and-forth.',
  },
  {
    number: '02',
    title: 'Client Onboards Automatically',
    description:
      'The moment payment clears, your custom intake form fires. Briefs, assets, and requirements land in the dashboard organized before you even say hello.',
  },
  {
    number: '03',
    title: 'You Deliver & Get Paid on Repeat',
    description:
      'Your team tracks orders in one pipeline, communicates through the helpdesk, and delivers while recurring billing keeps revenue flowing in the background.',
  },
]
</script>
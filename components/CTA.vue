<template>
  <section aria-labelledby="cta-heading" class="xl:py-16 sm:py-20 custom_family">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="relative overflow-hidden rounded-3xl border border-[#00296B]/15 bg-gradient-to-br from-[#00296B] via-[#00296B] to-[#001845] px-6 py-16 text-center shadow-2xl shadow-[#00296B]/20 sm:px-16">
        <!-- Decorative glow -->
        <div aria-hidden="true" class="pointer-events-none absolute inset-0">
          <div class="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/20 blur-3xl"></div>
        </div>

        <div class="relative">
          <h2
            id="cta-heading"
            class="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Your Agency Is Ready to Run Like a Real Business.
          </h2>

          <p class="mx-auto mt-4 max-w-xl text-pretty text-lg text-[#DFDFDF]/80">
            Stop managing chaos. Start managing growth. Launch your white-label client portal today free for 14 days.
          </p>

          <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <router-link
              to="/trial?plan=base"
              class="w-full rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#00296B] shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#DFDFDF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00296B] sm:w-auto"
            >
              Start Your Free Trials    
            </router-link>

            <router-link
              to="/book-a-demo"
              class="w-full rounded-xl border-2 border-white/30 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00296B] sm:w-auto"
            >
              Book a Demo
            </router-link>
          </div>

          <p class="mt-6 text-sm text-[#DFDFDF]/60">
            No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<template>
  <div class="max-w-[550px] min-h-screen  flex flex-col justify-between px-10 py-12 pb-0 font-serif m-auto">

    <!-- Grain overlay -->
    <div class="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');
      background-size: 200px 200px;">
    </div>

    <!-- Main content -->
    <main class="flex-col flex flex-1 items-center justify-center bg-white px-6 pb-12 md:px-9 mt-[100px] custom_family">
      <div class="space-y-6 animate-fade-in">

        <!-- Heading -->
        <h1 class="text-center mb-[14px] text-[clamp(34px,4vw,45px)] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#00296B]">
          One more step
        </h1>

        <!-- Body text -->
        <div class="space-y-4 ">
          <p class="text-[clamp(8px,4vw,20px)] leading-relaxed">
            We've sent an email to
            <strong class="text-[#0d0d0d] font-semibold">{{ email }}</strong>.<br>
            Please click the confirmation link to finalize your account.
          </p>

          <p class="text-neutral-400 text-sm leading-relaxed">
            Didn't get the email? Check your spam folder or
            
          </p>
        </div>

      </div>
       <footer class="relative z-10 mt-7">
      <NuxtLink
  @click.prevent="$router.back()"
  to="#"
  class="text-neutral-500 text-sm hover:text-neutral-300 transition-colors duration-200 flex items-center gap-1.5 group"
>
  <span class="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
  <span>Return</span>
</NuxtLink>
    </footer>
    </main>

    <!-- Footer -->
   
  </div>
</template>

<script setup>
const route = useRoute()

const email = computed(() => route.query.email || 'No email found')

const resend = () => {
  // Emit or call your resend logic here
  console.log('Resend confirmation email to:', props.email)
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out both;
}
</style>
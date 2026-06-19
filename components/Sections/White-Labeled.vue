<template>
    <section class="py-12 px-4 bg-[#FAFAFA] custom_family">
        <!-- Main Container Grey Color One -->
        <div class="max-w-7xl mx-auto bg-[#E4E2E2] rounded-2xl p-8 md:p-16 shadow-[35px_35px_47.5px_22px_#00000040]"
            data-aos="fade-up">
            <!-- Blue Container -->
            <div class="bg-[#233267] rounded-2xl p-8 md:p-16 mb-10 text-center text-white">
                <!-- Heading -->
                <h2 class="text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
                    <span class="font-light block">{{ banner.title_light }}</span>
                    {{ banner.title_bold }}
                </h2>

                <!-- Description -->
                <p class="text-white xl:text-lg text-base mb-10 max-w-2xl mx-auto italic font-light">
                    {{ banner.description }}
                </p>

                <!-- Image -->
                <div class="relative max-w-4xl mx-auto" data-aos="zoom-in">
                    <img :src="banner.main_image" :alt="banner.title_bold" class="w-full h-auto drop-shadow-2xl" />
                </div>

                <!-- 3 Column Layout -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-16 text-left pt-12">
                    <div v-for="(col, index) in banner.columns" :key="index" class="space-y-3" data-aos="fade-up"
                        :data-aos-delay="index * 150">
                        <div class="flex items-center gap-3">
                            <img :src="col.icon" class="w-5 h-5" alt="icon" />
                            <h4 class="font-bold text-xl">{{ col.title }}</h4>
                        </div>
                        <p class="text-white text-base leading-relaxed italic font-light pl-8">
                            {{ col.description }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Outside Text -->
            <div class="text-center mb-8 italic">
                <p class="text-[#233267] font-bold text-xl mb-2">{{ banner.integration_title }}</p>
                <p class="text-[#233267] font-bold text-xl">{{ banner.integration_subtitle }}</p>
            </div>

            <!-- Icons  -->
            <div class="flex flex-wrap justify-center gap-4">
                <div v-for="(icon, i) in banner.icons" :key="i"
                    class="bg-white p-3 rounded-xl shadow-md w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border border-gray-200"
                    data-aos="zoom-in" :data-aos-delay="i * 100">
                    <img :src="icon" class="w-full h-full object-contain" alt="app-logo" />
                </div>
            </div>
        </div>


        <!-- Demo Btn -->
        <div class="pt-20 flex items-center gap-5 justify-center" data-aos="fade-up">
            <a :href="banner.demo_link" target="_blank"
                class="max-w-[170px] transition-all duration-300 ease-in-out hidden md:block border-4 hover:bg-[#00296B] hover:border-1 hover:text-white rounded-xl border-[#00296B] lg:py-4 lg:px-7 text-[#00296B] font-medium md:px-4 md:py-2 text-center">
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

    </section>
</template>

<script setup>
defineProps({
    banner: { type: Object, required: true }
});
</script>
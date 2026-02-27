<template>
    <section class="py-12 px-4 bg-[#FAFAFA] custom_family">
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

            <!-- Left Card -->
            <div class="w-full lg:w-2/5 border border-[#ACB2BE] rounded-3xl flex flex-col gap-4" data-aos="fade-up">
                <div class="p-6">
                    <h2
                        class="xl:text-[36px] text-[28px] font-medium text-[var(--bg-custom-color)] leading-tight mb-4 ">
                        {{ banner.left_title }}
                        <span class="font-bold">{{ banner.left_title_2 }}</span>
                    </h2>
                    <p class="text-[#494949] text-[22px] italic leading-snug font-light">
                        {{ banner.left_description}}
                    </p>
                </div>
                <div class="">
                    <img :src="banner.left_image" 
                        class="w-full h-52 object-fill" />
                </div>
            </div>

            <!-- Right Card -->
            <div class="w-full lg:w-3/5 border border-[#ACB2BE] rounded-3xl flex flex-row items-start md:flex-row gap-6"
                data-aos="fade-up" data-aos-delay="200">
                <div class="w-full md:w-1/3 pl-6 pt-6">
                    <h2
                        class="xl:text-[36px] text-[28px] font-medium text-[var(--bg-custom-color)] leading-tight mb-4 ">
                        {{ banner.right_title }}
                        <span class="font-bold">{{ banner.right_title_2 }}</span>
                    </h2>
                    <p class="text-[#494949] text-[22px] italic leading-snug font-light">
                        {{ banner.right_description }}
                    </p>
                </div>
                <div class="w-full md:w-2/3">
                    <img :src="banner.right_image"
                        class="w-full h-auto rounded-xl" />
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
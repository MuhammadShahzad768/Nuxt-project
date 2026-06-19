<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Blog'
    }
})

const router = useRouter();

const goToBlogPost = () => {
    router.push(`/blog/${props.id}`);
}
</script>

<template>
    <div @click="goToBlogPost" class="bg-white w-[48%] sm:w-[100%] mt-[50px] rounded-[20px] overflow-hidden p-[15px] shadow-[0_0_20px_-11px_black] transition-all duration-300 ease-in-out cursor-pointer h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,102,255,0.15)]">
        <div class="w-full h-[200px] md:h-[240px] overflow-hidden bg-gray-100">
            <img :src="image" :alt="title" class=" rounded-tl-[20px] rounded-tr-[20px] w-full h-full object-cover">
        </div>
        <div class="p-5 md:p-6 flex flex-col gap-[10px] ">
            <div class="flex items-center mt-[20px] gap-[15px] mb-3 text-sm">
                <span class="text-[#000] font-semibold uppercase tracking-wide text-xs">{{ category }}</span>
                <span class="text-gray-500 text-sm">{{ date }}</span>
            </div>
            <h3 class="text-lg md:text-xl font-bold text-[#00296b] font-[600] mb-3 leading-snug">{{ title }}</h3>
            <p class="text-gray-500 text-[15px] leading-relaxed mb-5 flex-1">{{ excerpt }}</p>
            <div class="flex items-center gap-2 text-[#00296b] font-semibold text-[15px] transition-all duration-300 hover:text-[#0052CC] group">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[20px] transition-transform duration-300 group-hover:translate-x-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
            </div>
        </div>
    </div>
</template>


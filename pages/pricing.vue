<template>
 <div>
    <!-- Show spinner while loading -->
    <Loader v-if="loading" />
     <div v-else>
  <section class="custom_family pt-40 bg-[#F4F4F4] xl:px-0 px-4">
        <div class="container m-auto">
    <div class="head text-center">
         <h2 class="text-[var(--bg-custom-color)] font-bold text-center m-auto xl:text-[42px] text-[28px] xl:leading-[55px] leading-[30px] max-w-4xl xl:px-4"><span class="font-bold ">{{Tabs.title_bold}}</span><br>{{Tabs.title_}}</h2>
         <p class="text-base font-medium text-[#494949] mt-6">{{Tabs.description}}</p>
    </div>
    <div class="pricing_tabs_buttons mt-16">
        <div class="flex m-auto border-black bg-[#D9D9D9] max-w-[570px] h-[60px] items-center px-1 rounded-md border-2">
          <div class="flex w-full">
 <button
    v-for="(tab, index) in Tabs.tabs_buttons"
    :key="index"
    @click="activeTab = index === 0 ? 'monthly' : 'yearly'"
    :class="[
      'tab-btn max-w-[50%] w-full h-[48px] rounded-lg text-base font-medium',
      activeTab === (index === 0 ? 'monthly' : 'yearly')
        ? 'bg-[var(--bg-custom-color)] text-white'
        : 'text-[#494949]'
    ]"
  >
    {{ tab.buttons }}
  </button>

</div>

        </div>
      </div>
      
      <!-- Monthly Plans -->
      <div v-if="activeTab === 'monthly'" class="tab-content  m-auto tracking-tighter mt-16">
        <div class="flex flex-wrap mt-16 gap-5 xl:gap-[.8%] max-w-[95%] m-auto justify-center" >
            <Price_box
     :Price_box="Tabs.price_boxes" :activeTab="activeTab" 
    />

        </div>
      </div>
      
      <!-- Yearly Plans -->
      <div  v-if="activeTab === 'yearly'" class="tab-content  m-auto tracking-tighter mt-16">
        <div class="flex mt-16 gap-[.8%] max-w-[95%] m-auto justify-center">
              <Price_box
      :Price_box="Tabs.price_boxes_yearly" :activeTab="activeTab" />
    
        </div>
      </div>
      
         <button @click="scrollToCompare" class="hover:bg-[#00296B] hover:text-white transition-colors duration-200 m-auto text-center  bg-[#D9D9D9] text-[#00296B] font-medium tracking-tighter py-4 px-10 rounded-xl mt-12 gap-2 flex items-center"> {{ Tabs.compare_plan }}<i class="fa-solid fa-chevron-down" style='font-size:12px'></i></button>
         <p class="text-center py-14 text-[#494949] pb-9 text-base">Trusted by thousands of agencies</p>
          <Swiper
    :modules="[Autoplay]"
    :slides-per-view="5"
    :space-between="25"
    :loop="true"
    :autoplay="{
      delay: 0,                // no pause
      disableOnInteraction: false
    }"
    :speed="4000"            
    :allowTouchMove="false"    
    :free-mode="true"        
    :free-mode-momentum="false"
    class="agencies_logos max-w-[95%] m-auto"
  >
    <SwiperSlide v-for="(logo, i) in logos" :key="i">
      <div class="images flex justify-center">
        <img :src="logo" alt="Agency logo" class="max-h-[80px]" />
      </div>
    </SwiperSlide>
  </Swiper>

         </div>
         </section>
  <section class="custom_family bg-[#F4F4F4]" id="Compare">
            <div class="container m-auto pt-14">
                <div class="">
                    <div class="flex xl:text-[25px]  justify-end text-[15px] font-medium mb-3 w-[96%] m-auto text-center" >
                        <div class="xl:max-w-[670px] max-w-[110px]  w-full"></div>
                        <div class="max-w-[18%] w-full">Basic</div>
                        <div class="max-w-[18%] w-full">Pro</div>
                        <div class="max-w-[18%] w-full">Plus</div>
                    </div>
                </div>
                <hr class="border border-black max-w-[96%] m-auto">
                <div class="max-w-[96%] m-auto mt-10">
                    <h3 class="text-[25px] font-medium pl-14">Personalization</h3>
                    
                    <div class="lines flex text-[25px] py-6  rounded-lg mt-6 bg-white">
                        <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Custom client portal branding</p>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                    </div>
                    <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                        <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Custom client portal domain</p>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center " >✅</div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                    </div>
                    <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                        <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Custom email domain</p>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center " >✅</div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                    </div>
                    <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                        <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Client portal menu editor</p>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center " >✅</div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                    </div>
                    <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                        <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Client portal language editor</p>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫    </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center " >🚫  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫  </div>
                    </div>
                    <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                        <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Client portal template editor</p>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center " >🚫 </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫 </div>
                    </div>
                    <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                        <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Remove «Powered by»</p>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center " >🚫</div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫 </div>
                    </div>
                </div>
                <hr class="border border-black max-w-[96%] m-auto mt-14">
                <div class="max-w-[96%] m-auto mt-14">
                    <h3 class="text-[25px] font-medium pl-14">Team management</h3>
                    <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                        <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Team members
                        </p>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">5  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >10  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >50+</div>
                    </div>
                    <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                        <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Additional team members</p>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center text-[10px] xl:text-[18px]" >$20 / seat / month  </div>
                        <div class="xl:max-w-[18%] max-w-[15%] w-full text-center text-[10px] xl:text-[18px]" >Contact us </div>
                    </div>
                    </div>
                    <hr class="border border-black max-w-[96%] m-auto mt-8">
                    <div class="max-w-[96%] m-auto mt-10">
                        <h3 class="text-[25px] font-medium pl-14">Client management</h3>
                        <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                            <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Unlimited clients
                            </p>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅</div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅ </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                        </div>
                        <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                            <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Client-side teams</p>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫  </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫   </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫 </div>
                        </div>
                        </div>
                        <hr class="border border-black max-w-[96%] m-auto mt-8">
                    <div class="max-w-[96%] m-auto mt-10">
                        <h3 class="text-[25px] font-medium pl-14">Modules</h3>
                        <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                            <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Helpdesk                            </p>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅</div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅ </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                        </div>
                        <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                            <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Webhooks</p>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅ </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅  </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                        </div>
                        <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                            <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Affiliate / referral tracking</p>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫  </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫   </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫 </div>
                        </div>
                        <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                            <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Zapier</p>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅ </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅  </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                        </div>
                        <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                            <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Make</p>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫 </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅  </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                        </div>
                        <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                            <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Reseller white-label program</p>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫</div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫  </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫</div>
                        </div>
                        <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                            <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">API</p>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫</div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫  </div>
                            <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                        </div>
                        </div>
                        <hr class="border border-black max-w-[96%] m-auto mt-8">
                        <div class="max-w-[96%] m-auto mt-10">
                            <h3 class="text-[25px] font-medium pl-14">Payments</h3>
                            <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                                <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">No transaction ees                            </p>
                                <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅</div>
                                <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅ </div>
                                <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                            </div>
                            <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                                <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Multi-currency support</p>
                                <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫 </div>
                                <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫  </div>
                                <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫</div>
                            </div>
                            <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                                <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Invoice generation</p>
                                <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅ </div>
                                <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅  </div>
                                <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                            </div>
                            </div>
                            <hr class="border border-black max-w-[96%] m-auto mt-8">
                            <div class="max-w-[96%] m-auto mt-10">
                                <h3 class="text-[25px] font-medium pl-14">Support & services</h3>
                                <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                                    <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Email support</p>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">✅</div>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅ </div>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                                </div>
                                <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                                    <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Priority support via Slack</p>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫 </div>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫  </div>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫</div>
                                </div>
                                <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                                    <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Uptime SLA</p>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫 </div>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫  </div>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >✅</div>
                                </div>
                                <div class="lines flex text-[25px] py-6  rounded-lg mt-2">
                                    <p class="max-w-[670px] w-full xl:pl-14 pl-4 xl:text-[18px] text-[13px]">Invoice generation</p>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center">🚫 </div>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center" >🚫  </div>
                                    <div class="xl:max-w-[18%] max-w-[15%] w-full text-center text-[10px] xl:text-[18px]" >Contact us</div>
                                </div>
                                </div>
            </div>
         </section>
           <section class="py-10 xl:pb-[92px] pb-[42px] bg-[#F4F4F4] custom_family">
            <div class="faqs container m-auto">
                <div class="head text-center">
                <h2 class="xl:text-5xl	lg:text-4xl md:text-2xl text-2xl text-[#00296B] text-center font-poppins font-bold leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[55px] mb-4 tracking-tight">{{question.faqs_title}}</h2>
            </div>
                <div class="flex mt-20 max-w-[1210px] m-auto px-3 flex-wrap lg:flex-nowrap " id='Faqs'>
                    <div class="left_faqs max-[680px] w-full mt-7">
                      
                            <div v-if="question?.faqs_question" v-for="(faq, index) in question.faqs_question" :key="index">
    <button :data-id="faq.id"
      @click="handleClick(faq.id)"
      class="faq-btn max-[680px] w-full text-left pl-5 py-4 text-lg  xl:text-2xl"
      :class="{
        'bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-l-lg active':activequestion === faq.id}">
      {{ faq.questions }}
    </button>
    <div
     v-if="index < question.faqs_question.length - 1"  class="divider bg-[#DCDCDC] w-[92%] h-[1px]"
    ></div>
  </div>
                </div>
                    <div class="right_faqs max-w-[567px] w-full relative h-[300px]">
                          <div v-for="(faq, index) in question.faqs_answers" :key="index" class='h-full absolute'>
                           <div v-if="activequestion === faq.ids"  
                           class="faq-answer  bg-white h-full py-12 px-14 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-lg">
                            <h3 class="text-2xl">{{faq.question}}</h3>
                            <p class="text-base mt-3">
                              {{faq.answers}}
                            </p>
                          </div>
                          </div>
                    </div>
                </div>
            </div>
        </section>
        <Comments v-if="CommentsData" slides_show="1" space_between="20" :CommentsData="CommentsData"/>
        <Ready v-if="Last" :Last="Last"/>
        </div>
        </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useHead } from '#imports'
import Price_box from "@/components/Sections/Price_box.vue";
import Comments from "@/components/Sections/Comment_Slides.vue";
import Ready from "@/components/Sections/Ready_to_give.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "@/components/Sections/Loader.vue"
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const logos = [
  'http://admin.dspcrm.com/wp-content/uploads/2025/08/amw.png',
  'http://admin.dspcrm.com/wp-content/uploads/2026/02/get-me-links.png',
  'http://admin.dspcrm.com/wp-content/uploads/2026/02/loganix.svg',
  'http://admin.dspcrm.com/wp-content/uploads/2025/09/wordagents.svg',
  'http://admin.dspcrm.com/wp-content/uploads/2026/02/ranked.svg',
  'http://admin.dspcrm.com/wp-content/uploads/2026/02/seobros.svg',
  'http://admin.dspcrm.com/wp-content/uploads/2026/02/wpspeedfix.svg',
]
// ✅ Emits
const emit = defineEmits(["page-loaded"]);
const scrollToCompare = () => {
  const el = document.getElementById('Compare')

  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
// 🔹 Reactive state
const CommentsData = ref(null);
const Last = ref(null);
const activeTab = ref("monthly");
const activequestion = ref("q1");
const loading = ref(true);
const question = ref(null)
const Answers = ref(null);
const Tabs = ref(null);
const Trusted  = ref(null);
// 🔹 Methods
function handleClick(id) {
  setActiveQuestion(id);
  scrollToFaq();
}
useHead({
  title: 'Plans & Pricing',
  meta: [
    { name: 'description', content: 'Learn more about DSPCRM and our mission.' },
    { name: 'keywords', content: 'DSPCRM, About Us, Company Info' },
    { property: 'og:title', content: 'About Us - DSPCRM' },
    { property: 'og:description', content: 'Discover who we are and what we do.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://dspcrm.com/pricing' }
  ]
})
function setActiveQuestion(id) {
  activequestion.value = id;
}

function scrollToFaq() {
  nextTick(() => {
    const el = document.getElementById("Faqs");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
}

// 🔹 Lifecycle
onMounted(async () => {
    const savedCycle = localStorage.getItem('cycle')
  if (savedCycle) {
    activeTab.value = savedCycle
  }
  try {
    // 1. Fetch your Page Data (WordPress)
    const res = await fetch("https://admin.dspcrm.com/wp-json/myapi/v1/page/241?timestamp=" + Date.now());
    const data = await res.json();

    // 2. Fetch the actual Plans (CRM API)
    const planRes = await fetch("https://dspcrm.app/api/v1/plans");
    const planData = await planRes.json();

    // Assign standard fields
    CommentsData.value = data.comments;
    Last.value = data.last_section;
    question.value = data.faqs;
    
    // 3. Transform CRM Plans into your Tabs structure
    if (planData.success) {
      const plans = planData.data;

      // Map Monthly
      const monthlyMapped = plans.map(plan => ({
        box_title: plan.name,
        box_descri: plan.description,
        box_price: `$${plan.monthly_price}`,
        montly: '/ month',
        box_button_text: 'Get Started',
        slug: plan.slug, // <--- Add this line
        text_include: 'Included features:',
        team       : plan.team_limit,
        trial_days : plan.trial_days,
        include_points: plan.features.map(f => ({ points: f }))
      }));

      // Map Yearly
      const yearlyMapped = plans.map(plan => ({
        box_title: plan.name,
        box_descri: plan.description,
        box_price: `$${plan.yearly_price}`,
        montly: '/ year',
        box_button_text: 'Get Started',
        slug: plan.slug, // <--- Add this line
        text_include: 'Included features:',
        team       : plan.team_limit,
        trial_days : plan.trial_days,
        include_points: plan.features.map(f => ({ points: f }))
      }));

      // 4. Combine WordPress static text with API dynamic plans
      Tabs.value = {
        ...data.pricing, // Keep title_bold, description, etc. from WordPress
        price_boxes: monthlyMapped,
        price_boxes_yearly: yearlyMapped
      };
    } else {
      Tabs.value = data.pricing;
    }

    nextTick(() => {
      AOS.init({ duration: 1000, once: true });
      AOS.refresh();
    });
  } catch (err) {
    console.error("API Fetch Error:", err);
  } finally {
    loading.value = false;
    emit("page-loaded");
  }
});

</script>
<style >
.mySwiper {
    width: 880px;
    height: 380px;
}
.swiper-wrapper {
  transition-timing-function: linear !important;
}
.agencies_logos  .swiper-wrapper{
  padding-top:0;
}
</style>
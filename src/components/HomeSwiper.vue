<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :pagination="{ clickable: true }"
    class="pb-8 grid place-items-center"
  >
    <swiper-slide>
      <img
        src="../assets/images/home1-img.webp"
        alt=""
        class=" lg:w-[90%]"
      />
    </swiper-slide>
    <swiper-slide>
      <img
        src="../assets/images/slider_img1.webp"
        alt=""
        class=" lg:w-[90%]"
      />
    </swiper-slide>
    <swiper-slide>
      <img
        src="../assets/images/slider_img2.webp"
        alt=""
        class=" lg:w-[90%]"
      />
    </swiper-slide>
    <swiper-slide>
      <img
        src="../assets/images/slider_img3.webp"
        alt=""
        class=" lg:w-[90%]"
      />
    </swiper-slide>
    <swiper-slide>
      <img
        src="../assets/images/slider_img4.webp"
        alt=""
        class=" lg:w-[90%]"
      />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';


const modules = [Pagination];
</script>
<style>
.swiper-pagination-bullet {
  @apply w-3 h-3 bg-white opacity-100;
}
.swiper-pagination-bullet.swiper-pagination-bullet-active {
  @apply rounded-xl w-6 bg-secondary;
}
</style>

<template>
  <section id="category" class="flex flex-col items-center py-32">
    <h2 class="my-10 text-5xl md:text-6xl font-bold text-white">Category</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 place-items-center">
      <div
        class="text-white grid place-items-center gap-5 text-center"
        v-for="category of categories"
        :key="category.id"
      >
        <div class="p-10">
          <img :src="category.image" alt="category-image" class="w-full" />
        </div>
        <h3 class="text-3xl font-bold">{{ category.title }}</h3>
        <p class="w-3/4">{{ category.description }}</p>
      </div>
    </div>
  </section>
  <section
    id="about"
    class="grid grid-flow-col grid-cols-1 md:grid-cols-2 md:gap-10 items-center"
  >
    <div class="md:p-10">
      <img src="../assets/images/category2-img.webp" alt="" class="w-full" />
    </div>
    <div class="text-center md:text-left flex flex-col items-center md:items-start ">
      <h2 class="text-5xl md:text-6xl font-bold text-white ">What's that</h2>
      <div class="flex items-center gap-5">
        <h2 class="text-5xl md:text-6xl font-bold text-white">Halloween</h2>
        <img src="../assets/images/head2-img.png" alt="" class="w-9 md:w-12" />
      </div>
      <p class="mt-8 md:mt-12 text-white text-lg md:text-xl w-full md:w-[80%]">
        Halloween or Hallowe'en, also known as Allhalloween, All Hallows' Eve,
        or All Saints' Eve, is a celebration observed in many countries on 31
        October, the eve of the Western Christian feast of All Hallows' Day.
      </p>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import category1 from "../assets/images/category/category1-img.webp";
import category2 from "../assets/images/category/category2-img.webp";
import category3 from "../assets/images/category/category3-img.webp";

const categories = ref([
  {
    id: 1,
    title: "Ghost",
    image: category1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id id consequat, eu faucibus nulla. Ultrices mattis lacus, sed maecenas nascetur.",
  },
  {
    id: 2,
    title: "Witch",
    image: category2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id id consequat, eu faucibus nulla. Ultrices mattis lacus, sed maecenas nascetur.",
  },
  {
    id: 3,
    title: "Pumpkin",
    image: category3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id id consequat, eu faucibus nulla. Ultrices mattis lacus, sed maecenas nascetur.",
  },
]);
</script>

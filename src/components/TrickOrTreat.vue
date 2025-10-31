<template>
  <section id="trick" class="flex flex-col items-center py-32">
    <h2 class="mt-10 mb-28 text-5xl md:text-6xl font-bold text-white">
      Trick Or Treat
    </h2>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
      <div
        class="grid place-items-center text-center gap-5 p-8 rounded-md text-white bg-gradient-to-b from-primary-200/20 to-primary-200/10"
        v-for="tot of tots"
        :key="tot.id"
        :class="
          tot.id === 2 &&
          'from-primary-200/50 to-primary-200/30 lg:-translate-y-10'
        "
      >
        <div class="">
          <img :src="tot.image" alt="" />
        </div>
        <h3 class="text-2xl lg:text-4xl font-bold">{{ tot.title }}</h3>
        <p class="w-[90%] hidden md:block">{{ tot.description }}</p>
      </div>
    </div>
  </section>
</template>
  <script setup>
  import tots from "../data/trickOrTreat.js";
  </script>

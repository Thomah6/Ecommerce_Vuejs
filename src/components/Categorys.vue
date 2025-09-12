<script setup>
import { ref } from 'vue'
const props = defineProps({
  categorys: Array,
})
</script>
<template>
  <div class="w-full md:w-1/4 px-4 text-gray-700">
    <div class=" w-full sticky top-18 pt-4 bg-gray-50 my-8  px-4 border border-gray-200 rounded-lg">
      <h2 class="font-semibold text-black text-2xl">Category</h2>
      <div class="py-4 w-full  ">
        <ul class="flex pt-2 md:grid gap-4">
          <li  class="bg-black/80 hover:text-black hover:bg-white border-2 border-black/80 text-white shadow-solid-primary w-full rounded-lg transition-all duration-75 text-center">
            <RouterLink to="/product/category/all" class="w-ful block  py-2 md: cursor-pointer border-gray-200">
          All 
            </RouterLink>
          </li>
          <li v-for="category in categorys" class="bg-black/80 hover:text-black hover:bg-white border-2 border-black/80 text-white shadow-solid-primary w-full rounded-lg transition-all duration-75 text-center">
            <RouterLink :to="`/product/category/${category}`" class="w-ful block  py-2 md:  cursor-pointer border-gray-200">
          {{ category }}
            </RouterLink>
            
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
.shadow-solid-primary {
  box-shadow: 5px 5px rgba(126, 1, 126, 0.726);
}
</style>
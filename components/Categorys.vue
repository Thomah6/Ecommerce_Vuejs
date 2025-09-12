<script setup>
import { ref } from 'vue'
const props = defineProps({
  categorys: Array,
})
</script>
<template>
  <div class="w-1/4 p-4 text-gray-700">
    <div class=" sticky top-18 pt-4 bg-gray-50 my-8 max-w-[300px] px-4 border border-gray-200 rounded-lg">
      <h2 class="font-semibold text-black text-2xl">Category</h2>

      <div class="py-4">
        <ul>
          <li  class="w-full">
            <RouterLink to="/product/category/all" class="w-ful block  py-2 border-t underline cursor-pointer border-gray-200">
All 
            </RouterLink>
          </li>
          <li v-for="category in categorys" class="w-full">
            <RouterLink :to="`/product/category/${category}`" class="w-ful block  py-2 border-t underline cursor-pointer border-gray-200">
{{ category }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

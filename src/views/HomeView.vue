<script setup>
import { ref, computed } from 'vue'
import ProductsList from '@/components/ProductsList.vue'
import categorys from '@/components/categorys.vue'
import axios from 'axios'
const datas = ref([])
const props = defineProps({
  cat: String,
})
const dataFiltered = ref([])
const cart = ref([])

function addToCart(product) {
  // Vérifie si le produit est déjà dans le panier
  const found = cart.value.find((item) => item.id === product.id)
  if (found) {
    found.quantity = (found.quantity || 1) + 1
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
  console.log('Panier:', cart.value)
}
const toutesLesBalises = computed(() => {
  return datas.value.reduce((acc, post) => {
    return acc.concat([post.category])
  }, [])
})

const categorysUniques = computed(() => [...new Set(toutesLesBalises.value)])

axios
  .get('https://dummyjson.com/products')
  .then((response) => {
    datas.value = response.data.products
    dataFiltered.value = response.data.products
    console.log(categorysUniques.value) // Affiche les categorys uniques après la mise à jour
  })
  .catch((error) => {
    console.error('Erreur lors de la requête:', error)
  })
if (props.cat !== undefined) {
  dataFiltered.value = computed(() => {
    return datas.value.filter((el) => el.category == props.cat)
  })
}
</script>

<template>
  <!-- {{ datas }} -->
  <main class="mx-auto max-w-[85rem] mt-20">
    <div class="rounded-lg mx-8 m-auto my-8 bg-linear-to-r from-red-500 via-purple-400 to-blue-500">
      <div class="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 mx-auto">
        <!-- Grid -->
        <div class="grid justify-center md:grid-cols-2 md:justify-between md:items-center gap-2">
          <div class="text-center md:text-start">
            <p class="text-xs text-white/80 uppercase">Announcement</p>
            <p class="mt-1 text-white font-medium">
              Sign up to get unlimited products suggestions. No credit card required.
            </p>
          </div>
          <!-- End Col -->

          <!-- End Col -->
        </div>
        <!-- End Grid -->
      </div>
    </div>
    <!-- End Announcement Banner -->

    <div class="flex gap-4 px-4">
      <categorys :categorys="categorysUniques" />
      <products-list :products="dataFiltered" @add-to-cart="addToCart" />
    </div>
  </main>
</template>

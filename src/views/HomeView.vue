<script setup>
import { ref, computed, provide } from 'vue'
import ProductsList from '@/components/ProductsList.vue'
import categorys from '@/components/categorys.vue'
import axios from 'axios'
import AddCart from '@/components/AddCart.vue'
const datas = ref([])
const props = defineProps({
  cat: String,
})
const dataFiltered = ref([])
const cart = ref([])
const showModal = ref(false)
const selectedProduct = ref(null)
const selectedQuantity = ref(1)

function addToCart(productWithQuantity) {
  const found = cart.value.find((item) => item.id === productWithQuantity.id);
  
  if (found) {
    found.quantity += productWithQuantity.quantity;
  } else {
    cart.value.push(productWithQuantity);
  }
  
  // Sauvegarder dans le localStorage
  localStorage.setItem('cart', JSON.stringify(cart.value));
  
  closeAddCartModal();
  console.log('Panier:', cart.value);
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

function openAddCartModal(product) {
  selectedProduct.value = product
  showModal.value = true
  selectedQuantity.value = 1 // Ajoute cette ligne pour réinitialiser la quantité à chaque ouverture
}

function closeAddCartModal() {
  showModal.value = false
  selectedProduct.value = null
  selectedQuantity.value = 1
}

provide('cart', cart)
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

    <div class="md:flex gap-4 px-4">
      <categorys :categorys="categorysUniques" />
      <products-list :products="dataFiltered" @open-add-cart="openAddCartModal" />
    </div>
    <add-cart
      :showModal="showModal"
      :selectedProduct="selectedProduct"
      v-model:selectedQuantity="selectedQuantity"
      @add-to-cart="addToCart"
      @close="closeAddCartModal"
    />
  </main>
</template>

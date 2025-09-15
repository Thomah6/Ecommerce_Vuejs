<script setup>
import { ref, computed, provide } from 'vue'
import ProductsList from '@/components/ProductsList.vue'
import Categorys from '@/components/Categorys.vue'
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
  console.log(cart.value);
  
  if (found) {
    found.quantity += productWithQuantity.quantity;
  } else {
    cart.value.push(productWithQuantity);
  }
  console.log(cart.value);
  console.log('ajout au panier');
  
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
 <main class="mx-auto max-w-[85rem] mt-8 md:mt-16 px-4">
  <!-- Hero Banner amélioré -->
  <div class="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-xl mb-12">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative max-w-[85rem] mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="grid lg:grid-cols-2 lg:gap-16 items-center">
        <div class="text-center lg:text-left">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Découvrez notre collection exceptionnelle
          </h1>
          <p class="mt-4 text-lg text-blue-100 max-w-xl">
            Des produits de qualité supérieure à des prix imbattables. Livraison gratuite à partir de 50€ d'achat.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button class="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg shadow-md hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1">
              Découvrir les produits
            </button>
            <button class="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300">
              Voir les promotions
            </button>
          </div>
          <div class="mt-8 flex items-center justify-center lg:justify-start text-white/90">
            <div class="flex items-center mr-6">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Livraison rapide</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Paiement sécurisé</span>
            </div>
          </div>
        </div>
        
        <div class="mt-10 lg:mt-0">
          <div class="relative">
            <div class="absolute -inset-4">
              <div class="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r "></div>
            </div>
            <!-- Image avec animation de flottement -->
            <div class="relative transform rotate-3 animate-float">
              <img src="https://www.tailwind-kit.com/images/object/10.png" class="max-w-xs md:max-w-sm m-auto -mt-10" alt="Produit en vedette" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bannière promotionnelle -->
  <div class="rounded-xl mx-auto mb-12 bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg">
    <div class="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-center md:text-start">
          <p class="text-xs text-white/90 uppercase tracking-wider font-semibold">Promotion exceptionnelle</p>
          <p class="mt-1 text-white font-medium">
            Jusqu'à -30% sur une sélection de produits. Offre valable jusqu'au 31 décembre.
          </p>
        </div>
        
        <div class="flex-shrink-0">
          <button class="px-5 py-2 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-sm">
            Voir les offres
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Contenu principal (conservé de l'original) -->
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

<!-- Style pour l'animation de flottement -->
  <style>
    @keyframes float {
      0% {
        transform: translateY(0px) rotate(3deg);
      }
      50% {
        transform: translateY(-15px) rotate(3deg);
      }
      100% {
        transform: translateY(0px) rotate(3deg);
      }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
  </style>
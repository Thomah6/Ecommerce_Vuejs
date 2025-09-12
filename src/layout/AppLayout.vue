<script setup>
import { ref, provide } from 'vue';
import HeaderMain from '@/components/HeaderMain.vue';
import Cart from '@/components/Cart.vue'
import AddCart from '@/components/AddCart.vue'

// Créer une référence pour contrôler l'affichage du panier
const showCart = ref(false)
const state = ref(false)
// Fournir cette référence aux composants enfants
provide('showCart', showCart)

const showModal = ref(false)
const selectedProduct = ref(null)
const selectedQuantity = ref(1)
const cart = ref([])

// Charger le panier au démarrage
function loadCart() {
  try {
    const raw = localStorage.getItem('cart')
    cart.value = raw ? JSON.parse(raw) : []
  } catch {
    cart.value = []
  }
}

loadCart()

provide('cart', cart)

function openAddCartModal(product) {
  selectedProduct.value = product
  selectedQuantity.value = 1
  showModal.value = true
}

function closeAddCartModal() {
  showModal.value = false
  selectedProduct.value = null
}

function addToCart({ id, quantity }) {
  const found = cart.value.find(item => item.id === id);
  
  if (found) {
    found.quantity = quantity;
  } else {
    console.error('Produit non trouvé pour l\'ajout au panier');
  }
    localStorage.setItem('cart', JSON.stringify(cart.value));
  
  closeAddCartModal();
}
</script>

<template>
  <HeaderMain v-if="state" :state="state" :show-cart="showCart" @toggle-cart="showCart = !showCart" />
  <HeaderMain v-else :show-cart="showCart" @toggle-cart="showCart = !showCart" />
  <Cart :show-cart="showCart" @close-cart="showCart=false" />
  <RouterView />
  <AddCart :show-modal="showModal"  />
</template>
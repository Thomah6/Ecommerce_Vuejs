<script setup>
import { ref, watch, inject, onMounted } from 'vue'

// Injecter la référence showCart pour contrôler l'affichage du panier
const showCart = inject('showCart')
console.log('showCart dans Cart.vue:', showCart) // Debug

const emit = defineEmits(['close-cart']) // Ajouter cet emit


const cart = ref([])

onMounted(() => {
  loadCart()
  console.log('Cart monté, showCart value:', showCart?.value) // Debug
})

function loadCart() {
  try {
    const raw = localStorage.getItem('cart')
    cart.value = raw ? JSON.parse(raw) : []
  } catch {
    cart.value = []
  }
}

watch(
  cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true },
)
watch(()=>localStorage.getItem('cart'), ()=>{
    cart.value = JSON.parse(localStorage.getItem('cart'))
})
function removeFromCart(id) {
  const idx = cart.value.findIndex((item) => item.id === id)
  if (idx !== -1) cart.value.splice(idx, 1)
}

function closeCart() {
  emit('close-cart') // Émettre l'événement de fermeture
}

const totalCart = () => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)

defineProps(['showCart'])



</script>

<template>
   
<div 
    
    class="fixed shadow-lg border-l top-12 z-30 right-0 h-full w-sm p-4 bg-white transition-all duration-300 ease-in-out transform"
    :class="showCart ? 'translate-x-0' : 'translate-x-full'"
  >    <div class="flex justify-between">
      <span class="font-semibold text-3xl text-gray-700">Cart</span>
      <svg  @click="closeCart"
        class="hs-collapse-open:block shrink-0 text-red-500 rounded-full cursor-pointer bg-gray-300 size-8"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </div>
    <div class="py-8 px-4 text-gray-700">
      <div v-if="cart && cart.length === 0" class="text-gray-400">Panier vide</div>
      <div v-else-if="cart">
        <div v-for="item in cart" :key="item.id" class="mb-4 text-gray-700 border-b pb-2">
          <div class="font-semibold text-lg">{{ item.title }}</div>
          <div class="text-sm text-gray-500">Quantité : {{ item.quantity }}</div>
          <div class="text-sm text-gray-500">Prix unitaire : ${{ item.price }}</div>
          <div class="text-sm text-black font-bold">
            Total : ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <button @click="removeFromCart(item.id)"
            class="mt-2 px-2 py-1 rounded bg-red-500 text-white text-xs">
            Supprimer
          </button>
        </div>
        <div class="mt-8 text-xl font-bold text-right">
          Total panier : ${{ totalCart().toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>
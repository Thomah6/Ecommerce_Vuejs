<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  showModal: Boolean,
  selectedProduct: Object,
  selectedQuantity: Number,
})
const emit = defineEmits(['add-to-cart', 'close', 'update:selectedQuantity'])

const modelQuantity = computed({
  get: () => props.selectedQuantity,
  set: (val) => emit('update:selectedQuantity', val),
})

function confirmAddToCart() {
  // Émettre le produit complet au lieu de seulement l'ID
  emit('add-to-cart', { 
    ...props.selectedProduct, 
    quantity: props.selectedQuantity 
  });
}
function closeModal() {
  emit('close')
}
</script>
<template>
  <!-- Modal -->
  <div
    v-if="showModal && selectedProduct"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-50"
  >
    <div class="bg-white text-gray-700 rounded-lg p-8 w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">{{ selectedProduct.title }}</h3>
      <img
        :src="selectedProduct.images && selectedProduct.images[0] ? selectedProduct.images[0] : ''"
        class="mb-4 w-full h-48 object-contain"
      />
      <p class="mb-2">{{ selectedProduct.description }}</p>
      <p class="mb-2 font-bold">Prix unitaire : ${{ selectedProduct.price }}</p>
      <label class="block mb-2">Quantité :</label>
      <input
        type="number"
        v-model="modelQuantity"
        min="1"
        class="border rounded px-2 py-1 w-20 mb-4"
      />
      <p class="mb-2 font-bold">
        Total : ${{ (selectedProduct.price * selectedQuantity).toFixed(2) }}
      </p>
      <div class="flex gap-2 justify-end">
        <button @click="emit('close')" class="px-4 py-2 rounded bg-gray-200">Annuler</button>
        <button @click="confirmAddToCart" class="px-4 py-2 rounded bg-blue-600 text-white">
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

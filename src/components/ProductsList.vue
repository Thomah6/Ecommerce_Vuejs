<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  products: Array,
})
if (!props.cat) {
  console.log('123')
}

const filteredProducts = computed(() => {
  if (!route.params.cat || route.params.cat == 'all') return props.products
  return props.products.filter((product) => product.category === route.params.cat)
})

const emit = defineEmits(['add-to-cart'])
function handleAddToCart(product) {
  emit('add-to-cart', product)
}

const showModal = ref(false)
const selectedProduct = ref(null)
const selectedQuantity = ref(1)
const cartProducts = ref([])

function openModal(product) {
  selectedProduct.value = product
  selectedQuantity.value = 1
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  selectedProduct.value = null
}
function confirmAddToCart() {
  emit('add-to-cart', { ...selectedProduct.value, quantity: selectedQuantity.value })
  cartProducts.value.push(selectedProduct.value.id)
  closeModal()
}
</script>
<template>
  <section class="w-3/4 py-8 antialiased md:py-12">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="rounded-lg border overflow-hidden relative border-gray-200 bg-gray-50 p-6"
        >
          <div class="h-56 w-full">
            <a href="#" @click.prevent="openModal(product)">
              <img
                class="mx-auto h-full cursor-pointer"
                :src="product.images && product.images[0] ? product.images[0] : ''"
                alt=""
              />
            </a>
          </div>
          <div class="pt-6">
            <div class="mb-4 flex items-center gap-4">
              <span v-for="tag in product.tags"
                class=" rounded bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
              >
                #{{ tag }}
              </span>
             
              <div class="flex items-center justify-end gap-1">
                <!-- boutons favoris et quick look ici -->
              </div>
            </div>
            <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline">
              {{ product.title }}
            </a>
            <div class="mt-2 flex items-center gap-2">
              <div class="flex items-center">
                <svg
                  v-for="n in Math.floor(Number(product.rating) || 0)"
                  :key="n"
                  class="h-4 w-4 text-yellow-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"
                  />
                </svg>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ product.rating }}</p>
              <p class="text-sm font-medium text-gray-500">(2,957)</p>
            </div>
            <ul class="mt-2 flex items-center gap-4">
              <!-- infos livraison/prix ici -->
            </ul>
            <div class="mt-4 flex items-center justify-between gap-4">
              <p class="text-2xl font-extrabold leading-tight text-gray-900">
                ${{ product.price }}
              </p>
              <button
                v-if="!cartProducts.includes(product.id)"
                type="button"
                class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
                @click="openModal(product)"
              >
                <svg
                  class="-ms-2 me-2 h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
          <div class="text-white text-sm font-semibold bg-black absolute top-0 px-4 py-1 rounded-br-lg left-0">
            {{ product.category }}
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-50"
    >
      <div class="bg-white text-gray-700 rounded-lg p-8 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">{{ selectedProduct.title }}</h3>
        <img
          :src="
            selectedProduct.images && selectedProduct.images[0] ? selectedProduct.images[0] : ''
          "
          class="mb-4 w-full h-48 object-contain"
        />
        <p class="mb-2">{{ selectedProduct.description }}</p>
        <p class="mb-2 font-bold">Prix unitaire : ${{ selectedProduct.price }}</p>
        <label class="block mb-2">Quantité :</label>
        <input
          type="number"
          v-model="selectedQuantity"
          min="1"
          class="border rounded px-2 py-1 w-20 mb-4"
        />
        <p class="mb-2 font-bold">
          Total : ${{ (selectedProduct.price * selectedQuantity).toFixed(2) }}
        </p>
        <div class="flex gap-2 justify-end">
          <button @click="closeModal" class="px-4 py-2 rounded bg-gray-200">Annuler</button>
          <button @click="confirmAddToCart" class="px-4 py-2 rounded bg-blue-600 text-white">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </section>
</template>

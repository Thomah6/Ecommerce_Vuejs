// src/datas/useCart.js
import { ref, watch } from 'vue'

const CART_KEY = 'cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const cart = ref(loadCart())

watch(
  cart,
  (newCart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
  },
  { deep: true },
)

function addToCart(product, quantity = 1) {
  const idx = cart.value.findIndex((item) => item.id === product.id)
  if (idx !== -1) {
    cart.value[idx].quantity += quantity
  } else {
    cart.value.push({ ...product, quantity })
  }
}

function removeFromCart(id) {
  cart.value = cart.value.filter((item) => item.id !== id)
}

function updateQuantity(id, quantity) {
  const idx = cart.value.findIndex((item) => item.id === id)
  if (idx !== -1) {
    cart.value[idx].quantity = quantity
  }
}

function clearCart() {
  cart.value = []
}

export function useCart() {
  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
}

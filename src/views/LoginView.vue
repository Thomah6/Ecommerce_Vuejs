<script setup>
import { ref } from 'vue'
import userData from '@/datas/users.json'
import { useRoute, useRouter } from 'vue-router'
const route = useRouter()
const emit = defineEmits(['islogin'])
let usersInfo
try {
  usersInfo = JSON.parse(localStorage.getItem('userData'))
  if (!Array.isArray(usersInfo)) {
    usersInfo = userData.users
    localStorage.setItem('userData', JSON.stringify(usersInfo))
  }
} catch {
  usersInfo = userData.users
  localStorage.setItem('userData', JSON.stringify(usersInfo))
}

console.log(JSON.parse(localStorage.getItem('userData')))
// console.log(!localStorage.getItem('userData')
//   ? localStorage.getItem('userData')
//   : userData.users );

const email = ref('')
const pass = ref('')

function submitForm() {
  let userId = 0
  console.log(usersInfo)

  const infos = usersInfo.find((el) => {
    userId = el.id
    return el.email == email.value && el.password == pass.value
  })
  if (infos) {
    localStorage.setItem('token', 'true')
    localStorage.setItem('userid', userId)
    console.log(localStorage.getItem('userid'))
    emit('islogin', true)
    route.push('/')
  } else {
    alert('Mot de passe incorrecte')
  }
}
</script>
<template>
  <div class="mt-32 text-gray-700 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-2xs">
    <div class="p-4 sm:p-7">
      <div class="text-center">
        <h1 class="block text-2xl font-bold text-gray-800">Sign in</h1>
        <p class="mt-2 text-sm text-gray-600">
          Don't have an account yet?
          <router-link
            to="/signup"
            class="text-purple-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
          >
            Sign up here
          </router-link>
        </p>
      </div>

      <div class="mt-5">
        <!-- Form -->
        <form @submit.prevent="submitForm">
          <div class="grid gap-y-4">
            <!-- Form Group -->
            <div>
              <label for="email" class="block text-sm mb-2">Email address</label>
              <div class="relative">
                <input
                  type="email"
                  v-model="email"
                  id="email"
                  name="email"
                  class="border py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none"
                  required
                  aria-describedby="email-error"
                />
                <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    class="size-5 text-red-500"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    />
                  </svg>
                </div>
              </div>
              <p class="hidden text-xs text-red-600 mt-2" id="email-error">
                Please include a valid email address so we can get back to you
              </p>
            </div>
            <!-- End Form Group -->

            <!-- Form Group -->
            <div>
              <div class="flex flex-wrap justify-between items-center gap-2">
                <label for="password" class="block text-sm mb-2">Password</label>
                <a
                  class="inline-flex items-center gap-x-1 text-sm text-purple-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                  href="../examples/html/recover-account.html"
                  >Forgot password?</a
                >
              </div>
              <div class="relative">
                <input
                  v-model="pass"
                  type="password"
                  id="password"
                  name="password"
                  class="border py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none"
                  required
                  aria-describedby="password-error"
                />
                <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    class="size-5 text-red-500"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    />
                  </svg>
                </div>
              </div>
              <p class="hidden text-xs text-red-600 mt-2" id="password-error">
                8+ characters required
              </p>
            </div>
            <!-- End Form Group -->

            <!-- Checkbox -->
            <div class="flex items-center">
              <div class="flex">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="shrink-0 mt-0.5 border-gray-200 rounded-sm text-purple-600 focus:ring-purple-500"
                />
              </div>
              <div class="ms-3">
                <label for="remember-me" class="text-sm">Remember me</label>
              </div>
            </div>
            <!-- End Checkbox -->

            <button
              type="submit"
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-hidden focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Sign in
            </button>
          </div>
        </form>
        <!-- End Form -->
      </div>
    </div>
  </div>
</template>

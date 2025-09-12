<script setup>
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'

import userData from '@/datas/users.json'
import { useRouter } from 'vue-router'
const route = useRouter()
let usersInfo

try {
  usersInfo = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : userData?.users || [] // fallback vide si userData n’existe pas
} catch (e) {
  console.error('Erreur JSON dans localStorage:', e)
  usersInfo = userData?.users || []
}

const fullname = ref('')
const email = ref('')
const pass = ref('')
const passConfirm = ref('')
const confirmMess = ref('')
watch([pass, passConfirm], () => {
  confirmMess.value =
    pass.value && passConfirm.value && pass.value !== passConfirm.value
      ? 'Les mots de passe ne sont pas identiques'
      : ''
})
// console.log(usersInfo);

function isUserExist(emaill) {
  let response = false
  if (usersInfo.find((el) => el.email == emaill) !== undefined) {
    response = true
  }
  return response
}

function submitForm() {
  let data = {
    id: usersInfo.length + 1,
    nom: fullname.value,
    email: email.value,
    avatar:
      'https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    role: 'user',
    password: pass.value,
    // date_creation:new Date().getDay(),
  }
  if (isUserExist(email.value)) {
    
Swal.fire({
  icon: 'warning', // icône: success, error, warning, info, question
  title: 'Oups...',
  text: 'Cet email possède déjà un compte!',
  footer: '<a href="/login">Se connecter ?</a>', // optionnel
  confirmButtonText: 'OK',
  confirmButtonColor: '#3085d6',
  background: '#fff',
  color: '#333',
})

    return
  }
  usersInfo.push(data)
  localStorage.setItem('userData', JSON.stringify(usersInfo))

  route.push('/login')
}
</script>
<template>
  <div class="mt-32 text-gray-700 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-2xs">
    <div class="p-4 sm:p-7">
      <div class="text-center">
        <h1 class="block text-2xl font-bold text-gray-800">Sign up</h1>
        <p class="mt-2 text-sm text-gray-600">
          Already have an account?
          <router-link
            to="/login"
            class="text-purple-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
          >
            Sign in here
          </router-link>
        </p>
      </div>

      <div class="mt-5">
        <!-- Form -->
        <form @submit.prevent="submitForm">
          <div class="grid gap-y-4">
            <!-- Form Group -->
            <div>
              <label for="email" class="block text-sm mb-2">FullName</label>
              <div class="relative">
                <input
                  type="text"
                  v-model="fullname"
                  id="nom"
                  name="name"
                  class="border py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none"
                  required
                  aria-describedby="name-error"
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
              <label for="password" class="block text-sm mb-2">Password</label>
              <div class="relative">
                <input
                  type="password"
                  v-model="pass"
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

            <!-- Form Group -->
            <div>
              <label for="confirm-password" class="block text-sm mb-2">Confirm Password</label>
              <div class="relative">
                <input
                  type="password"
                  v-model="passConfirm"
                  id="confirm-password"
                  name="confirm-password"
                  class="border py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none"
                  required
                  aria-describedby="confirm-password-error"
                />
                <p class="">{{ confirmMess }}</p>
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
              <p class="hidden text-xs text-red-600 mt-2" id="confirm-password-error">
                Password does not match the password
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
                  required
                />
              </div>
              <div class="ms-3">
                <label for="remember-me" class="text-sm"
                  >I accept the
                  <a
                    class="text-purple-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                    href="#"
                    >Terms and Conditions</a
                  ></label
                >
              </div>
            </div>
            <!-- End Checkbox -->

            <button
              type="submit"
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-hidden focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Sign up
            </button>
          </div>
        </form>
        <!-- End Form -->
      </div>
    </div>
  </div>
</template>

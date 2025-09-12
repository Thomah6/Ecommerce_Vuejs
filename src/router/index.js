import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component: ()=>import('@/views/HomeView.vue'),
      meta: {requireAuth: true}
    }, 
   {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },

    {
      path:'/product/category/:cat',
      component: ()=>import('@/views/HomeView.vue'),
      meta: {requireAuth: true}
   
    },
     {
      path:'/product/:id',
      component: ()=>import('@/views/ProductView.vue'),
      meta: {requireAuth: true}
   
    },
  ],
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') === 'true'

  if (to.meta.requireAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

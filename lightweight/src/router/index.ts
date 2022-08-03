import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/dashboard/Dashboard.vue';
// @ts-ignore
import { getCurrentUser } from '../firebase/firebase.js';
import Login from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    // /search/screens -> /search?q=screens
    path: '/',
    redirect: (to) => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/dashboard' };
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'AppLayoutLogin',
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    return { name: 'login' };
  } else {
  }
});

export default router

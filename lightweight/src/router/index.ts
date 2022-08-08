import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Exercise from '../views/exercises/Exercises.vue';
import Logs from '../views/logs/Logs.vue'
// @ts-ignore
import { getCurrentUser } from '../firebase/firebase.js';
import Login from '../views/Login.vue';
import Error404 from '../views/404.vue';

const routes: Array<RouteRecordRaw> = [
  {
    // /search/screens -> /search?q=screens
    path: '/',
    redirect: (to) => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/exercises' };
    },
  },
  {
    path: '/exercises',
    name: 'exercise',
    component: Exercise,
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
  {
    path: '/logs/:exerciseID',
    name: 'logs',
    component: Logs,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'error404',
    component: Error404,
    meta: { requiresAuth: true },
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

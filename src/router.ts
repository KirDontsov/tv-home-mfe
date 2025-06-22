import { createWebHistory, createRouter } from 'vue-router';

import LoginView from './LoginView.vue';
import HomeView from './HomeView.vue';
import FirmView from './FirmView.vue';
import { BACKEND_PORT } from '@/shared';

const isAuthenticated = async (to, from, next) => {
  try {
    const res = await fetch(`${BACKEND_PORT}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      next();
    } else {
      console.log('res', res.ok);
      // There was an error so redirect
      window.location.href = '/login';
    }
  } catch (e) {
    console.log('e', e);
  }
};

const routes = [
  {
    path: '/',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      isAuthenticated(to, from, next);
    },
  },
  {
    path: '/firm/:id',
    component: FirmView,
    props: true,
    beforeEnter: (to, from, next) => {
      isAuthenticated(to, from, next);
    },
  },
  { path: '/login', component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

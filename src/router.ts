import { createWebHistory, createRouter } from 'vue-router';
import { checkAuth } from '@/shared/api';

import LoginView from './pages/login-view';
import FirmView from './pages/firm-view';
import FirmsView from '@/pages/firms-view';
import AvitoView from '@/pages/avito-view';
import AvitoEditor from '@/pages/avito-editor';
import AvitoCreate from '@/pages/avito-create';
import AvitoAnalyticsRequests from '@/pages/avito-competitors-analytics';
import AvitoAnalytics from '@/pages/avito-analytics';
import AvitoAnalyticsDetails from '@/pages/avito-analytics-details';

const isAuthenticated = async (to, from, next) => {
  try {
    const res = await checkAuth();

    if (res?.ok) {
      next();
    } else {
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
    component: AvitoView,
    beforeEnter: (to, from, next) => {
      isAuthenticated(to, from, next);
    },
  },
  {
    path: '/editor',
    component: AvitoEditor,
    beforeEnter: (to, from, next) => {
      isAuthenticated(to, from, next);
    },
  },
  {
    path: '/create',
    component: AvitoCreate,
    beforeEnter: (to, from, next) => {
      isAuthenticated(to, from, next);
    },
  },
  {
    path: '/avito-analytics-requests',
    component: AvitoAnalyticsRequests,
    beforeEnter: (to, from, next) => {
      isAuthenticated(to, from, next);
    },
  },
  {
    path: '/avito-analytics',
    component: AvitoAnalytics,
    beforeEnter: (to, from, next) => {
      isAuthenticated(to, from, next);
    },
  },
  {
    path: '/avito-analytics/:id',
    component: AvitoAnalyticsDetails,
    props: true,
    beforeEnter: (to, from, next) => {
      isAuthenticated(to, from, next);
    },
  },
  {
    path: '/firms',
    component: FirmsView,
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

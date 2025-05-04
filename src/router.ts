import { createWebHistory, createRouter } from 'vue-router'

import FirmView from "./FirmView.vue";
import HomeView from "./HomeView.vue";

const routes = [
  { path: '/', component: HomeView },
  { path: '/firm/:id', component: FirmView, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import PlayerView from './views/PlayerView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/player', component: PlayerView },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
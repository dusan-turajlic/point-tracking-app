import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/game/:gamekey', component: () => import('./views/Game.vue') }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


createApp(App)
    .use(router)
    .mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Register from './views/auth/Register.vue'
import { createPinia } from 'pinia'
import Login from './views/auth/Login.vue'
import Dashboard from './Dashboard.vue'
import MediatypesList from './views/mediatypes/MediatypesList.vue'
import TracksList from './views/tracks/TracksList.vue'
import ArtistsList from './views/artists/ArtistsList.vue'
import AlbumsList from './views/albums/AlbumsList.vue'
import GenresList from './views/genres/GenresList.vue'

const app = createApp(App)

const pinia = createPinia()

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Login,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/mediatypes',
            component: MediatypesList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tracks',
            component: TracksList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/genres',
            component: GenresList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/albums',
            component: AlbumsList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/artists',
            component: ArtistsList,
            meta: {
                requiresAuth: true
            }
        }
    ]
})
app.use(pinia)
app.use(router)
app.mount('#app')
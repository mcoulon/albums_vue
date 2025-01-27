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
import ArtistsForm from './views/artists/ArtistsForm.vue'
import AlbumsList from './views/albums/AlbumsList.vue'
import GenresList from './views/genres/GenresList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Login,
            name: 'login',
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/register',
            component: Register,
            name: 'register',
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/',
            component: Dashboard,
            name: 'dashboard',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/mediatypes',
            component: MediatypesList,
            name: 'mediatypes',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tracks',
            component: TracksList,
            name: 'tracks',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/artists',
            component: ArtistsList,
            name: 'artists',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/artists/:id/edit',
            component: ArtistsForm,
            name: 'editArtist',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/artists/new',
            component: ArtistsForm,
            name: 'createArtist',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/albums',
            component: AlbumsList,
            name: 'albums',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/genres',
            component: GenresList,
            name: 'genres',
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token')

    if (to.meta.requiresAuth && !token) {
        next({ name: 'login' })
    } else if (!to.meta.requiresAuth && token) {
        next({ name: 'dashboard' })
    } else {
        next()
    }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
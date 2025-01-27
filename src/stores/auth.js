import { defineStore } from 'pinia'
import ApiRequest from '../services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: sessionStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
        loading: false,
        error: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {
        setToken(token) {
            this.token = token
            if (token) {
                sessionStorage.setItem('token', token)
            } else {
                sessionStorage.removeItem('token')
            }
        },

        async register(credentials) {
            try {
                const response = await ApiRequest.post('/register', credentials)
                this.setToken(response.data.token)
                return true
            } catch (error) {
                console.error('Register error:', error)
                throw error
            }
        },

        async login(credentials) {
            this.loading = true
            this.error = null
            try {
                const response = await ApiRequest.post('/login', credentials)
                const responseData = response.data.data

                const token = responseData?.access_token || responseData?.token
                const user = responseData?.user || null

                this.setToken(token)
                if (user) {
                    this.user = user
                    localStorage.setItem('user', JSON.stringify(user))
                }

                return true
            } catch (error) {
                console.error('Login error:', error)
                this.error = error.response?.data?.message || 'Login failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                if (this.token) {
                    await ApiRequest.post('/logout')
                }
            } catch (error) {
                console.error('Logout error:', error)
            } finally {
                this.setToken(null)
                this.user = null
                localStorage.removeItem('user')
            }
        }
    }
})
import { defineStore } from 'pinia'
import ApiRequest from '../services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: sessionStorage.getItem('token'),
        user: null,
        loading: false,
        error: null
    }),

    actions: {
        async register(credentials) {
            try {
                const response = await ApiRequest.post('/register', credentials)
                this.token = response.data.token
            } catch (error) {
                console.log(error)
            }
        },
        async login(credentials) {
            this.loading = true
            this.error = null
            try {
                const response = await ApiRequest.post('/login', credentials)
                console.log('Login response:', response.data)

                const responseData = response.data.data
                this.token = responseData?.access_token || responseData?.token
                this.user = responseData?.user || null

                if (this.token) {
                    sessionStorage.setItem('token', this.token)
                    if (this.user) {
                        localStorage.setItem('user', JSON.stringify(this.user))
                    }
                    return true
                } else {
                    throw new Error('No token received in response')
                }
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
                const response = await ApiRequest.post('/logout')
                this.token = null
                this.user = null
                sessionStorage.removeItem('token')
                localStorage.removeItem('user')
            } catch (error) {
                console.log(error)
            }
        }
    }
})
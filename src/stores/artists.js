import { defineStore } from 'pinia'
import ApiRequest from '../services/api'

export const useArtistsStore = defineStore('artists', {
    state: () => ({
        artists: [],
        loading: false,
        error: null,
        meta: {},
        current_page: 1,
        per_page: 10
    }),
    actions: {
        async fetchArtists() {
            this.loading = true
            this.error = null
            try {
                const response = await ApiRequest.get(`/artists?page=${this.current_page}`)
                this.artists = response.data.data
                this.meta = response.data.meta
            } catch (error) {
                console.error(error)
                this.error = error.response?.data?.message || 'Failed to fetch artists'
            } finally {
                this.loading = false
            }
        }
    }
})
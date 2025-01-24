import { defineStore } from 'pinia'
import ApiRequest from '../services/api'

export const useArtistsStore = defineStore('artists', {
    state: () => ({
        artists: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchArtists() {
            this.loading = true
            this.error = null
            try {
                const response = await ApiRequest.get('/artists')
                this.artists = response.data.data
                console.log(this.artists)
            } catch (error) {
                console.log(error)
                this.error = error.response?.data?.message || 'Failed to fetch artists'
            } finally {
                this.loading = false
            }
        }
    }
})
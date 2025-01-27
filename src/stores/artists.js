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
        },
        async addArtist(data) {
            try {
                await ApiRequest.post('/artists', data)
                await this.fetchArtists()
            } catch (error) {
                console.log(error)
            }
        },
        async updateArtist(id, data) {
            try {
                await ApiRequest.put(`/artists/${id}`, data)
                await this.fetchArtists()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteArtist(id) {
            try {
                await ApiRequest.delete(`/artists/${id}`)
                await this.fetchArtists()
            } catch (error) {
                console.log(error)
            }
        },
        async restoreArtist(id) {
            try {
                await ApiRequest.patch(`/artists/${id}/restore`)
                await this.fetchArtists()
            } catch (error) {
                console.log(error)
            }
        }
    }
})
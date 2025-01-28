import { defineStore } from 'pinia'
import ApiRequest from '../services/api'

export const useAlbumsStore = defineStore('albums', {
    state: () => ({
        albums: [],
        artists: [], // Pour stocker la liste des artistes pour le select
        loading: false,
        error: null,
        meta: {},
        current_page: 1,
        per_page: 10
    }),
    actions: {
        async fetchAlbums() {
            this.loading = true
            this.error = null
            try {
                const response = await ApiRequest.get(`/albums?page=${this.current_page}`)
                this.albums = response.data.data
                this.meta = response.data.meta
            } catch (error) {
                console.error(error)
                this.error = error.response?.data?.message || 'Failed to fetch albums'
            } finally {
                this.loading = false
            }
        },
        async fetchArtists() {
            try {
                const response = await ApiRequest.get('/artists/all')
                this.artists = response.data
            } catch (error) {
                console.error(error)
                this.error = error.response?.data?.message || 'Failed to fetch artists'
            }
        },
        async addAlbum(data) {
            try {
                await ApiRequest.post('/albums', data)
                await this.fetchAlbums()
            } catch (error) {
                console.log(error)
            }
        },
        async updateAlbum(id, data) {
            try {
                await ApiRequest.put(`/albums/${id}`, data)
                await this.fetchAlbums()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteAlbum(id) {
            try {
                await ApiRequest.delete(`/albums/${id}`)
                await this.fetchAlbums()
            } catch (error) {
                console.log(error)
            }
        },
        async restoreAlbum(id) {
            try {
                await ApiRequest.patch(`/albums/${id}/restore`)
                await this.fetchAlbums()
            } catch (error) {
                console.log(error)
            }
        },
    }
})

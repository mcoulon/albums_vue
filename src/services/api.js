import axios from 'axios'

const ApiRequest = axios.create({
    baseURL: 'https://backend-tic.devapp.be/api',
    withCredentials: true
})

// Intercepteur pour ajouter le token à chaque requête
ApiRequest.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default ApiRequest

import axios from 'axios'

class communityServices {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/communities`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    fetchOneCommunity(id) {
        return this.axiosApp.get(`/${id}`)
    }

    fetchOneCommunityFullData(id) {
        return this.axiosApp.get(`details/${id}`)
    }

    fetchCommunities() {
        return this.axiosApp.get(`/`)
    }

    filterCommunities(searchQuery) {
        return this.axiosApp.get(`/search/`, searchQuery)
    }

    saveCommunity(communityData) {
        return this.axiosApp.post(`/`, communityData)
    }

    editCommunity(id, communityData) {
        return this.axiosApp.put(`/${id}`, communityData)
    }

    deleteCommunity(id) {
        return this.axiosApp.delete(`/${id}`)
    }

    followCommunity(id, userId) {
        console.log(id)
        console.log(userId)
        return this.axiosApp.put(`/follow/${id}`, userId)
    }
}

export default new communityServices()
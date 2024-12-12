
import axios from 'axios'

class CommunityServices {

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

    fetchMostFollowedCommunities() {
        return this.axiosApp.get(`/top`)
    }

    filterCommunities = (query) => {
        return this.axiosApp.get(`/search/${query}`)
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

    followCommunity(id, user) {
        return this.axiosApp.put(`/follow/${id}`, user)
    }

    unFollowCommunity(id, user) {
        return this.axiosApp.put(`/unfollow/${id}`, user)
    }
}

export default new CommunityServices()
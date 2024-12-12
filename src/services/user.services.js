import axios from 'axios'

class UserServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/users`
        });

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken')
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    fetchUsers(page = 1, limit = 10) {
        return this.axiosApp.get(`/?page=${page}&limit=${limit}`)
    }

    fetchOneUser(id) {
        return this.axiosApp.get(`/${id}`)
    }

    filterUsers(query) {
        return this.axiosApp.get(`/search/${query}`)
    }

    editUser(id, userData) {
        return this.axiosApp.put(`/${id}`, userData)
    }

    fetchUsersWithMostReviews() {
        return this.axiosApp.get('/top-reviews')
    }

}

export default new UserServices()


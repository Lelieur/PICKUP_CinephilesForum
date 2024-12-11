import axios from 'axios'

class UserServices {
    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/users`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }


    fetchUsers(page = 1, limit = 10) {
        return this.axiosApp.get(`/? page = ${page} & limit=${limit}`)
    }


    fetchOneUser(id) {
        return this.axiosApp.get(`/${id}`);
    }


    filterUsers(searchQuery) {
        return this.axiosApp.get(`/ search ? query = ${searchQuery}`)
    }

    editUser(id, userData) {
        return this.axiosApp.put(`/${id}`, userData)
    }
}

export default new UserServices()


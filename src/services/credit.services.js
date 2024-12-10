import axios from 'axios'

class CreditServices {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/persons`,
        })
    }


    searchCredit(query) {
        return this.axiosApp.get(`/search/${query}`)
    }

    getCreditDetails(id) {
        return this.axiosApp.get(`/${id}`)
    }

    searchDirector(query) {
        return this.axiosApp.get(`/directors/search/${query}`)
    }

    searchActor(query) {
        return this.axiosApp.get(`/actors/search/${query}`)
    }

}

export default new CreditServices()

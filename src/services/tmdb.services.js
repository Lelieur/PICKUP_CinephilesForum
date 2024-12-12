import axios from 'axios'

class TMDBServices {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/movies`,
        })
    }

    fetchPersonFilter(query) {
        return this.axiosApp.get(`/search/${query}`)
    }

    fetchPersonDetails(id) {
        return this.axiosApp.get(`/${id}`)
    }

    fetchDirector(query) {
        return this.axiosApp.get(`/directors/search/${query}`)
    }

    fetchActor(query) {
        return this.axiosApp.get(`/actors/search/${query}`)
    }

    fetchMovieFilter(query) {
        return this.axiosApp.get(`/search/${query}`)
    }

    fetchMovieDetails(id) {
        return this.axiosApp.get(`/${id}`)
    }

    fetchUpcomingMovies(page = 1) {
        return this.axiosApp.get(`/upcoming?page=${page}`)
    }

}

export default new TMDBServices()

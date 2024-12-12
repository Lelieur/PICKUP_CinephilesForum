import axios from 'axios'

class TMDBServices {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`,
        })
    }

    fetchPersonFilter(query) {
        return this.axiosApp.get(`/persons/search/${query}`)
    }

    fetchPersonDetails(id) {
        return this.axiosApp.get(`/persons/${id}`)
    }

    fetchDirector(query) {
        return this.axiosApp.get(`/persons/directors/search/${query}`)
    }

    fetchActor(query) {
        return this.axiosApp.get(`/persons/actors/search/${query}`)
    }

    fetchMovieFilter(query) {
        return this.axiosApp.get(`/movies/search/${query}`)
    }

    fetchMovieDetails(id) {
        return this.axiosApp.get(`/movies/${id}`)
    }

    fetchUpcomingMovies(page = 1) {
        return this.axiosApp.get(`/movies/upcoming?page=${page}`)
    }

}

export default new TMDBServices()

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

    async getPopularMovies(page = 1, language = 'en-US', region = 'US') {
        const response = await this.axiosApp.get(`/movies/popular`, {
            params: { page, language, region }
        })
        return response.data.results
    }


    async getNowPlayingMovies(page = 1, language = 'en-US', region = 'US') {
        const response = await this.axiosApp.get(`/movie/now-playing`, {
            params: { page, language, region }
        })
        return response.data.results
    }

    async getTopRatedMovies(page = 1, language = 'en-US', region = 'US') {
        const response = await this.axiosApp.get(`/movies/top_rated`, {
            params: { page, language, region }
        })
        return response.data.results
    }


    async getUpcomingMovies(page = 1, language = 'en-US', region = 'US') {
        const response = await this.axiosApp.get(`/movies/upcoming`, {
            params: { page, language, region }
        })
        return response.data.results
    }

    fetchMovieVideos(id) {
        return this.axiosApp.get(`/movies/${id}/videos`)
    }
}

export default new TMDBServices()

import axios from 'axios'

class MovieService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/movies`,
        })
    }


    searchMovies(query) {
        return this.axiosApp.get(`/search/${query}`)
    }


    getMovieDetails(id) {
        return this.axiosApp.get(`/${id}`)
    }

}

export default new MovieService()

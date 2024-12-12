import axios from 'axios'

class ReviewServices {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/reviews`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config

        })
    }

    filterReviews = (query) => {
        return this.axiosApp.get(`/search/${query}`)
    }


    saveReview(reviewData) {
        return this.axiosApp.post('/', reviewData)
    }


    editReview(id, reviewData) {
        return this.axiosApp.put(`/${id}`, reviewData)
    }

    getReviewsDetails(id) {
        return this.axiosApp.get(`/${id}`)
    }

    getAllReviews() {
        return this.axiosApp.get('/')
    }

    getLastedMoviesReviewed() {
        return this.axiosApp.get('/movies')
    }

    getReviewsFromMovie(movieApiId) {
        return this.axiosApp.get(`/movies/${movieApiId}`)
    }


    getReviewsFromAuthor(author) {
        return this.axiosApp.get(`/users/${author}`)
    }


    getMostLikedReviews() {
        return this.axiosApp.get('/top')
    }


    deleteReview(id) {
        return this.axiosApp.delete(`/${id}`)
    }


    getOneReview(id) {
        return this.axiosApp.get(`/${id}`)
    }

    likeReview(id, user) {
        return this.axiosApp.put(`/like/${id}`, user)
    }

    dislikeReview(id, reviewData) {
        return this.axiosApp.put(`/dislike/${id}`, reviewData)
    }

    getOneReviewFullData(id) {
        return this.axiosApp.get(`/details/${id}`)
    }

}

export default new ReviewServices()
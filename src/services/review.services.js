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

    filterReviews(query) {
        return this.axiosApp.get(`/search/`, { params: { query } })
    }


    saveReview(movieApiId, content, rate, author) {
        return this.axiosApp.post('/', { movieApiId, content, rate, author })
    }


    editReview(id, content, rate, likesCounter) {
        return this.axiosApp.put(`/${id}`, { content, rate, likesCounter })
    }

    getReviewsDetails(id) {
        return this.axiosApp.get(`/${id}`)
    }

    getAllReviews() {
        return this.axiosApp.get('/')
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

    likeReview(id) {
        return this.axiosApp.patch(`/${id}/like`);
    }
}

export default new ReviewServices()
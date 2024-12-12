import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"

import MoviePosterCard from "../../../components/MovieComponentes/MoviePosterCard/MoviePosterCard"
import ReviewsList from "../../../components/Reviews/ReviewsList/ReviewsList"
import Loader from "../../../components/Loader/Loader"

import ReviewServices from "../../../services/review.services"
import TMDBServices from "../../../services/tmdb.services"

const ReviewsByMoviePage = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [movieData, setMovieData] = useState([])

    const { movieId } = useParams()

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = () => {

        const promises = [
            ReviewServices.getReviewsFromMovie(movieId),
            TMDBServices.fetchMovieDetails(movieId)
        ]

        Promise
            .all(promises)
            .then(([reviews, movieData]) => {
                setReviews(reviews.data)
                setMovieData(movieData.data)
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }

    return (

        isLoading ? <Loader /> :

            <div className="ReviewsByMoviePage">
                <Container>
                    <Row>
                        <Col md={{ span: 3 }}>
                            <MoviePosterCard {...movieData} />
                        </Col>
                        <Col md={{ span: 9 }}>
                            <ReviewsList reviews={reviews} movieData={movieData} />
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default ReviewsByMoviePage
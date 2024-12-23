import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"

import { Link } from "react-router-dom"

import MoviePosterCard from "../../../components/MovieComponentes/MoviePosterCard/MoviePosterCard"
import ReviewsList from "../../../components/Reviews/ReviewsList/ReviewsList"
import Loader from "../../../components/Loader/Loader"
import NewReviewForm from "../../../components/Reviews/NewReviewForm/NewReviewForm"
import MovieVideo from "../../../components/MovieComponentes/MovieVideo/MovieVideo"

import ReviewServices from "../../../services/review.services"
import TMDBServices from "../../../services/tmdb.services"
import { AuthContext } from "../../../contexts/auth.context"

import "./ReviewsByMoviePage.css"

const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL

const ReviewsByMoviePage = () => {

    const { loggedUser } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const [reviews, setReviews] = useState([])
    const [movieData, setMovieData] = useState([])
    const [averageRate, setAverageRate] = useState([])
    const [trailerKey, setTrailerKey] = useState(null)
    const { movieId } = useParams()

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = () => {

        const promises = [
            ReviewServices.getReviewsFromMovie(movieId),
            TMDBServices.fetchMovieDetails(movieId),
            TMDBServices.fetchMovieVideos(movieId)
        ]

        Promise
            .all(promises)
            .then(([reviews, movieData, videoData]) => {
                setReviews(reviews.data)
                setMovieData(movieData.data)
                averageCount(reviews.data)
                setTrailerKey(videoData.data.results[0].key)
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }

    const averageCount = reviews => {
        const reviewsRates = reviews.map(review => review.rate)
        const averageRate = reviewsRates.reduce((sum, value) => sum + value, 0) / reviewsRates.length
        setAverageRate(averageRate)
    }

    const onInputChange = newReview => {
        const reviewsUpdated = [newReview, ...reviews]
        setReviews(reviewsUpdated)
        setShowModal(false)
        averageCount(reviews)
    }


    return (

        isLoading ? <Loader /> :

            <div className="ReviewsByMoviePage">
                <Row>
                    <Col className="position-relative"
                        style={{ backgroundImage: `url(${TMDB_API_IMG_URL}/original/${movieData.backdrop_path})`, backgroundSize: "cover", backgroundPosition: "center", height: "40rem" }}>
                        <div className="w-100 backgroud-faded-down position-absolute top-0" style={{ height: "30%" }} />
                        <div className="w-100 backgroud-faded-up position-absolute bottom-0" style={{ height: "30%" }} />
                        <div className="position-absolute bottom-0 start-0 ms-1 ps-4 ps-md-5 pb-md-5">
                            <Row className="align-items-center">
                                <Col xs={{ span: 4 }} md={{ span: 2 }} className="d-none d-md-inline">
                                    <MoviePosterCard {...movieData} />
                                </Col>
                                <Col xs={{ span: 12 }} md={{ span: 10 }} className="ps-4">
                                    <Row className="justify-content-start align-items-center">
                                        <Col xs={{ span: 2 }} md={{ span: "auto" }} className="p-md-0 border border-2 rounded d-flex justify-content-center align-items-center">
                                            <p className="fs-5 p-md-2 fw-bold m-0">{averageRate ? averageRate : 'Sin puntuar'}</p>
                                        </Col>
                                        <Col>
                                            <p className="fs-6 m-0">{reviews.length} Reseñas</p>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col className="p-md-0" >
                                            <h2 className="fw-bold ">{movieData.original_title}</h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="p-md-0">
                                            <p className="fs-5 m-0">{movieData?.credits?.cast?.slice(0, 3).map(cast => `${cast.name}  `)}</p>
                                        </Col>
                                    </Row>
                                    <Row className="pt-3">
                                        <Col className="p-md-0">
                                            <p className="fs-6 m-0">{new Date(movieData.release_date).getFullYear()} · {Math.floor(movieData.runtime / 60)}h {movieData.runtime % 60}min</p>
                                        </Col>
                                    </Row>
                                    <Row className="pt-3  d-none d-md-inline">
                                        <Col md={{ span: 9 }} className="p-md-0">
                                            <p className="fs-6 m-0">{movieData.overview}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Container>
                    <Row className="mt-4">
                        {trailerKey && (
                            <Col className="d-grid d-md-inline">
                                <div sName="embed-responsive embed-responsive-16by9"
                                    style={{
                                        position: 'relative',
                                        paddingBottom: '56.25%',
                                        height: 0,
                                        overflow: 'hidden',
                                        maxWidth: '100%',

                                    }}>
                                    <iframe
                                        className="embed-responsive-item"
                                        src={`https://www.youtube.com/embed/${trailerKey}`}
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    ></iframe>
                                </div>
                            </Col>
                        )}
                    </Row>
                    {/* <Row className="mt-4">
                        <Col className="d-grid d-md-inline">
                            <Button className="border-0 btn-style-2 fw-bold" onClick={() => setShowModal(true)}>AÑADIR RESEÑA</Button>
                        </Col>
                        {/* <Col className="d-grid d-md-inline">
                            <MovieVideo movieId={movieId} />
                        </Col> */}
                    <Row className=" pt-4 justify-content-center mb-3">
                        <Col md={{ span: 12 }}>
                            {loggedUser ? (
                                <NewReviewForm movieData={movieData} onInputChange={newReview => onInputChange(newReview)} />
                            ) : (
                                <div>
                                    <p></p>
                                </div>
                            )}
                        </Col>
                    </Row>
                    <Row className="pt-4">
                        <Col md={{ span: 12 }}>
                            <ReviewsList reviews={reviews} movieData={movieData} />
                        </Col>
                    </Row>
                </Container>

            </div>
    )
}

export default ReviewsByMoviePage
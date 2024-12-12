import { useState, useEffect, useContext } from "react"
import { Container, Button, Row, Col, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../contexts/auth.context"

import ReviewsList from "../../../components/Reviews/ReviewsList/ReviewsList"
import NewReviewForm from "../../../components/Reviews/NewReviewForm/NewReviewForm"
<<<<<<< HEAD
import ReviewServices from "../../../services/review.services"
import { AuthContext } from "../../../contexts/auth.context"
import "./ReviewsPage.css"

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([])
    const [filteredReviews, setFilteredReviews] = useState([])
    const [searchMovie, setSearchMovie] = useState("")
    const [activeFilter, setActiveFilter] = useState("all")
    const [isLoading, setIsLoading] = useState(true)

    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        fetchReviewsData()
    }, [])

    const fetchReviewsData = () => {

        setIsLoading(true)

        ReviewServices
            .getAllReviews()
            .then((response) => {
                const reviewPromises = response.data.map((review) =>
                    ReviewServices.getOneReviewFullData(review._id)
                )
                Promise
                    .all(reviewPromises)
                    .then((fullReviews) => {
                        const sortedReviews = fullReviews.sort(
                            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        setReviews(sortedReviews)
                        setFilteredReviews(sortedReviews)
                    })
                    .catch((err) => {
                        console.error("Error al cargar los detalles completos de las reseñas:", err)
                    })
            })
            .catch((error) => {
                console.error("Error al cargar las reseñas:", error)
            })
    }


    const applyFilters = (filterType, searchQuery = searchMovie) => {
        let updatedReviews = [...reviews]
=======

import ReviewServices from "../../../services/review.services"

import Loader from "../../../components/Loader/Loader"

import "./ReviewsPage.css"

const ReviewsPage = () => {

    const { loggedUser } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(true)

    const [reviews, setReviews] = useState([])
    const [isReviewsLoaded, setIsReviewsLoaded] = useState(false)
    const [filteredReviews, setFilteredReviews] = useState([])

    const [activeFilter, setActiveFilter] = useState("all")

    useEffect(() => {
        fetchAllReviews()
    }, [])

    useEffect(() => {
        fetchReviewsFullData()
        setIsLoading(false)
    }, [isReviewsLoaded])

    const fetchAllReviews = () => {
        ReviewServices
            .getAllReviews()
            .then(response => {
                const { data: reviews } = response
                setReviews(reviews)
                setIsReviewsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    const fetchReviewsFullData = () => {

        const reviewPromises = reviews.map((review) =>

            ReviewServices
                .getOneReviewFullData(review._id)
                .then(response => {
                    return response.data
                })
                .catch(err => console.log(err))
        )

        Promise
            .all(reviewPromises)
            .then(response => {
                setReviews(response)
            })
            .catch(err => console.error(err))
    }

    const applyFilters = (filterType) => {

        const filteredReviews = [...reviews]
>>>>>>> 7096e835b4c7f9ce1c0329cdcca1eb47babc229d

        if (filterType === "top") {
            setFilteredReviews(filteredReviews.sort((a, b) => b.likesCounter - a.likesCounter))
            setActiveFilter("top")
        }
<<<<<<< HEAD

        if (filterType === "movie" && searchQuery) {
            updatedReviews = updatedReviews.filter((review) =>
                review.movieTitle.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        setFilteredReviews(updatedReviews)
    }

    const handleFilter = (type) => {
        setActiveFilter(type)
        applyFilters(type, searchMovie)
    }

    const handleMovieSearch = (e) => {
        const searchQuery = e.target.value
        setSearchMovie(searchQuery)
        applyFilters(activeFilter, searchQuery)
    }

    const handleNewReview = (newReview) => {
        const updatedReviews = [newReview, ...reviews]
        setReviews(updatedReviews)
        setFilteredReviews(updatedReviews)
        handleFilter(activeFilter)
    }

    return (
        <div className="ReviewsPage">
            <Container className="text-center">
                <Row className="mt-5 d-flex align-items-center">
                    <Col>
                        <h3 className="section-title">Reviews</h3>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-3">
                        <Button
                            variant="outline-light"
                            onClick={() => handleFilter("all")}
                            active={activeFilter === "all"}
                        >
                            Todas las Reseñas
                        </Button>
                        <Button
                            variant="outline-light"
                            onClick={() => handleFilter("top")}
                            active={activeFilter === "top"}
                        >
                            Top Reseñas
                        </Button>
                        <input
                            type="text"
                            placeholder="Buscar por película..."
                            value={searchMovie}
                            onChange={handleMovieSearch}
                            style={{ marginLeft: "10px", padding: "5px" }}
                        />
                    </Col>
                </Row>
                {loggedUser && <NewReviewForm onReviewCreated={handleNewReview} />}
                <ReviewsList
                    reviews={filteredReviews}
                    loggedUser={loggedUser}
                />
                <Button variant="dark" className="mt-3 styled-button-2" to="/" as={Link}>
                    Volver a la Home
                </Button>
            </Container>
        </div>
=======
        if (filterType === "all") {
            setFilteredReviews(filteredReviews.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            ))
            setActiveFilter("all")
        }
    }

    const onInputChange = () => {

        setIsReviewsLoaded(false)
        fetchAllReviews()
        applyFilters("all")
    }


    return (

        isLoading ? <Loader /> :

            <div className="ReviewsPage">
                <Container className="text-center">
                    <Row>
                        <Col className="mt-5">
                            <Button
                                variant="link"
                                className="text-white text-decoration-none fw-bold filter-button opacity-50"
                                onClick={() => applyFilters("all")}
                                active={activeFilter === "all"}
                            >
                                Más recientes
                            </Button>
                            <Button
                                variant="link"
                                className="text-white text-decoration-none fw-bold filter-button opacity-50"
                                onClick={() => applyFilters("top")}
                                active={activeFilter === "top"}
                            >
                                Más valoradas
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-3">
                        <Col md={{span: 10}} >
                            <NewReviewForm onInputChange={onInputChange} />
                        </Col>
                    </Row>
                    <Row className="justify-content-center ">
                        <Col md={{span: 10}}>
                            <ReviewsList
                                reviews={filteredReviews.length ? filteredReviews : reviews}
                                onInputChange={onInputChange}
                            />
                        </Col>
                    </Row>


                    <Button variant="dark" className="mt-3 styled-button-2" to="/" as={Link}>
                        Volver a la Home
                    </Button>
                </Container>
            </div>
>>>>>>> 7096e835b4c7f9ce1c0329cdcca1eb47babc229d
    )
}
export default ReviewsPage
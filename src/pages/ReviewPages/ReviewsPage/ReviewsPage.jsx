import { useState, useEffect, useContext } from "react"
import { Container, Button, Row, Col, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../contexts/auth.context"

import ReviewsList from "../../../components/Reviews/ReviewsList/ReviewsList"
import NewReviewForm from "../../../components/Reviews/NewReviewForm/NewReviewForm"

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

        if (filterType === "top") {
            setFilteredReviews(filteredReviews.sort((a, b) => b.likesCounter - a.likesCounter))
        }
        if (filterType === "all") {
            setFilteredReviews(filteredReviews.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            ))
        }
    }

    const handleFilter = (type) => {
        setActiveFilter(type)
        applyFilters(type)
    }


    return (

        isLoading ? <Loader /> :

            <div className="ReviewsPage">
                <Container className="text-center">
                    <Row>
                        <Col className="mt-5">
                            <Button
                                variant="link"
                                className="text-white text-decoration-none fw-bold"
                                onClick={() => handleFilter("all")}
                                active={activeFilter === "all"}
                            >
                                Más recientes
                            </Button>
                            <Button
                                variant="link"
                                className="text-white text-decoration-none fw-bold"
                                onClick={() => handleFilter("top")}
                                active={activeFilter === "top"}
                            >
                                Más valoradas
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NewReviewForm newReviewCreated={fetchAllReviews} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ReviewsList
                                reviews={filteredReviews.length ? filteredReviews : reviews}
                                loggedUser={loggedUser}
                            />
                        </Col>
                    </Row>


                    <Button variant="dark" className="mt-3 styled-button-2" to="/" as={Link}>
                        Volver a la Home
                    </Button>
                </Container>
            </div>
    )
}
export default ReviewsPage
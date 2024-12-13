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
    const [filteredReviews, setFilteredReviews] = useState([])

    const [activeFilter, setActiveFilter] = useState("all")

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = () => {

        ReviewServices
            .getAllReviews()
            .then(response => {

                const promises = response.data.map(review => ReviewServices.getOneReviewFullData(review._id))

                Promise
                    .all(promises)
                    .then(response => {
                        const fullDataReviews = response.map(elm => elm.data)
                        setReviews(fullDataReviews)
                        setFilteredReviews(fullDataReviews)
                    })
                    .catch(err => console.log(err))
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }

    const applyFilters = (filterType) => {

        const filteredReviews = [...reviews]

        if (filterType === "top") {
            setFilteredReviews(filteredReviews.sort((a, b) => b.likesCounter - a.likesCounter))
            setActiveFilter("top")
        }
        if (filterType === "all") {
            setFilteredReviews(filteredReviews.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            ))
            setActiveFilter("all")
        }
    }

    const onInputChange = (newReview) => {
        reviews.push(newReview)
        setReviews(reviews)
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
                        <Col md={{ span: 10 }}>
                            {loggedUser ? (
                                <NewReviewForm onInputChange={onInputChange} />
                            ) : (
                                <div>
                                    <p></p>
                                </div>
                            )}
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={{ span: 10 }}>
                            <ReviewsList
                                reviews={filteredReviews.length ? filteredReviews : reviews}
                                onInputChange={onInputChange}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}
export default ReviewsPage
import { useState, useEffect, useContext } from "react"
import { Container, Button, Row, Col, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReviewsList from "../../../components/Reviews/ReviewsList/ReviewsList"
import NewReviewForm from "../../../components/Reviews/NewReviewForm/NewReviewForm"
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

        if (filterType === "top") {
            updatedReviews = updatedReviews.sort((a, b) => b.likesCounter - a.likesCounter)
        }

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
    )
}

export default ReviewsPage


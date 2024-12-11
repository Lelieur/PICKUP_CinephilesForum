import { useState, useEffect, useContext } from "react"
import { Container, Button, Row, Col, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReviewsList from "../../../components/Reviews/ReviewsList/ReviewsList"
import NewReviewForm from "../../../components/Reviews/NewReviewForm/NewReviewForm"
import reviewServices from "../../../services/review.services"
import EditReviewForm from "../../../components/Reviews/EditReviewForm/EditReviewForm"
import { AuthContext } from "../../../contexts/auth.context"
import "./ReviewsPage.css"

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([])
    const [filteredReviews, setFilteredReviews] = useState([])
    const [searchMovie, setSearchMovie] = useState("")
    const [showEditModal, setShowEditModal] = useState(false)
    const [editReviewData, setEditReviewData] = useState()
    const [activeFilter, setActiveFilter] = useState("all")


    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        reviewServices
            .getAllReviews()
            .then((response) => {
                const reviewPromises = response.data.map((review) =>
                    reviewServices.getOneReviewFullData(review._id)
                )
                Promise.all(reviewPromises)
                    .then((fullReviews) => {
                        const sortedReviews = fullReviews.sort(
                            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                        );
                        setReviews(sortedReviews)
                        setFilteredReviews(sortedReviews)
                    })
                    .catch((err) => {
                        console.error("Error al cargar los detalles completos de las reseñas:", err)
                    });
            })
            .catch((error) => {
                console.error("Error al cargar las reseñas:", error)
            })
    }, [])

    const applyFilters = (filterType, searchQuery = searchMovie) => {
        let updatedReviews = [...reviews];

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

    const handleLike = (reviewId) => {
        const updatedReviews = reviews.map((review) => {
            if (review._id === reviewId) {
                return { ...review, likesCounter: review.likesCounter + 1 }
            }
            return review
        })

        setReviews(updatedReviews)
        setFilteredReviews(updatedReviews)

        reviewServices
            .likeReview(reviewId)
            .then((response) => {
                console.log("Review liked successfully:", response)
            })
            .catch((err) => {
                console.error("Error liking the review:", err)
            })
    }

    const handleEdit = (review) => {
        if (review) {
            setEditReviewData(review)
            setShowEditModal(true)
        }
    }

    const handleDelete = (reviewId) => {
        if (loggedUser) {
            if (window.confirm("¿Estás seguro de que quieres eliminar esta reseña?")) {
                reviewServices
                    .deleteReview(reviewId)
                    .then(() => {
                        const updatedReviews = reviews.filter((review) => review._id !== reviewId)
                        setReviews(updatedReviews);
                        setFilteredReviews(updatedReviews)
                    })
                    .catch((err) => {
                        console.error("Error deleting the review:", err)
                    })
            }
        }
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setEditReviewData(null)
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
                <NewReviewForm onReviewCreated={handleNewReview} />
                <ReviewsList
                    reviews={filteredReviews}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    loggedUser={loggedUser}
                />
                <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Reseña</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditReviewForm
                            review={editReviewData}
                            onReviewUpdated={(updatedReview) => {
                                const updatedReviews = reviews.map((review) =>
                                    review._id === updatedReview._id ? updatedReview : review
                                )
                                setReviews(updatedReviews)
                                setFilteredReviews(updatedReviews)
                                handleCloseEditModal()
                            }}
                            onCancel={handleCloseEditModal}
                        />
                    </Modal.Body>
                </Modal>
                <Button variant="dark" className="mt-3 styled-button-2" to="/" as={Link}>
                    Volver a la Home
                </Button>
            </Container>
        </div>
    )
}

export default ReviewsPage


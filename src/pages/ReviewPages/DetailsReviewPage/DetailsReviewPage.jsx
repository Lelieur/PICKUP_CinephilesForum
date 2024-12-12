import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"


import { homer } from "../../../const/image-paths"
import { AuthContext } from "../../../contexts/auth.context"
import Loader from "../../../components/Loader/Loader"
import ReviewServices from "../../../services/review.services"
import ReviewCard from "../../../components/Reviews/ReviewCard/ReviewCard"
import EditReviewForm from "../../../components/Reviews/EditReviewForm/EditReviewForm"

const ReviewDetailsPage = () => {
    const { loggedUser } = useContext(AuthContext)
    const { reviewId } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [reviewData, setReviewData] = useState({})
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (reviewId) {
            fetchReviewData()
        } else {
            console.log("No se ha encontrado el ID de la reseña.")
        }
    }, [reviewId])

    const fetchReviewData = () => {
        console.log("Fetching review with ID:", reviewId)
        ReviewServices
            .getOneReviewFullData(reviewId)
            .then((response) => {
                setReviewData(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    };

    const { title, description, rating, reviewer, createdAt, editedAt } = reviewData

    return (
        isLoading ? <Loader message="Cargando detalles de la reseña..." /> :
            <div className="ReviewDetailsPage">
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <p><strong>Calificación:</strong> {rating} / 5</p>
                            <p><strong>Reseñada por:</strong> {reviewer?.username || "Desconocido"}</p>
                            <p><strong>Fecha de creación:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                            {editedAt && <p><strong>Última edición:</strong> {new Date(editedAt).toLocaleDateString()}</p>}
                        </Col>
                    </Row>

                    {loggedUser?.id === reviewer?.id && (
                        <Row className="mt-3">
                            <Col>
                                <Button className="border-0 fw-bold btn-style-2" onClick={() => setShowModal(true)}>Editar Reseña</Button>
                            </Col>
                        </Row>
                    )}

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Reseña</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditReviewForm reviewData={reviewData} onClose={() => setShowModal(false)} />
                        </Modal.Body>
                    </Modal>
                </Container>
            </div>
    )
}

export default ReviewDetailsPage


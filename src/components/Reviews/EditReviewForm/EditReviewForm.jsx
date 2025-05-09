import { useState, useEffect } from 'react'
import { Form, Button, Card, Spinner } from 'react-bootstrap'
import ReviewServicess from '../../../services/review.services'

const EditReviewForm = ({ review, onReviewUpdated, onCancel }) => {

    const [content, setContent] = useState({})
    const [rate, setRate] = useState(review?.rate || 0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setContent()
        setRate(review?.rate || 0)
    }, [review])

    const handleSubmit = (e) => {

        e.preventDefault()

        const updatedReviewData = {
            content,
            rate
        }

        ReviewServicess
            .editReview(review._id, updatedReviewData)
            .then((response) => {
                setLoading(false)
                onReviewUpdated(response.data)
            })
            .catch((err) => {
                console.log(err)
                setError("Hubo un problema al actualizar la reseña")
            })
    }

    return (
        <div className="EditReviewForm">
            <Card className='ReviewCard'>
                <Card.Body>
                    <h5>Editar Reseña</h5>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="reviewContent" className="mb-3">
                            <Form.Label>Reseña</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Edita tu reseña aquí"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="reviewRate" className="mb-3">
                            <Form.Label>Nota (0-10)</Form.Label>
                            <Form.Control
                                type="number"
                                value={rate !== null ? rate : ""}
                                onChange={(e) =>
                                    setRate(Math.min(10, Math.max(0, Number(e.target.value))))}
                                placeholder="Tu valoración (0-10)"
                                min={0}
                                max={10}
                                step={0.1}
                                required
                            />
                        </Form.Group>

                        {error && <p className="text-danger">{error}</p>}

                        <div className="d-flex justify-content-end gap-2">
                            <Button
                                variant="secondary"
                                onClick={onCancel}
                                disabled={loading}
                                style={{
                                    backgroundColor: "gray",
                                    borderColor: "gray",
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                style={{
                                    backgroundColor: "rgb(5 255 161)",
                                    border: "none",
                                }}
                            >
                                {loading ? (
                                    <>
                                        <Spinner
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />{" "}
                                        Guardando...
                                    </>
                                ) : (
                                    "Guardar cambios"
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default EditReviewForm

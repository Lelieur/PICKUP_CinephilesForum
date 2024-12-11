import { useState } from "react"
import { Form, Button, Modal, Card } from "react-bootstrap"
import { PlusCircle, Film } from "react-bootstrap-icons"

import ReviewServices from "../../../services/review.services"
import TMDBServices from "../../../services/tmdb.services"

import "./NewReviewForm.css"

const NewReviewForm = ({ onReviewCreated }) => {
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(null)
    const [showMovieModal, setShowMovieModal] = useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false)
    const [querySearch, setQuerySearch] = useState("")
    const [moviesFilter, setMoviesFilter] = useState([])
    const [reviews, setReviews] = useState([])
    const [error, setError] = useState(null)

    const handleMovieSearch = (e) => {
        const { value: query } = e.target
        setQuerySearch(query)

        if (query) {
            TMDBServices
                .fetchMovieFilter(query)
                .then((response) => {
                    setMoviesFilter(response.data.results)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie)
        setShowMovieModal(false)
        setQuerySearch("")
        setMoviesFilter([])
    }

    const handleSubmit = (e) => {

        if (!reviewText || !selectedMovie || rating === null) {
            setError("Por favor, completa todos los campos antes de enviar.")
            return
        }

        const storedToken = localStorage.getItem('authToken');
        const author = storedToken ? JSON.parse(atob(storedToken.split('.')[1])).userId : null

        ReviewServices
            .saveReview(selectedMovie.id, reviewText, rating, author)
            .then((response) => {
                console.log("Reseña registrada:", response.data)
                //Pass the new review to the main component (ReviewsPage)
                if (onReviewCreated) {
                    onReviewCreated(response.data)
                }
                setSelectedMovie(null)
                setReviewText("")
                setRating(null)
                setError(null)
            })
            .catch((error) => {
                console.error("Error al registrar la reseña:", error)
                setError("Hubo un error al enviar la reseña.")
            })
    }

    return (
        <div className="NewReviewForm">
            <Card
                className="mx-auto mt-5 p-4"
                style={{
                    maxWidth: "600px",
                    backgroundColor: "#1a1a2e",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
            >
                <Form onSubmit={handleSubmit}>
                    {/* Campo de descripción */}
                    <Form.Group controlId="reviewText">
                        <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                            Describe tu reseña
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Escribe aquí lo que opinas de la película..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            style={{
                                backgroundColor: "#242432",
                                border: "1px solid #444",
                                color: "white",
                            }}
                        />
                    </Form.Group>

                    {/* Mostrar la imagen de la película seleccionada */}
                    {selectedMovie && (
                        <div className="mt-3">
                            <strong style={{ color: "rgb(5 255 161)" }}>Película:</strong>{" "}
                            {selectedMovie.original_title}
                            <div className="mt-2">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
                                    alt={selectedMovie.original_title}
                                    style={{ width: "100px", height: "150px", objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Nota seleccionada */}
                    {rating !== null && (
                        <div className="mt-3">
                            <strong style={{ color: "rgb(5 255 161)" }}>Nota:</strong> {rating}
                        </div>
                    )}

                    {/* Botones */}
                    <div className="d-flex mt-4 gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setShowMovieModal(true)}
                            style={{
                                flex: 1,
                                backgroundColor: "rgb(5 255 161)",
                                border: "none",
                            }}
                        >
                            <Film /> Añadir Película
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setShowRatingModal(true)}
                            style={{
                                flex: 1,
                                backgroundColor: "rgb(5 255 161)",
                                border: "none",
                            }}
                        >
                            <PlusCircle /> Añadir Nota
                        </Button>
                    </div>

                    {/* Botón para enviar */}
                    <Button
                        type="submit"
                        className="mt-4 w-100"
                        style={{
                            backgroundColor: "rgb(5 255 161)",
                            border: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Enviar Reseña
                    </Button>

                    {/* Mostrar errores */}
                    {error && <p className="text-danger mt-3">{error}</p>}
                </Form>
            </Card>

            {/* Modal de búsqueda de películas */}
            <Modal show={showMovieModal} onHide={() => setShowMovieModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Buscar Película</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Escribe el título de una película..."
                        value={querySearch}
                        onChange={handleMovieSearch}
                    />
                    <ul className="mt-3">
                        {moviesFilter.map((movie) => (
                            <li
                                key={movie.id}
                                onClick={() => handleMovieSelect(movie)}
                                style={{ cursor: "pointer", color: "black" }}
                            >
                                {movie.original_title} ({new Date(movie.release_date).getFullYear()})
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.original_title}
                                    style={{ width: "50px", height: "75px", marginLeft: "10px", objectFit: "cover" }}
                                />
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
            </Modal>

            {/* Modal de calificación */}
            <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Calificar Película</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="number"
                        placeholder="Escribe una calificación (0-10)"
                        value={rating || ""}
                        onChange={(e) =>
                            setRating(Math.min(10, Math.max(0, Number(e.target.value))))
                        }
                    />
                </Modal.Body>
            </Modal>

            {/* Mostrar las reseñas de la película seleccionada */}
            {reviews.length > 0 && (
                <div className="mt-4">
                    <h4 style={{ color: "white" }}>Reseñas:</h4>
                    <ul>
                        {reviews.map((review) => (
                            <li key={review._id} className="mt-3" style={{ color: "white" }}>
                                <strong>{review.author ? review.author : "Anónimo"}</strong> -{" "}
                                <span>{review.rate}</span>
                                <p>{review.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
};

export default NewReviewForm;


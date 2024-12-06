import { useState } from "react"
import { Form, Button, ListGroup, Card, Modal } from 'react-bootstrap'
import { Film, PlusCircle } from "react-bootstrap-icons"

import movieService from "../../../services/movie.services"
import reviewServices from "../../../services/review.services"

import "./NewReviewForm.css"

const NewReviewForm = ({ onReviewCreated }) => {

    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [query, setQuery] = useState()
    const [content, setContent] = useState("")
    const [rate, setRate] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showMoviesModal, setShowMoviesModal] = useState(false)
    const [showRateModal, setShowRateModal] = useState(false)


    const handleSearchMovies = () => {
        movieService
            .searchMovies(query)
            .then((response) => {
                setMovies(response.data.results)
            })
            .catch((err) => {
                console.error(err)
                setError("Hubo un problema buscando la película.")
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedMovie || !content || rate === null) {
            setError("Por favor, completa todos los campos.")
            return
        }
        setLoading(true);
        const token = localStorage.getItem("authToken")

        reviewServices
            .saveReview(selectedMovie.id, content, rate)
            .then((response) => {
                setLoading(false)
                resetForm()
                onReviewCreated(response.data)
            })
            .catch((err) => {
                setLoading(false)
                console.error(err)
            });
    }
    const resetForm = () => {
        setContent("")
        setRate(null)
        setSelectedMovie(null)
        setQuery("")
        setMovies([])
        setError(null)
        setShowMoviesModal(false)
        setShowRateModal(false)
    };

    return (
        <div className="NewReviewForm">
            <Card className="review-card" style={{ maxWidth: "750px", margin: "0 auto" }}>
                <Card.Body>
                    <div className="d-flex align-items-start gap-3">
                        {/* Botones para seleccionar película y nota */}
                        <div className="d-flex flex-column mb-3">
                            <Button
                                variant="secondary"
                                onClick={() => setShowMoviesModal(true)}
                                style={{
                                    color: "rgb(5 255 161)",
                                    fontSize: "20px",

                                    marginBottom: "10px",
                                    background: "transparent",
                                    border: "none"
                                }}
                            >
                                <Film />
                            </Button>


                            <Button
                                variant="secondary"
                                onClick={() => setShowRateModal(true)}
                                style={{
                                    color: "rgb(5 255 161)",
                                    fontSize: "20px",
                                    background: "transparent",
                                    border: "none"
                                }}
                            >
                                <PlusCircle />
                            </Button>
                        </div>
                        {/* Área de comentario */}
                        <div style={{ flex: 1 }}>
                            <Form.Group className="d-flex align-items-center mb-3" controlId="reviewContent">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Dejanos tu reseña"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    style={{
                                        color: "white",
                                        resize: "none",
                                        fontSize: "14px",
                                        backgroundColor: "#242432",
                                        border: "none",
                                        marginRight: "10px"
                                    }}
                                />
                            </Form.Group>

                            {/* Mostrar la película seleccionada y la nota */}
                            {selectedMovie && (
                                <div className="d-flex align-items-center" style={{ marginTop: "10px" }}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                                        alt={selectedMovie.original_title}
                                        style={{ width: "50px", marginRight: "10px", borderRadius: "5px" }}
                                    />
                                    <p style={{ margin: 0, fontSize: "14px" }}>
                                        {selectedMovie.original_title}
                                    </p>
                                </div>
                            )}

                            {rate && (
                                <div className="d-flex align-items-center mb-3">
                                    <strong>Nota:</strong> {rate}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-2">
                        {/* Botón para publicar */}
                        <Button
                            className="btn-post"
                            onClick={handleSubmit}
                            disabled={loading || !content || rate === null || !selectedMovie}
                            style={{
                                backgroundColor: "rgb(5 255 161)",
                                border: "none",
                                fontSize: "14px",
                                padding: "6px 12px",
                            }}
                        >
                            {loading ? "Enviando..." : "Postear"}
                        </Button>
                    </div>

                    {/* Mostrar errores */}
                    {error && <p className="text-danger mt-3">{error}</p>}
                </Card.Body>
            </Card>

            {/* Modal para seleccionar película */}
            <Modal
                show={showMoviesModal}
                onHide={() => setShowMoviesModal(false)}
                style={{ backgroundColor: "black" }}>
                <Modal.Header closeButton style={{ backgroundColor: "black" }}>
                    <Modal.Title>Selecciona una Película</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
                    <Form.Group className="mb-3" controlId="movieSearch">
                        <Form.Control
                            type="text"
                            placeholder="Buscar película"
                            value={query || ""}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ backgroundColor: "#242432", color: "white" }}
                        />
                    </Form.Group>
                    <Button
                        onClick={handleSearchMovies}
                        variant="success"
                        className="mb-3 w-100"
                        style={{ backgroundColor: "rgb(5, 255, 161)", borderColor: "rgb(5, 255, 161)" }}
                    >
                        Buscar
                    </Button>

                    {movies.length > 0 && (
                        <ListGroup>
                            {movies.map((movie) => (
                                <ListGroup.Item
                                    key={movie.id}
                                    onClick={() => {
                                        setSelectedMovie(movie);
                                        setShowMoviesModal(false);
                                    }}
                                    style={{ cursor: "pointer", display: "flex", alignItems: "center", marginBottom: "10px" }}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.original_title}
                                        style={{ width: "50px", marginRight: "10px", borderRadius: "5px" }}
                                    />
                                    {movie.original_title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Modal.Body>
            </Modal>

            {/* Modal para añadir nota */}
            <Modal show={showRateModal} onHide={() => setShowRateModal(false)}>
                <Modal.Header closeButton style={{ backgroundColor: "black" }}>
                    <Modal.Title>Califica la Película</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "black" }}>
                    <Form.Group controlId="reviewRate">
                        <Form.Label>Introduce una nota (0-10):</Form.Label>
                        <Form.Control
                            type="number"
                            value={rate || ""}
                            onChange={(e) =>
                                setRate(Math.min(10, Math.max(0, Number(e.target.value))))}
                            placeholder="Tu valoración (0-10)"
                            min={0}
                            max={10}
                            step={0.1}
                            className="input-rate"
                            required
                            style={{ color: "white", backgroundColor: "#242432" }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "black" }}>
                    <Button
                        variant="secondary"
                        onClick={() => setShowRateModal(false)}
                        style={{ backgroundColor: "rgb(5, 255, 161)", borderColor: "rgb(5, 255, 161)" }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setShowRateModal(false)}
                        style={{ backgroundColor: "rgb(5, 255, 161)", borderColor: "rgb(5, 255, 161)" }}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default NewReviewForm
import { useState, useEffect } from "react"
import { Form, Button, ListGroup } from 'react-bootstrap'

import movieService from "../../../services/movie.services"
import reviewServices from "../../../services/review.services"



const NewReviewForm = ({ onReviewCreated }) => {

    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [query, setQuery] = useState("")
    const [content, setContent] = useState("")
    const [rate, setRate] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const handleSearchChange = (e) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        console.log(query)
        movieService
            .searchMovies(query)
            .then((response) => {
                setMovies(response.data.results)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [query])


    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
        setQuery(movie.original_title)
        setMovies([])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedMovie) {
            setError("Por favor, selecciona una película.")
            return
        }
        setLoading(true);
        const token = localStorage.getItem("authToken")

        reviewServices
            .saveReview(selectedMovie.id, content, rate)
            .then((response) => {
                setLoading(false)
                setContent('')
                setRate(0)
                setSelectedMovie(null)
                if (onReviewCreated) {
                    onReviewCreated(response.data)
                }
            })
            .catch((err) => {
                setLoading(false)
                setError("Hubo un problema al enviar tu reseña. Intenta nuevamente.")
                console.error(err)
            })
    }

    return (
        <div className="NewReviewForm">
            <h4>Crea una reseña</h4>
            <Form onSubmit={handleSubmit}>
                {/* Campo de búsqueda de película */}
                <Form.Group className="mb-3" controlId="movieSearch">
                    <Form.Label>Buscar película</Form.Label>
                    <Form.Control
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        placeholder="Buscar por título"
                        required
                    />
                </Form.Group>

                {/* Lista de películas encontradas */}
                {movies.length > 0 && (
                    <ListGroup className="mb-3">
                        {movies.map((movie) => (
                            <ListGroup.Item
                                key={movie.id}
                                onClick={() => handleSelectMovie(movie)} // Usa el nuevo manejador
                                style={{ cursor: "pointer" }}
                            >
                                {movie.original_title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

                {/* Campo para el contenido de la reseña */}
                <Form.Group className="mb-3" controlId="reviewContent">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="¿Qué opinas de esta película?"
                        required
                    />
                </Form.Group>

                {/* Campo para la valoración de la película */}
                <Form.Group className="mb-3" controlId="reviewRate">
                    <Form.Control
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Math.min(10, Math.max(0, e.target.value)))}
                        placeholder="Tu valoración"
                        min={0}
                        max={10}
                        step={0.1}
                        required
                    />
                </Form.Group>

                {/* Muestra de errores */}
                {error && <p className="text-danger">{error}</p>}

                {/* Botón para enviar la reseña */}
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar Reseña"}
                </Button>
            </Form>
        </div>
    )
}
export default NewReviewForm
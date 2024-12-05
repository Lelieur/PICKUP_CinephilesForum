import { useState, useEffect } from "react"
import axios from "axios"
import { Form, Button, ListGroup } from 'react-bootstrap'
const API_URL = import.meta.env.VITE_APP_API_URL

const NewReviewForm = ({ onReviewCreated }) => {

    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [content, setContent] = useState("")
    const [rate, setRate] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        axios
            .get(`${API_URL}/api/movies/search/${searchQuery}`)
            .then((response) => {
                let resultsArray = []
                response.data.results.map(result => {
                    resultsArray.push(result.original_title)
                })
                setMovies(resultsArray)
            })
            .catch((err) => {
                setError("Error al cargar las películas.")
                console.error(err)
            })
    }, [searchQuery])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const token = localStorage.getItem("authToken")
        const movieApiId = selectedMovie

        axios
            .post(
                `${API_URL}/api/reviews`,
                { movieApiId, content, rate },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                setLoading(false)
                setContent("")
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
        <div className="NewRevieForm">
            <h4>Crea una reseña</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="movieSearch">
                    <Form.Label>Buscar película</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Buscar por título"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="reviewContent">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control as="textarea" rows={3} value={content} onChange={(e) =>
                        setContent(e.target.value)} placeholder="¿Qué opinas de esta película?"
                        required />
                </Form.Group>
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
                {error && <p className="text-danger">{error}</p>}
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar Reseña'}
                </Button>
            </Form>
        </div>
    )
}
export default NewReviewForm
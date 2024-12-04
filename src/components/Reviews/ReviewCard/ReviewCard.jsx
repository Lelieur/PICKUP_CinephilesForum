import { useEffect, useState } from 'react'
import './ReviewCard.css'
import { Card, Row, Col, Button } from "react-bootstrap"
import axios from 'axios'

const ReviewCard = ({ author, avatar, movieApiId, content, rate, likesCounter }) => {

    const [authorData, setAuthorData] = useState({})
    const [movieTitle, setMovieTitle] = useState({})

    const fetchAuthorData = (authorId) => {
        return axios
            .get(`http://localhost:5005/api/users/${authorId}`)
            .then(response => response.data)
            .catch(err => console.log(err))
    }

    const fetchMovieData = (movieApiId) => {
        return axios
            .get(`http://localhost:5005/api/movies/${movieApiId}`)
            .then(response => response.data)
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (author) {
            fetchAuthorData(author)  // Llamada para obtener los detalles del autor usando el ID
                .then(authorData => {
                    setAuthorData(authorData);  // Almacenamos los datos del autor
                })
                .catch((err) => console.error("Error fetching author data:", err))
        }

        if (movieApiId) {
            fetchMovieData(movieApiId)  // Llamada para obtener los detalles de la película
                .then(movieData => {
                    setMovieTitle(movieData)
                })
                .catch((err) => console.error("Error fetching movie data:", err))
        }
    }, [author, movieApiId])


    return (
        <div className="ReviewCard">
            <Card className="mb-4">
                <Card.Img variant="top" src={avatar} alt={`${authorData.username}`} />

                <Card.Body>
                    <Row>
                        <Col sm={8}>
                            <Card.Title>{authorData.username}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{movieTitle?.original_title}</Card.Subtitle>
                        </Col>
                        <Col sm={4} className="d-flex flex-column align-items-end">
                            <div>
                                <strong>Calificación:</strong> {rate} / 10
                            </div>
                            <Button variant="outline-secondary" size="sm" className="mt-2">
                                ❤️ {likesCounter} Likes
                            </Button>
                        </Col>
                    </Row>
                    <Card.Text className="mt-3">
                        {content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default ReviewCard
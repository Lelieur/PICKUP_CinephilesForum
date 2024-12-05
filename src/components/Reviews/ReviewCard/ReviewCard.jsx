import { useEffect, useState } from 'react'
import './ReviewCard.css'
import { Card, Row, Col, Button } from "react-bootstrap"
import axios from 'axios'
import { homer } from '../../../const/image-paths'

const API_URL = import.meta.env.VITE_APP_API_URL
const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL

const ReviewCard = ({ author, avatar, movieApiId, content, rate, likesCounter, createdAt, release_date }) => {

    const [authorData, setAuthorData] = useState({})
    const [movieData, setMovieData] = useState({})
    const [likes, setLikes] = useState(likesCounter)

    const formattedDate = new Date(createdAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const releaseDate = new Date(release_date).toLocaleDateString("es-Es", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const fetchAuthorData = (authorId) => {
        return axios
            .get(`${API_URL}/api/users/${authorId}`)
            .then(response => response.data)
            .catch(err => console.log(err))
    }

    const fetchMovieData = (movieApiId) => {
        return axios
            .get(`${API_URL}/api/movies/${movieApiId}`)
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
                    setMovieData(movieData)
                })
                .catch((err) => console.error("Error fetching movie data:", err))
        }
    }, [])

    const handleLike = () => {
        setLikes(likes + 1)
    }


    return (
        <div className="ReviewCard">
            <Card className=' p-3 m-0 text-white text-start'>
                <Row>
                    <Col md={3}>
                        <Card.Img className='object-fit-cover h-100'
                            src={`${TMDB_API_IMG_URL}/w780/${movieData.backdrop_path}`}
                            alt="movie poster"
                        />
                    </Col>
                    <Col md={9}>
                        <Row className='pe-3'>
                            <Col>
                                <Card.Subtitle className='fs-4'>
                                    {movieData.original_title}{" "}
                                    <span>
                                        ({new Date(movieData.release_date).getFullYear()})
                                    </span>
                                </Card.Subtitle>
                            </Col>
                        </Row>
                        <Row className='pt-4 d-flex pe-2'>
                            <Col xs={3} md={{ span: 2 }}>
                                <Card.Img className='rounded-circle  object-fit-cover '
                                    style={{ height: "3rem", width: "3rem" }}
                                    src={homer} alt={authorData.username} />
                            </Col>
                            <Col className='ps-2' xs={6} md={{ span: 8 }}>
                                <Row >
                                    <Col>
                                        <Card.Title className='fs-6'
                                        >
                                            {authorData.firstName}
                                        </Card.Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Subtitle>
                                            @{authorData.username}
                                        </Card.Subtitle>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={{ span: 3 }} md={{ span: 2 }} className='border border-light border-1 h-50 text-center rounded'>
                                {rate}
                            </Col>
                        </Row>
                        <Row className='pt-4 pb-4'>
                            <Col>
                                <Card.Text>
                                    {content}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='d-flex align-items-center'>
                    <Col>
                        <span className='p-0'
                            style={{
                                fontSize: "0.9rem",
                                color: "#aaa",
                            }}
                        >
                            {formattedDate}
                        </span>
                    </Col>
                    <Col className='text-end'>
                        <Button
                            variant="outline-light"
                            size="sm"
                            onClick={handleLike}
                        >
                            ❤️ {likes} Likes
                        </Button>
                    </Col>
                </Row>
            </Card >
        </div >
    );

}
export default ReviewCard
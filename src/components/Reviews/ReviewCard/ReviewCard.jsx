import { useEffect, useState } from 'react';
import './ReviewCard.css';
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { homer } from '../../../const/image-paths';
import reviewServices from '../../../services/review.services'
import movieServices from '../../../services/movie.services';
import userServices from '../../../services/user.services';


const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL;

const ReviewCard = ({ id, author, avatar, movieApiId, content, rate, likesCounter, createdAt, release_date }) => {
    const [authorData, setAuthorData] = useState({})
    const [movieData, setMovieData] = useState({})
    const [likes, setLikes] = useState(likesCounter)
    const [loading, setLoading] = useState(true)


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

    const fetchAuthorReviews = (authorId) => {
        reviewServices
            .getReviewsFromAuthor(authorId)
            .then(response => {
                setAuthorData(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching author data:", err)
                setLoading(false)
            })
    }

    const fetchAuthorDetails = (authorId) => {
        userServices
            .fetchOneUser(authorId)
            .then(response => {
                setAuthorData(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching author details:", err)
                setLoading(false)
            })
    }

    const fetchMovieData = (movieApiId) => {
        movieServices
            .getMovieDetails(movieApiId)
            .then(response => {
                setMovieData(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching movie data:", err)
                setLoading(false)
            })
    }


    useEffect(() => {
        if (author) {
            fetchAuthorReviews(author)
            fetchAuthorDetails(author)
        }

        if (movieApiId) {
            fetchMovieData(movieApiId)
        }
    }, [author, movieApiId])

    const handleLike = () => {

        const updatedLikes = likes + 1
        setLikes(updatedLikes)

        reviewServices
            .editReview(id, content, rate)
            .catch(err => {
                console.log("Error updating like count:", err)
                setLikes(likes)
            })
    }

    // Fallback loading state if data is still being fetched
    if (loading) {
        return (
            <div className="ReviewCard">
                <Spinner animation="border" variant="light" />
            </div>
        )
    }

    return (
        <div className="ReviewCard">
            <Card className='p-3 m-0 text-white text-start'>
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
                                <Card.Img className='rounded-circle object-fit-cover'
                                    style={{ height: "3rem", width: "3rem" }}
                                    src={avatar || homer} alt={authorData.username} />
                            </Col>
                            <Col className='ps-2' xs={6} md={{ span: 8 }}>
                                <Row>
                                    <Col>
                                        <Card.Title className='fs-6'>
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
            </Card>
        </div>
    );
};

export default ReviewCard;

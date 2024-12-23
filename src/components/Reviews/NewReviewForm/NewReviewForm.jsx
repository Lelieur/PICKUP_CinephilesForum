import { useState, useContext } from "react"
import { Form, Button, Modal, Card, Row, Col, ListGroup, ButtonGroup } from "react-bootstrap"
import { AuthContext } from "./../../../contexts/auth.context"
import { Plus, XLg, PlusCircle } from 'react-bootstrap-icons'
import { homer } from "../../../const/image-paths"

import MoviePosterCard from "../../MovieComponentes/MoviePosterCard/MoviePosterCard"
import ReviewServices from "../../../services/review.services"
import TMDBServices from "../../../services/tmdb.services"
import AuthModal from "../../User/AuthModal/AuthModal"

import "./NewReviewForm.css"

const NewReviewForm = ({ movieData, onInputChange }) => {

    const { loggedUser } = useContext(AuthContext)

    const [reviewData, setReviewData] = useState({
        author: loggedUser?._id,
        movieApiId: !movieData ? '' : movieData.id,
        content: '',
        rate: null
    })

    const [querySearch, setQuerySearch] = useState("")
    const [moviesFilter, setMoviesFilter] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)

    const [selectedRating, setSelectedRating] = useState(null);

    const [showSearchMoviesModal, setShowSearchMoviesModal] = useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setReviewData({ ...reviewData, [name]: value })
    }

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

    const handleRatingChange = rating => {
        setReviewData({
            ...reviewData, ["rate"]: rating
        })
        setSelectedRating(rating)
    }

    const handleSelectedMovie = movie => {

        const movieId = movie.id
        const movieData = movie

        setReviewData({ ...reviewData, ["movieApiId"]: movieId })
        setSelectedMovie(movieData)
    }

    const deleteNewSelectedMovies = () => {
        setReviewData({
            ...reviewData, ["movieApiId"]: ''
        })
        setSelectedMovie(null)
        setSelectedRating(null)
    }

    const handleSubmit = e => {

        e.preventDefault()

        if (!loggedUser) {
            setShowAuthModal(true)
            return
        }

        ReviewServices
            .saveReview(reviewData)
            .then(response => {

                const newReview = response.data

                setReviewData({
                    author: '',
                    movieApiId: '',
                    content: '',
                    rate: null
                })
                selectedMovie && setSelectedMovie(null)
                querySearch && setQuerySearch('')
                moviesFilter && setMoviesFilter([])
                selectedRating && setSelectedRating(null)
                onInputChange(newReview)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="NewReviewForm">
            <Card className="mx-auto p-4 rounded-4">
                <Form onSubmit={handleSubmit}>
                    <Row className="h-100">
                        {
                            !selectedMovie && !movieData ?

                                <Col md={{ span: 2 }} className="d-flex justify-content-center align-items-center p-0 border rounded">
                                    <Button className="border-0 fw-bold" size="sm" onClick={() => setShowSearchMoviesModal(true)}><Plus /></Button>
                                </Col>

                                :

                                <Col md={2} className="position-relative p-0" >

                                    <MoviePosterCard {...selectedMovie} movieApiId={movieData} />

                                    <Button variant="link"
                                        className="text-white p-0 pe-1 m-0 top-0 end-0 position-absolute"
                                        onClick={() => { deleteNewSelectedMovies() }}>
                                        <XLg />
                                    </Button>

                                    <Button
                                        className="border-0 text-white rounded-0 rounded-end top-0 start-0 position-absolute"
                                        onClick={() => { setShowRatingModal(true) }}
                                    >
                                        {
                                            !selectedRating &&
                                            <PlusCircle />
                                        }
                                        {
                                            selectedRating &&
                                            <span>{selectedRating}</span>
                                        }
                                    </Button>

                                </Col>
                        }

                        <Col md={{ span: 10 }}>
                            {
                                !selectedMovie && !movieData ?
                                    <Row className="d-flex align-items-center">
                                        <Col>
                                            <p className="m-0 ps-2 d-flex align-items-center text-white fs-5 fw-bold">¿De qué película vas a hablar hoy?</p>
                                        </Col>
                                    </Row>
                                    :
                                    <Row className="d-flex align-items-center">
                                        <Col>
                                            <p className="m-0 d-flex align-items-center text-white">
                                                <span className='fs-5 fw-bold me-2'>
                                                    {selectedMovie?.original_title ?
                                                        selectedMovie.original_title
                                                        :
                                                        movieData.original_title}</span>
                                                <span className="fs-6">
                                                    ({new Date(selectedMovie?.release_date ?
                                                        selectedMovie.release_date
                                                        :
                                                        movieData.release_date).getFullYear()})
                                                </span>
                                            </p>
                                        </Col>
                                    </Row>
                            }

                            <Row className="mt-3">
                                <Col xs={2} md={2} xl={1} className="pe-0">
                                    <img className='rounded-circle object-fit-cover'
                                        style={{ height: "3rem", width: "3rem" }}
                                        src={loggedUser?.avatar || homer} alt={loggedUser?.username} />
                                </Col>
                                <Col xs={10} md={10} xl={11} className="ps-xl-0">
                                    <Form.Group controlId="reviewText">
                                        <Form.Control
                                            as="textarea"
                                            rows={9}
                                            type="text"
                                            placeholder="Escribe aquí lo que opinas de la película..."
                                            value={reviewData.content}
                                            name="content"
                                            onChange={handleInputChange}
                                            className="bg-transparent text-white border-0 m-0 custom-placeholder"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end">
                            <Button
                                className="rounded-pill border-0"
                                type="submit"
                            >
                                Enviar Reseña
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card >
            < Modal
                show={showSearchMoviesModal}
                onHide={() => { setShowSearchMoviesModal(false), setQuerySearch(''), setMoviesFilter([]) }}
                backdrop={true}
                keyboard={true}
                centered >
                <Modal.Body className="ps-4 pe-4">
                    <Form>
                        <Form.Group className="mb-3" controlId="searchMovieField">
                            <Form.Label className="text-white fw-bold fs-6">Nombre de la película</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Busca una película..."
                                value={querySearch}
                                onChange={handleMovieSearch} />
                            {
                                moviesFilter.length &&
                                <ListGroup align="end">
                                    {
                                        moviesFilter.map(movie => {
                                            return (
                                                <ListGroup.Item key={movie.id} variant="flush">
                                                    <Button
                                                        variant="link"
                                                        className="w-100 p-0 m-0 border-0 text-start text-dark text-decoration-none"
                                                        onClick={() => {
                                                            handleSelectedMovie(movie)
                                                            setShowSearchMoviesModal(false)
                                                            setQuerySearch('')
                                                            setMoviesFilter([])
                                                        }}>
                                                        <span className="m-0 p-0 fw-bold">{movie.original_title} </span><span>({new Date(movie.release_date).getFullYear()})</span>
                                                    </Button>
                                                </ListGroup.Item>
                                            )
                                        })
                                    }
                                </ListGroup>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal >

            < Modal
                show={showRatingModal}
                onHide={() => { setShowRatingModal(false), setShowSearchMoviesModal(false), handleRating(null) }}
                backdrop={true}
                keyboard={true}
                centered >
                <Modal.Header className="border-0">
                    <Modal.Title className="text-white fw-bold">Puntúa la película</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ButtonGroup className="justify-center">
                        {Array.from({ length: 11 }, (_, i) => (
                            <Button
                                key={i}
                                variant={selectedRating === i ? 'light' : 'outline-light'}
                                onClick={() => {
                                    handleRatingChange(i)
                                    setShowRatingModal(false)
                                }}
                            >
                                {i}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Modal.Body>
            </Modal >
            <AuthModal
                show={showAuthModal}
                onHide={() => setShowAuthModal(false)}
            />
        </div >
    )
}

export default NewReviewForm


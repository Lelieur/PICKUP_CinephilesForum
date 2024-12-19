import './ReviewCard.css'
import { Card, Row, Col, Button, Modal, Form, ButtonGroup } from "react-bootstrap"
import { homer } from '../../../const/image-paths'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/auth.context'
import { Link } from 'react-router-dom'
import { Heart, PencilSquare, Trash3, HeartFill } from "react-bootstrap-icons"
import TimeSinceCreation from '../../../TimeSinceCreation/timeSinceCreation';
import ReviewServices from "../../../services/review.services"
import MoviePosterCard from '../../MovieComponentes/MoviePosterCard/MoviePosterCard'

const ReviewCard = ({ _id, content, rate, likesCounter, createdAt, movieApiId, author, usersLikes, movieData }) => {

    const { loggedUser } = useContext(AuthContext)

    const [reviewData, setReviewData] = useState({
        _id: _id,
        content: content,
        rate: rate,
        likesCounter: likesCounter,
        createdAt: createdAt,
        movieApiId: movieApiId,
        author: author,
        usersLikes: usersLikes
    })

    const [showEditModal, setShowEditModal] = useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false)
    const [selectedRating, setSelectedRating] = useState(rate);

    const [isReviewLiked, setIsReviewLiked] = useState(false)

    const formattedDate = TimeSinceCreation(createdAt)

    const handleReviewDataChange = e => {
        const { value, name } = e.currentTarget
        setReviewData({ ...reviewData, [name]: value })
    }

    const handleRatingChange = rating => {
        setReviewData({ ...reviewData, ["rate"]: rating })
    }

    const handleLike = () => {
        ReviewServices
            .likeReview(reviewData._id, loggedUser)
            .then(response => {
                const { data: reviewData } = response
                console.log(reviewData)
                setReviewData(reviewData)
            })
            .catch(err => console.log(err))
    }

    const handleDislike = () => {
        ReviewServices
            .dislikeReview(reviewData._id, loggedUser)
            .then(response => {
                const { data: reviewData } = response
                setReviewData(reviewData)
            })
            .catch(err => console.log(err))
    }

    const handleEdit = e => {

        e.preventDefault()

        ReviewServices
            .editReview(reviewData._id, reviewData)
            .then(() => {
                setShowEditModal(false)
                setReviewData(reviewData)
            })
            .catch(err => console.log(err))
    }

    const handleReviewDelete = () => {
        ReviewServices
            .deleteReview(_id)
            .then(() => location.reload())
            .catch(err => console.log(err))
    }

    return (
        <div className="ReviewCard">
            <Card className='p-3 m-0 mb-3 text-white text-start'>
                <Row className='pt-1'>
                    <Col
                        md={2}
<<<<<<< HEAD
                        className="ms-2 position-relative">
=======
                        className="ms-2 position-relative d-none d-md-inline">
>>>>>>> 6d24a6750bdd6ce608dcc7be609f025ba2f113f4
                        <Link>
                            <MoviePosterCard {...movieData} movieApiId={movieApiId} />
                        </Link>
                        <p
                            className="ms-3 mt-2 fs-6 fw-bold position-absolute
                            top-0 start-0 translate-middle rounded-circle m-0
                            rate d-flex align-items-center justify-content-center
                            border border-5"
                            style={{ height: "2.5rem", width: "2.5rem" }}
                        >
                            {rate}
                        </p>
                    </Col>
                    <Col
                        md={9}>
                        <Row className="d-flex align-items-center">
                            <Col>
                                <p className="m-0 d-flex align-items-center">
                                    <span className='fs-5 fw-bold me-2'>
                                        {movieApiId?.original_title ?
                                            movieApiId.original_title
                                            :
                                            movieData.original_title}
                                    </span>
                                    <span className="fs-6">
                                        ({new Date(movieApiId?.release_date ?
                                            movieApiId?.release_date
                                            :
                                            movieData.release_date).getFullYear()})
                                    </span>
                                </p>
                            </Col>
                        </Row>
                        <Row className="mt-3">
<<<<<<< HEAD
                            <Col md={2} className="pe-0">
=======
                            <Col xs={2} md={2} xl={1} className="pe-0">
>>>>>>> 6d24a6750bdd6ce608dcc7be609f025ba2f113f4
                                <Link to={`/usuarios/${author?._id}`}>
                                    <img
                                        className='rounded-circle object-fit-cover'
                                        style={{ height: "3rem", width: "3rem" }}
                                        src={author?.avatar || homer}
                                        alt={author?.username}
                                    />
                                </Link>
                            </Col>
<<<<<<< HEAD
                            <Col md={10}>
                                <Row>
=======
                            <Col xs={10} md={10} xl={11} className="ps-xl-3">
                                <Row >
>>>>>>> 6d24a6750bdd6ce608dcc7be609f025ba2f113f4
                                    <Col className="ps-0">
                                        <p className="m-0 fs-6"><span className="fw-bold">{author?.firstName}</span> @{author?.username} · {formattedDate}</p>
                                    </Col>
                                </Row>
                                <Row className='pt-2'>
                                    <Col className="ps-0">
                                        <p className="fs-6">{content}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-end opacity-50">
                    <Col xs={2} md={{ span: "auto" }} className="d-flex align-items-center">
                        {
                            !reviewData.usersLikes?.includes(loggedUser?._id) &&
                            <Button
                                className="text-white p-0 me-2"
                                variant="link"
                                size="lg"
                                onClick={() => { handleLike(), setIsReviewLiked(true) }}
                            >
                                <Heart />
                            </Button>
                        }
                        {
                            reviewData.usersLikes?.includes(loggedUser?._id) &&
                            <Button
                                className="text-white p-0 me-2"
                                variant="link"
                                size="lg"
                                onClick={() => { handleDislike(), setIsReviewLiked(false) }}
                            >
                                <HeartFill />
                            </Button>
                        }

                        <span>{reviewData.likesCounter}</span>
                    </Col>
                    {
                        loggedUser?._id === author?._id &&
                        <Col xs={2} md={{ span: "auto" }} className="d-flex align-items-center">
                            <Button
                                className="text-white p-0"
                                variant="link"
                                size="lg"
                                onClick={() => setShowEditModal(true)}
                            >
                                <PencilSquare />
                            </Button>
                        </Col>
                    }
                    {
                        loggedUser?._id === author?._id &&

                        <Col xs={2} md={{ span: "auto" }} className="d-flex align-items-center">
                            <Button
                                className="text-white p-0"
                                variant="link"
                                size="lg"
                                onClick={() => handleReviewDelete()}
                            >
                                <Trash3 />
                            </Button>
                        </Col>
                    }
                </Row>
            </Card>

            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                backdrop={true}
                keyboard={true}
                size="xl"
                centered>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={handleEdit}>
                        <Row className="h-100">
                            <Col
                                md={{ span: 2 }}
                                className="rounded p-0 position-relative">
                                <img
                                    className="object-fit-cover h-100 w-100 rounded"
                                    src={`https://image.tmdb.org/t/p/w500${movieApiId.poster_path}`}
                                    alt={`${movieApiId.original_title} poster`} />
                                <Button
                                    className="ms-2 mt-2 fs-6 fw-bold position-absolute top-0 translate-middle rounded-circle m-0 rate d-flex align-items-center justify-content-center border border-5"
                                    style={{ height: "2.5rem", width: "2.5rem" }}
                                    onClick={() => { setShowRatingModal(true) }}
                                >
                                    <span>{selectedRating}</span>
                                </Button>
                            </Col>
                            <Col md={{ span: 10 }}>
                                <Row className="d-flex align-items-center">
                                    <Col>
                                        <p className="m-0 ps-2 d-flex align-items-center text-white"><span className='fs-5 fw-bold me-2'>{movieApiId.original_title}</span><span className="fs-6">({new Date(movieApiId.release_date).getFullYear()})</span></p>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={{ span: 1 }} className="pe-0">
                                        <img className='rounded-circle object-fit-cover'
                                            style={{ height: "3rem", width: "3rem" }}
                                            src={loggedUser?.avatar || homer} alt="avatar" />
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="reviewText">
                                            <Form.Control
                                                as="textarea"
                                                rows={9}
                                                type="text"
                                                placeholder="Escribe aquí lo que opinas de la película..."
                                                value={reviewData.content}
                                                name="content"
                                                onChange={handleReviewDataChange}
                                                className="bg-transparent text-white border-0 custom-placeholder"
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
                                    Editar Reseña
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>

            < Modal
                show={showRatingModal}
                onHide={() => setShowRatingModal(false)}
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
                                    setSelectedRating(i)
                                    setShowRatingModal(false)
                                }}
                            >
                                {i}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Modal.Body>
            </Modal >

        </div >
    )
}
export default ReviewCard
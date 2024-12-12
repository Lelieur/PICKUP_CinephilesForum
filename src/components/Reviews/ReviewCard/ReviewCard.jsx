import './ReviewCard.css'
import { Card, Row, Col, Button, Modal, Form, ButtonGroup } from "react-bootstrap"
import { homer } from '../../../const/image-paths'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/auth.context'

import { Heart, PencilSquare, Trash3 } from "react-bootstrap-icons"

import TimeSinceCreation from '../../../Tools/TimeSinceCreation';
import ReviewServices from "../../../services/review.services"

const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL

const ReviewCard = ({ _id, content, rate, likesCounter, createdAt, movieApiId, author, isUserProfile = false }) => {

    const cardClass = isUserProfile ? 'userProfile-card' : 'default-card'

    const { loggedUser } = useContext(AuthContext)

    const [reviewData, setReviewData] = useState({
        _id: _id,
        content: content,
        rate: rate,
        likesCounter: likesCounter,
        createdAt: createdAt,
        movieApiId: movieApiId,
        author: author
    })

    const [showEditModal, setShowEditModal] = useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false)
    const [selectedRating, setSelectedRating] = useState(rate);


    const formattedDate = TimeSinceCreation(createdAt)

    const handleReviewDataChange = e => {
        const { value, name } = e.currentTarget
        setReviewData({ ...reviewData, [name]: value })
    }

    const handleRatingChange = rating => {
        setReviewData({ ...reviewData, ["rate"]: rating })
    }

    const handleLikeClick = () => {

    }

    const handleEdit = e => {

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
                    <Col xs={1} md={2} className="ms-2 position-relative">
                        <img
                            className='object-fit-cover rounded w-100'
                            src={`${TMDB_API_IMG_URL}/w780/${movieApiId?.poster_path}`}
                            alt="movie poster"
                        />
                        <p
                            className="ms-3 mt-2 fs-6 fw-bold position-absolute top-0 start-0 translate-middle rounded-circle m-0 rate d-flex align-items-center justify-content-center border border-5"
                            style={{ height: "2.5rem", width: "2.5rem" }}
                        >
                            {rate}
                        </p>
                    </Col>
                    <Col xs={10} md={9}>
                        <Row className="d-flex align-items-center">
                            <Col>
                                <p className="m-0 d-flex align-items-center"><span className='fs-5 fw-bold me-2'>{movieApiId?.original_title}</span><span className="fs-6">({new Date(movieApiId?.release_date).getFullYear()})</span></p>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={{ span: 1 }} className="pe-0">
                                <img className='rounded-circle object-fit-cover'
                                    style={{ height: "3rem", width: "3rem" }}
                                    src={author?.avatar || homer} alt={author?.username} />
                            </Col>
                            <Col md={{ span: 11 }}>
                                <Row>
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
                    <Col md={{ span: "auto" }} className="d-flex align-items-center">
                        <Button
                            className="text-white p-0 me-2"
                            variant="link"
                            size="lg"
                            onClick={handleLikeClick}
                        >
                            <Heart />
                        </Button>
                        <span>{likesCounter}</span>
                    </Col>
                    {
                        loggedUser?._id === author?._id &&
                        <Col md={{ span: "auto" }} className="d-flex align-items-center">
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

                        <Col md={{ span: "auto" }} className="d-flex align-items-center">
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
                                            src={loggedUser?.avatar || homer} alt={loggedUser?.username} />
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

        </div>
    )
}

export default ReviewCard
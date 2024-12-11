import './ReviewCard.css';
import { Card, Row, Col, Button } from "react-bootstrap"
import { homer } from '../../../const/image-paths'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/auth.context'

import { Heart, PencilSquare, Trash3 } from "react-bootstrap-icons"

import TimeSinceCreation from '../../../Tools/TimeSinceCreation';

const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL

const ReviewCard = ({ _id, content, rate, likesCounter, createdAt, movieApiId, author }) => {

    const { loggedUser } = useContext(AuthContext)

    const formattedDate = TimeSinceCreation(createdAt)

    const handleLikeClick = () => {

    }

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    return (
        <div className="ReviewCard">
            <Card className='p-3 m-0 text-white text-start bg-transparent border rounded-0'>
                <Row>
                    <Col md={2} className="position-relative">
                        <img
                            className='object-fit-cover rounded w-100'
                            src={`${TMDB_API_IMG_URL}/w780/${movieApiId?.poster_path}`}
                            alt="movie poster"
                        />
                        <p
                            className="fs-4 position-absolute top-0 rounded-end m-0 rate d-flex align-items-center justify-content-center"
                            style={{ height: "2rem", width: "2rem" }}
                        >
                            {rate}
                        </p>
                    </Col>
                    <Col md={10}>
                        <Row className="d-flex align-items-center">
                            <Col>
                                <p className="m-0 d-flex align-items-center"><span className='fs-3 fw-bold me-2'>{movieApiId?.original_title}</span><span className="fs-5">({new Date(movieApiId?.release_date).getFullYear()})</span></p>
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
                                        <p className="m-0 fs-5"><span className="fw-bold">{author?.firstName}</span> @{author?.username} · {formattedDate}</p>
                                    </Col>
                                </Row>
                                <Row className='pt-2'>
                                    <Col className="ps-0">
                                        <p className="fs-5">{content}</p>
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
                    <Col md={{ span: "auto" }}>
                        <Button
                            className="text-white p-0"
                            variant="link"
                            size="lg"
                            onClick={handleEdit}
                        >
                            <PencilSquare />
                        </Button>
                    </Col>
                    <Col md={{ span: "auto" }}>
                        <Button
                            className="text-white p-0"
                            variant="link"
                            size="lg"
                            onClick={handleDelete}
                        >
                            <Trash3 />
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default ReviewCard

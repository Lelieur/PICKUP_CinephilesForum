import './ReviewCard.css';
import { Card, Row, Col, Button } from "react-bootstrap"
import { homer } from '../../../const/image-paths'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/auth.context'

const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL

const ReviewCard = ({ review, onLike, onEdit, onDelete }) => {

    const reviewData = review

    const { _id, content, rate, likesCounter, createdAt, movieApiId, author } = reviewData

    const { loggedUser } = useContext(AuthContext)

    const formattedDate = new Date(createdAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const handleLikeClick = () => {
        onLike(_id)
    }

    const handleEdit = () => {
        onEdit(review)
    }

    const handleDelete = () => {
        onDelete(_id)
    }

    const isOwner = loggedUser && loggedUser._id === review.author

    return (
        <div className="ReviewCard">
            <Card className='p-3 m-0 text-white text-start'>
                <Row>
                    <Col md={3}>
                        <Card.Img className='object-fit-cover h-100'
                            src={`${TMDB_API_IMG_URL}/w780/${movieApiId?.backdrop_path}`}
                            alt="movie poster"
                        />
                    </Col>
                    <Col md={9}>
                        <Row className='pe-3'>
                            <Col>
                                <Card.Subtitle className='fs-4'>
                                    {movieApiId?.original_title}{" "}
                                    <span>
                                        ({new Date(movieApiId?.release_date).getFullYear()})
                                    </span>
                                </Card.Subtitle>
                            </Col>
                        </Row>
                        <Row className='pt-4 d-flex pe-2'>
                            <Col xs={3} md={{ span: 2 }}>
                                <Card.Img className='rounded-circle object-fit-cover'
                                    style={{ height: "3rem", width: "3rem" }}
                                    src={author?.avatar || homer} alt={author?.username} />
                            </Col>
                            <Col className='ps-2' xs={6} md={{ span: 8 }}>
                                <Row>
                                    <Col>
                                        <Card.Title className='fs-6'>
                                            {author?.firstName}
                                        </Card.Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Subtitle>
                                            @{author?.username}
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
                                <Card.Text>{content}</Card.Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='d-flex align-items-center'>
                    <Col>
                        <span
                            className='p-0'
                            style={{ fontSize: "0.9rem", color: "#aaa" }}
                        >
                            {formattedDate}
                        </span>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center">
                    <Col className="text-end">
                        <Button
                            variant="outline-light"
                            size="sm"
                            onClick={handleLikeClick}
                        >
                            ❤️ {likesCounter} Likes
                        </Button>
                    </Col>
                </Row>
                {isOwner && (
                    <Row className="d-flex justify-content-end mt-2">
                        <Col xs="auto">
                            <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={handleEdit}
                            >
                                Editar
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </Button>
                        </Col>
                    </Row>
                )}
            </Card>
        </div>
    )
}

export default ReviewCard

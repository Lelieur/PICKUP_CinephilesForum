import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import { Facebook, Twitter, Instagram, Tiktok } from 'react-bootstrap-icons'

import { AuthContext } from "../../../contexts/auth.context"
import Loader from "../../../components/Loader/Loader"
import userServices from "../../../services/user.services"
import CommunityCard from "../../../components/CommunitiesComponents/CommunityCard/CommunityCard"
import ReviewCard from "../../../components/Reviews/ReviewCard/ReviewCard"
import NewReviewForm from "../../../components/Reviews/NewReviewForm/NewReviewForm"
import EditReviewForm from "../../../components/Reviews/EditReviewForm/EditReviewForm"
import reviewServices from "../../../services/review.services"

const UserProfilePage = () => {
    const { loggedUser } = useContext(AuthContext)
    const { id: userId } = useParams()


    const [isLoading, setIsLoading] = useState(true)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [reviewToEdit, setReviewToEdit] = useState(null)
    const [userDetails, setUserDetails] = useState({
        avatar: "",
        username: "",
        bio: "",
        socialNetworksProfiles: {
            facebook: "",
            instagram: "",
            twitter: "",
            tiktok: ""
        },
        favoriteGenres: [],
        communities: [],
        reviews: []
    })


    useEffect(() => {
        fetchUserData()
    }, [userId])

    const fetchUserData = () => {
        setIsLoading(true)

        userServices.fetchOneUser(userId)
            .then((response) => {
                const { data: userData } = response
                setUserDetails(userData)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
                alert("Ocurrió un error al cargar los datos del usuario.")
            })
    }

    const handleAddReview = () => setShowReviewForm(true)
    const handleEdit = (review) => {
        setShowEditForm(true)
        setReviewToEdit(review)
    }

    const handleDelete = (reviewId) => {
        reviewServices.deleteReview(reviewId)
            .then(() => {
                setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    reviews: prevDetails.reviews.filter(review => review._id !== reviewId)
                }))
            })
            .catch((err) => console.error("Error deleting review", err))
    }

    const handleReviewCreated = (newReview) => {
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            reviews: [newReview, ...prevDetails.reviews]
        }))
        setShowReviewForm(false)
    }
    const handleLike = (reviewId) => {
        console.log(`Like review with ID: ${reviewId}`)
    }

    const {
        avatar = '',
        username = '',
        bio = "Sin biografía",
        socialNetworksProfiles = {},
        favoriteGenres,
        communities = [],
        reviews = [],
    } = userDetails

    return (
        isLoading ? <Loader message="Cargando Perfil del usuario..." /> :
            <div className="UserProfilePage">
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <Row className="p-sm-3 d-flex justify-content-center align-items-center">
                                <Col xs={3} lg={2}>
                                    <img className="border border-white object-fit-cover rounded-circle"
                                        style={{ height: "5rem", width: "5rem" }}
                                        src={avatar}
                                        alt="Avatar del usuario" />
                                </Col>
                                <Col xs={9} lg={5}>
                                    <Row>
                                        <Col>
                                            <span className="fw-bold fs-3">{loggedUser?.username}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>{bio}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>{favoriteGenres.join(",")}</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} lg={5}>
                                    <Row className="order-2 d-flex justify-content-center align-items-center">
                                        <Col xs={{ span: 8 }} lg={{ span: 4 }}>
                                            <Row>
                                                <Col as="a" href={socialNetworksProfiles.facebook || "#"} target="_blank" className={socialNetworksProfiles.facebook ? "text-white text-decoration-none" : "d-none"}>
                                                    <Facebook size={15} />
                                                </Col>
                                                <Col as="a" href={socialNetworksProfiles.twitter || "#"} target="_blank" className={socialNetworksProfiles.twitter ? "text-white text-decoration-none" : "d-none"}>
                                                    <Twitter size={15} />
                                                </Col>
                                                <Col as="a" href={socialNetworksProfiles.instagram || "#"} target="_blank" className={socialNetworksProfiles.instagram ? "text-white text-decoration-none" : "d-none"}>
                                                    <Instagram size={15} />
                                                </Col>
                                                <Col as="a" href={socialNetworksProfiles.tiktok || "#"} target="_blank" className={socialNetworksProfiles.tiktok ? "text-white text-decoration-none" : "d-none"}>
                                                    <Tiktok size={15} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{ span: 8 }} lg={{ span: 8 }}>
                                            <Row className="mt-sm-3 mt-lg-0 order-1 d-flex justify-content-center">
                                                <Col xs={{ span: 3 }} lg={{ span: 5 }} className="text-center p-0">
                                                    <p className="fs-5 fw-bold m-0">{reviews.length}</p>
                                                    <p className="m-0 opacity-50">RESEÑAS</p>
                                                </Col>
                                                <Col xs={{ span: 3 }} lg={{ span: 5 }} className="text-center p-0">
                                                    <p className="fs-5 fw-bold m-0">{communities.length}</p>
                                                    <p className="m-0 opacity-50">COMUNIDADES</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={12} className="p-xs-0">
                            <p className="m-0 fw-bold fs-5">Comunidades a las que pertenece</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {communities.length > 0 ? (
                            communities.map(community => (
                                <Col key={community.id} md={4} className="mb-3">
                                    <CommunityCard {...community} />
                                </Col>
                            ))
                        ) : (
                            <Col>No pertenece a ninguna comunidad.</Col>
                        )}
                    </Row>

                    <Row className="mt-3">
                        <Col md={12} className="p-xs-0">
                            <p className="m-0 fw-bold fs-5">Reseñas realizadas</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <Col key={review._id} md={4} className="mb-3" >
                                    <ReviewCard
                                        review={{ ...review }}
                                        onLike={handleLike}
                                        onEdit={handleEdit(review)}
                                        onDelete={handleDelete(review._id)}
                                    />

                                </Col>
                            ))
                        ) : (
                            <Col>No ha realizado ninguna reseña.</Col>
                        )}
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Button onClick={handleAddReview}>Añadir Reseña</Button>
                        </Col>
                    </Row>
                    <Modal show={showReviewForm} onHide={() => setShowReviewForm(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Añadir Reseña</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewReviewForm onReviewCreated={handleReviewCreated} />
                        </Modal.Body>
                    </Modal>

                    {showEditForm && (
                        <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Reseña</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditReviewForm
                                    review={reviewToEdit}
                                    onReviewUpdated={() => {
                                        fetchUserData();
                                        setShowEditForm(false);
                                    }}
                                />
                            </Modal.Body>
                        </Modal>
                    )}
                </Container>
            </div>
    )
}

export default UserProfilePage

import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import { Facebook, Twitter, Instagram, Tiktok } from 'react-bootstrap-icons'
import { homer } from "../../../const/image-paths"
import { AuthContext } from "../../../contexts/auth.context"

import Loader from "../../../components/Loader/Loader"
import UserServices from "../../../services/user.services"
import ReviewServices from "../../../services/review.services"
import CommunityCard from "../../../components/CommunitiesComponents/CommunityCard/CommunityCard"
import ReviewCard from "../../../components/Reviews/ReviewCard/ReviewCard"
import NewReviewForm from "../../../components/Reviews/NewReviewForm/NewReviewForm"
import EditUserForm from "../../../components/User/EditFormUser/EditFormUser"

const UserProfilePage = () => {

    const { loggedUser } = useContext(AuthContext)
    const { id: userId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [isUserDataLoaded, setUserDataLoaded] = useState(false)
    const [reviewsData, setReviewsData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)


    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        fetchReviewsData()
    }, [isUserDataLoaded])

    const fetchUserData = () => {
        UserServices
            .fetchOneUser(userId)
            .then((response) => {
                const { data: userData } = response
                setUserData(userData)
                setUserDataLoaded(true)
            })
            .catch(err => console.log(err))
    }

    const { avatar, username, bio, socialNetworksProfiles, favoriteGenres, communities, reviews } = userData

    const fetchReviewsData = () => {
        const reviewsPromises = reviews?.map(review =>
            ReviewServices
                .getOneReviewFullData(review)
                .then(response => {
                    return response.data
                })
                .catch(err => console.log(err))
        )
        Promise
            .all(reviewsPromises)
            .then(response => {
                setReviewsData(response)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

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
                                        src={avatar ? avatar : homer}
                                        alt="Avatar del usuario" />
                                </Col>
                                <Col xs={9} lg={5}>
                                    <Row>
                                        <Col>
                                            <span className="fw-bold fs-3">{username}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>{bio}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {
                                                favoriteGenres.map(genre => {
                                                    return <span key={genre}>{genre} </span>
                                                })
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} lg={5}>
                                    {loggedUser && (
                                        <Button className="border-0 fw-bold btn-style-2 mt-3" onClick={() => setShowEditModal(true)}>
                                            Editar Perfil
                                        </Button>
                                    )}
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
                            <p className="m-0 fw-bold fs-5">Comunidades administradas</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {communities.length > 0 ? (
                            communities.map(community => (
                                <Col key={community._id} md={4} className="mb-3">
                                    <CommunityCard {...community} />
                                </Col>
                            ))
                        ) : (
                            <Col>No pertenece a ninguna comunidad.</Col>
                        )}
                    </Row>
                    <Row className="mt-3">
                        <Col md={12} className="p-xs-0">
                            <p className="m-0 fw-bold fs-5">Comunidades a las que pertenece</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {communities.length > 0 ? (
                            communities.map(community => (
                                <Col key={community._id} md={4} className="mb-3">
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
                        {reviewsData.length > 0 ? (
                            reviewsData.map(review => (
                                <Col key={review._id} md={6} className="mb-3" >
                                    <ReviewCard {...review} />
                                </Col>
                            ))
                        ) : (
                            <Col>No ha realizado ninguna reseña.</Col>
                        )}
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Button className="border-0 fw-bold btn-style-2" onClick={() => setShowModal(true)}>Añadir Reseña</Button>
                        </Col>
                    </Row>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Añadir Reseña</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewReviewForm />
                        </Modal.Body>
                    </Modal>
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Perfil</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditUserForm />
                        </Modal.Body>
                    </Modal>
                </Container>
            </div>
    )
}
export default UserProfilePage
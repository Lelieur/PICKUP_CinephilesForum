import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import { Facebook, Twitter, Instagram, Tiktok } from 'react-bootstrap-icons'
import { homer } from "../../../const/image-paths"
import { AuthContext } from "../../../contexts/auth.context"

import Loader from "../../../components/Loader/Loader"
import UserServices from "../../../services/user.services"
import ReviewServices from "../../../services/review.services"
import NewReviewForm from "../../../components/Reviews/NewReviewForm/NewReviewForm"
import EditUserForm from "../../../components/User/EditFormUser/EditFormUser"
import NewCommunityForm from "./../../../components/CommunitiesComponents/Forms/NewCommunityForm/NewCommunityForm"
import TopCommunitiesList from "../../../components/CommunitiesComponents/TopCommunitiesList/TopCommunitiesList"
import CommunitiesList from "../../../components/CommunitiesComponents/CommunitiesList/CommunitiesList"
import ReviewsList from "../../../components/Reviews/ReviewsList/ReviewsList"

import "./UserProfilePage.css"

const UserProfilePage = () => {

    const { loggedUser } = useContext(AuthContext)
    const { id: userId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [isUserDataLoaded, setUserDataLoaded] = useState(false)
    const [reviewsData, setReviewsData] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [showNewCommunityModal, setShowNewCommunityModal] = useState(false)

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
                                <Col xs={3} lg={1}>
                                    <img className="border border-white object-fit-cover rounded-circle"
                                        style={{ height: "5rem", width: "5rem" }}
                                        src={avatar ? avatar : homer}
                                        alt="Avatar del usuario" />
                                </Col>
                                <Col xs={9} lg={5}>
                                    <Row className="align-items-center">
                                        <Col xs={{ span: "auto" }}>
                                            <span className="fw-bold fs-3">{username}</span>
                                        </Col>
                                        <Col xs={{ span: "auto" }}>
                                            {loggedUser._id === userId && (
                                                <Button className="border-0 fw-bold btn-style-1 bg-transparent" onClick={() => setShowEditModal(true)}>
                                                    Editar Perfil
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className="fs-5">{bio}</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <Row className="order-2 d-flex justify-content-center align-items-center">
                                        <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 4 }} className="d-none d-md-inline">
                                            <Row >
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
                                        <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 8 }}>
                                            <Row className="mt-sm-3 mt-lg-0 order-1 d-flex justify-content-center">
                                                <Col xs={{ span: 6 }} lg={{ span: 5 }} className="text-center p-0">
                                                    <p className="fs-5 fw-bold m-0">{reviews.length}</p>
                                                    <p className="m-0 opacity-50">RESEÑAS</p>
                                                </Col>
                                                <Col xs={{ span: 6 }} lg={{ span: 5 }} className="text-center p-0">
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
                    <Row>
                        <Col xs={12} md={6}>
                            <Row className="mt-3 align-items-center">
                                <Col xs={{ span: "auto" }}>
                                    <p className="m-0 fw-bold fs-5">Reseñas realizadas</p>
                                </Col>
                                {
                                    loggedUser._id === userId &&
                                    <Col xs={{ span: "auto" }} md={{ span: "auto" }} className="me-auto mt-2 mt-md-0" >
                                        <Button className="border-0 fw-bold btn-style-2 " onClick={() => setShowModal(true)}>Añadir Reseña</Button>
                                    </Col>
                                }
                            </Row>
                            <Row className="mt-3 reviews-list">
                                {
                                    reviewsData.length > 0 ?
                                        <Col>
                                            <ReviewsList reviews={reviewsData} />
                                        </Col>
                                        :
                                        <Col>No ha realizado ninguna reseña.</Col>
                                }
                            </Row>
                        </Col>
                        <Col xs={12} md={6}>
                            <Row className="mt-3 align-items-center">
                                <Col xs={{ span: "auto" }} md={{ span: "auto" }} className="p-xs-0">
                                    <p className="m-0 fw-bold fs-5">Comunidades administradas</p>
                                </Col>
                                {
                                    loggedUser._id === userId &&
                                    <Col xs={{ span: "auto" }} md={{ span: "auto" }} className="me-auto mt-2 mt-md-0" >
                                        <Button className="border-0 fw-bold btn-style-2 " onClick={() => setShowNewCommunityModal(true)}>Crear Comunidad</Button>
                                    </Col>
                                }
                            </Row>
                            <Row className="mt-3">
                                {
                                    communities.length > 0 ?
                                        <TopCommunitiesList communities={communities} />
                                        :
                                        <Col>No pertenece a ninguna comunidad.</Col>
                                }
                            </Row>
                            <Row className="mt-3">
                                <Col md={12} className="p-xs-0">
                                    <p className="m-0 fw-bold fs-5">Comunidades a las que pertenece</p>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                {
                                    communities.length > 0 ?
                                        <CommunitiesList communities={communities} />
                                        :
                                        <Col>No pertenece a ninguna comunidad.</Col>
                                }
                            </Row>
                        </Col>
                    </Row>


                    <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        size="lg"
                        centered>
                        <Modal.Body className="p-0 m-0">
                            <NewReviewForm className="p-0 m-0" />
                        </Modal.Body>
                    </Modal>

                    <Modal
                        show={showNewCommunityModal}
                        onHide={() => setShowNewCommunityModal(false)}
                        size="lg"
                        centered>
                        <Modal.Body className="p-0 m-0">
                            <NewCommunityForm />
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
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Facebook, Twitter, Instagram, Tiktok, Linkedin } from 'react-bootstrap-icons'

import { homer } from "../../../const/image-paths"
import { AuthContext } from "../../../contexts/auth.context"
import Loader from "../../../components/Loader/Loader"
import userServices from "../../../services/user.services"
import CommunityCard from "../../../components/CommunitiesComponents/CommunityCard/CommunityCard"
import ReviewCard from "../../../components/Reviews/ReviewCard/ReviewCard"
import NewReviewForm from "../../../components/Reviews/NewReviewForm/NewReviewForm"
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
    }, [])

    const fetchUserData = () => {
        const token = localStorage.getItem('authToken')
        setIsLoading(true)

        userServices
            .fetchOneUser(userId)
            .then((response) => {
                const { data: userData } = response
                setUserDetails(userData)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }
    const handleAddReview = () => {
        setShowReviewForm(true)
    }

    const handleEditReview = (review) => {
        setShowEditForm(true)
        setReviewToEdit(review)
    }

    const handleDeleteReview = (reviewId) => {
        reviewServices.deleteReview(reviewId)
            .then(() => {
                fetchUserData()
            })
            .catch((err) => console.error("Error deleting review", err))
    }

    const {
        avatar,
        bio = "Sin biografía",
        socialNetworksProfiles = {},
        favoriteGenres,
        communities = [],
        createdAt,
        reviews = [],
    } = userDetails


    return (

        isLoading ? <Loader message="Cargando Perfil del usuario..." /> :

            <div className="UserProfilePage">

                <Container className="mt-5">
                    <Row >
                        <Col>
                            <Row className="p-sm-3 d-flex justify-content-center align-items-center">
                                <Col xs={3} lg={2}>
                                    <img className="border border-white object-fit-cover rounded-circle"
                                        style={{ height: "5rem", width: "5rem" }}
                                        src={avatar ? avatar : homer}
                                        alt="avatar" />
                                </Col>
                                <Col xs={9} lg={5} >
                                    <Row>
                                        <Col  >
                                            <span className="fw-bold fs-3">{loggedUser?.username}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <p>{bio}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>
                                                {favoriteGenres}
                                            </p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} lg={5} >
                                    <Row className="order-2 d-flex justify-content-center align-items-center">
                                        <Col xs={{ span: 8 }} lg={{ span: 4 }}>
                                            <Row>
                                                <Col as="a" href={socialNetworksProfiles.facebook} target="_blank" className="text-white text-decoration-none opacity-50 text-center p-0">
                                                    <Facebook target="_blank" size={15} />
                                                </Col>
                                                <Col as="a" href={socialNetworksProfiles.twitter} target="_blank" className="text-white text-decoration-none opacity-50 text-center p-0">
                                                    <Twitter size={15} />
                                                </Col>
                                                <Col as="a" href={socialNetworksProfiles.instagram} target="_blank" className="text-white text-decoration-none opacity-50 text-center p-0">
                                                    <Instagram size={15} />
                                                </Col>
                                                <Col as="a" href={socialNetworksProfiles.tiktok} target="_blank" className="text-white text-decoration-none opacity-50 text-center p-0">
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
                        <Col md={{}} className="p-xs-0">
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
                        <Col md={{}} className="p-xs-0">
                            <p className="m-0 fw-bold fs-5">Reseñas realizadas</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <Col key={review.id} md={4} className="mb-3">
                                    <ReviewCard {...review} onEdit={handleEditReview} onDelete={handleDeleteReview} />
                                </Col>
                            ))
                        ) : (
                            <Col>No ha realizado ninguna reseña.</Col>
                        )}

                        {/* Add Review Button */}
                        <Row className="mt-3">
                            <Col>
                                <Button onClick={handleAddReview}>Añadir Reseña</Button>
                            </Col>
                        </Row>
                    </Row>
                    {/* New Review Form */}
                    {showReviewForm && <NewReviewForm onReviewCreated={fetchUserData} />}
                    {/* Edit Review Form */}
                    {showEditForm && <EditReviewForm review={reviewToEdit} onReviewUpdated={fetchUserData} />}

                </Container>

            </div>
    )

}
export default UserProfilePage
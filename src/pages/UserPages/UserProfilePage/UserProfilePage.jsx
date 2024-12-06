import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import { Facebook, Twitter, Instagram, Tiktok, Linkedin } from 'react-bootstrap-icons'

import { homer } from "../../../const/image-paths"

import Loader from "../../../components/Loader/Loader"

const API_URL = import.meta.env.VITE_APP_API_URL


const UserProfilePage = () => {

    const { id: userId } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = () => {
        axios
            .get(`${API_URL}/api/users/${userId}`)
            .then(response => {

                const { data: userData } = response
                setUserDetails(userData)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const { avatar, username, bio, socialNetworksProfiles, favoriteGenres, communities, createdAt, reviews } = userDetails

    return (

        isLoading ? <Loader /> :

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
                                            <span className="fw-bold fs-3">{username}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <p>{bio}</p>
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
                </Container>
            </div>
    )
}

export default UserProfilePage
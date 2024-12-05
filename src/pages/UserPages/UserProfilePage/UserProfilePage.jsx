import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"

import { homer } from "../../../const/image-paths"

const API_URL = import.meta.env.VITE_APP_API_URL


const UserProfilePage = () => {

    const { id: userId } = useParams()

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
            })
            .catch(err => console.log(err))
    }

    const { avatar, username, bio, socialNetworksProfiles, favoriteGenres, communities, createdAt, reviews } = userDetails

    return (
        <div className="UserProfilePage">
            <Container className="mt-5">
                <Row className="d-flex justify-content-center">
                    <Col className="p-xs-0" sm={12} md={8}>
                        <Row className="p-sm-3">
                            <Col xs={3} lg={2}>
                                <img className="border border-white object-fit-cover rounded-circle opacity-50"
                                    style={{ height: "6rem", width: "6rem" }}
                                    src={avatar ? avatar : homer}
                                    alt="avatar" />
                            </Col>
                            <Col xs={6} lg={6} className="ps-sm-5">
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
                            </Col>
                            <Col xs={3} lg={4} className="p-sm-0">
                                <Row className="d-flex justify-content-end">
                                    <Col className="text-center border border-ligth p-0">
                                        <p className="fs-5 fw-bold m-0">{reviews.length}</p>
                                        <p className="m-0 opacity-50">Reseñas</p>
                                    </Col>
                                    <Col className="text-center border border-ligth p-0">
                                        <p className="fs-5 fw-bold m-0">{communities.length}</p>
                                        <p className="m-0 opacity-50">Comunidades</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserProfilePage
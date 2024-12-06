import axios from "axios"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Col, Container, Row, Button } from "react-bootstrap"

import Loader from "../../../components/Loader/Loader"
import MoviesList from "../../../components/MovieComponentes/MoviesList/MoviesList"
import UserCard from "../../../components/User/UserCard/UserCard"
import PersonsList from "../../../components/PersonComponents/PersonsList/PersonsList"

import communityServices from "../../../services/community.services"

const API_URL = import.meta.env.VITE_APP_API_URL

const CommunityDetailsPage = () => {

    const [community, setCommunity] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { communityId } = useParams()

    useEffect(() => {
        loadCommunityDetails()
    }, [])

    const loadCommunityDetails = () => {

        communityServices
            .fetchOneCommunityFullData(communityId)
            .then(response => {

                const { data: community } = response

                setCommunity(community)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const { title, description, cover, genres, fetishActors, fetishDirectors, decades, moviesApiIds, users, owner, createdAt, updatedAt } = community

    return (

        isLoading ? <Loader /> :

            <div className="CommunityDetailsPage">
                <Container>
                    <Row>
                        <Col className="position-relative" style={{ height: "20rem" }}>
                            <img className="w-100 h-100 object-fit-cover rounded opacity-50" src={cover} alt="Cover" />
                            <div className="ps-5 community-title-container position-absolute top-50 translate-middle-y">
                                <h1 className="fw-bold m-0 pt-4">{title} ({moviesApiIds?.length})</h1>
                                {
                                    genres.map(genre => {
                                        return (
                                            <span key={genre} className="me-2 fw-bold opacity-50">{genre}</span>
                                        )
                                    })
                                }
                                <p className="fs-5 mt-0" >{description}</p>
                                <Button className="border-0 fw-bold btn-style-2">
                                    Unirse a la comunidad
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 9 }}>
                            <Row className="d-flex justify-content-between">
                                <Col>
                                    <Row className="mt-3">
                                        <Col>
                                            <p className="m-0 fw-bold ">Décadas</p>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col>
                                            {
                                                decades.map(decade => {
                                                    return (
                                                        <span bg="black" key={decade} className="me-2 opacity-50">{decade} </span>
                                                    )
                                                })
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row className="mt-3">
                                        <Col>
                                            <p className="m-0 fw-bold ">Actores fetiche de la comunidad</p>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col>
                                            {
                                                fetishActors?.length ?
                                                    <PersonsList persons={fetishActors} />
                                                    :
                                                    <Row>
                                                        <Col >
                                                            Todavía no hay actores fetiche en esta comunidad
                                                        </Col>
                                                    </Row>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row className="mt-3">
                                        <Col>
                                            <p className="m-0 fw-bold ">Directores fetiche de la comunidad</p>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col>
                                            {
                                                fetishDirectors?.length ?
                                                    <PersonsList persons={fetishDirectors} />
                                                    :
                                                    <Row>
                                                        <Col >
                                                            Todavía no hay actores fetiche en esta comunidad
                                                        </Col>
                                                    </Row>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col md={{ span: 9 }}>
                            <Row>
                                <Col>
                                    <p className="m-0 fw-bold fs-5">Películas recomendadas por la comunidad</p>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    {
                                        moviesApiIds?.length ?
                                            <MoviesList movies={moviesApiIds} />
                                            :
                                            <Row>
                                                <Col >
                                                    Todavía no hay ninguna película recomendada en esta comunidad
                                                </Col>
                                            </Row>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mt-4 ps-lg-4 ps-md-0" md={{ span: 3 }}>
                            <Row className="mt-3">
                                <Col>
                                    <p className="fw-bold fs-6">Usuarios de la comunidad ({users.length})</p>
                                    <hr className="p2" />
                                </Col>
                            </Row>
                            {
                                users?.length ?
                                    <Row>
                                        {
                                            users.map(elm => {
                                                return (
                                                    <Col className="mb-2" lg={{ span: 12 }} key={elm._id}>
                                                        <UserCard {...elm} />
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>

                                    :

                                    <Row>
                                        <Col  >
                                            Ningún usuario sigue esta comunidad
                                        </Col>
                                    </Row>

                            }
                        </Col>
                    </Row>
                </Container >
            </div >
    )
}

export default CommunityDetailsPage
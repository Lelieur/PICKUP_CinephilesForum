import axios from "axios"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"

import Loader from "../../../components/Loader/Loader"
import MovieCard from "../../../components/MovieCard/MovieCard"
import UserCard from "../../../components/UserCard/UserCard"

const API_URL = import.meta.env.VITE_APP_API_URL

const CommunityDetailsPage = () => {

    const [community, setCommunity] = useState({})
    const [communityMovies, setCommunityMovies] = useState([])
    const [communityUsers, setCommunityUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { communityId } = useParams()

    useEffect(() => {
        fetchCommunityDetails()
    }, [])

    const fetchCommunityDetails = () => {
        axios
            .get(`${API_URL}/api/communities/${communityId}`)
            .then(response => {

                const { data: community } = response

                setCommunity(community)
                return (response.data)
            })
            .then(community => {

                const { moviesApiIds, users } = community

                const moviesPromises = moviesApiIds.map(elm => axios.get(`${API_URL}/api/movies/${elm}`))
                const usersPromises = users.map(elm => axios.get(`${API_URL}/api/users/${elm}`))

                return [moviesPromises, usersPromises]
            })
            .then(([moviesPromises, usersPromises]) => {

                let allMovies = []
                let allUsers = []

                Promise
                    .all(moviesPromises)
                    .then(response => {
                        response.map(movie => {
                            allMovies.push(movie.data)
                        })
                        return allMovies
                    })
                    .then(response => {
                        setCommunityMovies(response)
                    })
                    .catch(err => console.log(err))

                Promise
                    .all(usersPromises)
                    .then(response => {
                        response.map(user => {
                            allUsers.push(user.data)
                        })
                        return allUsers
                    })
                    .then(response => {
                        setCommunityUsers(response)
                    })
                    .catch(err => console.log(err))
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }

    console.log(communityUsers)

    const { title, description, cover, genres, fetishActors, decades, moviesApiIds, users, owner, createdAt, updatedAt } = community

    return (

        isLoading ? <Loader /> :

            <div className="CommunityDetailsPage">
                <Container>
                    <h1 className="fw-bold m-0 pt-4">{title} ({moviesApiIds.length})</h1>
                    <p>{users.length} usuarios siguen esta comunidad</p>
                    <p className="fs-4 mt-0 opacity-50" >{description}</p>
                    <Row>
                        <Col className="pt-5" xs={12} sm={12} md={12} lg={9}>
                            {
                                Array.isArray(communityMovies) ?
                                    <Row>
                                        {
                                            communityMovies.map(elm => {
                                                return (
                                                    <Col key={elm.id} xs={12} sm={6} md={4} lg={3} className="mt-3 mb-3 pe-4">
                                                        <MovieCard {...elm} />
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>

                                    :

                                    <Row>
                                        <Col xs={12} sm={6} md={4} lg={3} className="mt-3 mb-3 pe-4">
                                            <MovieCard {...communityMovies} />
                                        </Col>
                                    </Row>
                            }
                        </Col>
                        <Col className="ps-lg-5 ps-md-0" lg={3} bg="success">
                            <Row>
                                <p className="opacity-50">Usuarios de la comunidad ({users.length})</p>
                                <hr />
                            </Row>
                            {
                                Array.isArray(users) ?
                                    <Row>
                                        {
                                            communityUsers.map(elm => {
                                                return (
                                                    <Col className="p-0 mt-2" lg={{ span: 12 }} key={elm._id}>
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
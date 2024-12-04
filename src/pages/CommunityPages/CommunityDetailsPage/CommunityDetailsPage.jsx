import axios from "axios"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"

import Loader from "../../../components/Loader/Loader"
import MovieCard from "../../../components/MovieCard/MovieCard"

const API_URL = import.meta.env.VITE_APP_API_URL

const CommunityDetailsPage = () => {

    const [community, setCommunity] = useState({})
    const [movies, setMovies] = useState([])
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

                const { moviesApiIds } = community

                const promises =
                    moviesApiIds.map(elm => axios.get(`${API_URL}/api/movies/${elm}`))

                return promises
            })
            .then(response => {

                const promises = response

                let allMovies = []

                Promise
                    .all(promises)
                    .then(response => {
                        response.map(movie => {
                            allMovies.push(movie.data)
                        })
                        return allMovies
                    })
                    .then(response => {
                        console.log(response)
                        setMovies(response)
                        setIsLoading(false)
                    })
                    .catch(err => console.log(err))
            })
            .then()
            .catch(err => console.log(err))
    }

    console.log(movies)

    const { title, description, cover, genres, fetishActors, decades, moviesApiIds, users, owner, createdAt, updatedAt } = community

    return (

        isLoading ? <Loader /> :

            <div className="CommunityDetailsPage">
                <Container>
                    <h1 className="fw-bold m-0 pt-4">{title} ({moviesApiIds.length})</h1>
                    <p>{users.length} usuarios siguen esta comunidad</p>
                    <p className="fs-4 mt-0 opacity-50" >{description}</p>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={9}>
                            {
                                Array.isArray(movies) ?
                                    <Row>
                                        {
                                            movies.map(elm => {
                                                return (
                                                    <Col xs={12} sm={6} md={4} lg={3} className="mt-3 mb-3 pe-4">
                                                        <MovieCard key={elm.id} {...elm} />
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                    :

                                    <Col xs={12} sm={6} md={4} lg={3} className="mt-3 mb-3 pe-4">
                                        <MovieCard {...movies} />
                                    </Col>
                            }
                        </Col>
                        <Col lg={3} bg="success">
                            <p>Usuarios de la comunidad</p>
                            <hr />
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default CommunityDetailsPage
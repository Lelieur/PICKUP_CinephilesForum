import { Container, Row, Col, Button } from 'react-bootstrap'
import { homeCover } from '../../const/image-paths'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"

import MoviesPostersList from '../../components/MovieComponentes/MoviesPostersList/MoviesPostersList'
import CommunitiesList from '../../components/CommunitiesComponents/CommunitiesList/CommunitiesList'
import Loader from '../../components/Loader/Loader'
import CommunityServices from '../../services/community.services'
import ReviewServices from '../../services/review.services'

import "./HomePage.css"

const HomePage = () => {

    const [communities, setCommunities] = useState([])
    const [movies, setMovies] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAllData()
    }, [])


    const fetchAllData = () => {

        const promises = [
            CommunityServices.fetchCommunities(),
            ReviewServices.getLastedMoviesReviewed()
        ]

        Promise
            .all(promises)
            .then(([communities, movies]) => {
                setCommunities(communities.data)
                setMovies(movies.data)
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }


    return (

        isLoading ? <Loader /> :

            <div className="HomePage">
                <Row>
                    <Col className="position-relative" style={{ height: "30rem" }}>
                        <img className="w-100 h-100 object-fit-cover opacity-100" src={homeCover} alt="Home Cover" />
                        <div className="w-100 backgroud-faded-down position-absolute top-0" style={{ height: "30%" }} />
                        <div className="w-100 backgroud-faded-up position-absolute bottom-0" style={{ height: "30%" }} />
                        <div className="p-5 w-100 top-50 start-50 translate-middle position-absolute text-center">
                            <h1 className="text-center fw-bold">Conecta, comparte y crea con cinéfilos de todo el mundo</h1>
                            <p className="text-center fs-5"> La web de cinéfilos para cinéfilos que estábais esperando </p>
                            <Button className="btn-style-2 border-0 btn-sm fw-bold me-3" as={Link} to="/registro">EMPEZAR</Button>
                        </div>
                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col>
                            <p className="fs-5 fw-bold">Últimas películas comentadas</p>
                            <MoviesPostersList movies={movies} />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <p className="fs-5 fw-bold">Nuestras comunidades de cinéfilos</p>
                            <CommunitiesList communities={communities} />
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default HomePage
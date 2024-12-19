import MovieCard from "../MovieCard/MovieCard"

import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

import "./MoviesList.css"

const MoviesList = ({ movies }) => {

    return (
        <div className="MoviesList">
            <Row>
                {
                    movies.map(elm => {
                        return (
                            <Col key={elm.id} xs={12} sm={6} md={4} lg={3} className="pe-3 pb-3">
                                <Link to={`/reviews/movie/${elm.id}`} className="text-decoration-none">
                                    <MovieCard {...elm} />
                                </Link >
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default MoviesList
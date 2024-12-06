import MovieCard from "../MovieCard/MovieCard"

import { Row, Col } from "react-bootstrap"

import "./MoviesList.css"

const MoviesList = ({ movies }) => {

    return (
        <div className="MoviesList">
            <Row className="movies-list">
                {
                    movies.map(elm => {
                        return (
                            <Col key={elm.id} xs={12} sm={6} md={4} lg={3} className="me-2">
                                <MovieCard {...elm} />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default MoviesList
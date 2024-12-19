import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

import MoviePosterCard from "../MoviePosterCard/MoviePosterCard"

import "./MoviesPosterList.css"

const MoviesPostersList = ({ movies }) => {

    return (
        <div className="MoviesPostersList">
            <Container>
                <Row>
                    {
                        movies.map(movie => {
                            return (
                                <Col xs={{ span: 5 }} md={{ span: 3 }} className="ms-0 p-1" key={movie.id}>
                                    <Link to={`/reviews/movie/${movie.id}`} className="text-decoration-none">
                                        <MoviePosterCard  {...movie} />
                                    </Link >
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}
export default MoviesPostersList
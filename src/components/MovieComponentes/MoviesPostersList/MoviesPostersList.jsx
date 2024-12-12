import { Container, Row, Col } from "react-bootstrap"
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
                                <Col xs={{ span: 5 }} md={{ span: 3 }} className="ms-0 p-1">
                                    <MoviePosterCard key={movie.id} {...movie} />
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
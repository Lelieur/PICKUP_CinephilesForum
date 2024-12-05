const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL

import "./MovieCard.css"

import { Link } from "react-router-dom"
import { Card } from 'react-bootstrap/';

const MovieCard = ({ backdrop_path, original_title }) => {
    return (
        <div className="MovieCard">
            <Link className="text-decoration-none" to={`#`}>

                <Card className="card text-white border-0 rounded d-flex flex-row" bg="black">
                    <Card.Img variant="top order-2 rounded-end" src={`${TMDB_API_IMG_URL}/w1280/${backdrop_path}`} style={{ height: "12rem", objectFit: "cover" }} />
                    <Card.Body className="order-1 text-vertical p-1">
                        <Card.Title className="mt-2 fw-bold m-0">{original_title}</Card.Title>
                    </Card.Body>
                </Card>

            </Link>
        </div>
    )
}

export default MovieCard
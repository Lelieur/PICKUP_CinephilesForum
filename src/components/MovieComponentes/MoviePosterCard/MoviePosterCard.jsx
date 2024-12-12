import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"

const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL

import "./MoviePosterCard.css"

const MoviePosterCard = ({ id, original_title, backdrop_path, poster_path, movieApiId }) => {

    return (
        <div className="MoviePosterCard">
            <Link to={id ? `/reviews/movie/${id}` : `/reviews/movie/${movieApiId.id}`}>
                <Card className="border-0 p-0 m-0" bg="black">
                    <Card.Img variant="top rounded object-fit-cover" src={poster_path ? `${TMDB_API_IMG_URL}/w1280/${poster_path}` : `${TMDB_API_IMG_URL}/w1280/${movieApiId.poster_path}`} />
                </Card>
            </Link >
        </div >
    )
}

export default MoviePosterCard
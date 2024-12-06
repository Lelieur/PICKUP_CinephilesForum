const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL
import { Card } from 'react-bootstrap/';

import "./PersonCard.css"

const PersonCard = ({ name, profile_path }) => {
    return (
        <div className="PersonCard">
            <img className="rounded-circle object-fit-cover"
                style={{ width: "3rem", height: "3rem" }}
                src={`${TMDB_API_IMG_URL}/w1280/${profile_path}`}
                alt={`${name} foto`} />
        </div>
    )
}

export default PersonCard
import { Link } from "react-router-dom"
import { Card } from 'react-bootstrap/';

import "./CommunityCard.css"

const CommunityCard = ({ _id, title, cover }) => {
    return (
        <div className="CommunityCard">
            <Link className="text-decoration-none" to={`/comunidades/detalles/${_id}`}>

                <Card className="card text-white border-0 rounded d-flex flex-row" bg="black">
                    <Card.Img variant="top order-2 rounded-end" src={cover} style={{ height: "12rem", objectFit: "cover" }} />
                    <Card.Body className="order-1 text-vertical p-1">
                        <Card.Title className="mt-2 fw-bold m-0">{title?.toUpperCase().trim()}</Card.Title>
                    </Card.Body>
                </Card>

            </Link>
        </div>
    )
}

export default CommunityCard
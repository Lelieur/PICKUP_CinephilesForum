import axios from "axios"
import { useState, useEffect } from "react"

import ReviewCard from "../ReviewCard/ReviewCard"
import { Col, Row } from "react-bootstrap"

import "./ReviewsList.css"

const ReviewsList = () => {

    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = () => {
        axios
            .get("http://localhost:5005/api/reviews")
            .then(response => {
                setReviews(response.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.error("Error en la solicitud:", err)
                setIsLoading(false)
            });
    };
    return (

        <div className="ReviewsList">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Row>
                    {reviews.map(elm => {
                        if (!elm.isDeleted) {
                            return (
                                <Col className="mb-5" md={{ span: 4 }} key={elm._id}>
                                    <ReviewCard {...elm} />
                                </Col>
                            );
                        }
                        return null;
                    })}
                </Row>
            )}
        </div>
    )
}

export default ReviewsList
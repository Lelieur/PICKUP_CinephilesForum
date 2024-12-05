import axios from "axios"
import { useState, useEffect } from "react"

import ReviewCard from "../ReviewCard/ReviewCard"
import { Col, Row } from "react-bootstrap"

import "./ReviewsList.css"

const API_URL = import.meta.env.VITE_APP_API_URL

const ReviewsList = () => {

    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = () => {
        axios
            .get(`${API_URL}/api/reviews`)
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
                <Row className="d-flex justify-content-center">
                    <Col lg={{ span: 7 }} className="reviews-container">
                        {reviews.map(elm => {
                            if (!elm.isDeleted) {
                                return (
                                    <div className="mt-5" md={{ span: 2 }} key={elm._id}>
                                        <ReviewCard {...elm} />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default ReviewsList
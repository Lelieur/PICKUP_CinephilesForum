
import { useState, useEffect } from "react"

import ReviewCard from "../ReviewCard/ReviewCard"
import { Col, Row } from "react-bootstrap"

import "./ReviewsList.css"
import reviewServices from "../../../services/review.services"
import Loader from "../../Loader/Loader"

const ReviewsList = () => {

    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = () => {

        reviewServices
            .getAllReviews()
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
                <Loader />
            ) : (
                <Row className="d-flex justify-content-center">
                    <Col lg={{ span: 7 }} className="reviews-container">
                        {reviews.map(elm => {
                            if (!elm.isDeleted) {
                                return (
                                    <div className="mt-5" md={{ span: 2 }} key={elm._id}>
                                        <ReviewCard id={elm._id}
                                            content={elm.content}
                                            rate={elm.rate}
                                            likesCounter={elm.likesCounter}
                                            author={elm.author}
                                            createdAt={elm.createdAt}
                                            movieApiId={elm.movieApiId}
                                        />
                                    </div>
                                )
                            }
                            return null
                        })}
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default ReviewsList
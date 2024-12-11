import { Row, Col } from "react-bootstrap"
import ReviewCard from "../ReviewCard/ReviewCard"

const ReviewsList = ({ reviews, onLike, onEdit, onDelete }) => {

    return (
        <div className="ReviewsList">
            <Row className="d-flex justify-content-center">
                {
                    reviews.map(review => {
                        return (
                            <Col key={review.data._id} lg={{ span: 7 }} className="reviews-container">
                                <ReviewCard review={{ ...review.data }} />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default ReviewsList

import { Row, Col } from "react-bootstrap"
import ReviewCard from "../ReviewCard/ReviewCard"

const ReviewsList = ({ reviews, onLike, onEdit, onDelete, userId }) => {

    return (
        <div className="ReviewsList">
            <Row className="d-flex justify-content-center">
                {
                    reviews.map(review => {
                        return (
                            <Col key={review._id} lg={{ span: 12 }} className="reviews-container">
                                <ReviewCard {...review}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default ReviewsList

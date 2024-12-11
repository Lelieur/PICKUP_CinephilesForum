import { Row, Col } from "react-bootstrap"
import ReviewCard from "../ReviewCard/ReviewCard"

const ReviewsList = ({ reviews }) => {

    return (
        <div className="ReviewsList">
            <Row className="d-flex justify-content-center">
                {
                    reviews.map(review => {
                        return (
                            <Col key={review?._id} md={{ span: 12 }}>
                                <ReviewCard {...review} />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default ReviewsList

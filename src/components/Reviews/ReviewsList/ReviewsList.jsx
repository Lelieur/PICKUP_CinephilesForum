import { Row, Col } from "react-bootstrap"
import ReviewCard from "../ReviewCard/ReviewCard"

const ReviewsList = ({ reviews, usersData, moviesData, onLike, handleEdit, handleDelete, loggedUser }) => {
    return (
        <div className="ReviewsList">
            <Row className="d-flex justify-content-center">
                <Col lg={{ span: 7 }} className="reviews-container">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id} className="mt-5">
                                <ReviewCard
                                    review={review}
                                    authorData={usersData[review.author]}
                                    movieData={moviesData[review.movieApiId]}
                                    onLike={onLike}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                    loggedUser={loggedUser}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default ReviewsList

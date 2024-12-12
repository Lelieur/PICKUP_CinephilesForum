import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReviewCard from "../../../components/Reviews/ReviewCard/ReviewCard"
import reviewServices from "../../../services/review.services"
import { Spinner } from "react-bootstrap"

const DetailsReviewPage = () => {
    const { reviewId } = useParams()
    const [review, setReview] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        reviewServices
            .getReviewsDetails(reviewId)
            .then((response) => setReview(response.data))
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }, [reviewId])


    if (isLoading) {
        return <Spinner animation="border" />
    }


    if (!review) {
        return <p>No se encontró la review.</p>
    }

    return (
        <div className="DetailsReviewPage">
            <ReviewCard review={review} />
        </div>
    )
}

export default DetailsReviewPage

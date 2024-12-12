import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"


import { homer } from "../../../const/image-paths"
import { AuthContext } from "../../../contexts/auth.context"
import Loader from "../../../components/Loader/Loader"
import ReviewServices from "../../../services/review.services"
import ReviewCard from "../../../components/Reviews/ReviewCard/ReviewCard"


const ReviewDetailsPage = () => {

    const { loggedUser } = useContext(AuthContext)
    const { reviewId } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [reviewData, setReviewData] = useState({})


    useEffect(() => {
        fetchReviewData()
    }, [])

    const fetchReviewData = () => {

        ReviewServices
            .getOneReviewFullData(reviewId)
            .then((response) => {
                setReviewData(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader message="Cargando detalles de la reseña..." /> :

            <div className="ReviewDetailsPage">
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <h1>HOLA</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default ReviewDetailsPage


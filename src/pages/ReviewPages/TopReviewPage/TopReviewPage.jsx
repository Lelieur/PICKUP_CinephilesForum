import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap'
import ReviewsList from '../../../components/Reviews/ReviewsList/ReviewsList'
import reviewServices from '../../../services/review.services'


const TopReviewsPage = () => {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState('rating')
    const [genre, setGenre] = useState('')

    useEffect(() => {
        setIsLoading(true)
        fetchTopReviews()
    }, [sortBy, genre])

    const fetchTopReviews = () => {
        reviewServices.getMostLikedReviews()
            .then(response => {
                setReviews(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error("Error al cargar las reseñas:", error)
                setIsLoading(false)
            });
    };

    const handleSortChange = (sortOption) => {
        setSortBy(sortOption)
    }

    const handleGenreChange = (e) => {
        setGenre(e.target.value)
    }
    return (
        <Container>
            <h1 className="text-center my-4">Top Reviews</h1>

            <Row className="justify-content-center mb-4">
                <Col sm={4} className="d-flex justify-content-between">
                    <Button variant="outline-primary" onClick={() => handleSortChange('rating')}>Mejor Calificación</Button>
                    <Button variant="outline-secondary" onClick={() => handleSortChange('date')}>Más Recientes</Button>
                </Col>
            </Row>
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <ReviewsList reviews={reviews} />
            )}
        </Container>
    )
}

export default TopReviewsPage
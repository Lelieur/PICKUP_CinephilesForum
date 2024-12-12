import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import CommunitiesList from '../../../components/CommunitiesComponents/CommunitiesList/CommunitiesList';
import communityServices from '../../../services/community.services';

const TopCommunitiesPage = () => {
    const [communities, setCommunities] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState('popularity')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setIsLoading(true)
        fetchTopCommunities()
    }, [sortBy, searchQuery])

    const fetchTopCommunities = () => {
        communityServices.fetchCommunities()
            .then(response => {
                setCommunities(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error("Error al cargar las comunidades:", error)
                setIsLoading(false)
            })
    }

    const handleSortChange = (sortOption) => {
        setSortBy(sortOption);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <Container className="top-communities-page">
            <h1 className="text-center my-4">Top Comunidades</h1>
            <Row className="justify-content-center mb-4">
                <Col sm={6} md={4} className="d-flex justify-content-between">
                    <Button variant="outline-light" onClick={() => handleSortChange('popularity')}>Más Populares</Button>
                    <Button variant="outline-light" onClick={() => handleSortChange('date')}>Más Recientes</Button>
                </Col>
                <Col sm={6} md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar comunidad..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Col>
            </Row>
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <CommunitiesList communities={communities} />
            )}
        </Container>
    )
}

export default TopCommunitiesPage

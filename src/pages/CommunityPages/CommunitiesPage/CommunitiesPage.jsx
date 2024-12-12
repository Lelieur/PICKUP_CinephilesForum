import { useEffect, useState } from "react"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"

import NewCommunityForm from "../../../components/CommunitiesComponents/Forms/NewCommunityForm/NewCommunityForm"
import CommunitiesList from "../../../components/CommunitiesComponents/CommunitiesList/CommunitiesList"
import TopCommunitiesList from "../../../components/CommunitiesComponents/TopCommunitiesList/TopCommunitiesList"
import Loader from "../../../components/Loader/Loader"

import CommunityServices from "../../../services/community.services"

const CommunitiesPage = () => {

    const [communities, setCommunities] = useState([])
    const [mostFollowedCommunities, setMostFollowedCommunities] = useState()

    const [isLoading, setIsLoading] = useState(true)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = () => {

        const promises = [
            CommunityServices.fetchCommunities(),
            CommunityServices.fetchMostFollowedCommunities()
        ]

        Promise
            .all(promises)
            .then(([communities, mostFollowedCommunities]) => {
                setCommunities(communities.data)
                setMostFollowedCommunities(mostFollowedCommunities.data)
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :

            <div className="CommunitiesPage">

                <Container className="mt-3" >
                    <Row>
                        <Col>
                            <h5 className="fw-bold mb-0">Top Comunidades</h5>
                            <p className="fs-6 m-0 opacity-50 mb-3">Descubre las comunidades más seguidas</p>
                            <TopCommunitiesList communities={mostFollowedCommunities} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col md={{ span: 3 }}>
                                    <h5 className="fw-bold mb-0">Comunidades</h5>
                                    <p className="fs-6 m-0 opacity-50 mb-3">Descubre nuestras {communities.length} comunidades</p>
                                </Col>
                                <Col md={{ span: 2 }} className="ms-auto">
                                    <Button className="btn-style-2 signup-btn border-0 fw-bold me-3 w-100" onClick={() => setShowModal(true)}>Crear comunidad</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CommunitiesList communities={communities} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    backdrop={true}
                    keyboard={true}
                    size="xl"
                    centered>
                    <Modal.Body className="ps-4 pe-4">
                        <NewCommunityForm />
                    </Modal.Body>
                </Modal>

            </div>
    )
}

export default CommunitiesPage
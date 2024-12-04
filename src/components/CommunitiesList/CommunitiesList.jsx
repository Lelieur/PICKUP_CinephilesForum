import axios from "axios"

import CommunityCard from "../CommunityCard/CommunityCard"
import Loader from "../Loader/Loader"

import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"

const API_URL = import.meta.env.VITE_APP_API_URL

const CommunitiesList = () => {

    const [communities, setCommunities] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchCommunities()
    }, [])

    const fetchCommunities = () => {
        axios
            .get(`${API_URL}/api/communities`)
            .then(response => {
                setCommunities(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (

        isLoading ? <Loader /> :

            <div className="CommunitiesList">
                <h3 className="fw-bold mb-0">Comunidades</h3>
                <p className="fs-6 m-0 opacity-50">Descubre nuestras {communities.length} comunidades</p>
                <Row>
                    {
                        communities.map(elm => {
                            return (
                                <Col key={elm._id} xs={12} sm={6} md={4} lg={3} className="mt-3 mb-3 pe-4">
                                    <CommunityCard {...elm} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div >
    )
}

export default CommunitiesList
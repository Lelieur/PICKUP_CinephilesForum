import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"

import CommunitiesList from "../../../components/CommunitiesComponents/CommunitiesList/CommunitiesList"
import axios from "axios"
import Loader from "../../../components/Loader/Loader"

const API_URL = import.meta.env.VITE_APP_API_URL

const CommunitiesPage = () => {

    const [communities, setCommunities] = useState([])
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

            <div className="CommunitiesPage">
                <div className="HomePage">
                    <Container className="mt-3" >
                        <h3 className="fw-bold mb-0">Comunidades</h3>
                        <p className="fs-6 m-0 opacity-50">Descubre nuestras {communities.length} comunidades</p>
                        <CommunitiesList communities={communities} />
                    </Container>
                </div>
            </div>
    )
}

export default CommunitiesPage
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"

import CommunitiesList from "../../../components/CommunitiesComponents/CommunitiesList/CommunitiesList"
import TopCommunitiesList from "../../../components/CommunitiesComponents/TopCommunitiesList/TopCommunitiesList"
import Loader from "../../../components/Loader/Loader"

import CommunityServices from "../../../services/community.services"

const CommunitiesPage = () => {

    const [communities, setCommunities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchCommunities()
    }, [])

    const fetchCommunities = () => {
        CommunityServices
            .fetchCommunities()
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

                        <h5 className="fw-bold mb-0">Top Comunidades</h5>
                        <p className="fs-6 m-0 opacity-50 mb-3">Descubre las comunidades más seguidas</p>
                        <TopCommunitiesList communities={communities} />

                        <h5 className="fw-bold mb-0">Comunidades</h5>
                        <p className="fs-6 m-0 opacity-50 mb-3">Descubre nuestras {communities.length} comunidades</p>
                        <CommunitiesList communities={communities} />

                    </Container>
                </div>
            </div>
    )
}

export default CommunitiesPage
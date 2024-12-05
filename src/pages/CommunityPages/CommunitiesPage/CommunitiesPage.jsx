import { Container } from "react-bootstrap"
import CommunitiesList from "../../../components/CommunitiesComponents/CommunitiesList/CommunitiesList"

const CommunitiesPage = () => {
    return (
        <div className="CommunitiesPage">
            <div className="HomePage">
                <Container className="mt-3" >
                    <CommunitiesList />
                </Container>
            </div>
        </div>
    )
}

export default CommunitiesPage
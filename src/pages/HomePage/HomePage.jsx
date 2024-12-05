import { Container } from 'react-bootstrap'
import CommunitiesList from '../../components/CommunitiesComponents/CommunitiesList/CommunitiesList'

const HomePage = () => {

    return (
        <div className="HomePage">
            <Container className="mt-3" >
                <CommunitiesList />
            </Container>
        </div>
    )

}

export default HomePage
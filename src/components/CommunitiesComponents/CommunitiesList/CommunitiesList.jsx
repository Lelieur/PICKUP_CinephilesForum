import CommunityCard from "../CommunityCard/CommunityCard"

import { Row, Col } from "react-bootstrap"

const CommunitiesList = ({ communities }) => {

    return (
        <div className="CommunitiesList">
            <Row>
                {
                    communities.map(elm => {
                        return (
                            <Col key={elm._id} xs={12} sm={6} md={4} lg={3} className="mb-3 pe-4">
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
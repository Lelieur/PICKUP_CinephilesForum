import CommunityCard from "../CommunityCard/CommunityCard"
import { Row, Col } from "react-bootstrap"

import "./TopCommunitiesList.css"

const TopCommunitiesList = ({ communities }) => {

    return (
        <div className="TopCommunitiesList">
            <Row>
                {
                    communities.map(elm => {
                        return (
                            <Col key={elm._id} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3 pe-3 position-relative">
                                <CommunityCard {...elm} />
                                <p className="p-2 position-absolute end-0 top-0 fw-bold text-center rounded">Top</p>
                            </Col>
                        )
                    })
                }
            </Row>
        </div >
    )
}

export default TopCommunitiesList
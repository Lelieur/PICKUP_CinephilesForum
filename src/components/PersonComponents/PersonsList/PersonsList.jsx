import PersonCard from "../PersonCard/PersonCard"

import { Row, Col } from "react-bootstrap"

const PersonsList = ({ persons }) => {
    return (
        <div className="PersonsList">
            <Row className="movies-list">
                {
                    persons.map(elm => {
                        return (
                            <Col key={elm.id} xs={12} sm={6} md={4} lg={2} className="me-2">
                                <PersonCard {...elm} />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default PersonsList
import CreditCard from "../CreditCard/CreditCard"

import { Row, Col } from "react-bootstrap"

import "./CreditsList.css"

const CreditsList = ({ credits }) => {

    return (
        <div className="MoviesList">
            <Row className="credits-list">
                {
                    credits.map(elm => {
                        return (
                            <Col key={elm.id} xs={12} sm={6} md={4} lg={3} className="me-2">
                                <CreditCard {...elm} />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default CreditsList
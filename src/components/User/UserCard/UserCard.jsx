import "./UserCard.css"

import { Card, Row, Col, Container } from "react-bootstrap"
import { homer } from "../../const/image-paths"

import { Link } from "react-router-dom"

const UserCard = ({ avatar, username, bio }) => {
    return (
        <div className="UserCard">
            <Link className="text-decoration-none" to={`#`}>
                <Card className="d-flex flex-row text-white border-0 opacity-70">
                    <Card.Body className="border-0 p-0">
                        <Container>
                            <Row className="p-2 d-flex align-items-center">
                                <Col className="p-0" xs={{ span: 1 }} lg={{ span: 2 }}>
                                    <img className="border border-white object-fit-cover rounded-circle" style={{ height: "2rem", width: "2rem" }} src={homer} alt="avatar" />
                                </Col>
                                <Col className="p-0" xs={{ span: 11 }} lg={{ span: 10 }}>
                                    <span className="m-0 p-0 fw-bold">{username}</span>
                                    <p className="m-0 p-0">{bio}</p>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}

export default UserCard
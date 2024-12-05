import "./UserCard.css"

import { Card, Row, Col, Container } from "react-bootstrap"
import { homer } from "../../../const/image-paths"

import { Link } from "react-router-dom"

const UserCard = ({ avatar, username, bio, _id }) => {

    return (
        <div className="UserCard">
            <Card className="m-0 p-0 d-flex flex-row text-white border-0 opacity-70">
                <Card.Body className="border-0 p-0">
                    <Container>
                        <Row className="p-2 d-flex align-items-center">
                            <Col className="p-0" xs={{ span: 1 }} lg={{ span: 2 }}>
                                <img className="border border-white object-fit-cover rounded-circle" style={{ height: "2rem", width: "2rem" }} src={homer} alt="avatar" />
                            </Col>
                            <Col className="p-0" xs={{ span: 9 }} lg={{ span: 8 }}>
                                <span className="m-0 p-0 fw-bold">{username}</span>
                                <p className="m-0 p-0">{bio}</p>
                            </Col>
                            <Col className="p-0 text-decoration-none text-white fw-bold" xs={{ span: 2 }} lg={{ span: 2 }} as={Link} to={`/usuarios/${_id}`}>
                                <span >Seguir</span>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard
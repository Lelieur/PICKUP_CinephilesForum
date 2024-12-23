import React from "react"
import { Modal, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const AuthModal = ({ show, onHide }) => {
    const navigate = useNavigate()

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop={true}
            keyboard={true}
            centered
        >
            <Modal.Body className="ps-4 pe-4 text-center">
                <p className="text-white fw-bold mb-4 fs-6">
                    Debes iniciar sesión o registrarte para continuar.
                </p>
                <Row>
                    <Col className="d-grid d-md-inline mb-2">
                        <Button
                            className="btn-style-2 border-0 fw-bold"
                            onClick={() => {
                                navigate("/inicio-sesion")
                                onHide()
                            }}
                        >
                            INICIAR SESIÓN
                        </Button>
                    </Col>
                    <Col className="d-grid d-md-inline">
                        <Button
                            className="btn-style-2 border-0 fw-bold"
                            onClick={() => {
                                navigate("/registro")
                                onHide()
                            }}
                        >
                            REGISTRARSE
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default AuthModal

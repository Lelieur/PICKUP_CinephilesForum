import { Container, Nav, Navbar, Button, Dropdown, Offcanvas, Row, Col, Accordion } from 'react-bootstrap'
import { Search, List, XLg } from "react-bootstrap-icons"
import { useState } from 'react'
import { Link } from 'react-router-dom';

import "./Navigation.css"


const Navigation = () => {

    const [isToggleOpen, setIsToggleOpen] = useState(false)
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)

    const handleIsToggleOpen = () => (
        setIsToggleOpen(!isToggleOpen)
    )

    const handleIsOffCanvasOpen = () => (
        setIsOffCanvasOpen(!isOffCanvasOpen)
    )


    return (
        <div className="Navigation">
            <Navbar expand="lg" className="text-white" variant="dark" >
                <Container>
                    <Nav>
                        <Navbar.Toggle
                            className="me-2 border-0 bg-transparent text-white"
                            aria-controls="basic-navbar-nav"
                            onClick={() => { handleIsToggleOpen(), handleIsOffCanvasOpen() }}>

                            {isToggleOpen ? <XLg className='fs-1 fw-bold' /> : <List className='fs-1 fw-bold' />}
                        </Navbar.Toggle>
                        <Navbar.Brand as={Link} to="/">
                            <img
                                alt="Logo"
                                src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Logotipo_Filmin_2023.png"
                                width="100"
                            />
                        </Navbar.Brand>
                    </Nav>

                    {!isOffCanvasOpen &&
                        <Nav className="me-auto">
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <Nav.Link className="text-white" as={Link} to="/comunidades">Comunidades</Nav.Link>
                                    <Nav.Link className="text-white" as={Link} to="/comunidades">Reseñas</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Dropdown className="m-0">
                                        <Dropdown.Toggle variant="link" className="border-0 m-0 text-white text-decoration-none" id="dropdown-basic">
                                            Más
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="boder-0 m-0">
                                            <Dropdown.Item className="text-white pt-2" as={Link} to="/trend">Tendencias</Dropdown.Item>
                                            <Dropdown.Item className="text-white pt-2" as={Link} to="/trend/reviews">Top Reviews</Dropdown.Item>
                                            <Dropdown.Item className="text-white pt-2" as={Link} to="/trend/comunidades">Top Comunidades</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Nav>
                    }

                    <Nav>
                        <Button variant="ligth"><Search className="search-icon" size="20px" /></Button>
                    </Nav>
                </Container>
            </Navbar>

            <Offcanvas className="text-white border-0" bg="transparent" show={isOffCanvasOpen} onHide={handleIsOffCanvasOpen}>
                <div className="offcanvas-header" />
                <Offcanvas.Body className="w-75 fw-bold">
                    <Row className="offcanvas-login text-center p-3">
                        <Col>
                            <Button variant="outline-light" className="w-100 fw-bold">INICIAR SESIÓN</Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="p-3">
                        <Col className="text-decoration-none" as={Link} to="/">
                            Inicio
                        </Col>
                    </Row>
                    <hr />
                    <Row className="p-3">
                        <Col as={Link} to="/comunidades">
                            Comunidades
                        </Col>
                    </Row>
                    <hr />
                    <Row className="p-3">
                        <Col as={Link} to="/peliculas">
                            Películas
                        </Col>
                    </Row>
                    <hr />
                    <Row className="p-3">
                        <Col as={Link} to="/usuarios">
                            Usuarios
                        </Col>
                    </Row>
                    <hr />
                    <Row className="accordion-menu">
                        <Col>
                            <Accordion flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><span className="fw-bold">Más</span></Accordion.Header>
                                    <Accordion.Body className="p-0">
                                        <Row className="ms-2 p-3">
                                            <Col as={Link} to="/trend">
                                                Tendencias
                                            </Col>
                                        </Row>
                                        <hr className='m-0' />
                                        <Row className="ms-2 p-3">
                                            <Col as={Link} to="/trend/reviews">
                                                Top Reviews
                                            </Col>
                                        </Row>
                                        <hr className='m-0' />
                                        <Row className="ms-2 p-3">
                                            <Col as={Link} to="/trend/comunidades">
                                                Top Comunidades
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>

        </div >
    )
}

export default Navigation
import { Container, Nav, Navbar, Button, Dropdown, Offcanvas, Row, Col, Accordion } from 'react-bootstrap'
import { Search, List, XLg } from "react-bootstrap-icons"
import { useState } from 'react'
import { Link } from 'react-router-dom';

import "./Navigation.css"


const Navigation = () => {

    const [clickToggle, setClickToggle] = useState(false)
    const [showOffCanvas, setShowOffCanvas] = useState(false)

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="Navigation">
            <Navbar expand="lg" className="text-white" variant="dark" expanded={expanded} >
                <Container>
                    <Nav>
                        <Navbar.Toggle
                            className="me-2 border-0 bg-transparent text-white"
                            aria-controls="basic-navbar-nav"
                            onClick={() => { setClickToggle(!clickToggle), setShowOffCanvas(!showOffCanvas) }}>

                            {clickToggle ? <XLg className='fs-1 fw-bold' /> : <List className='fs-1 fw-bold' />}
                        </Navbar.Toggle>
                        <Navbar.Brand as={Link} to="/">
                            <img
                                alt="Logo"
                                src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Logotipo_Filmin_2023.png"
                                width="100"
                            />
                        </Navbar.Brand>
                    </Nav>
                    <Navbar.Collapse id="basic-navbar-nav d-flex w-100">
                        <Nav className="d-flex justify-content-start w-100">
                            <Nav.Link className="text-white" as={Link} to="/comunidades">Comunidades</Nav.Link>
                            <Nav.Link className="text-white" as={Link} to="/reviews">Reseñas</Nav.Link>
                            <Dropdown className="m-0 d-flex align-items-center">
                                <Dropdown.Toggle variant="link" className="border-0 m-0 p-2 text-white text-decoration-none" id="dropdown-basic">
                                    Más
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="boder-0 m-0">
                                    <Dropdown.Item className="text-white pt-2" as={Link} to="/trend">Tendencias</Dropdown.Item>
                                    <Dropdown.Item className="text-white pt-2" as={Link} to="/trend/reviews">Top Reviews</Dropdown.Item>
                                    <Dropdown.Item className="text-white pt-2" as={Link} to="/trend/comunidades">Top Comunidades</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                        <Nav className="d-flex justify-content-end w-100">
                            <Button className="btn-style-2 btn-sm border-0 fw-bold me-3" as={Link} to="/registro">REGISTRARSE</Button>
                            <Button variant="outline-light" className="btn-sm fw-bold me-3" as={Link} to="/inicio-sesion">INICIAR SESIÓN</Button>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav className="d-flex align-items-center">
                        <Button variant="ligth"><Search className="search-icon" size="20px" /></Button>
                    </Nav>
                </Container>
            </Navbar >

            <Offcanvas className="h-90 text-white border-0 w-75" show={showOffCanvas} onHide={() => setShowOffCanvas(false)}>
                <Offcanvas.Body className="w-75 fw-bold w-100">
                    <Row className="offcanvas-login text-center p-3">
                        <Col>
                            <Button className="btn-style-2 signup-btn border-0 fw-bold me-3 w-100" as={Link} to="/registro">REGISTRARSE</Button>
                            <Button variant="outline-light" className="w-100 fw-bold mt-3" as={Link} to="/inicio-sesion">INICIAR SESIÓN</Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="p-3">
                        <Col className="text-decoration-none" as={Link} to="/" onClick={() => { setShowOffCanvas(false), setClickToggle(false) }}>
                            Inicio
                        </Col>
                    </Row>
                    <hr />
                    <Row className="p-3">
                        <Col as={Link} to="/comunidades" onClick={() => { setShowOffCanvas(false), setClickToggle(false) }}>
                            Comunidades
                        </Col>
                    </Row>
                    <hr />
                    <Row className="p-3">
                        <Col as={Link} to="/peliculas" onClick={() => { setShowOffCanvas(false), setClickToggle(false) }}>
                            Películas
                        </Col>
                    </Row>
                    <hr />
                    <Row className="p-3">
                        <Col as={Link} to="/usuarios" onClick={() => { setShowOffCanvas(false), setClickToggle(false) }}>
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
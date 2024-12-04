import { Container, Nav, Navbar, Button, Dropdown, Offcanvas, Row, Col, Accordion } from 'react-bootstrap'
import { Search, List, XLg } from "react-bootstrap-icons"
import "./Navigation.css"
import { useState } from 'react'

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
                <Container >
                    <Nav className="d-flex align-items-center">
                        <Navbar.Toggle
                            className="me-2 border-0 bg-transparent text-white"
                            aria-controls="basic-navbar-nav"
                            onClick={() => { handleIsToggleOpen(), handleIsOffCanvasOpen() }}>

                            {isToggleOpen ? <XLg className='fs-1 fw-bold' /> : <List className='fs-1 fw-bold' />}
                        </Navbar.Toggle>
                        <Navbar.Brand href="#home">
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
                                    <Nav.Link className="text-white" href="#home">Comunidades</Nav.Link>
                                    <Nav.Link className="text-white" href="#link">Reseñas</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link" className="text-white text-decoration-none" id="dropdown-basic">
                                            Más
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
                    <Row className="text-center p-3">
                        <Col>
                            <Button variant="outline-light" className="w-100 fw-bold">INICIAR SESIÓN</Button>
                        </Col>
                    </Row>
                    <hr className='m-0' />
                    <Row className="p-3">
                        <Col>
                            Inicio
                        </Col>
                    </Row>
                    <hr className='m-0' />
                    <Row className="p-3">
                        <Col>
                            Comunidades
                        </Col>
                    </Row>
                    <hr className='m-0' />
                    <Row className="p-3">
                        <Col>
                            Películas
                        </Col>
                    </Row>
                    <hr className='m-0' />
                    <Row className="p-3">
                        <Col>
                            Usuarios
                        </Col>
                    </Row>
                    <hr className='m-0' />
                    <Row className="accordion-menu">
                        <Col>
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><span className="fw-bold">Más</span></Accordion.Header>
                                    <Accordion.Body className="ml-3">
                                        <Row>
                                            <Col>
                                                Tendencias
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
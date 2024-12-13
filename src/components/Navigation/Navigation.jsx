import { Container, Nav, Navbar, Button, Dropdown, Offcanvas, Row, Col, Accordion } from 'react-bootstrap'
import { Search, List, XLg } from "react-bootstrap-icons"
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'
import { homer, logo } from '../../const/image-paths';
import GeneralFilter from '../Filters/GeneralFilter/GeneralFilter';

import "./Navigation.css"


const Navigation = () => {

    const { loggedUser, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [clickToggle, setClickToggle] = useState(false)
    const [showOffCanvas, setShowOffCanvas] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const toggleSearchFilter = () => setShowFilter(prevState => !prevState)


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
                                src={logo}
                                width="100"
                            />
                        </Navbar.Brand>
                    </Nav>
                    <Navbar.Collapse id="basic-navbar-nav d-flex w-100">
                        <Nav className="d-flex justify-content-start w-100">
                            <Nav.Link className="text-white" as={Link} to="/comunidades">Comunidades</Nav.Link>
                            <Nav.Link className="text-white" as={Link} to="/reviews">Reseñas</Nav.Link>
                            <Nav.Link className="text-white" as={Link} to="/usuarios">Usuarios</Nav.Link>

                            <Dropdown className="m-0 d-flex align-items-center">
                                <Dropdown.Toggle variant="link" className="border-0 m-0 p-2 text-white text-decoration-none" id="dropdown-basic">
                                    Más
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="boder-0 m-0">
                                    <Dropdown.Item className="text-white ps-4 pe-4 pt-2 pb-2" as={Link} to="/trend">Tendencias</Dropdown.Item>
                                    <Dropdown.Item className="text-white ps-4 pe-4 pt-2 pb-2" as={Link} to="/top-peliculas">Top Películas</Dropdown.Item>
                                    <Dropdown.Item className="text-white ps-4 pe-4 pt-2 pb-2" as={Link} to="/trend/comunidades">Top Comunidades</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                        {
                            !loggedUser ?
                                <Nav className="d-flex justify-content-end w-100">
                                    <Button className="btn-style-2 btn-sm border-0 fw-bold me-3" as={Link} to="/registro">REGISTRARSE</Button>
                                    <Button variant="outline-light" className="btn-sm fw-bold me-3" as={Link} to="/inicio-sesion">INICIAR SESIÓN</Button>
                                </Nav>
                                :
                                <Nav className="d-flex justify-content-end w-100">
                                    <Dropdown className="m-0" align="end">
                                        <Dropdown.Toggle variant="link" className="border-0 m-0 p-0 profile-toggle" id="dropdown-basic">
                                            <img className="border border-white object-fit-cover rounded-circle me-2"
                                                style={{ height: "1.5rem", width: "1.5rem" }}
                                                src={loggedUser.avatar ? loggedUser.avatar : homer}
                                                alt="avatar" />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item className="text-white ps-4 pe-4 pt-2 pb-2" as={Link} to={`/usuarios/${loggedUser._id}`}>Ver perfil</Dropdown.Item>
                                            <hr className='m-0' />
                                            <Dropdown.Item className="text-white ps-4 pe-4 pt-2 pb-2" as="button" onClick={() => { logoutUser(), navigate("/") }}>Cerrar sesión</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav>
                        }

                    </Navbar.Collapse>
                    <Nav className="d-flex align-items-center">
                        <Button variant="ligth" onClick={() => setShowFilter(true)}>
                            <Search className="search-icon" size="20px" />
                        </Button>
                    </Nav>
                    {showFilter && (
                        <GeneralFilter
                            onResultsFound={() => { }}
                            setShowFilter={setShowFilter}
                        />
                    )}
                </Container>
            </Navbar >

            <Offcanvas className="h-90 text-white border-0 w-75" show={showOffCanvas} onHide={() => setShowOffCanvas(false)}>
                <Offcanvas.Body className="w-75 fw-bold w-100">
                    {
                        !loggedUser ?
                            <Row className="offcanvas-login text-center p-3">
                                <Col>
                                    <Button className="btn-style-2 signup-btn border-0 fw-bold me-3 w-100" as={Link} to="/registro" onClick={() => setShowOffCanvas(false)}>REGISTRARSE</Button>
                                    <Button variant="outline-light" className="w-100 fw-bold mt-3" as={Link} to="/inicio-sesion" onClick={() => setShowOffCanvas(false)}>INICIAR SESIÓN</Button>
                                </Col>
                            </Row>
                            :
                            <Row>
                                <Col >
                                    <Accordion flush>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                <img className="border border-white object-fit-cover rounded-circle me-2"
                                                    style={{ height: "1.5rem", width: "1.5rem" }}
                                                    src={loggedUser.avatar ? loggedUser.avatar : homer}
                                                    alt="avatar" />
                                                <span className="fw-bold">{loggedUser.username} </span>
                                            </Accordion.Header>
                                            <Accordion.Body className="p-0">
                                                <Row>
                                                    <Col as={Link} to={`/usuarios/${loggedUser._id}`} onClick={() => setShowOffCanvas(false)}>
                                                        <p className="ps-4 fs-6 pt-3 pb-3 m-0 text-white">Ver perfil</p>
                                                    </Col>
                                                </Row>
                                                <hr className='m-0' />
                                                <Row>
                                                    <Col as={Link} to={`/usuarios/${loggedUser._id}`} onClick={() => { () => logoutUser(), setShowOffCanvas(false), navigate("/") }}>
                                                        <p className="ps-4 fs-6 pt-3 pb-3 m-0 text-white">Cerrar sesión</p>
                                                    </Col>
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Col>
                            </Row>
                    }
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
                        <Col as={Link} to="/reviews" onClick={() => { setShowOffCanvas(false), setClickToggle(false) }}>
                            Reseñas
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
                                <Accordion.Item eventKey="0" style={{ backgroundColor: "#141426" }}>
                                    <Accordion.Header><span className="fw-bold text-white">Más</span></Accordion.Header>
                                    <Accordion.Body className="p-0" style={{ backgroundColor: "#060613" }}>
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
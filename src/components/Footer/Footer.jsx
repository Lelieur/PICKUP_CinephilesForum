import './Footer.css'
import { Container, Nav, Navbar, Row } from 'react-bootstrap'
import { Facebook, Twitter, Instagram, Tiktok, Linkedin } from 'react-bootstrap-icons'

const Footer = () => {

    return (

        <div className="Footer">
            <Navbar>
                <Container className="fs-6 opacity-50 d-flex flex-column text-center pt-2 pb-2 flex-row@lg align-items-center justify-content-between@lg">
                    <Nav className="mb-1 text-center flex-wrap justify-content-center">
                        <Nav.Link href="#" className="text-white">Centro de ayuda</Nav.Link>
                        <Nav.Link href="#" className="text-white">Aviso Legal</Nav.Link>
                        <Nav.Link href="#" className="text-white">Prensa</Nav.Link>
                        <Nav.Link href="#" className="text-white">¿Quiénes somos?</Nav.Link>
                    </Nav>
                    <Nav>
                        <p className="m-0">© La Review 2024. Made by Aaron & Lucas Spain. Film data from <a className="text-white" href="https://www.themoviedb.org/">TMDb</a></p>
                    </Nav>
                    <Nav>
                        <Nav.Link className="text-white" href="#home">
                            <Facebook size={15} />
                        </Nav.Link>
                        <Nav.Link className="text-white" href="#home">
                            <Twitter size={15} />
                        </Nav.Link>
                        <Nav.Link className="text-white" href="#home">
                            <Instagram size={15} />
                        </Nav.Link>
                        <Nav.Link className="text-white" href="#home">
                            <Tiktok size={15} />
                        </Nav.Link>
                        <Nav.Link className="text-white" href="#home">
                            <Linkedin size={15} />
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    )
}

export default Footer
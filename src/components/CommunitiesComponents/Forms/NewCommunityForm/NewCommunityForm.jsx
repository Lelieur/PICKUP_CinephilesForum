import { Container, Button, Form, Row, Col, Modal, ListGroup } from 'react-bootstrap'
import { Plus, XLg, Upload } from 'react-bootstrap-icons'

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { genres, decades } from '../../../../const/forms-constants'

import Loader from '../../../Loader/Loader'

import movieService from "../../../../services/movie.services"
import creditServices from '../../../../services/credit.services'
import uploadServices from '../../../../services/upload.services'
import communityServices from '../../../../services/community.services'


import "./NewCommunityForm.css"
import userServices from '../../../../services/user.services'


const NewCommunityForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isCreditsLoading, setIsCreditsLoading] = useState(true)

    const [showMoviesModal, setShowMoviesModal] = useState(false)
    const [showDirectorsModal, setShowDirectorsModal] = useState(false)
    const [showActorsModal, setShowActorsModal] = useState(false)

    const [querySearch, setQuerySearch] = useState('')
    const [moviesFilter, setMoviesFilter] = useState([])
    const [selectedMovies, setSelectedMovies] = useState([])

    const [creditsFilter, setCreditsFilter] = useState([])
    const [selectedDirectors, setSelectedDirectors] = useState([])
    const [selectedActors, setSelectedActors] = useState([])

    const coverFileInputRef = useRef(null)

    const [communityData, setCommunityData] = useState({
        title: '',
        description: '',
        cover: '',
        genres: [],
        fetishDirectors: [],
        fetishActors: [],
        decades: [],
        moviesApiIds: [],
        owner: localStorage.userId
    })

    const handleCommunityDataChange = e => {
        const { name, value } = e.target

        setCommunityData({
            ...communityData, [name]: value
        })
    }

    const handleMovieSearch = e => {

        const { value: query } = e.target
        setQuerySearch(query)
        query &&

            movieService
                .searchMovies(query)
                .then((response) => {
                    setMoviesFilter(response.data.results)
                })
                .catch((err) => {
                    console.error(err)
                })
    }

    const handleDirectorsSearch = e => {

        const { value: query } = e.target
        setQuerySearch(query)

        query &&

            creditServices
                .searchDirector(query)
                .then((response) => {
                    setCreditsFilter(response.data)
                })
                .catch((err) => {
                    console.error(err)
                })
    }

    const handleActorsSearch = e => {
        const { value: query } = e.target
        setQuerySearch(query)

        query &&

            creditServices
                .searchActor(query)
                .then((response) => {
                    setCreditsFilter(response.data)
                })
                .catch((err) => {
                    console.error(err)
                })
    }

    const handleSelectedMoviesChange = movie => {

        const moviesPostersCopy = [...selectedMovies]
        moviesPostersCopy[selectedMovies.length] = movie
        setSelectedMovies(moviesPostersCopy)
    }

    const deleteNewSelectedMovies = () => {
        const moviesPostersCopy = [...selectedMovies]
        moviesPostersCopy.pop('')
        setSelectedMovies(moviesPostersCopy)
    }

    const handleSelectedDirectorsChange = director => {

        const directorsCopy = [...selectedDirectors]

        directorsCopy[selectedDirectors.length] = director

        setSelectedDirectors(directorsCopy)
    }

    const deleteNewSelectedDirector = () => {
        const selectedDirectorsCopy = [...selectedDirectors]
        selectedDirectorsCopy.pop('')
        setSelectedDirectors(selectedDirectorsCopy)
    }

    const handleSelectedActorsChange = actor => {

        const actorsCopy = [...selectedActors]

        actorsCopy[selectedActors.length] = actor

        setSelectedActors(actorsCopy)
    }

    const deleteNewSelectedActor = () => {
        const selectedActorsCopy = [...selectedActors]
        selectedActorsCopy.pop('')
        setSelectedActors(selectedActorsCopy)
    }


    const handleGenresChange = (e, idx) => {

        const { value } = e.target

        const genresCopy = [...communityData.genres]

        genresCopy[idx] = value

        setCommunityData({
            ...communityData, genres: genresCopy
        })
    }

    const addNewGenre = () => {
        const genresCopy = [...communityData.genres]
        genresCopy.push('')
        setCommunityData({ ...communityData, genres: genresCopy })
    }

    const deleteNewGenre = () => {
        const genresCopy = [...communityData.genres]
        genresCopy.pop('')
        setCommunityData({ ...communityData, genres: genresCopy })
    }


    const handleDecadesChange = (e, idx) => {

        const { value } = e.target

        const decadesCopy = [...communityData.decades]

        decadesCopy[idx] = value

        setCommunityData({
            ...communityData, decades: decadesCopy
        })
    }

    const addNewDecade = () => {
        const decadesCopy = [...communityData.decades]
        decadesCopy.push('')
        setCommunityData({ ...communityData, decades: decadesCopy })
    }

    const deleteNewDecade = () => {
        const decadesCopy = [...communityData.decades]
        decadesCopy.pop('')
        setCommunityData({ ...communityData, decades: decadesCopy })
    }


    const handleMoviesApiIdsChange = movieId => {

        const moviesCopy = [...communityData.moviesApiIds]

        moviesCopy[moviesCopy.length] = movieId

        setCommunityData({
            ...communityData, moviesApiIds: moviesCopy
        })
    }

    const deleteNewMovie = () => {
        const moviesCopy = [...communityData.moviesApiIds]
        moviesCopy.pop('')
        setCommunityData({ ...communityData, moviesApiIds: moviesCopy })
    }

    const handleDirectorsChange = directorId => {

        const directorsCopy = [...communityData.fetishDirectors]

        directorsCopy[communityData.fetishDirectors.length] = directorId

        setCommunityData({
            ...communityData, fetishDirectors: directorsCopy
        })
    }

    const deleteNewDirector = () => {
        const directorsCopy = [...communityData.fetishDirectors]
        directorsCopy.pop('')
        setCommunityData({ ...communityData, fetishDirectors: directorsCopy })
    }


    const handleActorsChange = actorId => {

        const actorsCopy = [...communityData.fetishActors]

        actorsCopy[communityData.fetishActors.length] = actorId

        setCommunityData({
            ...communityData, fetishActors: actorsCopy
        })
    }

    const deleteNewActor = () => {
        const actorsCopy = [...communityData.fetishActors]
        actorsCopy.pop('')
        setCommunityData({ ...communityData, fetishActors: actorsCopy })
    }

    const handleUpload = e => {
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setCommunityData({ ...communityData, cover: res.data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }


    const handleCoverButtonClick = () => {
        coverFileInputRef.current.click()
    }

    const deleteNewCover = () => setCommunityData({ ...communityData, cover: '' })

    const handleCommunitySubmit = e => {

        e.preventDefault()

        communityServices
            .saveCommunity(communityData)
            .then(response => {
                const { data: newCommunity } = response
                navigate(`/comunidades/detalles/${newCommunity._id}`)
            })
            .catch(err => console.log(err))
    }

    const navigate = useNavigate()


    return (

        isLoading ? <Loader /> :

            <div className="NewCommunityForm">
                <Container>
                    <Form onSubmit={handleCommunitySubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="coverField">
                                    <Form.Label>Subir imagen de portada</Form.Label>
                                    <Container>
                                        <Row>
                                            {
                                                !communityData.cover ?
                                                    <Col className="border rounded d-flex justify-content-center align-items-center" style={{ height: "165px" }}>
                                                        <Form.Control
                                                            className="d-none"
                                                            type="file"
                                                            ref={coverFileInputRef}
                                                            onChange={handleUpload} />
                                                        <Button
                                                            className="btn-style-1 border-0 fw-bold"
                                                            size="sm"
                                                            onClick={() => handleCoverButtonClick()}>

                                                            <Upload />

                                                        </Button>
                                                    </Col>
                                                    :
                                                    <Col
                                                        className="border rounded d-flex justify-content-center align-items-center position-relative p-0">
                                                        <img
                                                            className="object-fit-cover h-100 w-100 rounded"
                                                            src={communityData.cover}
                                                            alt="Portada de la comunidad" />
                                                        <Button variant="link"
                                                            className="text-white p-0 pe-1 m-0 top-0 end-0 position-absolute"
                                                            onClick={() => deleteNewCover()}>
                                                            <XLg />
                                                        </Button>
                                                    </Col>
                                            }
                                        </Row>
                                    </Container>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="titleField">
                                    <Form.Label>Nombre de la comunidad</Form.Label>
                                    <Form.Control type="text" placeholder="Introduce el nombre de la comunidad" value={communityData.name} name={'title'} onChange={handleCommunityDataChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="descriptionField">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows={6} type="text" placeholder="Describe la comunidad" value={communityData.description} name={'description'} onChange={handleCommunityDataChange} />
                                </Form.Group>

                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="moviesField">
                                    <Form.Label>Películas de la comunidad</Form.Label>
                                    <Container>
                                        <Row className="mb-3 community-films-selector">
                                            {
                                                selectedMovies.map(movie => {
                                                    if (movie) {
                                                        return (
                                                            <Col
                                                                key={movie.id}
                                                                md={{ span: 2 }}
                                                                className="border rounded p-0 me-2 position-relative"
                                                                style={{ height: "165px" }}>
                                                                <img
                                                                    className="object-fit-cover h-100 w-100 rounded"
                                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                                    alt={`${movie.original_title} poster`} />
                                                                <Button variant="link"
                                                                    className="text-white p-0 pe-1 m-0 end-0 position-absolute"
                                                                    onClick={() => { deleteNewSelectedMovies(), deleteNewMovie() }}>
                                                                    <XLg />
                                                                </Button>
                                                            </Col>
                                                        )
                                                    }
                                                })
                                            }
                                            <Col md={{ span: 2 }} className="border rounded d-flex justify-content-center align-items-center" style={{ height: "165px" }}>
                                                <Button className="btn-style-1 border-0 fw-bold" size="sm" onClick={() => setShowMoviesModal(true)}><Plus /></Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="directorsField">
                                    <Form.Label>Directores fetiche</Form.Label>
                                    <Container>
                                        <Row className="mb-3 community-films-selector">
                                            {
                                                selectedDirectors.map(director => {
                                                    return (
                                                        <Col
                                                            key={director.id}
                                                            md={{ span: 2 }}
                                                            className="p-0 me-2 position-relative">
                                                            <img
                                                                className="border object-fit-cover rounded-circle"
                                                                src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
                                                                alt={`${director.name}`}
                                                                style={{ width: "6rem", height: "6rem" }} />
                                                            <p>{director.original_name}</p>
                                                            <Button variant="link" className="top-0 end-0 text-white p-0 pe-1 m-0 end-0 position-absolute" onClick={() => { deleteNewSelectedDirector(), deleteNewDirector() }}>
                                                                <XLg />
                                                            </Button>
                                                        </Col>
                                                    )
                                                })
                                            }
                                            <Col md={{ span: 1 }} className="border rounded-circle d-flex justify-content-center align-items-center p-5" style={{ height: "6rem" }}>
                                                <Button className="btn-style-1 border-0 fw-bold" size="sm" onClick={() => setShowDirectorsModal(true)}><Plus /></Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="actorsField">
                                    <Form.Label>Actores fetiche</Form.Label>
                                    <Container>
                                        <Row className="mb-3 community-films-selector">
                                            {
                                                selectedActors.map(actor => {
                                                    return (
                                                        <Col
                                                            key={actor.id}
                                                            md={{ span: 2 }}
                                                            className="p-0 me-2 position-relative">
                                                            <img
                                                                className="border object-fit-cover rounded-circle"
                                                                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                                                alt={`${actor.name}`}
                                                                style={{ width: "6rem", height: "6rem" }} />
                                                            <p>{actor.original_name}</p>
                                                            <Button variant="link" className="top-0 end-0 text-white p-0 pe-1 m-0 end-0 position-absolute" onClick={() => { deleteNewSelectedActor(), deleteNewActor() }}>
                                                                <XLg />
                                                            </Button>
                                                        </Col>
                                                    )
                                                })
                                            }
                                            <Col md={{ span: 1 }} className="border rounded-circle d-flex justify-content-center align-items-center p-5" style={{ height: "6rem" }}>
                                                <Button className="btn-style-1 border-0 fw-bold" size="sm" onClick={() => setShowActorsModal(true)}><Plus /></Button>
                                            </Col>
                                        </Row>
                                    </Container>                                </Form.Group>
                                <Form.Group className="mb-3" controlId="genresField">
                                    <Form.Label>Géneros</Form.Label>
                                    <div>
                                        {
                                            communityData.genres.map((eachGenre, idx) => {
                                                return (
                                                    <Form.Control
                                                        key={idx}
                                                        as="select"
                                                        className="mb-2"
                                                        type="text"
                                                        onChange={e => handleGenresChange(e, idx)}
                                                        value={eachGenre}>

                                                        <option>{eachGenre ? eachGenre : "Selecciona un género"}</option>

                                                        {
                                                            genres.map(genre => {
                                                                if (!communityData.genres.includes(genre)) {
                                                                    return (
                                                                        <option key={genre}>{genre}</option>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </Form.Control>
                                                )
                                            })

                                        }
                                    </div>
                                    <Button className="btn-style-1 me-2 border-0 fw-bold" size="sm" onClick={addNewGenre}>Añadir género</Button>
                                    <Button className="btn-style-1 me-2 border-0 fw-bold" size="sm" onClick={deleteNewGenre}>Quitar género</Button>

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="decadesField">
                                    <Form.Label>Décadas</Form.Label>
                                    <div>
                                        {
                                            communityData.decades.map((eachDecade, idx) => {
                                                return (
                                                    <Form.Control
                                                        key={idx}
                                                        as="select"
                                                        className="mb-2"
                                                        type="text"
                                                        onChange={e => handleDecadesChange(e, idx)}
                                                        value={eachDecade}>

                                                        <option>{eachDecade ? eachDecade : "Selecciona una década"}</option>

                                                        {
                                                            decades.map(decade => {
                                                                if (!communityData.decades.includes(decade)) {
                                                                    return (
                                                                        <option key={decade}>{decade}</option>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </Form.Control>
                                                )
                                            })

                                        }
                                    </div>
                                    <Button className="btn-style-1 me-2 border-0 fw-bold" size="sm" onClick={addNewDecade}>Añadir década</Button>
                                    <Button className="btn-style-1 me-2 border-0 fw-bold" size="sm" onClick={deleteNewDecade}>Quitar década</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className="btn-style-1 border-0 fw-bold" type="submit">
                            Crear comunidad
                        </Button>
                    </Form>
                </Container>



                <Modal
                    show={showMoviesModal}
                    onHide={() => { setShowMoviesModal(false), setQuerySearch(''), setMoviesFilter([]) }}
                    backdrop={true}
                    keyboard={true}
                    centered>
                    <Modal.Header closeButton className="border-0 ps-4">
                        <Modal.Title className="text-white fw-bold">Películas de la comunidad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ps-4 pe-4">
                        <Form>
                            <Form.Group className="mb-3" controlId="searchMovieField">
                                <Form.Label className="text-white">Nombre de la película</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Busca una película..."
                                    value={querySearch}
                                    onChange={handleMovieSearch} />
                                {
                                    moviesFilter.length &&
                                    <ListGroup align="end">
                                        {
                                            moviesFilter.map(movie => {
                                                return (
                                                    <ListGroup.Item key={movie.id} variant="flush">
                                                        <Button
                                                            variant="link"
                                                            className="w-100 p-0 m-0 border-0 text-start text-dark text-decoration-none"
                                                            onClick={() => {
                                                                handleMoviesApiIdsChange(movie.id),
                                                                    handleSelectedMoviesChange(movie),
                                                                    setShowMoviesModal(false),
                                                                    setQuerySearch(''),
                                                                    setMoviesFilter([])
                                                            }}>
                                                            <span className="m-0 p-0 fw-bold">{movie.original_title} </span><span>({new Date(movie.release_date).getFullYear()})</span>
                                                        </Button>
                                                    </ListGroup.Item>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                }
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={showActorsModal}
                    onHide={() => { setShowActorsModal(false), setQuerySearch(''), setCreditsFilter([]) }}
                    backdrop="static"
                    keyboard={false}
                    centered>
                    <Modal.Header closeButton className="border-0 ps-4">
                        <Modal.Title className="text-white fw-bold">Fetiches de la comunidad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ps-4 pe-4">
                        <Form>
                            <Form.Group className="mb-3" controlId="searchActorField">
                                <Form.Label className="text-white">¿A quién buscas?</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Busca a alguien..."
                                    value={querySearch}
                                    onChange={handleActorsSearch} />
                                {
                                    creditsFilter.length &&
                                    <ListGroup>
                                        {
                                            creditsFilter.map(actor => {
                                                return (
                                                    <ListGroup.Item key={actor.id} variant="flush">
                                                        <Button
                                                            variant="link"
                                                            className="w-100 p-0 m-0 border-0 text-start text-dark text-decoration-none"
                                                            onClick={() => {
                                                                handleActorsChange(actor.id),
                                                                    handleSelectedActorsChange(actor),
                                                                    setShowActorsModal(false),
                                                                    setQuerySearch(''),
                                                                    setCreditsFilter([])
                                                            }}>
                                                            <span className="m-0 p-0 fw-bold">{actor.name} </span><span>({actor.known_for_department})</span>
                                                        </Button>
                                                    </ListGroup.Item>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                }
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                </Modal>

                <Modal
                    show={showDirectorsModal}
                    onHide={() => { setShowDirectorsModal(false), setQuerySearch(''), setCreditsFilter([]) }}
                    backdrop="static"
                    keyboard={false}
                    centered>
                    <Modal.Header closeButton className="border-0 ps-4">
                        <Modal.Title className="text-white fw-bold">Fetiches de la comunidad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ps-4 pe-4">
                        <Form>
                            <Form.Group className="mb-3" controlId="searchDirectorField">
                                <Form.Label className="text-white">¿A quién buscas?</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Busca a alguien..."
                                    value={querySearch}
                                    onChange={handleDirectorsSearch} />
                                {
                                    creditsFilter.length &&
                                    <ListGroup>
                                        {
                                            creditsFilter.map(director => {
                                                return (
                                                    <ListGroup.Item key={director.id} variant="flush">
                                                        <Button
                                                            variant="link"
                                                            className="w-100 p-0 m-0 border-0 text-start text-dark text-decoration-none"
                                                            onClick={() => {
                                                                handleDirectorsChange(director.id),
                                                                    handleSelectedDirectorsChange(director),
                                                                    setShowDirectorsModal(false),
                                                                    setQuerySearch(''),
                                                                    setCreditsFilter([])
                                                            }}>
                                                            <span className="m-0 p-0 fw-bold">{director.name} </span><span>({director.known_for_department})</span>
                                                        </Button>
                                                    </ListGroup.Item>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                }
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
    )
}

export default NewCommunityForm
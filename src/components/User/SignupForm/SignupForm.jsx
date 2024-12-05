import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authServices from "../../../services/auth.services"

const SignupForm = () => {

    const navigate = useNavigate()
    const [error, setError] = useState("")

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
        firstName: '',
        familyName: '',
        socialNetworksProfiles: [],
        bio: '',
        favoriteGenres: []
    })

    // Manejo de cambios en inputs
    const handleInputChange = (e, index = null) => {
        const { value, name } = e.target

        setSignupData((prevData) => {
            if (name === 'socialNetworksProfiles') {
                const updatedSocialNetworks = [...prevData.socialNetworksProfiles]
                updatedSocialNetworks[index] = value
                return { ...prevData, socialNetworksProfiles: updatedSocialNetworks }
            }
            return { ...prevData, [name]: value }
        })
    }

    // Añadir seleccion socialNetwork
    const handleAddSocialNetwork = () => {
        setSignupData({
            ...signupData,
            socialNetworksProfiles: [...signupData.socialNetworksProfiles, '']
        })
    }
    //Eliminación campo socialNetwork
    const handleRemoveSocialNetwork = (index) => {
        setSignupData((prevData) => ({
            ...prevData,
            socialNetworksProfiles: prevData.socialNetworksProfiles.filter((_, i) => i !== index)
        }))
    }

    // Selección de géneros favoritos (Con ternario, más explicito y declarativo)
    const handleGenreChange = (e) => {
        const { value, checked } = e.target
        setSignupData((prevData) => ({
            ...prevData,
            favoriteGenres: checked
                ? [...prevData.favoriteGenres, value] // añade el  género si está marcado
                : prevData.favoriteGenres.filter((genre) => genre !== value) // elimina el género si está desmarcado
        }))
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        authServices
            .signupUser(signupData)
            .then(() => navigate('/inicio-sesion'))
            .catch(err => {
                console.log(err)
                setError("Hubo un error al intentar registrar el usuario. Por favor, intenta nuevamente.")
            })
    }

    return (
        <div className="SignupForm">
            <Form onSubmit={handleFormSubmit}>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        value={signupData.username}
                        onChange={handleInputChange}
                        name="username"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={signupData.password}
                        onChange={handleInputChange}
                        name="password"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={signupData.email}
                        onChange={handleInputChange}
                        name="email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control
                        type="text"
                        value={signupData.avatar}
                        onChange={handleInputChange}
                        name="avatar"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={signupData.firstName}
                        onChange={handleInputChange}
                        name="firstName"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="familyName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        value={signupData.familyName}
                        onChange={handleInputChange}
                        name="familyName" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="socialNetworksProfiles">
                    <Form.Label>Redes Sociales</Form.Label>
                    {signupData.socialNetworksProfiles.map((url, index) => (
                        <div key={index} className="d-flex mb-2">
                            <Form.Control
                                type="url"
                                placeholder={`URL de red social #${index + 1}`}
                                value={url}
                                onChange={(e) => handleInputChange(e, index)}
                                name="socialNetworksProfiles"
                            />
                            <Button
                                variant="dark"
                                className="ms-2"
                                onClick={() => handleRemoveSocialNetwork(index)}
                            >
                                Eliminar
                            </Button>
                        </div>
                    ))}
                </Form.Group>
                <Button variant="dark" onClick={handleAddSocialNetwork} size="sm">
                    Añadir otra red social
                </Button>

                <Form.Group className="mb-3" controlId="bio">
                    <Form.Label>Descripción Personal</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={signupData.bio}
                        onChange={handleInputChange}
                        name="bio"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="favoriteGenres">
                    <Form.Label>Géneros Favoritos</Form.Label>
                    {
                        ["Drama", "Acción", "Terror", "Comedia", "Romántico"].map((genre) => (
                            <Form.Check
                                key={genre}
                                type="checkbox"
                                label={genre}
                                value={genre}
                                checked={signupData.favoriteGenres.includes(genre)}
                                onChange={handleGenreChange}
                            />
                        ))
                    }
                    <div className="mt-2">
                        {signupData.favoriteGenres.map((genre) => (
                            <span key={genre} className="badge bg-secondary me-2">{genre}</span>
                        ))}
                    </div>
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Registrarme</Button>
                </div>

            </Form>
        </div >
    )
}
export default SignupForm
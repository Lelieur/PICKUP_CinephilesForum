import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authServices from "../../../services/auth.services"

import { genres } from "../../../const/forms-constants"
import UploadServices from "../../../services/upload.services"

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


    const handleAddSocialNetwork = () => {
        setSignupData({
            ...signupData,
            socialNetworksProfiles: [...signupData.socialNetworksProfiles, '']
        })
    }

    const handleRemoveSocialNetwork = (index) => {
        setSignupData((prevData) => ({
            ...prevData,
            socialNetworksProfiles: prevData.socialNetworksProfiles.filter((_, i) => i !== index)
        }))
    }


    const handleGenreChange = (e, idx) => {
        const updatedGenres = [...signupData.favoriteGenres]
        updatedGenres[idx] = e.target.value
        setSignupData({ ...signupData, favoriteGenres: updatedGenres })
    }

    const addNewGenre = () => {
        setSignupData({
            ...signupData,
            favoriteGenres: [...signupData.favoriteGenres, ""]
        })
    }

    const deleteNewGenre = (idx) => {
        const updatedGenres = signupData.favoriteGenres.filter((_, index) => index !== idx)
        setSignupData({ ...signupData, favoriteGenres: updatedGenres })
    }

    const handleUpload = e => {
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        UploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, avatar: res.data.cloudinary_url })
            })
            .catch(err => console.log(err))
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
                        type="file"
                        onChange={handleUpload}
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
                                className="btn-style-1 me-2 border-0 fw-bold" size="sm"
                                variant="dark"
                                onClick={() => handleRemoveSocialNetwork(index)}
                            >
                                Eliminar
                            </Button>
                        </div>
                    ))}
                </Form.Group>
                <Button className="btn-style-1 me-2 border-0 fw-bold" size="sm" variant="dark" onClick={handleAddSocialNetwork}>
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
                    <div>
                        {signupData.favoriteGenres.map((genre, idx) => (
                            <Form.Control
                                key={idx}
                                as="select"
                                className="mb-2"
                                type="text"
                                value={genre}
                                onChange={(e) => handleGenreChange(e, idx)}
                            >
                                <option value="">Selecciona un género</option>
                                {genres.map((genreOption) => (
                                    !signupData.favoriteGenres.includes(genreOption) || genreOption === genre ? (
                                        <option key={genreOption} value={genreOption}>
                                            {genreOption}
                                        </option>
                                    ) : null
                                ))}
                            </Form.Control>
                        ))}
                    </div>

                    <Button className="btn-style-1 me-2 border-0 fw-bold" size="sm" onClick={addNewGenre}>
                        Añadir género
                    </Button>
                    {signupData.favoriteGenres.length > 1 && (
                        <Button className="btn-style-1 me-2 border-0 fw-bold" size="sm" onClick={() => deleteNewGenre(signupData.favoriteGenres.length - 1)}>
                            Quitar género
                        </Button>
                    )}
                    <div className="mt-2">
                        {signupData.favoriteGenres.map((genre, idx) => (
                            genre && <span key={idx} className="badge bg-secondary me-2">{genre}</span>
                        ))}
                    </div>
                </Form.Group>

                <div className="d-grid">
                    <Button className="btn-style-1 me-2 border-0 fw-bold" size="sm" variant="dark" type="submit">Registrarme</Button>
                </div>

            </Form>
        </div >
    )
}
export default SignupForm
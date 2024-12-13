import { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import userService from "../../../services/user.services"
import { genres } from "../../../const/forms-constants"

const EditUserForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [editData, setEditData] = useState({
        username: "",
        email: "",
        avatar: "",
        firstName: "",
        familyName: "",
        socialNetworksProfiles: [],
        bio: "",
        favoriteGenres: []
    })

    useEffect(() => {
        userService
            .fetchOneUser(id)
            .then(response => setEditData(response.data))
            .catch(err => {
                console.error(err);
                setError("Hubo un error al cargar los datos del usuario.")
            })
    }, [id])

    const handleInputChange = (e, index = null) => {
        const { value, name } = e.target

        setEditData((prevData) => {
            if (name === "socialNetworksProfiles") {
                const updatedSocialNetworks = [...prevData.socialNetworksProfiles]
                updatedSocialNetworks[index] = value;
                return { ...prevData, socialNetworksProfiles: updatedSocialNetworks }
            }
            return { ...prevData, [name]: value }
        })
    }

    const handleAddSocialNetwork = () => {
        setEditData({
            ...editData,
            socialNetworksProfiles: [...editData.socialNetworksProfiles, ""]
        })
    }

    const handleRemoveSocialNetwork = (index) => {
        setEditData((prevData) => ({
            ...prevData,
            socialNetworksProfiles: prevData.socialNetworksProfiles.filter((_, i) => i !== index)
        }))
    }

    const handleGenreChange = (e, idx) => {
        const updatedGenres = [...editData.favoriteGenres];
        updatedGenres[idx] = e.target.value;
        setEditData({ ...editData, favoriteGenres: updatedGenres })
    }

    const addNewGenre = () => {
        setEditData({
            ...editData,
            favoriteGenres: [...editData.favoriteGenres, ""]
        })
    }

    const deleteNewGenre = (idx) => {
        const updatedGenres = editData.favoriteGenres.filter((_, index) => index !== idx)
        setEditData({ ...editData, favoriteGenres: updatedGenres })
    }

    const handleUpload = (e) => {
        const formData = new FormData();
        formData.append("imageData", e.target.files[0])

        UploadServices.uploadimage(formData)
            .then((res) => {
                setEditData({ ...editData, avatar: res.data.cloudinary_url })
            })
            .catch((err) => console.error(err))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        userService
            .editUser(id, editData)
            .then((response) => {
                setEditData(response.data)
                console.log("Usuario actualizado correctamente")
            })
            .catch((err) => {
                console.error(err)
                setError("Hubo un error al intentar actualizar los datos del usuario.")
            })
    }

    return (
        <div className="EditUserForm">
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        value={editData.username}
                        onChange={handleInputChange}
                        name="username"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        name="email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" onChange={handleUpload} name="avatar" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={editData.firstName}
                        onChange={handleInputChange}
                        name="firstName"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="familyName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        value={editData.familyName}
                        onChange={handleInputChange}
                        name="familyName"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="socialNetworksProfiles">
                    <Form.Label>Redes Sociales</Form.Label>
                    {editData?.socialNetworksProfiles.map((url, index) => (
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
                    <Button
                        className="btn-style-1 me-2 border-0 fw-bold" size="sm" variant="dark"
                        onClick={handleAddSocialNetwork}
                    >
                        Añadir otra red social
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3" controlId="bio">
                    <Form.Label>Descripción Personal</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={editData.bio}
                        onChange={handleInputChange}
                        name="bio"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="favoriteGenres">
                    <Form.Label>Géneros Favoritos</Form.Label>
                    <div>
                        {editData?.favoriteGenres.map((genre, idx) => (
                            <Form.Control
                                key={idx}
                                as="select"
                                className="mb-2"
                                value={genre}
                                onChange={(e) => handleGenreChange(e, idx)}
                            >
                                <option value="">Selecciona un género</option>
                                {genres?.map((genreOption) => (
                                    !editData.favoriteGenres.includes(genreOption) || genreOption === genre ? (
                                        <option key={genreOption} value={genreOption}>
                                            {genreOption}
                                        </option>
                                    ) : null
                                ))}
                            </Form.Control>
                        ))}
                    </div>

                    <Button
                        className="btn-style-1 me-2 border-0 fw-bold" size="sm"
                        onClick={addNewGenre}
                    >
                        Añadir género
                    </Button>
                    {editData.favoriteGenres.length > 1 && (
                        <Button
                            className="btn-style-1 me-2 border-0 fw-bold" size="sm"
                            onClick={() => deleteNewGenre(editData.favoriteGenres.length - 1)}
                        >
                            Quitar género
                        </Button>
                    )}
                </Form.Group>

                <div className="d-grid">
                    <Button
                        className="btn-style-1 me-2 border-0 fw-bold" size="sm"
                        variant="dark" type="submit"
                    >
                        Guardar cambios
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default EditUserForm

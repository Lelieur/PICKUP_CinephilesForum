import ProfileUserList from "../../../components/User/ProfileUserList/ProfileUserList"
import userServices from "../../../services/user.services"
import Loader from "../../../components/Loader/Loader"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"

const UsersPage = () => {


    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        userServices
            .fetchAllUsersPopulated()
            .then(response => {
                setUsers(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (

        isLoading ? <Loader /> :

            <div className="UsersPage">
                <div className="HomePage">
                    <Container className="mt-3" >
                        <p className="fs-6 m-0 opacity-50 mb-3">Descubre nuestr@s {users.length} usuari@s</p>
                        <ProfileUserList users={users} />
                    </Container>
                </div>
            </div>
    )
}

export default UsersPage
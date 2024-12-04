import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'
import CommunityDetailsPage from '../pages/CommunityPages/CommunityDetailsPage/CommunityDetailsPage'
import CommunitiesPage from '../pages/CommunityPages/CommunitiesPage/CommunitiesPagef'
import Error404Page from '../pages/Error404Page/Error404Page'

const AppRoutes = () => {

    return (
        <div className="AppRoutes">
            <Routes>
                <Route path={'/'} element={<HomePage />} />

                <Route path={'/comunidades'} element={<CommunitiesPage />} />
                <Route path={'/comunidades/detalles/:communityId'} element={<CommunityDetailsPage />} />

                <Route path={'/registro'} element={<SignupPage />} />
                <Route path={'/inicio-sesion'} element={<LoginPage />} />

                <Route path={'/*'} element={<Error404Page />} />
            </Routes>
        </div>
    )

}

export default AppRoutes
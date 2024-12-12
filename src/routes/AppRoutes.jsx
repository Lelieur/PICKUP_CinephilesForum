import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'
import CommunityDetailsPage from '../pages/CommunityPages/CommunityDetailsPage/CommunityDetailsPage'
import CommunitiesPage from '../pages/CommunityPages/CommunitiesPage/CommunitiesPage'
import Error404Page from '../pages/Error404Page/Error404Page'
import ReviewsPage from '../pages/ReviewPages/ReviewsPage/ReviewsPage'
import UserProfilePage from '../pages/UserPages/UserProfilePage/UserProfilePage'
import FiletrPage from '../pages/FilterPage'
import DetailsReviewPage from '../pages/ReviewPages/DetailsReviewPage/DetailsReviewPage'

import PrivateRoute from './PrivateRoutes'

import NewCommunityForm from '../components/CommunitiesComponents/Forms/NewCommunityForm/NewCommunityForm'

const AppRoutes = () => {

    return (
        <div className="AppRoutes">
            <Routes>
                <Route path={'/'} element={<HomePage />} />

                <Route path={'/comunidades'} element={<CommunitiesPage />} />
                <Route path={'/comunidades/detalles/:communityId'} element={<CommunityDetailsPage />} />
                <Route path={'/comunidades/crear'} element={<NewCommunityForm />} />

                <Route path={'/registro'} element={<SignupPage />} />
                <Route path={'/inicio-sesion'} element={<LoginPage />} />

                <Route path={'/usuarios/:id'} element={<UserProfilePage />} />

                <Route path={'/*'} element={<Error404Page />} />

                <Route path={'/reviews'} element={<ReviewsPage />} />
                <Route path={'/reviews/detalles/:reviewId'} element={<DetailsReviewPage />} />

                <Route path={'/filter'} element={<FiletrPage />} />

            </Routes>
        </div>
    )

}

export default AppRoutes
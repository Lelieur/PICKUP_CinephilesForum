import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'
import CommunityDetailsPage from '../pages/CommunityPages/CommunityDetailsPage/CommunityDetailsPage'
import CommunitiesPage from '../pages/CommunityPages/CommunitiesPage/CommunitiesPage'
import Error404Page from '../pages/Error404Page/Error404Page'
import ReviewsPage from '../pages/ReviewPages/ReviewsPage/ReviewsPage'
import UserProfilePage from '../pages/UserPages/UserProfilePage/UserProfilePage'
import DetailsReviewPage from '../pages/ReviewPages/ReviewDetailsPage/ReviewDetailsPage'
import ReviewsByMoviePage from '../pages/ReviewPages/ReviewsByMoviePage/ReviewsByMoviePage'

import PrivateRoute from './PrivateRoutes'

import NewCommunityForm from '../components/CommunitiesComponents/Forms/NewCommunityForm/NewCommunityForm'
import TopCommunitiesPage from '../pages/CommunityPages/TopCommunitiesPage/TopComunitiesPage'
import UsersPage from '../pages/UserPages/UsersPage/UsersPage'
import PopularMovies from '../pages/MoviesPage/PopularMovies/PopularMovies'
import UpcomingMovies from '../pages/MoviesPage/UpcomingMovies/UpcomingMovies'
import TopRatedMovies from '../pages/MoviesPage/TopRatedMovies/TopRatedMovies'
import NowPlayingMovies from '../pages/MoviesPage/NowPlayingMovies/NowPlayingMovies'

const AppRoutes = () => {

    return (
        <div className="AppRoutes">
            <Routes>
                <Route path={'/'} element={<HomePage />} />

                <Route path={'/comunidades'} element={<CommunitiesPage />} />
                <Route path={'/comunidades/detalles/:communityId'} element={<CommunityDetailsPage />} />
                <Route path={'/comunidades/crear'} element={<NewCommunityForm />} />
                <Route path={'/top-comunidades'} element={<TopCommunitiesPage />} />

                <Route path={'/registro'} element={<SignupPage />} />
                <Route path={'/inicio-sesion'} element={<LoginPage />} />

                <Route path={'/usuarios/:id'} element={<UserProfilePage />} />
                <Route path={'/usuarios'} element={<UsersPage />} />

                <Route path={'/*'} element={<Error404Page />} />

                <Route path={'/reviews'} element={<ReviewsPage />} />
                <Route path={'/reviews/movie/:movieId'} element={<ReviewsByMoviePage />} />
                <Route path={'/reviews/:reviewId'} element={<DetailsReviewPage />} />

                <Route path={'/peliculas-populares'} element={<PopularMovies />} />
                <Route path={'/estrenos'} element={<NowPlayingMovies />} />
                <Route path={'/mejor-valoradas'} element={<TopRatedMovies />} />
                <Route path={'/próximos-estrenos'} element={<UpcomingMovies />} />


            </Routes>
        </div>
    )

}

export default AppRoutes
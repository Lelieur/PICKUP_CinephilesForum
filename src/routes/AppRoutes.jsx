import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ReviewsPage from '../pages/ReviewPages/ReviewsPage/ReviewsPage'

const AppRoutes = () => {

    return (
        <div className="AppRoutes">
            <Routes>
                <Route path={'/registro'} element={<SignupPage />} />
                <Route path={'/inicio-sesion'} element={<LoginPage />} />
                <Route path={'/reviews'} element={<ReviewsPage />} />
            </Routes>
        </div>
    )

}

export default AppRoutes
import React, { useEffect, useState } from 'react'
import tmdbServices from '../../../services/tmdb.services'


import { Container } from 'react-bootstrap'
import MoviesPostersList from "./../../../components/MovieComponentes/MoviesPostersList/MoviesPostersList"


const UpcomingMovies = () => {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await tmdbServices
                    .getUpcomingMovies()
                setMovies(data)
            } catch (error) {
                console.error('Error fetching upcoming movies:', error)
            }
        }

        fetchMovies()
    }, [])

    return (
        <div>
            <Container>
                <h2 className="fw-bold mt-5">Próximos Estrenos</h2>
                <MoviesPostersList movies={movies} />
            </Container>

        </div>
    )
}

export default UpcomingMovies



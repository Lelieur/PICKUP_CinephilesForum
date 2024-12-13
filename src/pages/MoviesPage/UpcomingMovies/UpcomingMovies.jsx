import React, { useEffect, useState } from 'react'
import tmdbServices from '../../../services/tmdb.services'
import './UpcomingMovies.css'

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
            <h2>Próximos Estrenos</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <div className="movie-list">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <div key={movie.id} className="movie-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <h3>{movie.title}</h3>
                                <p>{movie.release_date}</p>
                            </div>
                        ))
                    ) : (
                        <p>No upcoming movies available.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default UpcomingMovies



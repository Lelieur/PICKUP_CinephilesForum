
import React, { useEffect, useState } from 'react'
import tmdbServices from '../../../services/tmdb.services'

const PopularMovies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await tmdbServices.getPopularMovies()
                setMovies(data); // Asigna las películas populares a la variable de estado
            } catch (error) {
                console.error('Error fetching popular movies:', error)
            }
        }

        fetchMovies()
    }, [])

    return (
        <div>
            <h2>Películas Populares</h2>
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
                    <p>No popular movies available.</p>
                )}
            </div>
        </div>
    )
}

export default PopularMovies



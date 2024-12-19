
import React, { useEffect, useState } from 'react'
import tmdbServices from '../../../services/tmdb.services'

import { Container } from 'react-bootstrap'

import MoviesPostersList from "./../../../components/MovieComponentes/MoviesPostersList/MoviesPostersList"

const PopularMovies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await tmdbServices.getPopularMovies()
                setMovies(data)
            } catch (error) {
                console.error('Error fetching popular movies:', error)
            }
        }

        fetchMovies()
    }, [])

    return (
        <div className="PopularMovies">
            <Container>
                <h2 className="fw-bold mt-5">Películas Populares</h2>
                <div className="movie-list">

                    <MoviesPostersList movies={movies} />

                </div>
            </Container>
        </div>
    )
}

export default PopularMovies



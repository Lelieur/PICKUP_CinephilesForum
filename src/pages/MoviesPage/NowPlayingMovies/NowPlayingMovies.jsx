import React, { useEffect, useState } from 'react'
import tmdbServices from '../../../services/tmdb.services'

import { Container } from 'react-bootstrap'
import MoviesPostersList from "./../../../components/MovieComponentes/MoviesPostersList/MoviesPostersList"


const NowPlayingMovies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await tmdbServices.getNowPlayingMovies()
                setMovies(data)
            } catch (error) {
                console.error('Error fetching now playing movies:', error)
            }
        }

        fetchMovies()
    }, [])

    return (
        <div>
            <Container>
                <h2 className="fw-bold mt-5">Estrenos</h2>
                <div className="movie-list">
                    <MoviesPostersList movies={movies} />
                </div>
            </Container>
        </div>
    )
}

export default NowPlayingMovies


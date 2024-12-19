import React, { useEffect, useState } from 'react'
import tmdbServices from '../../../services/tmdb.services'

import { Container } from 'react-bootstrap'
import MoviesPostersList from "./../../../components/MovieComponentes/MoviesPostersList/MoviesPostersList"

const TopRatedMovies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const data = await tmdbServices.getTopRatedMovies();
                setMovies(data);
            } catch (error) {
                setError('Error fetching top rated movies.');
                console.error('Error fetching top rated movies:', error);
            }
        };

        fetchTopRatedMovies();
    }, []);

    return (
        <div>
            <Container>
                <h2 className="fw-bold mt-5">Películas más Valoradas</h2>
                <MoviesPostersList movies={movies} />
            </Container >
        </div >
    );
};

export default TopRatedMovies;




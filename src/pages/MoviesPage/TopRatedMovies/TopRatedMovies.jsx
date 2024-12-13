import React, { useEffect, useState } from 'react';
import tmdbServices from '../../../services/tmdb.services';

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
            <h2>Películas más Valoradas</h2>
            {error && <p>{error}</p>}
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
                            <p>Rating: {movie.vote_average}</p>
                        </div>
                    ))
                ) : (
                    <p>No top-rated movies available.</p>
                )}
            </div>
        </div>
    );
};

export default TopRatedMovies;




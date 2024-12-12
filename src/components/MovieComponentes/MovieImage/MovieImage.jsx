import { useState, useEffect } from 'react'

const TMDB_API_IMG_URL = import.meta.env.VITE_APP_TMDB_API_IMG_URL

const MovieImage = ({ movieApiId }) => {
    const [imageUrl, setImageUrl] = useState('/path/to/default-image.jpg')
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovieDetails = async (id) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_APP_TMDB_API_KEY}`)
                const data = await response.json()
                return data
            } catch (err) {
                console.err('Error fetching movie details:', err)
                throw err
            }
        }

        const loadImage = async () => {
            try {
                const movieDetails = await fetchMovieDetails(movieApiId)
                if (movieDetails?.backdrop_path) {
                    setImageUrl(`${TMDB_API_IMG_URL}/w780${movieDetails.backdrop_path}`)
                } else {
                    console.log('No backdrop_path found in movie details:', movieDetails)
                }
            } catch (error) {
                setError(error.message)
                console.err('Error fetching movie details:', err)
            }
        }

        if (movieApiId) loadImage()
    }, [movieApiId])

    if (error) {
        return <p>Error loading image: {error}</p>
    }

    return <img src={imageUrl} alt="Movie" width="100%" className="mb-2" />
}

export default MovieImage

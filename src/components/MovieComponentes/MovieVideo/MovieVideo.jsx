import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import TMDBServices from "../../../services/tmdb.services"

const MovieVideo = ({ movieId }) => {

    const [videoData, setVideoData] = useState(null)

    useEffect(() => {
        TMDBServices
            .fetchMovieVideos(movieId)
            .then((response) => {
                const trailers = response.data.results.filter(
                    (video) => video.type === "Trailer"
                )

                if (trailers.length > 0) {
                    setVideoData(trailers[0])
                }
            })
            .catch((error) => {
                console.error("Error fetching video data", error)
            })
    }, [movieId])

    if (!videoData) return null

    return (
        <div className="MovieVideo">
            <Button
                className="border-0 btn-style-2 fw-bold ms-3"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${videoData.key}`)}
            >
                VER TRÁILER
            </Button>
        </div>
    )
}

export default MovieVideo



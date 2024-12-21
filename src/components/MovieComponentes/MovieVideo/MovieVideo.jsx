import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import TMDBServices from "../../../services/tmdb.services"

const MovieVideo = ({ movieId }) => {

    const [videoData, setVideoData] = useState(null)

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await TMDBServices.fetchMovieVideos(movieId)
                const trailers = response.data.results.filter(
                    (video) => video.type === "Trailer"
                )

                if (trailers.length > 0) {
                    setVideoData(trailers[0])
                }
            } catch (error) {
                console.error("Error fetching video data", error)
            }
        }

        fetchVideo()
    }, [movieId])

    if (!videoData) return null

    return (
        <Button
            className="border-0 btn-style-2 fw-bold ms-3"
            onClick={() => window.open(`https://www.youtube.com/watch?v=${videoData.key}`, "_blank")}
        >
            VER TRÁILER
        </Button>
    )
}

export default MovieVideo



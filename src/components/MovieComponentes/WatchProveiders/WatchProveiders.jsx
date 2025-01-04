import React, { useEffect, useState } from "react"
import tmdbServices from "../../../services/tmdb.services"

const WatchProviders = ({ movieId }) => {
    const [providers, setProviders] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        tmdbServices
            .fetchWatchProviders(movieId)
            .then((response) => {
                const country = response.data.results?.ES
                setProviders(country)
            })
            .catch((error) => {
                console.error("Error fetching watch providers:", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [movieId])

    const formatProviderUrl = (providerName) => {
        return providerName.toLowerCase().replace(/\s+/g, "")
    }

    const filterUniqueProviders = (providersList) => {
        const uniqueProviders = new Map()
        providersList.forEach((provider) => {
            if (!uniqueProviders.has(provider.provider_name)) {
                uniqueProviders.set(provider.provider_name, provider)
            }
        })
        return Array.from(uniqueProviders.values())
    }

    if (loading) return <p>Cargando plataformas...</p>

    if (!providers || (!providers.buy && !providers.rent && !providers.flatrate)) {
        return <p>No disponible en streaming actualmente.</p>
    }

    return (


        <div className="WatchProveiders">
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {providers.flatrate && (
                    <div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            {filterUniqueProviders(providers.flatrate).map((provider) => (
                                <a
                                    key={provider.provider_id}
                                    href={`https://www.${formatProviderUrl(provider.provider_name)}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                {/* {providers.buy && (
                    <div>
                        <h6>Compra:</h6>
                        <div style={{ display: "flex", gap: "10px" }}>
                            {providers.buy.map((provider) => (
                                <a
                                    key={provider.provider_id}
                                    href={`https://www.${formatProviderUrl(provider.provider_name)}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                {providers.rent && (
                    <div>
                        <h6>Alquiler:</h6>
                        <div style={{ display: "flex", gap: "10px" }}>
                            {providers.rent.map((provider) => (
                                <a
                                    key={provider.provider_id}
                                    href={`https://www.${formatProviderUrl(provider.provider_name)}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default WatchProviders



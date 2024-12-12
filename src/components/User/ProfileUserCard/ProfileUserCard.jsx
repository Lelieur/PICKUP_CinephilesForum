import { Link } from "react-router-dom"
import './ProfileUserCard.css'
import { Row, Col, Card, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'

const ProfileUserCard = ({ avatar, username, _id, reviews, followedCommunities }) => {

    console.log(followedCommunities)
    return (
        <div className="profile-user-card">
            <Card className="border-0 bg-dark text-white p-2">
                <Row className="align-items-center">
                    <Col xs={2} className="text-center">
                        <Link to={`/usuarios/${_id}`}>
                            <img
                                className="rounded-circle border border-white"
                                style={{ height: "3rem", width: "3rem", objectFit: "cover" }}
                                src={avatar || "/default-avatar.png"}
                                alt={`${username} avatar`}
                            />
                        </Link>
                    </Col>
                    <Col xs={6}>
                        <h5 className="mb-0 fw-bold">
                            <Link to={`/usuarios/${_id}`} className="text-decoration-none text-white">
                                {username}
                            </Link>
                        </h5>
                        <p className="mb-0 small text-muted">{reviews.length} reviews</p>
                    </Col>
                    <Col xs={4} className="text-end">
                        <div className="d-flex justify-content-end">
                            {followedCommunities.slice(0, 3).map((community) => (
                                <OverlayTrigger
                                    key={community._id}
                                    placement="top"
                                    overlay={<Tooltip>{community.name}</Tooltip>}
                                >
                                    <img
                                        className="rounded-circle border border-white me-1"
                                        style={{ height: "2rem", width: "2rem", objectFit: "cover" }}
                                        src={community.cover || "/default-community-cover.png"}
                                        alt={community.name}
                                    />
                                </OverlayTrigger>
                            ))}
                            {followedCommunities.length > 3 && (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>+{followedCommunities.length - 3} more</Tooltip>}
                                >
                                    <span className="rounded-circle border border-white d-flex align-items-center justify-content-center bg-secondary text-white fw-bold" style={{ height: "2rem", width: "2rem" }}>
                                        +{followedCommunities.length - 3}
                                    </span>
                                </OverlayTrigger>
                            )}
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
export default ProfileUserCard
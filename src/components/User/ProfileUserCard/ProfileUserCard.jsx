import { Link } from "react-router-dom"
import './ProfileUserCard.css'
import { Row, Col, Card, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { homer } from "../../../const/image-paths"

const ProfileUserCard = ({ avatar, username, _id, reviews, followedCommunities }) => {

    console.log(followedCommunities)
    return (
        <div className="ProfileUserCard">
            <Container className="profile-user-card text-center" >
                <Row lg={{ span: 12 }} className="g-4">
                    <Col>
                        <Card className="border-0  text-white p-3" style={{ backgroundColor: 'rgb(6, 6, 19)' }}>
                            <Link to={`/usuarios/${_id}`}>
                                <img
                                    className="user-avatar border border-white rounded-circle"
                                    src={avatar || homer}
                                    alt={`${username} avatar`}
                                />
                            </Link>
                            <h5 className="mt-3 mb-1">
                                <Link to={`/usuarios/${_id}`} className="text-decoration-none text-white">
                                    {username}
                                </Link>
                            </h5>
                            <p className="mb-2 text-white small">{reviews.length} reviews</p>
                            <div className="followed-communities">
                                {followedCommunities.slice(0, 4).map((community, index) => (
                                    <OverlayTrigger
                                        key={community._id}
                                        placement="top"
                                        overlay={<Tooltip>{community.name}</Tooltip>}
                                    >
                                        <Link to={`/comunidades/detalles/${community._id}`} className="community-link">
                                            <img
                                                className="community-cover"
                                                style={{
                                                    transform: `translateY(${index * -5}px)`,
                                                    zIndex: followedCommunities.length - index,
                                                }}
                                                src={community.cover}
                                                alt={community.name}
                                            />
                                        </Link>
                                    </OverlayTrigger>
                                ))}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
export default ProfileUserCard
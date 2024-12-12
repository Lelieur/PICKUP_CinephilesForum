import { useEffect, useState } from 'react'
import ProfileUserCard from '../ProfileUserCard/ProfileUserCard'
import { Row, Col } from 'react-bootstrap'

const ProfileUserList = ({ users }) => {


    return (
        <div className="ReviewsList">
            <Row className="d-flex justify-content-center">
                {
                    users.map(elm => {
                        return (
                            <Col key={elm._id} lg={{ span: 2 }} className="reviews-container">
                                <ProfileUserCard {...elm}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default ProfileUserList

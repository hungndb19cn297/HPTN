import Link from 'next/link';
import React from 'react';
import { Card, Row, Col, Image, Badge } from 'react-bootstrap';

const UserCard = (pros: { avatarSrc: any, authorName: any, questionDate: any }) => {
    return (
        <>
            <Row className="mb-3 align-items-center" style={{width: 'fit-content'}}>
                <Col xs="auto">
                    <Image src={pros.avatarSrc} roundedCircle style={{ width: '40px', height: '40px' }} />
                </Col>
                <Col>
                    <div className="d-flex flex-column" style={{width: 'fit-content'}}>
                        <Link  className="fw-bold me-2 nav-link nav-underline" style={{ fontSize: '14px', width: 'fit-content' }} href={'/'}>{pros.authorName}</Link>
                        <div className="text-muted" style={{ fontSize: '12px', width: 'fit-content' }}>{pros.questionDate}</div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default UserCard
import Link from 'next/link';
import React from 'react';
import { Card, Row, Col, Image, Badge } from 'react-bootstrap';
import UserCard from './app.card.user';

const QuestionCard = ({ avatarSrc, authorName, questionDate, tags, questionTitle, answersCount, viewsCount, bookmarksCount }: {
  avatarSrc: any, authorName: any, questionDate: any, tags: Array<string>, questionTitle: any, answersCount: any, viewsCount: any, bookmarksCount: any
}) => {
  return (
    <>
      <Card className="mb-4" style={{ marginTop: 10 }}>
        <Card.Body>
          <Row>
            <UserCard avatarSrc={avatarSrc}
              authorName={authorName}
              questionDate={questionDate} />
            <Col xs={11}>
              <Link href={'/'} className='nav-link' style={{ color: '#5b79bf', fontWeight: 700 }}>{questionTitle}</Link>
              <div>
                {tags.map((tag, index) => (
                  <Badge key={index} className="me-1 badge badge-info">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-2">
                <span className="me-3">Answers: {answersCount}</span>
                <span className="me-3">Views: {viewsCount}</span>
                <span>Bookmarks: {bookmarksCount}</span>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

    </>
  );
};

export default QuestionCard;

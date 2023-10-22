import React from 'react';
import { Card, Row, Col, Image, Badge } from 'react-bootstrap';
import UserCard from './app.card.user';
import Link from 'next/link';

const PostCard = (post: any) => {
  post = post.post
  let title;
  try {
    console.log()
    title = JSON.parse(post.title).ops[0].insert
  } catch (error) {
    title = post.title
  }
  return (
    <>
      <Card className="mb-4" style={{ marginTop: 10 }}>
        <Card.Body>
          <Row>
            <UserCard avatarSrc={post.createdBy.avatar}
              authorName={post.createdBy.firstName + ' ' + post.createdBy.lastName}
              questionDate={post.createdAt} />
            <Col xs={11}>
              <Link href={'/post/?postId=' + post.id} className='nav-link' style={{ color: '#5b79bf', fontWeight: 700 }}>{title}</Link>
              <div>
                {post.tags.map((tag: any) => (
                  <Badge key={tag.id} className="me-1 badge badge-info">
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <div className="mt-2">
                <span className="me-3">Bình luận: {post.commentCount ?? 0}</span>
                <span className="me-3">Vote: {post.voteCount ?? 0}</span>
                <span>Bookmarks: {post.bookmarksCount ?? 0}</span>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

    </>
  );
};

export default PostCard;

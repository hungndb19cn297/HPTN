import Link from 'next/link';
import React, { useState } from 'react';
import { Card, Row, Col, Image, Badge, Container } from 'react-bootstrap';
import UserCard from '../app.card.user';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';

const EditorNoToolBar = dynamic(() => import("@/component/app.no.toolbar.editor.jsx"), { ssr: false });

export default function Comment({ comment }: {
    comment: IComment
}) {
    const [value, setValue] = useState(null);
    const [isRepling, setIsRepling] = useState(false);

    return (
        <Card style={{ marginTop: 20, backgroundColor: 'hsl(0deg 0% 100%)', color: '#0a0a0a', border: 'none' }}>
            <Row >
                <Col style={{ flex: 1, paddingRight: 0, display: 'block' }}>
                    <div style={{ padding: '10px 0px 10px 10px' }}>
                        <div>
                            <div style={{ border: '1px solid #000', borderRadius: 8, display: 'inline-block', textAlign: 'center' }}>
                                <KeyboardArrowUpIcon style={{ width: 40, height: 40, color: '#29b6f6' }} />
                                <div style={{ fontSize: 20, fontWeight: 600, color: '#66bb6a', display: 'inline-block' }}>112323</div>
                                <KeyboardArrowDownIcon style={{ width: 40, height: 40 }} />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col style={{ display: !comment.parentId ? 'none' : 'block' }}>
                    <div style={{ height: '100%', width: 10, backgroundColor: '#ccc' }}></div>
                </Col>
                <Col style={{ flex: 80, paddingLeft: 0 }}>
                    <Card style={{ border: 0 }}>
                        <Card.Body>
                            <Row>
                                <Row>
                                    <Col><UserCard avatarSrc={comment.avatarSrc}
                                        authorName={comment.authorName}
                                        questionDate={comment.questionDate} /></Col>
                                    <Col>
                                        <Button variant="outlined" style={{
                                            margin: 16,
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                        }} onClick={() => { setIsRepling(!isRepling) }}>Trả lời</Button>
                                    </Col>
                                </Row>

                                <Col xs={12}>
                                    <div>{comment.questionTitle}</div>
                                </Col>
                            </Row>

                        </Card.Body>
                        <div style={{ display: isRepling ? 'block' : 'none', padding: '10px 30px 20px 10px' }}>
                            <EditorNoToolBar value={value} setValue={setValue} />
                            <div style={{ position: 'relative', marginTop: 10 }}>
                                <Button variant="contained" style={{ position: 'absolute', right: 0 }} onClick={() => { console.log(value, comment.id) }}>Gửi</Button>
                            </div>
                        </div>
                        <Container style={{ padding: '20px 52px 52px 52px' }}>
                            {comment?.replies?.map((rep, index) => (
                                <Comment
                                    key={index} comment={rep}
                                />
                            ))}
                        </Container>
                    </Card>
                </Col>
            </Row>

        </Card>

    );
}
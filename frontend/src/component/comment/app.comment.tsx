import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Card, Row, Col, Image, Badge, Container } from "react-bootstrap";
import UserCard from "../app.card.user";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import axiosAuthClient from "@/api/axiosClient";
import { useSearchParams } from "next/navigation";
import HTMLReactParser from "html-react-parser";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const EditorNoToolBar = dynamic(
  () => import("@/component/app.no.toolbar.editor.jsx"),
  { ssr: false }
);

function mapComment(response: any) {
  return response.map((cmt) => {
    let contentCmt;
    try {
      contentCmt = HTMLReactParser(
        new QuillDeltaToHtmlConverter(JSON.parse(cmt.content).ops, {}).convert()
      );
    } catch (error) {
      contentCmt = HTMLReactParser(cmt.content);
    }
    return {
      avatar: cmt.createdBy.avatar,
      fullName: cmt.createdBy.firstName + " " + cmt.createdBy.lastName,
      createdBy: cmt.createdBy.id,
      createdAt: cmt.createdAt,
      content: contentCmt ?? "",
      id: cmt.id,
      parentId: null,
      childrenComment: cmt.childrenComment.map((rep) => {
        let contentRep = null;
        try {
          contentRep = HTMLReactParser(
            new QuillDeltaToHtmlConverter(
              JSON.parse(rep.content).ops,
              {}
            ).convert()
          );
        } catch (error) {
          contentRep = HTMLReactParser(rep.content);
        }
        return {
          avatar: rep.createdBy.avatar,
          fullName: rep.createdBy.firstName + " " + rep.createdBy.lastName,
          createdBy: rep.createdBy.id,
          createdAt: rep.createdAt,
          content: contentRep ?? "",
          id: rep.id,
          parentId: cmt.id,
          childrenComment: null,
        };
      }),
    };
  });
}

export default function Comment({
  comment,
  isLogin,
  setErr,
  setComments,
}: {
  comment: IComment;
  isLogin: any;
  setErr: any;
  setComments: any;
}) {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const [value, setValue] = useState(null);
  const [isRepling, setIsRepling] = useState(false);
  console.log(comment)
  if (comment != null)
    return (
      <Card
        style={{
          marginTop: 20,
          backgroundColor: "hsl(0deg 0% 100%)",
          color: "#0a0a0a",
          border: "none",
        }}
      >
        <Row>
          {/* <Col style={{ flex: 1, paddingRight: 0, display: 'block' }}>
                    <div style={{ padding: '10px 0px 10px 10px' }}>
                        <div>
                            <div style={{ border: '1px solid #000', borderRadius: 8, display: 'inline-block', textAlign: 'center' }}>
                                <KeyboardArrowUpIcon style={{ width: 40, height: 40, color: '#29b6f6' }} />
                                <div style={{ fontSize: 20, fontWeight: 600, color: '#66bb6a', display: 'inline-block' }}>112323</div>
                                <KeyboardArrowDownIcon style={{ width: 40, height: 40 }} />
                            </div>
                        </div>
                    </div>
                </Col> */}
          <Col style={{ display: !comment.parentId ? "none" : "block" }}>
            <div
              style={{ height: "100%", width: 10, backgroundColor: "#ccc" }}
            ></div>
          </Col>
          <Col style={{ flex: 80, paddingLeft: 0 }}>
            <Card style={{ border: 0 }}>
              <Card.Body>
                <Row>
                  <Row>
                    <Col>
                      <UserCard
                        avatarSrc={comment.avatar}
                        authorName={comment.fullName}
                        questionDate={comment.createdAt}
                        userId={comment.createdBy}
                      />
                    </Col>
                    <Col>
                      {isLogin && (
                        <Button
                          variant="outlined"
                          style={{
                            margin: 16,
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                          onClick={() => {
                            setIsRepling(!isRepling);
                          }}
                        >
                          Trả lời
                        </Button>
                      )}
                    </Col>
                  </Row>

                  <Col xs={12}>
                    <div>{comment.content}</div>
                  </Col>
                </Row>
              </Card.Body>
              <div
                style={{
                  display: isRepling ? "block" : "none",
                  padding: "10px 30px 20px 10px",
                }}
              >
                <EditorNoToolBar value={value} setValue={setValue} />
                <div style={{ position: "relative", marginTop: 10 }}>
                  <Button
                    variant="contained"
                    style={{ position: "absolute", right: 0 }}
                    onClick={() => {
                      if (
                        value == null ||
                        value.ops[0].insert.trim().length < 2 ||
                        JSON.stringify(value).length > 2000
                      ) {
                        setErr("Comment 1 -> 1200 ký tự");
                        return;
                      }
                      console.log({
                        content: JSON.stringify(value),
                        parentId: comment.id,
                        postId: postId,
                      });
                      axiosAuthClient
                        .post("/comments", {
                          content: JSON.stringify(value),
                          parentId: comment.id,
                          postId: postId,
                        })
                        .then((response: any) => {
                          axiosAuthClient
                            .get("/comments/pub?postId=" + postId)
                            .then((response: any) => {
                              if (response.length > 0) {
                                setComments(mapComment(response));
                                console.log(response);
                              }
                            });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Gửi
                  </Button>
                </div>
              </div>
              <Container
                style={{
                  padding: "20px 52px 52px 52px",
                  display: comment?.childrenComment != null ? "block" : "none",
                }}
              >
                {comment?.childrenComment?.map((rep, index) => (
                  <Comment
                    key={index}
                    comment={rep}
                    isLogin={isLogin}
                    setErr={setErr}
                    setComments={setComments}
                  />
                ))}
              </Container>
            </Card>
          </Col>
        </Row>
      </Card>
    );
}

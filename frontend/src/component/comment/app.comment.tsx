import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card, Row, Col, Image, Badge, Container } from "react-bootstrap";
import UserCard from "../app.card.user";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import dynamic from "next/dynamic";
import axiosAuthClient from "@/api/axiosClient";
import { useSearchParams } from "next/navigation";
import HTMLReactParser from "html-react-parser";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import DeleteIcon from "@mui/icons-material/Delete";

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
  myUserId,
}: {
  comment: IComment;
  isLogin: any;
  setErr: any;
  setComments: any;
  myUserId: any;
}) {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const [value, setValue] = useState(null);
  const [isRepling, setIsRepling] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  console.log(myUserId + " " + comment.createdBy + " " + isLogin);

  if (comment != null)
    return (
      <Card
        style={{
          marginTop: 16,
          backgroundColor: "hsl(0deg 0% 100%)",
          color: "#0a0a0a",
          border: "none",
        }}
      >
        <Row>
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
                      {myUserId == comment.createdBy && (
                        <>
                          <DeleteIcon
                            style={{
                              width: 40,
                              height: 40,
                              margin: "16px 120px 16px 16px",
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}
                            className="red"
                            onClick={() => setOpenCommentDialog(true)}
                          />
                          <Dialog
                            open={openCommentDialog}
                            onClose={() => setOpenCommentDialog(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              "Xoá bình luận?"
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Bạn có thực sự muốn xoá bình luận này?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() => setOpenCommentDialog(false)}
                              >
                                Huỷ bỏ
                              </Button>
                              <Button
                                onClick={() => {
                                  axiosAuthClient
                                    .delete("/comments?id=" + comment.id)
                                    .then((response: any) => {
                                      axiosAuthClient
                                        .get("/comments/pub?postId=" + postId)
                                        .then((response: any) => {
                                          if (response.length > 0) {
                                            setComments(mapComment(response));
                                            setOpenCommentDialog(false);
                                          }
                                        });
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                      setOpenCommentDialog(false);
                                    });
                                }}
                                autoFocus
                              >
                                Xác nhận
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </>
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
                    style={{ position: "absolute", right: 0, marginTop: -5 }}
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
                          setIsRepling(false)
                          setValue('')
                          axiosAuthClient
                            .get("/comments/pub?postId=" + postId)
                            .then((response: any) => {
                              if (response.length > 0) {
                                setComments(mapComment(response));
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
                  padding: "0px 52px 16px 52px",
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
                    myUserId={myUserId}
                  />
                ))}
              </Container>
            </Card>
          </Col>
        </Row>
      </Card>
    );
}

"use client";
import { Card, Col, Container, Row } from "react-bootstrap";
import HTMLReactParser from "html-react-parser";
import UserCard from "@/component/app.card.user";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "../globals.css";
import Comment from "@/component/comment/app.comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Vote from "@/component/point/app.vote";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import axiosAuthClient from "@/api/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Alert, Button, Snackbar, TextField } from "@mui/material";

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

const Post = () => {
  const [contentValue, setContentValue] = useState(<p></p>);
  const [titleValue, setTitleValue] = useState(<p>Loading...</p>);
  const [tagIds, setTagIds] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const [notFound, setNotFound] = useState(false);
  const [thisPost, setThisPost] = useState();
  const [comments, setComments] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [vote, setVote] = useState(0);
  const [totalVote, setTotalVote] = useState(0);
  const [bookmark, setBookmark] = useState(false);
  const [totalBookmark, setTotalBookmark] = useState(0);
  useEffect(() => {
    setIsLogin(!!localStorage.getItem("id"));
    setUserId(localStorage.getItem("id"));
    axiosAuthClient
      .post("/posts/pub/search", { id: postId })
      .then((response: any) => {
        console.log(response);
        if (response.posts.length !== 1) {
          setNotFound(true);
          return;
        }
        const post = response.posts[0];
        setThisPost(post);
        setTotalVote(post.voteCount ?? 0);
        setTotalBookmark(post.bookmarksCount ?? 0);
        try {
          setContentValue(
            HTMLReactParser(
              new QuillDeltaToHtmlConverter(
                JSON.parse(post.content).ops,
                {}
              ).convert()
            )
          );
        } catch (error) {
          setContentValue(HTMLReactParser(post.content));
        }
        try {
          setTitleValue(
            HTMLReactParser(
              new QuillDeltaToHtmlConverter(
                JSON.parse(post.title).ops,
                {}
              ).convert()
            )
          );
        } catch (error) {
          setTitleValue(HTMLReactParser(post.title));
        }
        setTagIds(post.tagIds);
      })
      .catch((error: any) => console.log(error));

    axiosAuthClient
      .get("/comments/pub?postId=" + postId)
      .then((response: any) => {
        if (response.length > 0) {
          setComments(mapComment(response));
          console.log(response);
        }
      });
  }, []);

  const [comment, setComment] = useState(null);
  const [err, setErr] = useState("");
  if (isLogin) {
    axiosAuthClient.get("/votes?postId=" + postId).then((response: any) => {
      setVote(response);
    });
    axiosAuthClient.get("/bookmarks?postId=" + postId).then((response: any) => {
      setBookmark(response);
    });
  }

  if (notFound === false)
    return (
      <>
        <Snackbar
          open={err != ""}
          autoHideDuration={6000}
          onClose={() => setErr("")}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="error"
            sx={{ width: "100%" }}
            onClick={() => setErr("")}
          >
            {err}
          </Alert>
        </Snackbar>
        <Card style={{ padding: 20, marginBottom: 40 }}>
          <Row>
            <div style={{ width: "fit-content" }}>
              <UserCard
                avatarSrc={thisPost?.createdBy?.avatar}
                authorName={
                  (thisPost?.createdBy?.firstName ?? "") +
                  " " +
                  (thisPost?.createdBy?.lastName ?? "")
                }
                questionDate={thisPost?.createdAt}
                userId={thisPost?.createdBy?.id}
              />
            </div>
            <Col>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div
                    className="d-flex"
                    style={{
                      display: "inline-block",
                      border: "solid #000 1px",
                      borderRadius: 8,
                      marginRight: 30,
                    }}
                  >
                    <BookmarkIcon
                      style={{
                        width: 40,
                        height: 40,
                        color: bookmark ? "#3b74ac" : "#000",
                      }}
                      onClick={() => {
                        if (isLogin) {
                          axiosAuthClient
                            .post("/bookmarks?postId=" + postId)
                            .then((response: any) => {
                              setBookmark(response.isBookmark);
                              setTotalBookmark(response.totalBookmark);
                            });
                        }
                      }}
                    />
                    <div
                      className="d-flex"
                      style={{
                        justifyContent: "center",
                        minWidth: 60,
                        alignItems: "center",
                        fontSize: 20,
                        fontWeight: 600,
                        marginLeft: -8,
                      }}
                    >
                      <div className="">{totalBookmark}</div>
                    </div>
                  </div>
                  <Vote
                    isUpVote={vote == 1}
                    isDownVote={vote == -1}
                    point={totalVote}
                    clickUpVote={() => {
                      axiosAuthClient
                        .post("/votes?postId=" + postId + "&vote=1")
                        .then((response: any) => {
                          setVote(response.vote);
                          setTotalVote(response.totalVote);
                        });
                    }}
                    clickDownVote={() => {
                      axiosAuthClient
                        .post("/votes?postId=" + postId + "&vote=-1")
                        .then((response: any) => {
                          setVote(response.vote);
                          setTotalVote(response.totalVote);
                        });
                    }}
                  />
                </div>
                {thisPost?.createdBy?.id != null &&
                  userId == thisPost?.createdBy.id && (
                    <div style={{ paddingRight: 12 }}>
                      <Link href={"/post/update?postId=" + postId}>
                        <EditIcon
                          style={{ width: 40, height: 40 }}
                          className="yellow"
                        />
                      </Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <DeleteIcon
                        style={{ width: 40, height: 40 }}
                        className="red"
                      />
                    </div>
                  )}
              </div>
            </Col>
          </Row>
          <h2>{titleValue}</h2>
          {contentValue}
        </Card>
        <h2 style={{ color: "#000" }}>Bình luận</h2>
        {isLogin && (
          <>
            <EditorNoToolBar
              value={comment}
              setValue={setComment}
              placeholder="Viết câu trả lời hoặc bình luận của bạn tại đây ..."
            />
            <div
              style={{
                position: "relative",
                marginTop: 10,
                marginBottom: 80,
              }}
            >
              <Button
                variant="contained"
                style={{ position: "absolute", right: 0 }}
                onClick={() => {
                  if (
                    comment == null ||
                    comment.ops[0].insert.trim().length < 2 ||
                    JSON.stringify(comment).length > 2000
                  ) {
                    setErr("Comment 1 -> 1200 ký tự");
                    return;
                  }
                  axiosAuthClient
                    .post("/comments", {
                      content: JSON.stringify(comment),
                      parentId: null,
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
                      setErr(JSON.stringify(err));
                    });
                }}
              >
                Gửi
              </Button>
            </div>
          </>
        )}
        {isLogin != null && !isLogin && (
          <h4 style={{ color: "#000" }}>
            Hãy <Link href={"/login"}>đăng nhập</Link> để bình luận nhé ^^
          </h4>
        )}
        {comments != null &&
          comments.map((x) => (
            <Comment
              key={x.id}
              comment={x}
              isLogin={isLogin}
              setErr={setErr}
              setComments={setComments}
            />
          ))}
      </>
    );
  else return <></>;
};

export default Post;

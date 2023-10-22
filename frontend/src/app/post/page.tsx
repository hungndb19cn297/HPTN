"use client";
import { Card, Col, Container, Row } from "react-bootstrap";
import HTMLReactParser from "html-react-parser";
import UserCard from "@/component/app.card.user";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "../globals.css";
import { Button } from "@mui/material";
import Comment from "@/component/comment/app.comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Vote from "@/component/point/app.vote";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import axiosAuthClient from "@/api/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";

const EditorNoToolBar = dynamic(
  () => import("@/component/app.no.toolbar.editor.jsx"),
  { ssr: false }
);

const Post = () => {
  const [contentValue, setContentValue] = useState(<p></p>);
  const [titleValue, setTitleValue] = useState(<p></p>);
  const [tagIds, setTagIds] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const [notFound, setNotFound] = useState(false);
  const [thisPost, setThisPost] = useState();
  useEffect(() => {
    axiosAuthClient
      .post("/posts/pub/search", { id: postId })
      .then((response: any) => {
        if (response.posts.length !== 1) {
          setNotFound(true);
          return;
        }
        const post = response.posts[0];
        setThisPost(post)
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
    console.log(contentValue);
  }, []);
  const avatarSrc = "Brand.jpg";
  const authorName = "AlixXXXXce JohnsXXXXon";
  const questionDate = "10/10/2XXXX023";

  const [comment, setComment] = useState(null);
  const q1: IComment = {
    avatarSrc: "Brand.jpg",
    authorName: "Alice Johnson",
    questionDate: "10/10/2023",
    questionTitle:
      HTMLReactParser(`<p>Trong bài giới thiệu đầu tiên, các bạn đã có thể hiểu sức mạnh của NextJS trong lập trình website ở thời điểm năm 2023. Ở bài đầu tiên trong series lập trình NextJS, tôi sẽ hướng dẫn các bạn cách cài đặt môi trường để lập trình và cài đặt 1 chương trình NextJS đầu tiên.&lt;br&gt; Các bạn có thể xem bài viết về việc tại sao nên chọn lập trình NextJS ở thời điểm hiện tại <a href="https://viblo.asia/p/tai-sao-phai-hoc-nextjs-thay-vi-reactjs-trong-nam-2023-y37LdDroLov" rel="noopener noreferrer" target="_blank">tại đây</a></p><p>1. Cài đặt <a href="https://nodejs.org/en" rel="noopener noreferrer" target="_blank">NodeJS</a></p><ul><li>Như các bạn đã biết, ReactJS cũng như NextJS đều chạy trên môi trường NodeJS. Vì thế nên máy tính của bạn cần cài đặt môi trường Node để có thể lập trình NextJS. Các bước để cài đặt NodeJS:</li></ul><ol><li>Bước 1. Truy cập trang https://nodejs.org/en</li><li>Bước 2. Tải phiên bản NodeJS phù hợp với máy window hay macOS</li><li>Bước 3. Cài đặt</li><li>Bước 4. Kiểm tra thành công</li></ol><ul><li>Khi cài đặt xong NodeJS hãy chạy lệnh sau đây để kiểm tra xem bạn đã cài đặt thành công hay chưa:</li></ul><code class="ql-syntax" spellcheck="false">node -v
    asd
    a
    sd
    as
    d
    asd
    a
    sd
    
    asd
    
    asd
    </code>`),
    id: 123,
    parentId: null,
    replies: [
      {
        avatarSrc: "Brand.jpg",
        authorName: "Alice Johnson",
        questionDate: "10/10/2023",
        questionTitle:
          HTMLReactParser(`<p>Trong bài giới thiệu đầu tiên, các bạn đã có thể hiểu sức mạnh của NextJS trong lập trình website ở thời điểm năm 2023. Ở bài đầu tiên trong series lập trình NextJS, tôi sẽ hướng dẫn các bạn cách cài đặt môi trường để lập trình và cài đặt 1 chương trình NextJS đầu tiên.&lt;br&gt; Các bạn có thể xem bài viết về việc tại sao nên chọn lập trình NextJS ở thời điểm hiện tại <a href="https://viblo.asia/p/tai-sao-phai-hoc-nextjs-thay-vi-reactjs-trong-nam-2023-y37LdDroLov" rel="noopener noreferrer" target="_blank">tại đây</a></p><p>1. Cài đặt <a href="https://nodejs.org/en" rel="noopener noreferrer" target="_blank">NodeJS</a></p><ul><li>Như các bạn đã biết, ReactJS cũng như NextJS đều chạy trên môi trường NodeJS. Vì thế nên máy tính của bạn cần cài đặt môi trường Node để có thể lập trình NextJS. Các bước để cài đặt NodeJS:</li></ul><ol><li>Bước 1. Truy cập trang https://nodejs.org/en</li><li>Bước 2. Tải phiên bản NodeJS phù hợp với máy window hay macOS</li><li>Bước 3. Cài đặt</li><li>Bước 4. Kiểm tra thành công</li></ol><ul><li>Khi cài đặt xong NodeJS hãy chạy lệnh sau đây để kiểm tra xem bạn đã cài đặt thành công hay chưa:</li></ul><code class="ql-syntax" spellcheck="false">node -v
    asd
    a
    sd
    as
    d
    asd
    a
    sd
    
    asd
    
    asd
    </code>`),
        id: 222,
        parentId: 123,
        replies: null,
      },
      {
        avatarSrc: "Brand.jpg",
        authorName: "Alice Johnson",
        questionDate: "10/10/2023",
        questionTitle:
          HTMLReactParser(`<p>Trong bài giới thiệu đầu tiên, các bạn đã có thể hiểu sức mạnh của NextJS trong lập trình website ở thời điểm năm 2023. Ở bài đầu tiên trong series lập trình NextJS, tôi sẽ hướng dẫn các bạn cách cài đặt môi trường để lập trình và cài đặt 1 chương trình NextJS đầu tiên.&lt;br&gt; Các bạn có thể xem bài viết về việc tại sao nên chọn lập trình NextJS ở thời điểm hiện tại <a href="https://viblo.asia/p/tai-sao-phai-hoc-nextjs-thay-vi-reactjs-trong-nam-2023-y37LdDroLov" rel="noopener noreferrer" target="_blank">tại đây</a></p><p>1. Cài đặt <a href="https://nodejs.org/en" rel="noopener noreferrer" target="_blank">NodeJS</a></p><ul><li>Như các bạn đã biết, ReactJS cũng như NextJS đều chạy trên môi trường NodeJS. Vì thế nên máy tính của bạn cần cài đặt môi trường Node để có thể lập trình NextJS. Các bước để cài đặt NodeJS:</li></ul><ol><li>Bước 1. Truy cập trang https://nodejs.org/en</li><li>Bước 2. Tải phiên bản NodeJS phù hợp với máy window hay macOS</li><li>Bước 3. Cài đặt</li><li>Bước 4. Kiểm tra thành công</li></ol><ul><li>Khi cài đặt xong NodeJS hãy chạy lệnh sau đây để kiểm tra xem bạn đã cài đặt thành công hay chưa:</li></ul><code class="ql-syntax" spellcheck="false">node -v
    asd
    a
    sd
    as
    d
    asd
    a
    sd
    
    asd
    
    asd
    </code>`),
        id: 223,
        parentId: 123,
        replies: null,
      },
    ],
  };
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  console.log(thisPost)
  if (notFound === false)
    return (
      <>
        <Container>
          <Card style={{ padding: 20, marginBottom: 40 }}>
            <Row>
              <div style={{ width: "fit-content" }}>
                <UserCard
                  avatarSrc={thisPost?.createdBy?.avatar}
                  authorName={(thisPost?.createdBy?.firstName ?? "" )+ " " + (thisPost?.createdBy?.lastName ?? "") }    
                  questionDate={thisPost?.createdAt}
                />
              </div>
              <Col>
                <div className="d-flex justify-content-between">
                  <div>
                    <BookmarkIcon style={{ width: 40, height: 40 }} />
                    <Vote
                      isUpVote={isUpVote}
                      isDownVote={isDownVote}
                      point={0}
                      clickUpVote={() => {
                        setIsUpVote(!isUpVote);
                        isUpVote === false ? setIsDownVote(false) : null;
                      }}
                      clickDownVote={() => {
                        setIsDownVote(!isDownVote);
                        isDownVote === false ? setIsUpVote(false) : null;
                      }}
                    />
                  </div>
                  <div style={{ paddingRight: 12 }}>
                    <EditIcon
                      style={{ width: 40, height: 40 }}
                      className="yellow"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <DeleteIcon
                      style={{ width: 40, height: 40 }}
                      className="red"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <h2>{titleValue}</h2>
            {contentValue}
          </Card>
          <h2 style={{ color: "#000" }}>Bình luận</h2>
          <EditorNoToolBar
            value={comment}
            setValue={setComment}
            placeholder="Viết câu trả lời hoặc bình luận của bạn tại đây ..."
          />
          <div
            style={{ position: "relative", marginTop: 10, marginBottom: 80 }}
          >
            <Button
              variant="contained"
              style={{ position: "absolute", right: 0 }}
              onClick={() => {
                console.log(comment);
              }}
            >
              Gửi
            </Button>
          </div>

          <Comment comment={q1} />
        </Container>
      </>
    )
    else return (<></>)
};

export default Post;

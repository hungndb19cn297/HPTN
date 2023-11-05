"use client";
import { Container, Toast, Card } from "react-bootstrap";
import PostCard from "@/component/app.card.simple";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./globals.css";
import axiosAuthClient from "@/api/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home(search: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, updatePosts] = useState([]);
  const [pageIndex, setPageIndex] = useState(
    Number.isNaN(Number(searchParams.get("pageIndex")))
      ? 1
      : Number(searchParams.get("pageIndex")) < 1
      ? 1
      : Number(searchParams.get("pageIndex"))
  );
  const [pageSize, setPageSize] = useState(20);
  const [totalElement, setTotalElement] = useState(0);
  const [url, setUrl] = useState("/");
  search = { ...search.search, pageIndex: pageIndex };
  useEffect(() => {
    setUrl(window.location.pathname);
    console.log(JSON.stringify(search))
    axiosAuthClient
      .post("/posts/pub/search", search)
      .then((response: any) => {
        updatePosts(response.posts);
        setPageIndex(response.pageIndex);
        setPageSize(response.pageSize);
        setTotalElement(Math.ceil(response.totalElement / response.pageSize));
      })
      .catch((error) => console.log(error));
  }, [JSON.stringify(search)]);
  function handleChange(event: any, page: number) {
    axiosAuthClient
      .post("/posts/pub/search", {
        pageIndex: page,
      })
      .then((response: any) => {
        updatePosts(response.posts);
        setPageIndex(response.pageIndex);
        setPageSize(response.pageSize);
        setTotalElement(Math.ceil(response.totalElement / response.pageSize));
      })
      .catch((error) => console.log(error));
    router.push(url + "?pageIndex=" + page);
  }

  return (
    <Container>
      {posts.map((post, index) => (
        <PostCard post={post} key={index} />
      ))}
      <Pagination
        count={totalElement}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        size="large"
        className="d-flex justify-content-center"
        defaultPage={pageIndex}
      />
    </Container>
  );
}

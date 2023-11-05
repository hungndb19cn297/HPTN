"use client";
import Home from "@/app/page";
import { colors } from "@mui/material";

export default function BookMark() {
  return (
    <>
      <h2 style={{color: 'black'}}>Danh sách bài viết đã lưu:</h2>
      <Home search={{ isBookmark: true }}></Home>
    </>
  );
}
